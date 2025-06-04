'use client';
import type { SideMenuState }          from 'app/(cabinet)/_components_/Layout/SideMenu';
import { initialState }                from 'app/(cabinet)/_components_/Layout/SideMenu/context';
import { SIDE_MENU_STATE_COOKIE_NAME } from 'constants/global';

export const setCookie = (
  name: string,
  value: any,
  days?: number,
  domain?: string
): void => {
  try {
    let expires;

    if (days) {
      const date = new Date();

      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
    } else {
      expires = '';
    }

    const _name = encodeURIComponent(name);
    const _value = encodeURIComponent(value);
    const _domain = domain ? `domain=${domain}; ` : '';

    document.cookie = `${_name}=${_value}${expires}; ${_domain}path=/`;
  } catch (e) {
    // eslint-disable-next-line
    console.log(e);
  }
};

export const getCookie = (
  name: string,
  source?: string
): string | null  => {
  try {
    if (typeof window !== 'undefined') {
      const cookieCourse = source || document.cookie;
      const nameEQ = encodeURIComponent(name) + '=';
      const ca = cookieCourse.split(';');
  
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
  
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
  
        if (c.indexOf(nameEQ) === 0) {
          return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
      }
    }

    return null;
  } catch (e) {
    // eslint-disable-next-line
    console.log(e);
    
    return null;
  }
};

export const eraseCookie = (name: string, domain?: string): void => {
  setCookie(name, '', -1, domain);
};

// --------------------------------------------------------------------

export function getSideMenuStateFromCookie (): SideMenuState {
  const state = getCookie(SIDE_MENU_STATE_COOKIE_NAME);

  return state ? JSON.parse(state) : initialState;
}