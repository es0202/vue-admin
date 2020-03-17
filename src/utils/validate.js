export function validateUsername(str){
  let reg = /^\d*$/
  return reg.test(str)
}

export function validatePassword(str){
  return str.length > 6
}
