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
