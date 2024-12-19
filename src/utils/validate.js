/**
 * Created by PanJiaChen on 16/11/18.
 */
/*
  1.验证手机号 -- validPhone
  2.验证邮箱 -- validEmail
  3.验证身份证号 -- validCard
  4.验证车牌号 -- validCarNumber
  5.验证IP地址 -- validIp
  6.验证用户名 --  validName
  7.验证数字值 --  validNumber
  8.验证整数 --  validInt
  9.整数（保留两位小数）-- validInt2s
*/
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
// 手机号
export const validPhone = (rule, value, callback) => {
  console.log('rule: ', rule)
  const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
  if (!value) {
    callback()
  }
  if (!reg.test(value)) {
    callback(new Error('手机号码格式不正确，请重新输入'))
  } else {
    callback()
  }
}
// 邮箱
export const validEmail = (rule, value, callback) => {
  console.log('rule: ', rule)
  const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
  if (!value) {
    callback()
  }
  if (!reg.test(value)) {
    callback(new Error('邮箱格式不正确，请重新输入'))
  } else {
    callback()
  }
}
// 身份证号
export const validCard = (rule, value, callback) => {
  console.log('rule: ', rule)
  const reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  if (!value) {
    callback()
  }
  if (!reg.test(value)) {
    callback(new Error('身份证格式不正确，请重新输入'))
  } else {
    callback()
  }
}
// 车牌号
export const validCarNumber = (rule, value, callback) => {
  console.log('rule: ', rule)
  const reg = /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/
  if (!reg.test(value)) {
    callback(new Error('车牌号码格式不正确，请重新输入'))
  }
  callback()
}
// IP地址
export const validIp = (rule, value, callback) => {
  console.log('rule: ', rule)
  const reg = /^(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/
  if (value && !reg.test(value)) {
    callback(new Error('IP地址输入不合法'))
  }
  callback()
}
// 用户名
export const validName = (rule, value, callback) => {
  console.log('rule: ', rule)
  if (value) {
    const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+$/
    if (!reg.test(value)) {
      callback(new Error('仅支持中文、英文和数字'))
    }
  }
  callback()
}
// 密码
export const validPassword = (rule, value, callback) => {
  const reg = /^[a-zA-Z0-9]{6,20}$/

  if (!reg.test(value)) {
    callback(new Error('仅支持中文、英文和数字,6-20位'))
  }
  callback()
}
// 数字值
export const validNumber = (rule, value, callback) => {
  console.log('rule: ', rule)
  const reg = /^-?(([1-9][0-9]*(\.[0-9]{1,2})$)|([0-9]+$))/
  if (!reg.test(value)) {
    callback(new Error('请输入数字值'))
  }
  callback()
}
// 整数
export const validInt = (rule, value, callback) => {
  console.log('rule: ', rule)
  const reg = /^[0-9]\d*$/
  if (value && !reg.test(value)) {
    callback(new Error('请输入非负整数'))
  }
  callback()
}
// 整数（保留两位小数）
export const validInt2s = (rule, value, callback) => {
  console.log('rule: ', rule)
  const reg = /^-?(([0-9]*(\.[0-9]{1,2})$)|([0-9]+$))/
  if (value && !reg.test(value) || value < 0) {
    callback(new Error('请输入非负数(保留两位小数)'))
  }
  callback()
}

// /**
//  * @param {string} str
//  * @returns {Boolean}
//  */
// export function validUsername(str) {
//   const valid_map = ['admin', 'editor']
//   return valid_map.indexOf(str.trim()) >= 0
// }
