export default {
  atualizarModoEscuro() {
    window.$nuxt.$root.$vuetify.theme.dark = !window.$nuxt.$root.$vuetify.theme
      .dark
    localStorage.setItem(
      'theme',
      window.$nuxt.$root.$vuetify.theme.dark ? 'dark' : 'light',
    )
  },

  carregarModoEscuro() {
    setTimeout(() => {
      const theme = localStorage.getItem('theme')
      if (theme) {
        if (theme === 'dark') {
          window.$nuxt.$root.$vuetify.theme.dark = true
        } else {
          window.$nuxt.$root.$vuetify.theme.dark = false
        }
      } else if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        window.$nuxt.$root.$vuetify.theme.dark = true
        localStorage.setItem(
          'theme',
          window.$nuxt.$root.$vuetify.theme.dark ? 'dark' : 'light',
        )
      }
    }, 300)
  },
  atualizarTitulo({ commit }, title) {
    commit('STORE', { item: 'title', data: title })
  },
  atualizarMetaPagina({ commit }, meta) {
    commit('STORE', { item: 'meta', data: meta })
  },
  carregando({ commit }, value) {
    commit('STORE', { item: 'loading', data: value })
  },
  mensagemCarregando({ commit }, value) {
    commit('STORE', { item: 'loadingMessage', data: value })
  },
}
