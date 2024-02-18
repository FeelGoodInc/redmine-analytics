import type { User }             from 'api/entities/user';
import { HTTP_METHODS, fetcher } from 'api/lib/fetcher';

// ----------------------------------------------------------------------

export async function getUsers() {
  const users = await fetcher({ method: HTTP_METHODS.GET, url: 'users.json' });

  console.log(users);
};

// ----------------------------------------------------------------------

const usersAPI = {
  getUsers,
};

// ----------------------------------------------------------------------

export { usersAPI };
