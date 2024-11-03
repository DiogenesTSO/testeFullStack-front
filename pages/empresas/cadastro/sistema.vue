<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col cols="12" md="6" lg="3">
          <imobia-value
            v-model="empresa.plano.valor_real"
            label="Valor da taxa de operação"
            type="real"
          />
        </v-col>
        <v-col cols="12" md="3">
          <imobia-date-picker 
            v-model="empresa.data"
            required
            type="data"
            label="Taxa garantida até"
            :format="dateFormat"
          />
        </v-col>
        <v-col cols="12" md="6" lg="3">
          <imobia-input-number
            v-model="empresa.baixa_manual"
            label="Baixas manuais bonificadas por mês"
            :min="0"
            required
          />
        </v-col>
        <v-col cols="12" md="6" lg="3">
          <imobia-input-number
            v-if="empresa.locacao"
            v-model="empresa.expectativa_operacoes"
            label="Expectativa de locações"
            :min="0"
            required
          />
        </v-col>
      </v-row>
      <v-row />
      <v-row>
        <v-col cols="6" md="4" lg="2">
          <v-checkbox v-model="empresa.locacao" class="ma-1" label="Locação" />
        </v-col>
        <v-col cols="4" md="2" lg="2">
          <v-checkbox v-model="empresa.venda" class="ma-1" label="Venda" />
        </v-col>
        <v-col cols="4" md="2" lg="2">
          <v-checkbox v-model="empresa.pagamento_contas" class="ma-1" label="Pagamentos de Contas" />
        </v-col>
        <v-col cols="6" md="4" lg="3">
          <v-checkbox v-model="empresa.debito_por_baixa" class="ma-1" label="Débito por baixa" />
        </v-col>
        <v-col cols="6" md="4" lg="2">
          <v-checkbox v-model="empresa.nota_fiscal" class="ma-1" label="Nota Fiscal" />
        </v-col>
      </v-row>
      <v-row />
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
      ]
    }
  },
  watch: {
    empresa: {
      handler() {
        this.$emit('input', this.empresa)
      },
      deep: true,
    },
  },
}
</script>

<style>

</style>
