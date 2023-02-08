import axios from '@/api/i-axios'

export default {
  carregarOperacoes({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .get('controle/dashboard/operacoes-mes', {
          params: {
            data
          }
        })
        .then((response) => {
          commit('STORE', {
            item: 'dashboardOperacoes',
            data: response.data,
          }
          )
          resolve(response.data.data)
        })
        .catch(err => reject(err))
    })
  },
  geramBoletos({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get('controle/dashboard/geram-boletos')
        .then((response) => {
          commit('STORE', {
            item: 'dashboardGeramBoletos',
            data: response.data,
          }
          )
          resolve(response.data.data)
        })
        .catch(err => reject(err))
    })
  },
}
