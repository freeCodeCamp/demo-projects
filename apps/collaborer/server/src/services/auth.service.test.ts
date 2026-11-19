import { beforeEach, describe, expect, it, vi } from 'vitest';

// requestPasswordReset() sends real mail (the console mailer writes to disk
// in dev) — mock the transport, not the database, so the test doesn't leave
// files behind or slow down on real I/O. vitest hoists vi.mock above the
// imports below, so authService gets the mocked mailer.
vi.mock('../mailer/index.js', () => ({
  mailer: { send: vi.fn().mockResolvedValue(undefined) }
}));

import { authService } from './auth.service.js';
import { mailer } from '../mailer/index.js';
import { usersRepository } from '../repositories/users.repository.js';
import { resetTestDatabase } from '../test-utils/db.js';

const REGISTER_INPUT = {
  name: 'Alice Nakamura',
  username: 'alice',
  email: 'alice@example.com',
  password: 'password123'
};

beforeEach(() => {
  resetTestDatabase();
  vi.mocked(mailer.send).mockClear();
});

describe('authService.register', () => {
  it('creates a user and returns a public user shape plus a session token', () => {
    const { user, token } = authService.register(REGISTER_INPUT);

    expect(user.email).toBe(REGISTER_INPUT.email);
    expect(user).not.toHaveProperty('password_hash');
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);
  });

  it('rejects a duplicate email', () => {
    authService.register(REGISTER_INPUT);

    expect(() =>
      authService.register({ ...REGISTER_INPUT, username: 'alice2' })
    ).toThrow(expect.objectContaining({ code: 'EMAIL_TAKEN' }));
  });

  it('rejects a duplicate username', () => {
    authService.register(REGISTER_INPUT);

    expect(() =>
      authService.register({
        ...REGISTER_INPUT,
        email: 'someone-else@example.com'
      })
    ).toThrow(expect.objectContaining({ code: 'USERNAME_TAKEN' }));
  });
});

describe('authService.login', () => {
  it('succeeds with the correct password', () => {
    authService.register(REGISTER_INPUT);

    const { user, token } = authService.login({
      email: REGISTER_INPUT.email,
      password: REGISTER_INPUT.password
    });

    expect(user.email).toBe(REGISTER_INPUT.email);
    expect(typeof token).toBe('string');
  });

  it('rejects a wrong password without revealing which part was wrong', () => {
    authService.register(REGISTER_INPUT);

    expect(() =>
      authService.login({
        email: REGISTER_INPUT.email,
        password: 'wrong-password'
      })
    ).toThrow(expect.objectContaining({ code: 'UNAUTHORIZED' }));
  });

  it('rejects an unknown email with the same error as a wrong password', () => {
    expect(() =>
      authService.login({
        email: 'nobody@example.com',
        password: 'irrelevant'
      })
    ).toThrow(expect.objectContaining({ code: 'UNAUTHORIZED' }));
  });
});

describe('authService.changePassword', () => {
  it('updates the password so a subsequent login with the new password succeeds', () => {
    const { user } = authService.register(REGISTER_INPUT);

    authService.changePassword(user.id, {
      currentPassword: REGISTER_INPUT.password,
      newPassword: 'new-password-1'
    });

    expect(() =>
      authService.login({
        email: REGISTER_INPUT.email,
        password: REGISTER_INPUT.password
      })
    ).toThrow();
    expect(
      authService.login({
        email: REGISTER_INPUT.email,
        password: 'new-password-1'
      }).user.email
    ).toBe(REGISTER_INPUT.email);
  });

  it('rejects an incorrect current password', () => {
    const { user } = authService.register(REGISTER_INPUT);

    expect(() =>
      authService.changePassword(user.id, {
        currentPassword: 'wrong',
        newPassword: 'new-password-1'
      })
    ).toThrow(expect.objectContaining({ code: 'UNAUTHORIZED' }));
  });
});

describe('authService.requestPasswordReset', () => {
  it('sets a reset token and emails a link for a registered email', async () => {
    const { user } = authService.register(REGISTER_INPUT);

    await authService.requestPasswordReset(REGISTER_INPUT.email);

    expect(mailer.send).toHaveBeenCalledTimes(1);
    const updated = usersRepository.findById(user.id);
    expect(updated?.reset_token).toBeTruthy();
  });

  it('silently no-ops for an unregistered email, without sending mail', async () => {
    await expect(
      authService.requestPasswordReset('nobody@example.com')
    ).resolves.toBeUndefined();

    expect(mailer.send).not.toHaveBeenCalled();
  });
});

describe('authService.resetPassword', () => {
  it("updates the password and clears the token, so it can't be reused", async () => {
    authService.register(REGISTER_INPUT);
    await authService.requestPasswordReset(REGISTER_INPUT.email);
    const [[message]] = vi.mocked(mailer.send).mock.calls;
    const token = new URL(message.html.match(/href="([^"]+)"/)![1]).pathname
      .split('/')
      .pop()!;

    authService.resetPassword(token, 'new-password-1');

    expect(
      authService.login({
        email: REGISTER_INPUT.email,
        password: 'new-password-1'
      }).user.email
    ).toBe(REGISTER_INPUT.email);
    expect(() => authService.resetPassword(token, 'another-password')).toThrow(
      expect.objectContaining({ code: 'INVALID_RESET_TOKEN' })
    );
  });

  it('rejects an unknown token', () => {
    expect(() =>
      authService.resetPassword('does-not-exist', 'new-password-1')
    ).toThrow(expect.objectContaining({ code: 'INVALID_RESET_TOKEN' }));
  });

  it('rejects an expired token', () => {
    const { user } = authService.register(REGISTER_INPUT);
    usersRepository.setResetToken(
      user.id,
      'expired-token',
      new Date(Date.now() - 1000).toISOString()
    );

    expect(() =>
      authService.resetPassword('expired-token', 'new-password-1')
    ).toThrow(expect.objectContaining({ code: 'INVALID_RESET_TOKEN' }));
  });
});
