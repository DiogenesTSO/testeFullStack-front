<template>
  <v-row>
    <v-col cols="12" sm="6" md="3">
      <dashboard-home-operacoes 
        :loading="loadingCards.operacoes" 
        :data="dashboardOperacoes" 
      />
    </v-col>
  </v-row>
</template>

<script>
import moment from 'moment'
export default {
  meta: {
    title: 'Dashboard',
  },

  data() {
    return {
      mesReferencia: moment().format('MMM'),
      loadingCards: {
        operacoes: true,
      },
      dataOperacoes: {
        data_criada: {
          min: '',
          max: ''
        }
      }
    }
  },

  computed: {
    usuarioPermitidoFinanceiro() {
      return (
        this.$help.checkPermission(
          {
            permissions: [
              'ver financeiro',
              'editar financeiro',
              'remover financeiro',
            ],
          },
          this.user,
        ) || this.user.is('administrador')
      )
    },
    user() {
      return this.$store.state.auth.user
    },
    dashboardOperacoes() {
      return this.$store.getters['dashboard/operacoes']
    },

  },
  mounted() {
    this.$store.dispatch('dashboard/carregarOperacoes', this.dataOperacoes).finally(() => {
      this.loadingCards.operacoes = false
    })
  },
}
</script>

<style></style>
