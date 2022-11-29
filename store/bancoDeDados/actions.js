import axios from '@/api/i-axios'

export default {
  gerarXmlClientes({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/controle/exportacao/${id}`, {
          params: {
            modulo: 'clientes'
          }
        })
        .then((response) => {
          resolve(response.data)
        })
        .catch(err => reject(err))
    })
  },

  gerarXmlImoveis({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/controle/exportacao/${id}`, {
          params: {
            modulo: 'imoveis'
          }
        })
        .then((response) => {
          resolve(response.data)
        })
        .catch(err => reject(err))
    })
  }
}
