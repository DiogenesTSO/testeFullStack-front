import axios from '@/api/i-axios'
export default {
  carregarPortais({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .get('controle/portal', { params: data })
        .then((response) => {
          if (data && data.page > 1) {
            commit('STORE_PUSH', { item: 'portal', data: response.data.data })
          } else {
            commit('STORE', { item: 'portal', data: response.data.data })
          }
          commit('STORE', { item: 'currentMeta', data: response.data.meta })
          resolve(response.data.data)
        })
        .catch(err => reject(err))
    })
  },

  carregarTipoDestaques({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .get('controle/destaque', { params: data })
        .then((response) => {
          commit('STORE', { item: 'padrao', data: response.data.data })
          resolve(response.data.data)
        })
        .catch(err => reject(err))
    })
  },

  cadastrarTipoDestaque({ commit }, dados) {
    return new Promise((resolve, reject) => {
      axios
        .post('controle/destaque', dados)
        .then((response) => {
          commit('STORE_PUSH', { item: 'destaque', data: response.data.data })
          
          resolve(response.data.data)
          location.reload()
        })
        .catch(err => reject(err))
    })
  },

  cadastrarPortal({ commit }, dados) {
    return new Promise((resolve, reject) => {
      axios
        .post('controle/portal', dados)
        .then((response) => {
          commit('STORE_PUSH', { item: 'portal', data: response.data.data })
          commit('ADD_META', { name: 'portal' })
          resolve(response.data.data)
        })
        .catch(err => reject(err))
    })
  },
  atualizarPortal({ commit }, dados) {
    return new Promise((resolve, reject) => {
      axios
        .patch(`controle/portal/${dados.id}`, dados)
        .then((response) => {
          commit('UPDATE', {
            item: 'portal',
            data: response.data.data,
          })
          resolve(response.data.data)
        })
        .catch(err => reject(err))
    })
  },

  atualizarTipoDestaque({ commit }, dados) {
    return new Promise((resolve, reject) => {
      axios
        .patch(`controle/destaque/${dados.id}`, dados)
        .then((response) => {
          commit('UPDATE', {
            item: 'destaque',
            data: response.data.data,
          })
          resolve(response.data.data)
          location.reload()
        })
        .catch(err => reject(err))
    })
  },

}
