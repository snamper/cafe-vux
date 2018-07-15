import service from '@/utils/request';

export const getCategoriedProducts = () => {
  return service({
    url: '/category/show/ui/getCategoriedProducts.do',
    method: 'get'
  });
};
