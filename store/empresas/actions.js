import axios from '@/api/i-axios'
export default {
  carregarEmpresas({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .get('controle/empresas', { params: data })
        .then((response) => {
          if (data.page > 1) {
            commit('STORE_PUSH', { item: 'empresas', data: response.data.data })
          } else {
            commit('STORE', { item: 'empresas', data: response.data.data })
          }
          resolve(response.data.data)
        })
        .catch(err => reject(err))
    })
  },
  atualizarStatusEmpresa({ commit }, dados) {
    return new Promise((resolve, reject) => {
      axios
        .patch(`controle/empresas/${dados.id}`, dados)
        .then((response) => {
          commit('UPDATE', {
            item: 'empresas',
            data: response.data.data,
          })
          resolve(response.data.data)
        })
        .catch(err => reject(err))
    })
  },
}
