import { APP_KEY } from '@/config/keys.js'
import { post } from '../libs/http'

function getSubject (data) {
  return post('/api/jztk/query', {
    ...data,
    key: APP_KEY,
    testType: 'rand'
  })
}

export default {
  getSubject
}
