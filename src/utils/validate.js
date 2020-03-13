export function validateUsername(str){
  let reg = /^[a-zA-Z\u4E00-\u9FA5][a-zA-Z0-9_\u4E00-\u9FA5]*$/
  return reg.test(str)
}

export function validatePassword(str){
  return str.length > 6
}
