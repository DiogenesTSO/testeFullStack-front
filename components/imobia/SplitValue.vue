<template>
  <v-row align="center">
    <v-col cols="4">
      <v-text-field
        v-model="parcelas"
        type="number"
        suffix="x"
        hide-details
        dense
        outlined
      />
    </v-col>
    <div class="shrink">
      de
    </div>
    <v-col>
      <imobia-value
        v-model="valor"
        type="real"
        :disabled="disabled"
        :label="label"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'SplitValue',
  props: {
    // Define o valor máximo que a input aceita
    max: {
      type: [String, Number],
      default: '90',
    },
    // v-model basicamente
    value: {
      type: [Number, String, Boolean, Object],
      default: 0,
    },
    // label para parecer em cima da input (se não for declarada, a input funciona normalmente)
    label: {
      type: String,
      default: '',
    },
    decimalLength: {
      type: [String, Number],
      default: 2,
    },
    disabled: {
      type: Boolean,
      default: false,
    },

    select: {
      type: String,
      default: 'percentual',
    },
  },
  data() {
    return {
      valor: this.value.real,
      parcelas: this.value.parcelas,
    }
  },

  watch: {
    value: {
      handler() {
        this.valor = this.value.real
        this.parcelas = this.value.parcelas
      },
      deep: true,
    },
    valor() {
      if (this.valor < 0) {
        this.$nextTick(() => {
          this.valor = -1 * this.valor
        })
      } else {
        this.$emit('input', {
          real: this.valor,
          parcelas: this.parcelas,
        })
      }
    },
    parcelas() {
      if (this.parcelas < 1) {
        this.$nextTick(() => {
          this.parcelas = 1
        })
      } else if (this.parcelas > parseInt(this.max)) {
        this.$nextTick(() => {
          this.parcelas = this.max
        })
      } else {
        this.$emit('input', {
          real: this.valor,
          parcelas: this.parcelas,
        })
      }
    },
  },
}
</script>

<style></style>
