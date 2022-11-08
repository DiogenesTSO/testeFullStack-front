<template>
  <v-row>
    <v-col cols="12" md="6" class="mt-3">
      <imobia-input
        v-model="caixa.nome"
        :disabled="disabled"
        required
        label="Nome do caixa"
      />
    </v-col>
    <v-col cols="12" md="6" class="mt-3">
      <imobia-input
        v-model="caixa.correntista"
        :disabled="disabled"
        required
        label="Nome do correntista"
      />
    </v-col>
    <v-col cols="12" md="6">
      <imobia-input
        v-model="caixa.correntista_documento"
        :disabled="disabled"
        required
        label="CPF/CPNJ do correntista"
        type="cpf cnpj"
      />
    </v-col>
    <v-col cols="12" md="6">
      <imobia-auto-complete
        v-model="bancoObj"
        :disabled="disabled"
        :loading="loadingBanco"
        return-object
        :items="bancos"
        required
        label="Banco"
      />
    </v-col>
    <v-col cols="12" md="6">
      <v-select
        v-model="caixa.tipo"
        :disabled="disabled"
        dense
        hide-details="auto"
        outlined
        :items="tipoContaOptions"
        label="Tipo de conta"
      />
    </v-col>
    <v-col cols="12" md="6">
      <imobia-input
        v-model="caixa.agencia"
        :disabled="disabled"
        number
        required
        maxlength="4"
        dense
        outlined
        label="Agência"
      />
    </v-col>
    <v-col cols="12" md="6" class="mb-3">
      <imobia-input
        v-model="caixa.contaComDigito"
        :disabled="disabled"
        required
        dense
        outlined
        label="Conta (com dígito)"
        @input="formatConta"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {},
    },
    pessoa: {
      type: Object,
      default: () => {},
    },
    pessoaContasBancarias: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    principal: {
      type: Boolean,
      default: true,
    },
    reset: {
      type: [Boolean, Number, String],
      default: true,
    },
  },
  data() {
    return {
      caixa: { ...this.value },
      bancoObj: {},
      tipoContaOptions: [
        {
          text: 'Conta Corrente',
          value: 'CONTA_CORRENTE',
        },
        {
          text: 'Conta Poupança',
          value: 'CONTA_POUPANCA',
        },
      ],
    }
  },
  computed: {
    bancos() {
      return this.$store.state.empresas.bancos.map((banco) => {
        return {
          id: banco.id,
          nome: banco.name,
          banco_codigo: banco.code,
        }
      })
    },
  },
  watch: {
    reset() {
      this.setup()
    },
    caixa: {
      handler() {
        if (!this.$help.objectEquals(this.caixa, this.value)) {
          this.$emit('input', this.caixa)
        }
      },
      deep: true,
    },
    bancoObj: {
      handler() {
        this.caixa.banco = this.bancoObj.nome
        this.caixa.banco_codigo = this.bancoObj.banco_codigo
      },
      deep: true,
    },
    value: {
      handler() {},
      deep: true,
    },
  },

  mounted() {
    this.setup()
  },
  methods: {
    setup() {
      console.log(this.bancoObj)
      console.log(this.caixa)
      if (this.caixa.banco_codigo !== this.bancoObj.banco_codigo) {
        this.bancoObj = this.bancos.find(
          (item) => item.code === this.caixa.banco_codigo,
        ) ?? {
          id: this.caixa.banco_codigo,
          nome: this.caixa.banco.Nome,
          banco_codigo: this.caixa.banco.Codigo,
        }
      }
      if (this.caixa.conta_tipo === 'CONTA_CORRENTE') {
        this.caixa.tipo = {
          text: 'Conta Corrente',
          value: 'CONTA_CORRENTE',
        }
      } else {
        this.caixa.tipo = {
          text: 'Conta Poupança',
          value: 'CONTA_POUPANCA',
        }
      }
      this.formatConta()
    },
    formatConta() {
      this.$nextTick(() => {
        this.caixa.contaComDigito = this.caixa.contaComDigito?.replace(
          /[^0-9]+/g,
          '',
        )
        this.caixa.contaComDigito = this.caixa.contaComDigito?.replace('-', '')

        if (this.caixa.contaComDigito?.length > 1) {
          const conta = this.caixa.contaComDigito.slice(
            0,
            this.caixa.contaComDigito.length - 1,
          )
          const digito = this.caixa.contaComDigito.slice(
            this.caixa.contaComDigito.length - 1,
          )
          this.caixa.contaComDigito = conta + '-' + digito
          this.caixa.conta = conta
          this.caixa.conta_digito = digito
          // como o nextTick não irá dar trigger no watch da conta, temos que emitir a input manualmente
          this.$emit('input', this.caixa)
        }
      })
    },
  },
}
</script>

<style></style>
