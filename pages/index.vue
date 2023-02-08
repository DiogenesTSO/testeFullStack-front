<template>
  <v-row>
    <v-col cols="12" sm="6" md="3">
      <dashboard-home-operacoes 
        :loading="loadingCards.operacoes" 
        :data="dashboardOperacoes" 
      />
    </v-col>
    <v-col cols="12" sm="6" md="3">
      <dashboard-home-boletos :loading="loadingCards.operacoes" :data="dashboardGeramBoletos" />
    </v-col>
    <v-col cols="12" sm="6" md="3">
      <dashboard-home-operacoes :loading="loadingCards.operacoes" :data="dashboardOperacoes" />
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
        boletos: true
      },

      dataOperacoes: {
        mes_referencia: moment().format('YYYY/MM/01'),
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
    dashboardGeramBoletos() {
      return this.$store.getters['dashboard/geramBoletos']
    },

  },
  mounted() {
    this.$store.dispatch('dashboard/carregarOperacoes', this.dataOperacoes).finally(() => {
      this.loadingCards.operacoes = false
    })
    this.$store.dispatch('dashboard/geramBoletos').finally(() => {
      this.loadingCards.boletos = false
    })
  },
}
</script>

<style></style>
