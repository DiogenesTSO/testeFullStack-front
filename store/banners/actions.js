import axios from '@/api/i-axios'
export default {
  carregarBanner({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .get('controle/dashboard/banner', { params: data })
        .then((response) => {
          resolve(response.data)
        })
        .catch(err => reject(err))
    })
  },

  cadastrarBanner({ commit }, dados) {
    return new Promise((resolve, reject) => {
      axios
        .post('controle/dashboard/banner', dados)
        .then((response) => {
          commit('STORE_PUSH', { item: 'usuarios', data: response.data.data })
          commit('ADD_META', { name: 'usuarios' })
          resolve(response.data.data)
        })
        .catch(err => reject(err))
    })
  },

  atualizarBanner({ commit }, dados) {
    return new Promise((resolve, reject) => {
      axios
        .patch(`controle/dashboard/banner/${dados.id}`, dados)
        .then((response) => {
          commit('UPDATE', {
            item: 'banner',
            data: response.data.data,
          })
          resolve(response.data.data)
        })
        .catch(err => reject(err))
    })
  },
  removerBanner({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`controle/dashboard/banner/${id}`)
        .then((response) => {
          commit('DELETE', {
            item: 'banner',
            data: { id },
          })
          resolve(response.data.data)
        })
        .catch(err => reject(err))
    })
  },
}
