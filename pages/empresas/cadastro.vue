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
                  <v-avatar color="#1e3261">
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
                    {{ empresa.documento && empresa.tipo === 'PF' ?
                      `CPF: ${$format.mask(empresa.documento, 'cpf')}` :
                      empresa.documento ? `CNPJ: ${$format.mask(empresa.documento, 'cnpj')}` :
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
        documento: '',
        data_nascimento: '',
        telefone: '',
        celular: '',
        email_empresa: '',

        cep: '',
        cidade: '',
        estado: '',
        bairro: '',
        rua: '',
        numero: '',
        complemento: '',
        
        nome_admin: '',
        email_admin: '',
        celular_admin: '',
        senha: '',

        taxa_garantida_ate: '',
        qtd_taxas_bonificadas: 0,
        nota_fiscal: 0,
        venda: 0,
        locacao: 1,
        expectativa_operacoes: 0,
        debito_por_baixa: 1,
        pagamento_contas: 0,
      },
      cidades: [],
      estados: [],

      items: [
        {
          icon: 'mdi-briefcase',
          text: 'Empresa',
          to: '/empresas/cadastro/geral',
        },

        {
          icon: 'mdi-account',
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
      this.updateCurrentTabIndex(to.path)
    }
  },
  mounted() {
    // Chama ao carregar o componente para definir a aba com base na rota inicial
    this.updateCurrentTabIndex(this.$route.path)
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
        modulos.push({ modulo: 'locacao' })
      }
      if (empresa.venda === true){
        modulos.push({ modulo: 'venda' })
      }
      if (empresa.nota_fiscal === true){
        modulos.push({ modulo: 'nota_fiscal' })
      }

      return modulos
    },
    
    // Função responsável para garantir que o currentTabIndex seja atualizado corretamente com base na rota atual.
    updateCurrentTabIndex(path) {
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
      return isValid
    },
    async submit() {
      // Valida os campos obrigatórios da ultima tab
      const isValid = await this.validateTab()

      if (!isValid) {
        return
      }

      this.loading = true

      const form = {
        empresaData: {
          tipo: this.empresa.tipo,
          nome_fantasia: this.empresa.nome_fantasia,
          nome: this.empresa.nome_empresa,
          documento: this.empresa.documento,
          data_nascimento: this.empresa.data_nascimento,
          telefone: this.empresa.telefone,
          celular: this.empresa.celular,
          email: this.empresa.email_empresa,

          cep: this.empresa.cep,
          cidade: this.empresa.cidade,
          estado: this.empresa.estado,
          bairro: this.empresa.bairro,
          rua: this.empresa.endereco,
          numero: this.empresa.numero,
          complemento: this.empresa.complemento
        },
        adminData: {
          nome: this.empresa.nome_admin,
          email: this.empresa.email_admin,
          celular: this.empresa.celular_admin,
          senha: this.empresa.senha,
        },
        configuracaoData: {
          valor_taxa: this.empresa.plano.valor_real,
          taxa_garantida_ate: this.empresa.taxa_garantida_ate,
          qtd_taxas_bonificadas: this.empresa.taxa_bonificadas,
          expectativa_operacoes: this.empresa.expectativa_operacoes,
          modulo_locacao: this.empresa.locacao,
          modulo_vendas: this.empresa.venda,
          modulo_pagamento_contas: this.empresa.pagamento_contas,
          modulo_debito_por_baixa: this.empresa.debito_por_baixa,
          modulo_nota_fiscal: this.empresa.nota_fiscal,
        }
      }

      this.$store
        .dispatch('empresas/cadastrarEmpresa', form)
        .then(() => {
          this.$nuxt.$emit("notify", {
            type: "success",
            message: "Empresa cadastrada com sucesso!"
          })
          this.$router.push({ name: 'empresas-listagem' })
        })
        .catch(() => {
          this.$nuxt.$emit("notify", {
            type: "error",
            message: "Erro ao cadastrar a empresa. Tente novamente"
          })
        })
        .finally(() => {
          this.loading = false
        }) 
    },
  },
}
</script>


<style lang="scss" scoped></style>
