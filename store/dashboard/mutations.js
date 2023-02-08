export default {
  UPDATE(state, payload) {
    state[payload.item] = state[payload.item].map(item =>
      payload.data.id === item.id ? payload.data : item,
    )
  },

  STORE(state, payload) {
    state[payload.item] = payload.data
  },

  PUSH(state, payload) {
    state[payload.item].push(payload.data)
  },

  PUSH_FILIAL(state, payload) {
    state.configuracoesSistema.filiais.push(payload.data)
  },

  DELETE(state, payload) {
    state[payload.item] = state[payload.item].filter(
      item => item.id !== payload.id,
    )
  },
}
