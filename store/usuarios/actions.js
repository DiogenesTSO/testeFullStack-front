import axios from '@/api/i-axios'
export default {
  carregarUsuarios({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .get('controle/usuarios', { params: data })
        .then((response) => {
          if (data.page > 1) {
            commit('STORE_PUSH', { item: 'usuarios', data: response.data.data })
          } else {
            commit('STORE', { item: 'usuarios', data: response.data.data })
          }
          commit('STORE', { item: 'currentMeta', data: response.data.meta })
          resolve(response.data.data)
        })
        .catch(err => reject(err))
    })
  },
  carregarUsuariosPermissoes({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get('permissoes')
        .then((response) => {
          commit('STORE', { item: 'permissoes', data: response.data })
          resolve(response.data)
        })
        .catch(err => reject(err))
    })
  },
  carregarUsuariosTipos({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get('permissoes/tipos-usuarios')
        .then((response) => {
          commit('STORE', { item: 'tiposUsuarios', data: response.data })
          resolve(response.data)
        })
        .catch(err => reject(err))
    })
  },

  cadastrarUsuario({ commit }, dados) {
    return new Promise((resolve, reject) => {
      axios
        .post('controle/usuarios', dados)
        .then((response) => {
          commit('STORE_PUSH', { item: 'usuarios', data: response.data.data })
          commit('ADD_META', { name: 'usuarios' })
          resolve(response.data.data)
        })
        .catch(err => reject(err))
    })
  },
  cadastrarUsuariosTipo({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post('funcoes/criar-funcao', data)
        .then((response) => {
          commit('STORE_PUSH', { item: 'tiposUsuarios', data: response.data })
          resolve(response.data)
        })
        .catch(err => reject(err))
    })
  },
  atualizarUsuario({ commit }, dados) {
    return new Promise((resolve, reject) => {
      axios
        .patch(`controle/usuarios/${dados.id}`, dados)
        .then((response) => {
          commit('UPDATE', {
            item: 'usuarios',
            data: response.data.data,
          })
          resolve(response.data.data)
        })
        .catch(err => reject(err))
    })
  },
  atualizarUsuariosTipo({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post('funcoes/' + data.role_id + '/atualizar-funcao', data)
        .then((response) => {
          commit('UPDATE', { item: 'tiposUsuarios', data: response.data })

          resolve(response.data)
        })
        .catch(err => reject(err))
    })
  },
}
