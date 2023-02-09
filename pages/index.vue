<template>
  <v-row>
    <v-col cols="12" md="12">
      <dashboard-home-anual
        :loading="loadingCards.operacoes"
        :show-data="usuarioPermitidoFinanceiro"
        :data="dashboardOperacoes"
      />
    </v-col>
    <v-col cols="12" sm="6" md="3">
      <dashboard-home-boletos 
        :loading="loadingCards.boletos" 
        :data="dashboardGeramBoletos" 
      />
    </v-col>
    <v-col cols="12" sm="6" md="3">
      <dashboard-home-status 
        :loading="loadingCards.status" 
        :data="dashboardStatus" 
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
        boletos: true,
        status: true
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
    dashboardStatus() {
      return this.$store.getters['dashboard/statusEmpresas']
    },

  },
  mounted() {
    this.$store.dispatch('dashboard/carregarOperacoes', this.dataOperacoes).finally(() => {
      this.loadingCards.operacoes = false
    })
    this.$store.dispatch('dashboard/geramBoletos').finally(() => {
      this.loadingCards.boletos = false
    })
    this.$store.dispatch('dashboard/statusEmpresas').finally(() => {
      this.loadingCards.status = false
    })
  },
}
</script>

<style></style>
