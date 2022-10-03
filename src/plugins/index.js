import { Swipe, SwipeItem, Button, Popup, Notify  } from 'vant'
// 放入数组中
let plugins = [Swipe, SwipeItem, Button, Popup, Notify]
export default function getVant(app) {
  plugins.forEach(item => {
    return app.use(item)
  })
}
