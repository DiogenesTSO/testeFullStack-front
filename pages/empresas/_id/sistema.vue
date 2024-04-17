<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col cols="12" md="6">
          <imobia-input v-model="empresa.user.nome" required disabled label="Nome do administrador" />
        </v-col>
        <v-col cols="12" md="5">
          <imobia-input v-model="empresa.user.email" disabled label="E-mail do administrador" />
        </v-col>
        <v-col cols="12" md="8" lg="3">
          <imobia-select v-model="empresa.configuracoes.tipo_acesso" :items="tipoAcessoEmpresa" required
            label="Tipo de acesso" />
        </v-col>
        <v-col cols="12" md="3">
          <imobia-value v-model="empresa.valor_taxa_cobranca" label="Valor da taxa de cobrança" type="real" />
        </v-col>
        <v-col cols="6" md="4" lg="2">
          <v-checkbox v-model="empresa.altera_mensalidade" class="ma-1" hide-details label="Mensalidade" />
        </v-col>
        <v-col cols="12" md="6" lg="3">
          <imobia-value v-if="empresa.altera_mensalidade" v-model="empresa.configuracoes.valor_mensalidade"
            label="Valor da Mensalidade" type="real" />
        </v-col>
        <v-col cols="12" md="3">
          <imobia-select v-model="empresa.configuracoes.dias_boleto_automatico" :items="diasBoleto" suffix="dias antes"
            label="Geração automatica da cobrança" />
        </v-col>
        <v-col cols="12" md="3">
          <imobia-select v-model="empresa.configuracoes.dia_vencimento_debito_por_baixa" :items="diasDebito"
            :required="empresa.configuracoes.debito_por_baixa" label="Data vencimento conta de debito" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" md="4" lg="2">
          <v-checkbox v-model="empresa.configuracoes.suporte" class="ma-1" label="Suporte" />
        </v-col>
        <v-col cols="6" md="4" lg="2">
          <v-checkbox v-model="empresa.modulos.financeiro" class="ma-1" label="Financeiro" />
        </v-col>
        <v-col cols="6" md="4" lg="2">
          <v-checkbox v-model="empresa.modulos.nota_fiscal" class="ma-1" label="Nota Fiscal" />
        </v-col>
        <v-col cols="6" md="4" lg="2">
          <v-checkbox v-model="empresa.modulos.locacao" class="ma-1" label="Locação" />
        </v-col>
        <v-col cols="6" md="4" lg="2">
          <v-checkbox v-model="empresa.modulos.venda" class="ma-1" label="Venda" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" md="4" lg="3">
          <v-checkbox v-model="empresa.configuracoes.cobranca_manual" class="ma-1" label="Cobrança manual" />
        </v-col>
        <v-col cols="6" md="4" lg="3">
          <v-checkbox v-model="empresa.configuracoes.saque_automatico" class="ma-1" label="Saque automatico" />
        </v-col>
        <v-col cols="6" md="4" lg="3">
          <v-checkbox v-model="empresa.configuracoes.integracao_sci" class="ma-1" label="Integração SCI" />
        </v-col>
        <v-col cols="6" md="4" lg="3">
          <v-checkbox v-model="empresa.configuracoes.debito_por_baixa" class="ma-1" label="Débito por baixa" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" lg="3">
          <imobia-input-number v-if="empresa.modulos.locacao" v-model="empresa.valor_modulo_locacao"
            label="Limite de locações" :min="0" required />
        </v-col>
        <v-col cols="12" md="6" lg="3">
          <imobia-input-number v-if="empresa.modulos.locacao" v-model="empresa.configuracoes.expectativa_operacoes"
            label="Expectativa de locações" :min="0" required />
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
      diasBoleto: [
        { id: 3, nome: 3 },
        { id: 4, nome: 4 },
        { id: 5, nome: 5 },
        { id: 6, nome: 6 },
        { id: 7, nome: 7 },
        { id: 8, nome: 8 },
        { id: 9, nome: 9 },
        { id: 10, nome: 10 },
      ],
      diasDebito: [
        { id: 5, nome: 5 },
        { id: 10, nome: 10 },
        { id: 15, nome: 15 },
        { id: 20, nome: 20 },
        { id: 25, nome: 25 },
        { id: 30, nome: 30 },
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
}
</script>

<style></style>
