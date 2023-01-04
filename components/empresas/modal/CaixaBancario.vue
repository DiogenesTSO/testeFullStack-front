<template>
  <imobia-modal
    v-model="show"
    :title="'Editar caixa'"
    @open="createModal()"
    @close="clearData()"
  >
    <v-form ref="formCaixa" v-model="valid" @submit.prevent="emitData">
      <empresas-modal-form-caixa-bancario v-model="caixa" :reset="show" />
    </v-form>
    <template #actions="{uid}">
      <v-btn dark color="primary" type="submit" :form="uid" @click="pushData()">
        Alterar
      </v-btn>
    </template>
  </imobia-modal>
</template>

<script>
export default {
  name: 'ModalContaBancaria',
  props: {
    value: {
      type: [Boolean, Number],
      default: false,
    },
    empresa: {
      type: Object,
      default: () => {},
    },
    contaProp: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      valid: false,
      caixa: {
        id: '',
        correntista: '',
        correntista_documento: '',
        conta: '',
        conta_digito: '',
        tipo: {},
        agencia: '',
        digito_agencia: '',
        banco: '',
        banco_codigo: '',
        principal: false,
        bancoObj: {},
        contaComDigito: '',
      },

      show: this.value,
    }
  },
  computed: {
    bancos() {
      const bancosFiltrados = this.$store.state.empresas.bancos.map((banco) => {
        return {
          id: banco.id,
          nome: `${banco.code + ' - ' + banco.name}`,
          banco_codigo: parseInt(banco.code),
        }
      })
      return bancosFiltrados
    },
  },
  watch: {
    show() {
      this.$emit('input', this.show)
    },
    value() {
      this.show = this.value
    },
  },

  methods: {
    createModal() {
      this.caixa = this.contaProp
      this.caixa.contaComDigito =
        this.caixa.conta + '-' + this.caixa.conta_digito
    },
    clearData() {
      if (!this.contaProp?.id) {
        Object.assign(this.$data, this.$options.data())
      }
      this.$refs.formCaixa.resetValidation()
    },
    emitData() {
      // this.$refs.formCaixa.validate()
      // if (!this.valid) {
      //   return
      // }
      this.$emit('save', {
        ...this.caixa,
      })
      this.show = false
    },
    pushData() {
      this.caixa = {
        ...this.caixa,
        ...{
          nome: this.caixa.banco_codigo + ' - ' + this.caixa.nome,
          banco: this.caixa.banco,
          banco_codigo: this.caixa.banco_codigo,
          conta: this.caixa.conta,
          conta_digito: this.caixa.conta_digito,
          correntista_documento: this.caixa.correntista_documento,
          conta_tipo: this.caixa.tipo.value,
          tipo: 'bancario',
        },
      }
      this.$store
        .dispatch('empresas/editarCaixa', {
          empresa_id: this.empresa.id,
          caixa_id: this.caixa.id,
          data: this.caixa,
        })
        .finally(() => {
          this.$router.go(this.$router.currentRoute)
        })
    },
  },
}
</script>

<style></style>
