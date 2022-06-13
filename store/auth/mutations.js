import Cookies from 'js-cookie'
import { User } from '@/models/User'
import axios from '@/api/i-axios'

export default {
  STORE(state, payload) {
    state[payload.item] = payload.data
  },

  STORE_USERDATA(state, payload) {
    state.bearer = payload.accessToken
    state.expiresAt = payload.expiresAt
    state.user = new User(payload.usuario)

    if (process.env.domain) {
      Cookies.set('bearer', state.bearer, {
        domain: process.env.domain,
        expires: new Date(state.expiresAt),
      })
      Cookies.set('expiresAt', state.expiresAt, {
        domain: process.env.domain,
        expires: new Date(state.expiresAt),
      })
      Cookies.set('user', JSON.stringify(state.user), {
        domain: process.env.domain,
        expires: new Date(state.expiresAt),
      })
    } else {
      Cookies.set('bearer', state.bearer, {
        expires: new Date(payload.expiresAt),
      })
      Cookies.set('expiresAt', state.expiresAt, {
        expires: new Date(state.expiresAt),
      })
      Cookies.set('user', JSON.stringify(state.user), {
        expires: new Date(state.expiresAt),
      })
    }
    /* tags removidas  sameSite: 'None',
       secure: true, */
    state.isAuthenticated = true

    axios.defaults.headers.Authorization = 'Bearer ' + state.bearer
  },
  REMOVE_USERDATA(state, payload) {
    if (process.env.domain) {
      Cookies.remove('bearer', {
        domain: process.env.domain,
      })
      Cookies.remove('expiresAt', {
        domain: process.env.domain,
      })
      Cookies.remove('user', {
        domain: process.env.domain,
      })
    } else {
      Cookies.remove('bearer')
      Cookies.remove('expiresAt')
      Cookies.remove('user')
    }

    state.user = { empresa: '' }
    state.bearer = ''
    state.expiresAt = ''
    state.isAuthenticated = false
  },
}
