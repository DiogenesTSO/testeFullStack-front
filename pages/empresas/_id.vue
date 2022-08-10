<template>
  <v-row>
    <v-col cols="12">
      <imobia-tab-card
        :loading="loading"
        :tabs="items"
        :disable-save="disableSave"
        :disabled-tooltip="disabledMessage"
        @save="submit"
      >
        <template #headerLeft>
          <v-list class="py-0" color="transparent">
            <v-list-item>
              <v-list-item-avatar class="justify-center">
                <v-avatar>
                  <v-img
                    width="100%"
                    max-height="50px"
                    :src="(empresa.configuracoes.url_logo
                      ? empresa.configuracoes.url_logo
                      : $vuetify.theme.dark
                        ? 'https://static.useimobia.com.br/sistema/nao_encontrada_dark.png'
                        : 'https://static.useimobia.com.br/sistema/nao_encontrada.png'
                    )"
                  />
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  {{ empresa.nome }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  CNPJ: {{ $format.mask(empresa.cnpj, 'cnpj') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </template>
        <NuxtChild v-model="empresa" />
      </imobia-tab-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'EdicaoEmpresa',
  meta: {
    title: 'Edição de empresa',
  },

  data() {
    return {
      loading: false,
      empresa: {
        plano: {
          valor_real: '',
        },
        configuracoes: {
          url_logo: ''
        },
        tipo: '',
        nome_empresa: '',
        nome_fantasia: '',
        cpfcnpj: '',
        cnpj: '',
        creci: '',
        cep: '',
        endereco: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: {},
        filial: {
          telefone_01: '',
          telefone_02: '',
          celular: '',
        },
        nome_admin: '',
        email: '',
        tipo_acesso: '',
        suporte: 1,
        caixas: [],
        financeiro: false,
        nota_fiscal: false,
        venda: false,
        locacao: false,
      },
      cidades: [],

      items: [
        {
          icon: 'mdi-account',
          text: 'Geral',
          to: 'geral',
        },

        {
          icon: 'mdi-map-marker',
          text: 'Endereço',
          to: 'endereco',
        },
        {
          icon: 'mdi-phone',
          text: 'Contatos',
          to: 'contato',
        },
        {
          icon: 'mdi-monitor-screenshot',
          text: 'Sistema',
          to: 'sistema',
        },
        {
          icon: 'mdi-bank',
          text: 'Caixa digital',
          to: 'caixa',
        },
      ],
    }
  },


  mounted() {
    this.carregarEmpresa()
    this.carregarCaixa()
  },

  methods: {
    carregarEmpresa(){
      this.$store
        .dispatch('empresas/carregarEmpresa',
          this.$route.params.id)
        .then((response) => {
          this.empresa = {
            ...this.empresa,
            ...response,
            ...{
              plano: response.plano === null
                ? {
                    valor_real: 0,
                  }
                : response.plano
            }
          }
        })
    },

    carregarCaixa(){
      const form = {
        empresa_id: this.$route.params.id,
        tipo: "bancario"
      }
      this.$store
        .dispatch('empresas/carregarCaixa', {
          empresa_id: this.$route.params.id,
          data: form
        })
        .then((response) => {
          this.empresa.caixas = response
        })
    },

    submit() {
      this.loading = true

      const form = {
        ...this.empresa,
        ...{
          // Edição geral de empresa
          tipo: this.empresa.tipo,
          nome_fantasia: this.empresa.nome_fantasia,
          nome: this.empresa.nome,
          cnpj: this.empresa.cnpj,
          cpf: this.empresa.cnpj,
          creci: this.empresa.creci,
          // Edição de endereço de empresas
          cep: this.empresa.cep,
          cidade_id: this.empresa.cidade_id,
          bairro: this.empresa.bairro,
          endereco: this.empresa.endereco,
          numero: this.empresa.numero,
          complemento: this.empresa.complemento,
          // Edição do contato da empresa
          filial: {
            id: this.empresa.filial.id,
            telefone_01: this.empresa.filial.telefone_01,
            telefone_02: this.empresa.filial.telefone_02,
            celular: this.empresa.filial.celular,
          },
          // Edição das informações de sistema da empresa
          taxa_cobranca: {
            valor_real: this.empresa.plano.valor_real
          },
          tipo_acesso: this.empresa.configuracoes.tipo_acesso,
          suporte: this.empresa.suporte,
          // Edição de modulos de acesso
          modulos: [
            {
              modulo: "venda",
              valor: this.empresa.venda === true ? 1 : 0
            },
            {
              modulo: "locacao",
              valor: this.empresa.locacao === true ? 1 : 0
            },
            {
              modulo: "nota_fiscal",
              valor: this.empresa.nota_fiscal === true ? 1 : 0
            },
            {
              modulo: "financeiro",
              valor: this.empresa.financeiro === true ? 1 : 0
            },

          ],
          // edicão da senha de acesso do Asaas
          senha_asaas: this.empresa.senha_asaas,
        },
      }

      this.$store
        .dispatch('empresas/editarEmpresa', {
          id: this.empresa.id,
          data: form
        })
        .finally(() => {
          this.loading = false
          this.$router.go(this.$router.currentRoute)
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
