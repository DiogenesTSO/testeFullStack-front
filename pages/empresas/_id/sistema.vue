<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col cols="12" md="6">
          <imobia-input
            v-model="empresa.user.nome"
            required
            disabled
            label="Nome do administrador"
          />
        </v-col>
        <v-col cols="12" md="5">
          <imobia-input
            v-model="empresa.user.email"
            disabled
            label="E-mail do administrador"
          />
        </v-col>
        <v-col cols="12" md="8" lg="3">
          <imobia-select v-model="empresa.configuracoes.tipo_acesso" :items="tipoAcessoEmpresa" required label="Tipo de acesso" />
        </v-col>
        <v-col cols="12" md="3">
          <imobia-value
            v-model="empresa.plano.valor_real"
            label="Valor da taxa de cobrança"
            type="real"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" md="4" lg="2">
          <v-checkbox v-model="empresa.suporte" class="ma-1" label="Suporte" />
        </v-col>
        <v-col cols="6" md="4" lg="2">
          <v-checkbox v-model="empresa.financeiro" class="ma-1" label="Financeiro" />
        </v-col>
        <v-col cols="6" md="4" lg="2">
          <v-checkbox v-model="empresa.nota_fiscal" class="ma-1" label="Nota Fiscal" />
        </v-col>
        <v-col cols="6" md="4" lg="2">
          <v-checkbox v-model="empresa.locacao" class="ma-1" label="Locação" />
        </v-col>
        <v-col cols="6" md="4" lg="2">
          <v-checkbox v-model="empresa.venda" class="ma-1" label="Venda" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" lg="3">
          <imobia-input-number
            v-if="empresa.locacao"
            v-model="empresa.valor_modulo_locacao"
            label="Limite de locações"
            :min="0"
            required
          />
        </v-col>
        <v-col cols="12" md="6" lg="3">
          <imobia-input-number 
            v-if="empresa.locacao" 
            v-model="empresa.configuracoes.expectativa_operacoes" 
            label="Expectativa de locações"
            :min="0"
            required 
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'EmpresaSistema',
  transition: 'slide-y-transition',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      empresa: this.value,
      tipoAcessoEmpresa: [
        { id: 'acesso_basico', nome: 'Acesso básico' },
        { id: 'acesso_completo', nome: 'Acesso completo' },
      ],
    }
  },
  watch: {
    value: {
      handler() {
        this.empresa = this.value
      },
      deep: true,
    },

    empresa: {
      handler() {
        this.$emit('input', this.empresa)
      },
      deep: true,
    },
  },
  mounted(){
    this.formatarModulos()
  },

  methods: {
    formatarModulos(){
      this.empresa.modulos.map((modulo) => {
        if (modulo.modulo === "venda"){
          this.empresa.venda = true
        }
        if (modulo.modulo === "locacao") {
          this.empresa.locacao = true
          this.empresa.valor_modulo_locacao = modulo.valor
        }
        if (modulo.modulo === "nota_fiscal"){
          this.empresa.nota_fiscal = true
        }
        if (modulo.modulo === "financeiro"){
          this.empresa.financeiro = true
        }
        return true
      })
    }
  },
}
</script>

<style>

</style>
