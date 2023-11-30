import axios from '@/api/i-axios'
export default {
  carregarChaves({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .get('controle/chaves-api', { params: data })
        .then((response) => {
          if (data && data.page > 1) {
            commit('STORE_PUSH', { item: 'chaves', data: response.data.data })
          } else {
            commit('STORE', { item: 'chaves', data: response.data.data })
          }
          commit('STORE_META', { name: 'chaves', data: response.data.meta })
          resolve(response.data.data)
        })
        .catch(err => reject(err))
    })
  },
  cadastrarChave({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`controle/chaves-api`, data.data)
        .then((response) => {
          commit('STORE_PUSH', { item: 'chaves', data: response.data.data })
          commit('ADD_META', { name: 'chaves' })
          resolve(response.data.message)
        })
        .catch(err => reject(err))
    })
  },
  atualizarChave({ commit }, data) {
    console.log(data)
    return new Promise((resolve, reject) => {
      axios
        .patch(`controle/chaves-api/${data.id}`, data.data)
        .then((response) => {
          commit('UPDATE', { item: 'chaves', data: response.data.data })
          resolve(response.data.message)
        })
        .catch(err => reject(err))
    })
  },
}
