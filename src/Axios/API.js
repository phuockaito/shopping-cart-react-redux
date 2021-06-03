import axios from 'axios';
import * as URL from './URL';

export default function API(endpoint, method, body, token) {
  return axios({
    method: method,
    url: `${URL.API_PHUOC_SHOP}/${endpoint}`,
    data: body,
    headers: { "Authorization": `Bearer ${token}` }
  })
}