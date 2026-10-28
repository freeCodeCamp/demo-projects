import { beforeEach, describe, expect, it } from 'vitest';
import { usersService } from './users.service.js';
import { createUser } from '../test-utils/factories.js';
import { resetTestDatabase } from '../test-utils/db.js';

beforeEach(() => {
  resetTestDatabase();
});

describe('usersService', () => {
  it('getProfile returns a public shape with no password hash', () => {
    const user = createUser();

    const profile = usersService.getProfile(user.id);

    expect(profile).toMatchObject({ id: user.id, email: user.email });
    expect(profile).not.toHaveProperty('password_hash');
  });

  it('getProfile returns undefined for a missing user', () => {
    expect(usersService.getProfile(999999)).toBeUndefined();
  });

  it('updateProfile replaces name/avatarUrl/bio wholesale', () => {
    const user = createUser();

    const updated = usersService.updateProfile(user.id, {
      name: 'New Name',
      bio: 'Hello'
    });

    expect(updated).toMatchObject({
      name: 'New Name',
      bio: 'Hello',
      avatar_url: null
    });
  });
});
