import axios from '@/api/i-axios'

export default {
  carregarOperacoes({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .get('controle/dashboard/operacoes-mes', {
          params: {
            
            data_criada: {
              min: '2022/04/29',
              max: '2023/02/01'
            }
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
}
