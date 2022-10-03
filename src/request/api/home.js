import service from '..'

// 获取首页轮播图的数据
export function getBanner() {
  return service({
    method: 'GET',
    url: '/banner?type=2'
  })
}
//获取发现好歌单
export function getMusicList() {
  return service({
    method: 'GET',
    url: '/personalized?limit=10'
  })
}
// 实现搜索
export function getSearchMusic(data) {
  return service({
    method: 'GET',
    url: `/search?keywords=${data}`
  })
}
// 发送短信验证码
export function sendCode(phone) {
  return service({
    method: 'GET',
    url: `/captcha/sent?phone=${phone}`
  })
}

// 验证短信验证码
export function byCode(phone, captcha) {
  return service({
    method: 'POST',
    url: `/captcha/verify?phone=${phone}&captcha=${captcha}`
  })
}

// 获取用户详情
export function getLoginUser() {
  return service({
    method: 'GET',
    url: '/user/detail?uid=5058022655'
  })
}
