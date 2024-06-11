<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col cols="12" md="6">
          <imobia-input
            v-model="empresa.nome_admin"
            required
            label="Nome do administrador"
          />
        </v-col>
        <v-col cols="12" md="5">
          <imobia-input
            v-model="empresa.email"
            required
            label="E-mail do administrador"
          />
        </v-col>
        <v-col cols="12" md="6" lg="3">
          <imobia-select v-model="empresa.tipo_acesso" :items="tipoAcessoEmpresa" required label="Tipo de acesso" />
        </v-col>
        <v-col cols="12" md="6" lg="3">
          <imobia-value
            v-model="empresa.plano.valor_real"
            label="Valor da taxa de cobrança"
            type="real"
          />
        </v-col>
        <v-col cols="6" md="4" lg="2">
          <v-checkbox
            v-model="empresa.temMensalidade"
            class="ma-1"
            label="Mensalidade"
          />
        </v-col>
        <v-col cols="12" md="6" lg="3">
          <imobia-value
            v-if="empresa.temMensalidade"
            v-model="empresa.valor_mensalidade"
            label="Valor da Mensalidade"
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
        <v-col cols="4" md="2" lg="2">
          <v-checkbox v-model="empresa.venda" class="ma-1" label="Venda" />
        </v-col>
        <v-col cols="4" md="2" lg="2">
          <v-checkbox v-model="empresa.pagamento_contas" class="ma-1" label="Pagamentos de Contas" />
        </v-col>
        <v-col cols="6" md="4" lg="3">
          <v-checkbox v-model="empresa.cobranca_manual" class="ma-1" label="Cobrança manual" />
        </v-col>
        <v-col cols="6" md="4" lg="3">
          <v-checkbox v-model="empresa.saque_automatico" class="ma-1" label="Saque automatico" />
        </v-col>
        <v-col cols="6" md="4" lg="3">
          <v-checkbox v-model="empresa.integracao_sci" class="ma-1" label="Integração SCI" />
        </v-col>
        <v-col cols="6" md="4" lg="3">
          <v-checkbox v-model="empresa.debito_por_baixa" class="ma-1" label="Débito por baixa" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" lg="3">
          <imobia-input-number
            v-if="empresa.locacao"
            v-model="empresa.numero_locacao"
            label="Limite de locações"
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
