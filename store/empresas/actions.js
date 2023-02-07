import axios from '@/api/i-axios'
export default {
  carregarEmpresas({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .get('controle/empresas', { params: data })
        .then((response) => {
          if (data && data.page > 1) {
            commit('STORE_PUSH', { item: 'empresas', data: response.data.data })
          } else {
            commit('STORE', { item: 'empresas', data: response.data.data })
          }
          commit('STORE_META', { name: 'empresas', data: response.data.meta })
          resolve(response.data.data)
        })
        .catch(err => reject(err))
    })
  },
  atualizarStatusEmpresa({ commit }, dados) {
    return new Promise((resolve, reject) => {
      axios
        .patch(`controle/empresas/${dados.id}/status`, dados)
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
  cadastrarEmpresa({ commit }, dados) {
    return new Promise((resolve, reject) => {
      axios
        .post('controle/empresas', dados)
        .then((response) => {
          commit('STORE_PUSH', { item: 'empresas', data: response.data.data })
          commit('ADD_META', { name: 'empresas' })
          resolve(response.data.message)
        })
        .catch(err => reject(err))
    })
  },
  carregarEmpresa({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`controle/empresas/${id}`)
        .then((response) => {
          commit('STORE', {
            item: 'currentEmpresa',
            data: response.data.data,
          })
          resolve(response.data.data)
        })
        .catch(err => reject(err))
    })
  },

  carregarCaixa({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .get(`controle/empresas/${data.empresa_id}/caixas`, {
          params: data.data,
        })
        .then((response) => {
          resolve(response.data.data)
        })
        .catch(err => reject(err))
    })
  },
  cadastrarCaixa({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`controle/empresas/${data.id}/caixas`, data.data)
        .then((response) => {
          commit('STORE_PUSH', { item: 'caixas', data: response.data.data })
          commit('ADD_META', { name: 'caixas' })
          resolve(response.data.message)
        })
        .catch(err => reject(err))
    })
  },
  carregarBancos({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      axios
        .get(`autocomplete/bancos`, { params: data })
        .then((response) => {
          commit('STORE', { item: 'bancos', data: response.data.data })
          resolve(response.data.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },

  editarEmpresa({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .patch(`controle/empresas/${data.id}`, data.data)
        .then((response) => {
          resolve(response.data.data)
        })
        .catch(err => reject(err))
    })
  },

  editarCaixa({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .patch(
          `controle/empresas/${data.empresa_id}/caixas/${data.caixa_id}`,
          data.data,
        )
        .then((response) => {
          resolve(response.data.data)
        })
        .catch(err => reject(err))
    })
  },

  cadastrarPix({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`controle/empresas/${data.empresa_id}/pix`, data.data)
        .then((response) => {
          resolve(response.data.data)
        })
        .catch(err => reject(err))
    })
  },

  carregarChavesPix({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .get(`controle/empresas/${data.empresa_id}/pix`, data.data)
        .then((response) => {
          commit('STORE', { item: 'chaves', data: response.data.data })
          resolve(response.data.data)
        })
        .catch(err => reject(err))
    })
  },

  cadastrarArquivos({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`controle/empresas/${data.id}/contrato-imobia`, data.data)
        .then((response) => {
          resolve(response.data.data)
        })
        .catch(err => reject(err))
    })
  },

  removerArquivos({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`controle/empresas/${data.empresa_id}/contrato-imobia/${data.id}`)
        .then((response) => {
          resolve(response.data.data)
        })
        .catch(err => reject(err))
    })
  },
}
