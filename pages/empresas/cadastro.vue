<template>
  <v-row>
    <v-col cols="12">
      <v-form ref="formEmpresa" v-model="valid">
        <imobia-tab-card
          :loading="loading"
          :tabs="items"
          @next="validateTab"
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
          <NuxtChild v-model="empresa" @setFormRef="setFormRef" />
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
      formRefs: {
        geral: null,
        endereco: null,
        sistema: null,
      },
      tabs: [
        { name: 'geral', index: 0, route: '/empresas/cadastro/geral' },
        { name: 'endereco', index: 1, route: '/empresas/cadastro/endereco' },
        { name: 'sistema', index: 2, route: '/empresas/cadastro/sistema' },
      ],
      currentTabIndex: 0,
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
        // creci: '',
        // cnae: '',
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
        // email: '',
        tipo_acesso: '',
        suporte: 1,
        financeiro: 0,
        nota_fiscal: 0,
        venda: 0,
        locacao: 1,
        numero_locacao: 0,
        expectativa_operacoes: 0,
        temMensalidade: false,
        cobranca_manual: false,
        saque_automatico: false,
        integracao_sci: false,
        valor_mensalidade: 0,
        debito_por_baixa: 1,
        dia_vencimento_debito_por_baixa: 10,
        pagamento_contas: 0,
        usuario_vendedor_id: ''
      },
      cidades: [],

      items: [
        {
          icon: 'mdi-account',
          text: 'Empresa',
          to: '/empresas/cadastro/geral',
        },

        {
          icon: 'mdi-map-marker',
          text: 'Administrador',
          to: '/empresas/cadastro/endereco',
        },
        /* {
          icon: 'mdi-phone',
          text: 'Contatos',
          to: '/empresas/cadastro/contatos',
        }, */
        {
          icon: 'mdi-monitor-screenshot',
          text: 'Sistema',
          to: '/empresas/cadastro/sistema',
        },
      ],
    }
  },
  watch: {
    // Observa mudanças na rota para atualizar o currentTabIndex
    $route(to) {
      this.updateCurrentTabIndexBasedOnRoute(to.path)
    }
  },
  mounted() {
    // Chama ao carregar o componente para definir a aba com base na rota inicial
    this.updateCurrentTabIndexBasedOnRoute(this.$route.path)
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
    
    // Função responsável para garantir que o currentTabIndex seja atualizado corretamente com base na rota atual.
    updateCurrentTabIndexBasedOnRoute(path) {
      const tab = this.tabs.find(tab => path.includes(tab.route))
      if (tab) {
        this.currentTabIndex = tab.index
      }
    }, 
    /* Função para armazenar as referencias dos formulários geral, endereco e sistema. Type é o nome do arquivo +
      ex: geral, endereco... ref é a referencia de cada v-form, ex. formGeral, formEndereco. */
    setFormRef(type, ref) {
      this.formRefs[type] = ref
    },
    /* ValidateTab é a função que da ao evento do botão próximo, ao clicar nele ele irá validar primeiro +
      os campos obrigatórios, assim que todos preenchidos ele habilita para a próxima aba */
    async validateTab() {
      let isValid = false

      // Faz as validações por cada aba, iniciando na posição 0 geral
      if (this.currentTabIndex === 0 && this.formRefs.geral) {
        isValid = await this.formRefs.geral.validate()
      } else if (this.currentTabIndex === 1 && this.formRefs.endereco) {
        isValid = await this.formRefs.endereco.validate()
      } else if (this.currentTabIndex === 2 && this.formRefs.sistema) {
        isValid = await this.formRefs.sistema.validate()
      }

      // Se os campos estão válidos pula para a próxima aba. Caso contrário emite um alerta e não deixa prosseguir.
      if (isValid) {
        if (this.currentTabIndex < this.tabs.length - 1) {
          this.currentTabIndex += 1
          this.$router.push(this.tabs[this.currentTabIndex].route)
        }
      } else {
        this.$nuxt.$emit("notify", {
          type: "warning",
          message: "Preencha os campos obrigatórios",
        })
      }
    },
    submit() {
      this.loading = true
      /* this.$refs.formEmpresa.validate()

      if (!this.valid){
        this.$nuxt.$emit('notify', {
          type: 'warning',
          message: 'Preencha os campos obrigatórios',
        })
        this.loading = false
      }  */

      const form = {
        ...this.empresa,
        ...{
          // Cadastro geral de empresa
          tipo: this.empresa.tipo,
          nome_fantasia: this.empresa.nome_fantasia,
          nome: this.empresa.nome_empresa,
          // email: this.empresa.email_empresa,
          cnpj: this.empresa.cnpj,
          cpf: this.empresa.cnpj,
          data_nascimento: this.empresa.data_nascimento,
          telefone_01: this.empresa.telefone_01,
          celular: this.empresa.celular,
          // Cadastro de endereço de empresas
          cep: this.empresa.cep,
          cidade_id: this.empresa.cidade_id,
          bairro: this.empresa.bairro,
          endereco: this.empresa.endereco,
          numero: this.empresa.numero,
          complemento: this.empresa.complemento,
          
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
          celular_admin: this.empresa.celular,
          senha: this.empresa.senha
        },
      }

      this.$store
        .dispatch('empresas/cadastrarEmpresa', form)
        .then((message) => {
          console.log(message)
          this.$router.push({ name: 'empresas-listagem' })
        })
        .catch((error) => {
          console.error('Erro ao cadastrar', error)
        })
        .finally(() => {
          this.loading = false
        }) 
    },
    /* async saveDataToApi(api, data) {
      try {
        const response = await this.$store.dispatch(api, data)
        return response
      } catch (error) {
        console.error('Erro ao salvar na API:', error)
        return { success: false }
      }
    } */
  },
}
</script>


<style lang="scss" scoped></style>
