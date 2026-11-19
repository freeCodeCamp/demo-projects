import type { Request } from 'express';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  requireOrganizationRole,
  requireProjectManageAccess,
  requireProjectViewAccess,
  requireTaskAccess
} from './authorize.js';
import {
  addOrganizationMember,
  addProjectMember,
  createOrganization,
  createProject,
  createTask,
  createUser
} from '../test-utils/factories.js';
import { resetTestDatabase } from '../test-utils/db.js';
import { ForbiddenError, NotFoundError } from '../utils/errors.js';
import type { User } from '../models/user.model.js';

// The exact scenario the PRD calls out by name: a user who belongs to one
// organization must not be able to read or modify another organization's
// data by substituting its ID in the URL. This is enforced entirely in this
// middleware, before any controller/service runs — so these are the tests
// that actually exercise the boundary, not the services behind it (which
// trust whatever :id the middleware already verified).

function req(params: Record<string, string>, user: User): Request {
  return { params, user } as unknown as Request;
}

const res = {} as never;

beforeEach(() => {
  resetTestDatabase();
});

describe('requireOrganizationRole', () => {
  it('grants access and sets req.organizationId/organizationRole for a member', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const next = vi.fn();
    const request = req({ organizationId: String(org.id) }, owner);

    requireOrganizationRole('member')(request, res, next);

    expect(next).toHaveBeenCalledWith();
    expect(request.organizationId).toBe(org.id);
    expect(request.organizationRole).toBe('owner');
  });

  it('rejects a user from a different organization with 404, not 403 (id substitution)', () => {
    const ownerA = createUser();
    createOrganization(ownerA); // org A, irrelevant here
    const ownerB = createUser();
    const orgB = createOrganization(ownerB);

    const outsider = createUser();
    const next = vi.fn();

    expect(() =>
      requireOrganizationRole('member')(
        req({ organizationId: String(orgB.id) }, outsider),
        res,
        next
      )
    ).toThrow(NotFoundError);
    expect(next).not.toHaveBeenCalled();
  });

  it('rejects a member whose role is below the required minimum', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const member = createUser();
    addOrganizationMember(org, member, 'member');
    const next = vi.fn();

    expect(() =>
      requireOrganizationRole('admin')(
        req({ organizationId: String(org.id) }, member),
        res,
        next
      )
    ).toThrow(ForbiddenError);
  });

  it('allows a higher-ranked role through a lower minimum', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const admin = createUser();
    addOrganizationMember(org, admin, 'admin');
    const next = vi.fn();

    requireOrganizationRole('member')(
      req({ organizationId: String(org.id) }, admin),
      res,
      next
    );

    expect(next).toHaveBeenCalledWith();
  });

  it('rejects a non-integer organizationId', () => {
    const user = createUser();
    const next = vi.fn();

    expect(() =>
      requireOrganizationRole('member')(
        req({ organizationId: 'not-a-number' }, user),
        res,
        next
      )
    ).toThrow(NotFoundError);
  });
});

describe('requireProjectViewAccess', () => {
  it("grants an org owner implicit access to a project they aren't explicitly a member of", () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const someoneElse = createUser();
    addOrganizationMember(org, someoneElse, 'member');
    const project = createProject(org, someoneElse); // owner is NOT an explicit project member
    const next = vi.fn();

    requireProjectViewAccess(
      req({ projectId: String(project.id) }, owner),
      res,
      next
    );

    expect(next).toHaveBeenCalledWith();
  });

  it("grants a plain member access only if they're an explicit project member", () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const member = createUser();
    addOrganizationMember(org, member, 'member');
    const project = createProject(org, owner);
    addProjectMember(project, member);
    const next = vi.fn();

    requireProjectViewAccess(
      req({ projectId: String(project.id) }, member),
      res,
      next
    );

    expect(next).toHaveBeenCalledWith();
  });

  it('rejects a plain org member who is not an explicit project member', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const member = createUser();
    addOrganizationMember(org, member, 'member');
    const project = createProject(org, owner); // member is not added to this project
    const next = vi.fn();

    expect(() =>
      requireProjectViewAccess(
        req({ projectId: String(project.id) }, member),
        res,
        next
      )
    ).toThrow(NotFoundError);
  });

  it('rejects a user from a different organization entirely with 404 (id substitution)', () => {
    const ownerA = createUser();
    const orgA = createOrganization(ownerA);
    const projectInOrgA = createProject(orgA, ownerA);

    const outsider = createUser();
    createOrganization(outsider); // outsider belongs to a different org, not orgA
    const next = vi.fn();

    expect(() =>
      requireProjectViewAccess(
        req({ projectId: String(projectInOrgA.id) }, outsider),
        res,
        next
      )
    ).toThrow(NotFoundError);
  });

  it('rejects a non-existent projectId', () => {
    const user = createUser();
    createOrganization(user);
    const next = vi.fn();

    expect(() =>
      requireProjectViewAccess(req({ projectId: '999999' }, user), res, next)
    ).toThrow(NotFoundError);
  });
});

describe('requireProjectManageAccess', () => {
  it('grants access to an org admin', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const admin = createUser();
    addOrganizationMember(org, admin, 'admin');
    const project = createProject(org, owner);
    const next = vi.fn();

    requireProjectManageAccess(
      req({ projectId: String(project.id) }, admin),
      res,
      next
    );

    expect(next).toHaveBeenCalledWith();
  });

  it("rejects a plain member even if they're an explicit project member", () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const member = createUser();
    addOrganizationMember(org, member, 'member');
    const project = createProject(org, owner);
    addProjectMember(project, member);
    const next = vi.fn();

    expect(() =>
      requireProjectManageAccess(
        req({ projectId: String(project.id) }, member),
        res,
        next
      )
    ).toThrow(ForbiddenError);
  });

  it('rejects a user from a different organization with 404 (id substitution)', () => {
    const ownerA = createUser();
    const orgA = createOrganization(ownerA);
    const projectInOrgA = createProject(orgA, ownerA);

    const outsiderAdmin = createUser();
    createOrganization(outsiderAdmin);
    const next = vi.fn();

    expect(() =>
      requireProjectManageAccess(
        req({ projectId: String(projectInOrgA.id) }, outsiderAdmin),
        res,
        next
      )
    ).toThrow(NotFoundError);
  });
});

describe('requireTaskAccess', () => {
  it('grants access to a project member for a task in their project', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);
    const task = createTask(project, owner);
    const next = vi.fn();

    requireTaskAccess(req({ taskId: String(task.id) }, owner), res, next);

    expect(next).toHaveBeenCalledWith();
  });

  it("rejects a user with no access to the task's project (id substitution) with 404", () => {
    const ownerA = createUser();
    const orgA = createOrganization(ownerA);
    const projectA = createProject(orgA, ownerA);
    const taskA = createTask(projectA, ownerA);

    const ownerB = createUser();
    createOrganization(ownerB);
    const next = vi.fn();

    expect(() =>
      requireTaskAccess(req({ taskId: String(taskA.id) }, ownerB), res, next)
    ).toThrow(NotFoundError);
  });

  it('rejects a plain org member without explicit project access', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);
    const task = createTask(project, owner);

    const member = createUser();
    addOrganizationMember(org, member, 'member'); // in the org, but never added to the project
    const next = vi.fn();

    expect(() =>
      requireTaskAccess(req({ taskId: String(task.id) }, member), res, next)
    ).toThrow(NotFoundError);
  });

  it('rejects a non-existent taskId', () => {
    const owner = createUser();
    createOrganization(owner);
    const next = vi.fn();

    expect(() =>
      requireTaskAccess(req({ taskId: '999999' }, owner), res, next)
    ).toThrow(NotFoundError);
  });
});
