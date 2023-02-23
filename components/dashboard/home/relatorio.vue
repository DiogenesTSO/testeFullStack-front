<template>
  <v-card
    :loading="loading ? 'primary' : ''"
    class="my-1"
    color="card"
  >
    <v-list-item class="pa-3" @click="gerarRelatorioDiario()">
      <v-list-item-avatar class="justify-center">
        <v-avatar class="align-self-center" color="blue">
          <v-icon class="white--text">
            mdi-file-document
          </v-icon>
        </v-avatar>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>
          <span class="text-h5 normal--text"> Gerar Relatório diário</span>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    showData: {
      type: Boolean,
      default: false,
    },
    data: {
      type: [Object, Array],
      default: () => { },
    },
  },
  methods: {
    gerarRelatorioDiario() {
      this.$store.dispatch('dashboard/cadastradasComercialEmpresasRelatorio').then((res) => {
        this.download(res.data.url)
      })
      this.$store.dispatch('dashboard/locacoesCadastradasEmpresasRelatorio').then((res) => {
        this.download(res.data.url)
      })
    },
    download(uri) {
      const link = document.createElement("a")
      link.href = uri
      link.click()
      window.URL.revokeObjectURL(link.href)
    }
    
  }
}
</script>
