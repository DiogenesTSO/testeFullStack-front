import axios from '@/api/i-axios'

export default {
  carregarOpcoes({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .get('autocomplete/' + data.module, {
          params: { ...{ q: data.filter ? data.filter : '' }, ...data.extra },
        })
        .then((response) => {
          commit('STORE', { item: data.module, data: response.data.data })
          resolve(response.data.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  carregarCidades({ commit }, query) {
    return new Promise((resolve, reject) => {
      axios
        .get('autocomplete/cidades', { params: query })
        .then((res) => {
          resolve(query.q !== '' && query.uf !== '' ? res.data.data[0] : null)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  carregarBancos({ commit, state }) {
    if (state.bancos.length) {
      return
    }
    return new Promise((resolve, reject) => {
      axios
        .get(`autocomplete/bancos`)
        .then((response) => {
          commit('STORE', { item: 'bancos', data: response.data.data })
          resolve(response.data.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
}
