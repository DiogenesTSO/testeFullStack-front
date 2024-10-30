import axios from '@/api/i-axios'
export default {
  carregarEmpresas({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .get('/empresas', { params: data })
        .then((response) => {
          resolve(response.data.data)
        })
        .catch(err => reject(err))
    })
  },
}
