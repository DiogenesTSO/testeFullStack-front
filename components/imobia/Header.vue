<template>
  <v-app-bar
    extension-height="57"
    :style="
      $vuetify.breakpoint.xsOnly
        ? ''
        : 'margin-left: 88px !important; margin-right: 1.5rem !important; '
    "
    class="app-bar mx-auto"
    fixed
    rounded
    app
    elevate-on-scroll
  >
    <v-app-bar-nav-icon class="d-md-none" @click="openDrawer" />
    <div class="d-block d-sm-none flex-grow-1 h-100">
      <v-row no-gutters class="h-100" align="center">
        <v-col cols="6">
          <svgs-marca class="ml-2" />
        </v-col>
      </v-row>
    </div>
    <h2 class="d-none d-sm-block font-visby">
      {{ titulo }}
    </h2>
    <v-spacer class="d-none d-sm-block" />
    <!-- <v-btn
      v-if="configuracoes.tem_asaas_key"
      light
      rounded
      class="d-none d-md-flex"
      :color="asaasError ? 'error' : 'success lighten-1'"
    >
      <v-tooltip color="green" bottom>
        <template #activator="{ on, attrs }">
          <div
            v-if="!asaasError"
            v-bind="attrs"
            class="black--text justify-space-between align-center"
            v-on="on"
          >
            <a
              :href="app3Url + 'extrato-caixa-digital'"
              style="text-decoration: none; color: black;"
            >
              <v-icon small>
                mdi-wallet
              </v-icon>
              <span v-if="showMoney && isAllowed" class="mx-2">
                R$ {{ $format.money(saldo) }}
              </span>
              <v-skeleton-loader
                v-else
                class="d-inline-flex ml-1 mt-2 skeleton-margin-0"
                boilerplate
                type="text"
                min-width="100"
              />
            </a>
            <v-btn small icon @click.stop="changeBalanceView(!showMoney)">
              <v-icon v-if="showMoney" small>
                mdi-eye-off
              </v-icon>
              <v-icon v-else small>
                mdi-eye
              </v-icon>
            </v-btn>
          </div>
          <div v-else class="d-flex justify-space-between align-center">
            <v-icon>
              mdi-alert
            </v-icon>

            <span class="mx-2">Indisponível</span>
          </div>
        </template>
        <span>Saldo da conta digital (clique para abrir)</span>
      </v-tooltip>
    </v-btn> -->

    <notificacoes-menu class="mx-3" />
    <usuarios-menu />

    <template v-if="tabs.length" #extension>
      <div class="d-flex flex-column w-100">
        <v-divider />
        <v-tabs
          v-model="active"
          class="my-1"
          show-arrows
          centered
          center-active
          background-color="transparent"
        >
          <v-tab
            v-for="(item, i) in tabs"
            :key="'tab-' + i"
            @click="scrollTo(item)"
          >
            <v-icon class="mr-2">
              {{ item.icon }}
            </v-icon>
            <span class="font-visby font-weight-black">
              {{ item.text }}
            </span>
          </v-tab>
        </v-tabs>
      </div>
    </template>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      showMoney: true,
      tabs: [],
      active: null,
    }
  },
  head() {
    return {
      title: this.titulo,
    }
  },
  computed: {
    titulo() {
      return this.$store.state.layout.title
    },
    saldo() {
      return this.$store.state.financeiro.saldoAsaas
    },
    app3Url() {
      return process.env.app3Url
    },
  },
  mounted() {
    this.$nuxt.$on('changeTabs', (data, active = 0, patch) => {
      if (!patch) {
        this.tabs = data
      }
      this.active = active
    })
    this.loading = true
    if (localStorage.getItem('balanceView') !== null) {
      this.showMoney = JSON.parse(localStorage.getItem('balanceView'))
    }
  },

  methods: {
    scrollTo(item) {
      this.$vuetify.goTo('#' + item.key, { offset: 40 })
    },
    openDrawer() {
      this.$nuxt.$emit('openSideBar')
    },
    changeBalanceView(state) {
      this.showMoney = state
      localStorage.setItem('balanceView', state)
    },
  },
}
</script>
<style lang="scss">
/* Seta a estilização do componente de header */
@media screen and (max-width: 1523px) {
  .v-application .v-app-bar.app-bar {
    margin-left: 1.5rem !important;
    margin-right: 1.5rem !important;
  }
}

.app-bar {
  background-color: transparent !important;
}
.app-bar > .v-toolbar__content {
  padding: 0;
}
.skeleton-margin-0 .v-skeleton-loader__text {
  margin-bottom: 0 !important;
}
.v-application .v-app-bar.app-bar {
  will-change: padding, background-color;
  transition: padding 0.2s ease, background-color 0.18s ease, left 0.3s ease;
}

.v-app-bar--is-scrolled {
  backdrop-filter: blur(8px);
  padding-left: 20px !important;
  padding-right: 20px !important;
}
.v-app-bar--is-scrolled {
  background-color: var(--v-background-base) !important;
}
</style>
