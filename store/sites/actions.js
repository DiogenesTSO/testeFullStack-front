import axios from '@/api/i-axios'
export default {
  carregarSites({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .get(`controle/sites`, { params: data })
        .then((response) => {
          if (data.page > 1) {
            commit('STORE_PUSH', { item: 'sites', data: response.data.data })
          } else {
            commit('STORE', { item: 'sites', data: response.data.data })
          }
          commit('STORE_META', { name: 'sites', data: response.data.meta })
          resolve(response.data.data)
        })
        .catch(err => reject(err))
    })
  },
  cadastrarChave({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`controle/empresas/${data.empresa_id}/site`, data.data)
        .then((response) => {
          commit('STORE_PUSH', { item: 'sites', data: response.data.data })
          commit('ADD_META', { name: 'sites' })
          resolve(response.data.message)
        })
        .catch(err => reject(err))
    })
  },
  atualizarChave({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .patch(
          `controle/empresas/${data.empresa_id}/site/${data.id}`,
          data.data,
        )
        .then((response) => {
          commit('UPDATE', { item: 'sites', data: response.data.data })
          resolve(response.data.message)
        })
        .catch(err => reject(err))
    })
  },
}
