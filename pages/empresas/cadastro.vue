<template>
  <v-row>
    <v-col cols="12">
      <v-form ref="formEmpresa" v-model="valid">
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
                    {{ empresa.cnpj && empresa.tipo === 'PF' ?
                      `CPF: ${$format.mask(empresa.cnpj, 'cpf')}` :
                      empresa.cnpj ? `CNPJ: ${$format.mask(empresa.cnpj, 'cnpj')}` :
                      ''
                    }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </template>
          <NuxtChild v-model="empresa" />
        </imobia-tab-card>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'CadastroEmpresas',
  meta: {
    title: 'Cadastro de empresa',
  },

  data() {
    return {
      loading: false,
      valid: false,
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
        saque_automatico: false,
        integracao_sci: false,
        valor_mensalidade: 0,
        debito_por_baixa: 1,
        dia_vencimento_debito_por_baixa: 10,
        pagamento_contas: 0
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
          icon: 'mdi-phone',
          text: 'Contatos',
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
        this.empresa.nome_admin &&
        this.empresa.nome_fantasia &&
        this.empresa.nome_empresa &&
        this.empresa.tipo &&
        this.empresa.cnpj &&
        this.empresa.creci &&
        this.empresa.cnae &&
        this.empresa.cep &&
        this.empresa.cidade_id &&
        this.empresa.bairro &&
        this.empresa.endereco &&
        this.empresa.telefone_01 &&
        this.empresa.nome_admin &&
        this.empresa.email &&
        this.empresa.tipo_acesso
      )
    },
    disabledMessage(){
      return (
        'Para cadastrar a empresa preencha os seguintes campos: ' +
        (this.empresa.nome_fantasia ? '' : '<br>- Nome fantasia') +
        (this.empresa.nome_empresa ? '' : '<br>- Razão social') +
        (this.empresa.tipo ? '' : '<br>- Tipo de empresa') +
        (this.empresa.cnpj ? '' : '<br>- CPF/CNPJ') +
        (this.empresa.creci ? '' : '<br>- CRECI') + 
        (this.empresa.cnae ? '' : '<br>- CNAE') +  
        (this.empresa.cep ? '' : '<br>- CEP') + 
        (this.empresa.cidade_id ? '' : '<br>- Cidade') + 
        (this.empresa.bairro ? '' : '<br>- Bairro') + 
        (this.empresa.endereco ? '' : '<br>- Rua') + 
        (this.empresa.telefone_01 ? '' : '<br>- Telefone primário') + 
        (this.empresa.nome_admin ? '' : '<br>- Nome do administrador') + 
        (this.empresa.email ? '' : '<br>- E-mail do administrador') + 
        (this.empresa.tipo_acesso ? '' : '<br>- Tipo de acesso') 
      )
    }
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
      this.$refs.formEmpresa.validate()

      if (!this.valid){
        this.$nuxt.$emit('notify', {
          type: 'warning',
          message: 'Preencha os campos obrigatórios',
        })
        this.loading = false
        return
      }

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
          debito_por_baixa: this.empresa.debito_por_baixa,
          dia_vencimento_debito_por_baixa: this.empresa.dia_vencimento_debito_por_baixa,
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
