import Tools from './tools';
// 地址显示
export const convertAddress = addressinfo => {
  /*eslint-disable*/
  // debugger
  if (Tools.isNotEmpty(addressinfo)) {
    const area = addressinfo.province + addressinfo.city + addressinfo.county;
    const detail = Tools.isNotEmpty(addressinfo.address) ? addressinfo.address : addressinfo.address_detail;
    return {
      id: addressinfo.id,
      name: addressinfo.name,
      tel: Tools.isNotEmpty(addressinfo.mobile) ? addressinfo.mobile : addressinfo.tel,
      address: area + detail
    };
  }
  return null;
}
