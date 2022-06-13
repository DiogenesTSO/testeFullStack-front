export default function ({ route, store, redirect }) {
  if (!store.state.auth.isAuthenticated && !route.meta?.[0]?.public) {
    store.dispatch('auth/verificarLogin')
    if (!store.state.auth.isAuthenticated) {
      store.commit('auth/STORE', { item: 'route', data: route.name })
      return redirect('/login')
    }
  }
  if (route.meta?.[0]) {
    store
      .dispatch('auth/verificarPermissao', route.meta?.[0].permissions || [])
      .then((canAccess) => {
        if (!canAccess && route.name !== 'index') {
          redirect('/')
        }
      })

    store.dispatch('layout/atualizarMetaPagina', route.meta)
    store.dispatch('layout/atualizarTitulo', route.meta?.[0].title)
  }
}
