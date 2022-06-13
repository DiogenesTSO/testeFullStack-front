export default {
  STORE(state, payload) {
    state[payload.item] = payload.data
  },
}
