import BaseAxios from 'axios'
import { BASE_URL } from '../../api/config'


export const axios = BaseAxios.create({ baseURL: BASE_URL })

axios.interceptors.response.use(
  (response) => {
    return response.data
  },
  async (error) => {
    return Promise.reject(error)
  },
)