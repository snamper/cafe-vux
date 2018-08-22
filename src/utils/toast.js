import { Toast } from 'vant';
/**
 * type: loading/success/fail/html
 * position: top/middle/bottom
 * loadingType: circular/spinner
 */
export const toast = (message, type = 'text', duration = 3000, forbidClick = false, mask = false, position = 'middle', loadingType = 'circular') => {
  Toast({
    type: type,
    position: position,
    message: message,
    mask: mask,
    forbidClick: forbidClick,
    loadingType: loadingType,
    duration: duration
  });
};

export const loading = (message = '') => {
  Toast({
    type: 'loading',
    position: 'middle',
    message: message,
    mask: true,
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0
  });
};

export const clear = () => {
  Toast.clear();
};
