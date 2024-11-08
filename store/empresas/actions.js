import axios from '@/api/i-axios'
export default {
  carregarEmpresas({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .get('empresas', { params: data })
        .then((response) => {
          resolve(response.data.data)
        })
        .catch(err => reject(err))
    })
  },
  cadastrarEmpresa({ commit }, dados) {
    return new Promise((resolve, reject) => {
      axios
        .post('http://127.0.0.1:8000/api/empresa/cadastrar', dados)
        .then((response) => {
          resolve(response.data.message)
        })
        .catch(err => reject(err))
    })
  },
}
