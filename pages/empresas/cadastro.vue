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
                <v-avatar color="primary">
                  <span class="white--text">
                    I
                  </span>
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  Imobia
                </v-list-item-title>
                <v-list-item-subtitle>
                  CNPJ: 123123123123
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </template>
        <NuxtChild v-model="empresas" />
      </imobia-tab-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'CadastroEmpresas',
  meta: {
    title: 'Cadastro de empresas',
  },

  data() {
    return {
      loading: false,
      empresa: {
        tipo: '',
        nome_empresa: '',
        nome_fantasia: '',
        cpfcnpj: '',
        creci: '',
        cep: '',
        endereco: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade_id: '',
        telefone_01: '',
        telefone_02: '',
        celular: '',
        nome_admin: '',
        email: '',
        suporte: 1,
        taxa_cobranca: {
          valor_real: '',
          valor_percentual: '',
        },
      },
      cidades: [],

      items: [
        {
          icon: 'mdi-account',
          text: 'Geral',
          to: '/empresas/cadastro/geral',
        },

        {
          icon: 'mdi-map-marker',
          text: 'Endereço',
          to: '/empresas/cadastro/endereco',
        },
        {
          icon: 'mdi-map-marker',
          text: 'Contatos',
          to: '/empresas/cadastro/contatos',
        },
        {
          icon: 'mdi-map-marker',
          text: 'Sistema',
          to: '/empresas/cadastro/sistema',
        },
      ],
    }
  },
  computed: {
  },
  methods: {
    submit() {
      if (this.pessoa.tipo_pessoa === 'J') {
        this.pessoa.cpf = ''
      } else {
        this.pessoa.cnpj = ''
      }
      this.loading = true

      const form = {
        ...this.pessoa,
        ...{
          representantes: this.pessoa.representante?.id
            ? [this.pessoa.representante.id]
            : null,
          conjuges: this.pessoa.conjuge?.id ? [this.pessoa.conjuge.id] : null,
          tipos_cliente: this.pessoa.tipos_cliente.filter(item => item),
          arquivos: null,
          fornecedor: 0,
          email_01: this.pessoa.email_01,
          cidade_id: this.pessoa.cidade?.id,
          filial_id: this.pessoa.filial?.id,
          corretor_id: this.pessoa.corretor?.id,
          conjuge_id: this.pessoa.conjuge?.id,
          // representantes: this.pessoa.representantes.map(rep => rep.id),
        },
      }

      this.$store
        .dispatch('pessoas/cadastrarPessoa', form)
        .then((res) => {
          if (this.pessoa.arquivos.length) {
            const promises = []

            promises.push(
              this.$store.dispatch('pessoas/cadastrarPessoaArquivos', {
                id: res.id,
                arquivos: this.pessoa.arquivos.map(item => ({
                  nome: item.name,
                  arquivo: item.src,
                })),
              }),
            )
            Promise.all(promises)
              .then((data) => {
                this.$nuxt.$emit('notify', {
                  type: 'success',
                  message: 'Contas cadastradas com sucesso.',
                })
              })
              .finally(() => {
                this.loading = false
                this.$router.push({
                  name: 'pessoas-id-geral',
                  params: { id: res.id },
                })
              })
          } else {
            this.loading = false
            this.$router.push({
              name: 'pessoas-id-geral',
              params: { id: res.id },
            })
          }
          if (this.pessoa.dados_bancarios.length) {
            const promises = []
            this.pessoa.dados_bancarios.forEach((conta) => {
              promises.push(
                this.$store.dispatch('pessoas/cadastrarPessoaDadosBancarios', {
                  id: res.id,
                  data: conta,
                }),
              )
            })
            Promise.all(promises)
              .then((data) => {
                this.$nuxt.$emit('notify', {
                  type: 'success',
                  message: 'Contas cadastradas com sucesso.',
                })
              })
              .finally(() => {
                this.loading = false
                this.$router.push({
                  name: 'pessoas-id-geral',
                  params: { id: res.id },
                })
              })
          } else {
            this.loading = false
            this.$router.push({
              name: 'pessoas-id-geral',
              params: { id: res.id },
            })
          }
        })
        .catch(() => (this.loading = false))
    },
  },
}
</script>

<style lang="scss" scoped></style>
