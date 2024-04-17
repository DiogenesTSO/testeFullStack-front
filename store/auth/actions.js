import Cookies from 'js-cookie'
import axios from '@/api/i-axios'

export default {
  verificarLogin({ commit, state }) {
    const bearer = Cookies.get('bearer')
    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : ''
    const expiresAt = Cookies.get('expiresAt')
    // if (new Date(expiresAt) < new Date()) {
    //   localStorage.clear()
    //   router.push({ name: 'auth_login' })
    // }
    if (bearer) {
      commit('STORE_USERDATA', {
        accessToken: bearer,
        usuario: user,
        expiresAt,
      })
      axios.get('controle/user').then((response) => {
        commit('STORE_USERDATA', {
          accessToken: state.bearer,
          expiresAt: state.expiresAt,
          usuario: response.data.data,
        })
      })
    } else {
      this.app.router.push('/login')
    }
  },

  login({ commit, state }, { dados, nuxt }) {
    return new Promise((resolve, reject) => {
      axios
        .post('controle/login', { ...dados, ...{ mfa_token: Cookies.get('mfaToken') ? Cookies.get('mfaToken') : null } })
        .then((response) => {
          if (response.data.mfa === 'validar') {
            nuxt.$emit('modalValidarMfaMfa', dados)
            nuxt.$emit('modalValidarMfa', true)
          } else {
            // redirecionamento para a página que o usuário estava tentando acessar
            if (response.data.usuario.is_master) {
              this.$router.push(state.route.name ? state.route : '/')
            } else {
              this.$router.push(state.route.name ? state.route : '/')
            }

            commit('STORE_USERDATA', {
              accessToken: response.data.access_token,
              usuario: response.data.usuario,
              expiresAt: response.data.expires_at,
            })
            resolve(response.data)
          }
        })
        .catch(err => reject(err))
    })
  },

  logout({ commit, state }) {
    this.app.router.push({ name: 'login' })
    commit('REMOVE_USERDATA')
  },

  atualizarUsuarioEmpresa({ commit, state }, form) {
    return new Promise((resolve, reject) => {
      axios
        .patch('controle/user', form)
        .then((response) => {
          commit('STORE_USERDATA', {
            accessToken: state.bearer,
            expiresAt: state.expiresAt,
            usuario: response.data.data,
          })
          setTimeout(() => {
            location.reload()
          }, 600)
          resolve(response)
        })
        .catch(err => reject(err))
    })
  },
  verificarPermissao({ commit, state }, permissions) {
    return new Promise((resolve) => {
      const canAccess = permissions.reduce((acc, cur) => {
        acc = state.user.can(cur)
        return acc
      }, true)
      resolve(canAccess)
    })
  },

  verificarPermissaoAdministrador(_, authData) {
    return new Promise((resolve) => {
      axios
        .post('usuarios/check-admin-credentials', authData)
        .then(() => resolve(true))
        .catch(() => resolve(false))
    })
  },

  challengeMfa({ commit, state }, dados) {
    return new Promise((resolve, reject) => {
      axios
        .post(`controle/login/validar-codigo-mfa`, dados)
        .then((response) => {
          this.$router.push({
            name: state.route || 'index',
            params: { isMaster: true, loggedIn: true },
          })

          commit('STORE_USERDATA', {
            accessToken: response.data.access_token,
            mfaToken: response.data.mfaToken,
            usuario: response.data.usuario,
            expiresAt: response.data.expires_at,
          })
          resolve(response.data)
        })
        .catch(() => reject(false))
    })
  }
}
