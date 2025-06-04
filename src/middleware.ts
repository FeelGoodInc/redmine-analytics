import type { NextRequest }  from 'next/server';
import { NextResponse }      from 'next/server';
import { cookies }           from 'next/headers';
import {
  TOKEN_COOKIE_NAME,
  AUTH_PAGE_URL,
  HOME_PAGE_URL,
  BACKEND_PROXY_URL_PREFIX,
  RESET_CREDENTIALS_URL,
}                            from './constants/global';
import { log }               from './utils/log';

// -------------------------------------------------------------

const redirectToAuth = (request: NextRequest): NextResponse => {
  log('redirect to auth');

  const response = NextResponse.redirect(new URL(AUTH_PAGE_URL, request.url));

  response.cookies.delete(TOKEN_COOKIE_NAME);
  
  return response;
};

// -------------------------------------------------------------

const redirectToHomePage = (request: NextRequest): NextResponse => {
  log('redirect to companies');

  return NextResponse.redirect(new URL(HOME_PAGE_URL, request.url));
};

// -------------------------------------------------------------

// const isTokenExpired = (token: string): boolean => {
//   const decodedToken: IDecodedUser = jwtDecode(token);
//   const expirationDate = new Date(decodedToken.exp * 1000);

//   return isAfter(new Date, expirationDate);
// };

// -------------------------------------------------------------

const mutateRequestWithAuthHeader = (
  request: NextRequest,
  token: string | undefined
): NextResponse => {
  log(request.url, 'request to backend');
  const requestHeaders = new Headers(request.headers);
  
  requestHeaders.set('X-Redmine-API-Key', token);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
};

// -------------------------------------------------------------

// eslint-disable-next-line
export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const { url } = request;
  const token = cookieStore.get(TOKEN_COOKIE_NAME)?.value;
  const isBackendRequest = request.url.includes(BACKEND_PROXY_URL_PREFIX);
  const isAuthPage = url.includes(AUTH_PAGE_URL) && !isBackendRequest;
  const isRootPage = request.nextUrl.pathname === '/';
  const isResetCredentialsPage = url.includes(RESET_CREDENTIALS_URL);

  log(url, 'middleware handled url');

  // simple check for token
  if (!token && (!isAuthPage || isRootPage)) {
    return redirectToAuth(request);
  }

  if (token) {
    //if (isTokenExpired(token)) return redirectToAuth(request);

    if (isResetCredentialsPage) return redirectToAuth(request);

    if (isAuthPage || isRootPage) return redirectToHomePage(request);
  }

  if (isBackendRequest) return mutateRequestWithAuthHeader(request, token);
}

export const config = {
  matcher: [
    {
      source: '/((?!_next/static|_next/image|favico|sitemap|robots|logo).*)',
    },
  ],
};