export default {
  STORE(state, payload) {
    state[payload.item] = payload.data
  },
  STORE_PUSH(state, payload) {
    if (payload.data.length) {
      const idsExistentes = state[payload.item].map(item => item.id)
      const dados = payload.data.filter(
        item => !idsExistentes.includes(item.id),
      )

      state[payload.item].push(...dados)
    } else {
      state[payload.item].push(payload.data)
    }
  },
  UPDATE(state, payload) {
    state[payload.item] = state[payload.item].map(item =>
      payload.data.id === item.id ? payload.data : item,
    )
  },
  STORE_META(state, payload) {
    state.currentMeta = { ...payload.data, ...{ name: payload.name } }
  },
  ADD_META(state, payload) {
    if (state.currentMeta.name === payload.name) {
      const meta = state.currentMeta
      meta.total += 1
      meta.to += 1
      state.currentMeta = meta
    }
  },
  SUBTRACT_META(state, payload) {
    if (state.currentMeta.name === payload.name) {
      const meta = state.currentMeta
      meta.total -= 1
      meta.to -= 1
      state.currentMeta = meta
    }
  },
}

