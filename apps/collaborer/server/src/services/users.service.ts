import { toPublicUser } from '../models/user.model.js';
import { usersRepository } from '../repositories/users.repository.js';

export const usersService = {
  getProfile(userId: number) {
    const user = usersRepository.findById(userId);
    return user ? toPublicUser(user) : undefined;
  },

  updateProfile(
    userId: number,
    input: { name: string; avatarUrl?: string | null; bio?: string | null }
  ) {
    const user = usersRepository.updateProfile(userId, {
      name: input.name,
      avatarUrl: input.avatarUrl ?? null,
      bio: input.bio ?? null
    });

    return toPublicUser(user);
  }
};
