import { HTTP_METHODS, fetcher } from 'api/lib/fetcher';

// ----------------------------------------------------------------------

export async function get() {
  const issues = await fetcher({ method: HTTP_METHODS.GET, url: 'issues.json' });

  console.log(issues);
};

// ----------------------------------------------------------------------

const issuesAPI = {
  get,
};

// ----------------------------------------------------------------------

export { issuesAPI };
