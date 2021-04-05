import {
  Button,
  Col,
  Row,
  Icon,
  Image as VanImage
} from 'vant'

const components = [
  Button,
  Col,
  Row,
  Icon,
  VanImage
]

export default function instalVantUI (app) {
  components.forEach((com) => {
    app.use(com)
  })
}
