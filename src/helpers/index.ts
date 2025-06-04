import { PROJECT_NAME } from 'constants/global';
import compact          from 'lodash/compact';
import isEmpty          from 'lodash/isEmpty';

export const getTitle = (title: string): string => {
  if (title) {
    return `${PROJECT_NAME} | ${title}`;
  }

  return PROJECT_NAME;
};

// --------------------------------------------------------------------
// Convert number, for example 1000000 to 1 000 000
export const formatNumber = (num: number): string | number | null => {
  if (!num) return num;

  const _num = num.toString().split('.');

  if (_num[0].length > 3) {
    const formattedNum = _num[0].replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

    if (_num[1]) {
      return `${formattedNum}.${_num[1]}`;
    }

    return `${formattedNum}`;
  }

  return `${num}`;
};

// --------------------------------------------------------------------

export const isLocalStorageAvailable = (): boolean => {
  try {
    localStorage.setItem('localStorage', '1');
    localStorage.removeItem('localStorage');

    return true;
  } catch (e) {
    return false;
  }
};

// --------------------------------------------------------------------