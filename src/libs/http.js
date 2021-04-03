import axios from 'axios'
import QS from 'qs'

axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * get方法 对应get请求
 * @param {*} url 请求地址
 * @param {*} params 参数
 */
export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * post方法 对应post请求
 * @param {*} url 请求地址
 * @param {*} params 参数
 */
export function post (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(params)).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
