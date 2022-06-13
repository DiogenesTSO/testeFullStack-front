<template>
  <v-app class="layout-default" dark>
    <imobia-header />
    <imobia-notify />
    <imobia-confirm />

    <imobia-sidebar />

    <v-main :style="$vuetify.breakpoint.xsOnly ? '' : 'padding-left: 68px;'">
      <div class="app-content-container mx-auto normal--text">
        <Nuxt />
      </div>
    </v-main>

    <imobia-page-load />
  </v-app>
</template>

<script>
export default {
  name: 'Default',
  data() {
    return {
      loading: false,
    }
  },
  computed: {

    cadastro() {
      return this.$store.state.layout.meta?.[0]?.cadastro
    },

    user() {
      return this.$store.state.auth.user
    },
  },

  mounted() {
    const route = this.$route
    window.onerror = function (msg, source, linha, coluna, error) {
      let errorLog = localStorage.getItem('errorLog') || '[]'
      errorLog = JSON.parse(errorLog)
      errorLog.push({ msg, source, linha, coluna, error, route })
      if (errorLog.length > 40) {
        errorLog.shift()
      }
      localStorage.setItem('errorLog', JSON.stringify(errorLog))
      return true
    }

    this.$store.dispatch('layout/carregarModoEscuro')
    // MoviDesk inject


    try {
      // Chamadas de api padrão
    } catch (err) {
      this.$nuxt.$emit('notify', {
        message:
          'Não foi possível carregar o sistema. Por favor recarregue a página',
        type: 'error',
      })
    } finally {
      this.loading = false
    }
  },
}
</script>
<style lang="scss">
.app-content-container {
  padding: 1.5rem;
  max-width: 1440px;
  margin-bottom: 5rem;
}

.md-chat-widget-btn-wrapper.md-fade-when-visible.md-fade-to-visible.md-chat-widget-btn-open {
  opacity: 0 !important;
}
</style>
