<template>
  <div cols="6" class="ml-auto mr-auto">
    <v-card cols="6" color="card">
      <v-row cols="6" class="d-flex justify-center">
        <v-col cols="4">
          <span>Primeiro digite o código da empresa:</span>
          <!-- <imobia-auto-complete
          v-model="empresa"
          return-object
          :items="empresas"
          :xmlportal="true"
          class="mt-3"
          required
          label="Empresa"
        /> -->
          <imobia-input 
            v-model="empresa"
            class="mt-3"
            required
            label="Código da Empresa"
          />
        </v-col>
      </v-row>
      <v-row cols="4" class="d-flex justify-center">
        <v-col cols="4">
          <span>Agora, selecione o portal desejado:</span>
          <imobia-auto-complete
            v-model="portal"
            return-object
            :items="portais"
            class="mt-3"
            required
            label="Portal"
          /> 
        </v-col>
      </v-row>
      <v-row cols="4" class="d-flex justify-center">
        <v-col cols="4">
          <span>E, por ultimo, selecione o padrão de XML desejado:</span>
          <imobia-auto-complete
            v-model="padrao_xml"
            return-object
            :items="padroes_xml"
            class="mt-3"
            required
            label="Padrão do XML"
          />
        </v-col>
      </v-row>
      <v-row class="d-flex justify-center">
        <v-col cols="4" class="d-flex justify-end">
          <v-btn 
            :loading="loading" 
            color="success" 
            @click="gerarXML()"
          >
            <v-icon left>
              mdi-check
            </v-icon>
            Salvar
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'XmlPortais',
  meta: {
    title: 'Gerar XML para portais'
  },
  data() {
    return {
      empresas: [],
      portais: [],
      loading: false,
      empresa: '',
      portal: '',
      padrao_xml: '',

      padroes_xml: [
        {
          id: 1,
          nome: 'Padrão Viva Real',
        }, {
          id: 2,
          nome: 'Padrão Zap',
        },
        {
          id: 3,
          nome: 'Padrão ImóvelWeb',
        },
        {
          id: 4,
          nome: 'Padrão Imóveis Santa Catarina',
        },
        {
          id: 5,
          nome: 'Padrão Mercado Livre'
        }]
    }
  },

  computed: {
    url() {
      return `http://integracoes.useimobia.com.br/api/xml/${this.padrao_xml.id}/${this.empresa}/${this.portal.id}`
    },
    loadingSistema() {
      return this.$store.state.layout.loading
    },
  },

  mounted(){
    // this.$store
    //   .dispatch('empresas/carregarEmpresas', { per_page: 1000 })
    //   .then((response) => {
    //     this.empresas = response
    //   })

    this.$store 
      .dispatch('portais/carregarPortais', { per_page: 100 })
      .then((response) => {
        this.portais = response
      })
  },
  methods: {
    gerarXML() {
      const link = window.document.createElement('a')
      link.href = this.url
      link.target = "_blank"
      link.click()
      window.URL.revokeObjectURL(link.href)
    }
  }
}

</script>
