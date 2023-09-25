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
                    {{ $format.initials(empresa.nome_fantasia || 'Nova empresa') }}
                  </span>
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  {{ (empresa.nome_fantasia || 'Nova empresa') }}
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
  name: 'CadastroEmpresas',
  meta: {
    title: 'Cadastro de empresas',
  },

  data() {
    return {
      loading: false,
      empresa: {
        plano: {
          valor_real: '',
        },
        tipo: '',
        nome_empresa: '',
        nome_fantasia: '',
        cpfcnpj: '',
        cnpj: '',
        creci: '',
        cnae: '',
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
        tipo_acesso: '',
        suporte: 1,
        financeiro: 0,
        nota_fiscal: 0,
        venda: 0,
        locacao: 0,
        numero_locacao: 0,
        expectativa_operacoes: 0,
        temMensalidade: false,
        cobranca_manual: false,
        valor_mensalidade: 0
      },
      cidades: [],

      items: [
        {
          icon: 'mdi-account',
          text: 'Geral',
          disabled: true,
          to: '/empresas/cadastro/geral',
        },

        {
          icon: 'mdi-map-marker',
          text: 'Endereço',
          disabled: true,
          to: '/empresas/cadastro/endereco',
        },
        {
          icon: 'mdi-phone',
          text: 'Contatos',
          disabled: true,
          to: '/empresas/cadastro/contatos',
        },
        {
          icon: 'mdi-monitor-screenshot',
          text: 'Sistema',
          to: '/empresas/cadastro/sistema',
        },
      ],
    }
  },
  computed: {
    disableSave() {
      return !(
        this.empresa.nome_admin
      )
    },
  },
  methods: {

    verificarModulos(empresa){
      const modulos = [
        {
          modulo: 'pessoas'
        },
        {
          modulo: 'imoveis'
        }]

      if (empresa.locacao === true){
        modulos.push({ modulo: 'locacao', valor: empresa.numero_locacao })
      }
      if (empresa.venda === true){
        modulos.push({ modulo: 'venda' })
      }
      if (empresa.financeiro === true){
        modulos.push({ modulo: 'financeiro' })
      }
      if (empresa.nota_fiscal === true){
        modulos.push({ modulo: 'nota_fiscal' })
      }

      return modulos
    },

    submit() {
      this.loading = true

      const form = {
        ...this.empresa,
        ...{
          // Cadastro geral de empresa
          tipo: this.empresa.tipo,
          nome_fantasia: this.empresa.nome_fantasia,
          nome: this.empresa.nome_empresa,
          cnpj: this.empresa.cnpj,
          cpf: this.empresa.cnpj,
          creci: this.empresa.creci,
          cnae: this.empresa.cnae,
          // Cadastro de endereço de empresas
          cep: this.empresa.cep,
          cidade_id: this.empresa.cidade_id,
          bairro: this.empresa.bairro,
          endereco: this.empresa.endereco,
          numero: this.empresa.numero,
          complemento: this.empresa.complemento,
          // Cadastro do contato da empresa
          telefone_01: this.empresa.telefone_01,
          telefone_02: this.empresa.telefone_02,
          celular: this.empresa.celular,
          // Cadastro das informações de sistema da empresa
          valor_real: this.empresa.plano.valor_real,
          taxa_cobranca: this.empresa.plano,
          tipo_acesso: this.empresa.tipo_acesso,
          suporte: this.empresa.suporte,
          // Formata os modulos
          modulos: this.verificarModulos(this.empresa),
          // Criando usuario para a empresa
          email: this.empresa.email,
          nome_admin: this.empresa.nome_admin,
        },
      }

      this.$store
        .dispatch('empresas/cadastrarEmpresa', form)
        .finally(() => {
          this.loading = false
          this.$router.push({
            name: 'empresas-listagem',
          })
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
