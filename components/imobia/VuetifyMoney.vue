<template>
  <v-text-field
    v-model="cmpValue"
    :label="label"
    validate-on-blur
    :placeholder="placeholder"
    :persistent-hint="persistentHint"
    :readonly="readonly"
    :disabled="disabled"
    :outlined="outlined"
    :dense="dense"
    :hide-details="hideDetails"
    :error="error"
    :error-messages="errorMessages"
    :rules="rules"
    :required="required"
    :clearable="clearable"
    :prefix="prefix"
    :suffix="suffix"
    :hint="hint"
    :color="color"
    :lazy-validation="lazyValidation"
    v-bind="properties"
    @keypress="keyPress"
    @keydown="keyDownHandler"
    @blur="onBlur"
    @focus="$emit('focus')"
  >
    <template #message>
      <slot name="message" />
    </template>
  </v-text-field>
</template>

<script>
export default {
  model: { prop: 'value', event: 'input' },
  props: {
    value: {
      // type: String,
      type: [String, Number],
      default: '0',
    },
    label: {
      type: String,
      default: '',
    },
    prefix: {
      type: String,
      default: '',
    },
    suffix: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: undefined,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    dense: {
      type: Boolean,
      default: false,
    },

    color: {
      type: String,
      default: '',
    },
    required: {
      type: [Boolean, String, Number],
      default: false,
    },
    lazyValidation: {
      type: [Boolean, String, Number],
      default: false,
    },
    persistentHint: {
      type: [Boolean, String, Number],
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    hideDetails: {
      type: [Boolean, String],
      default: false,
    },
    hint: {
      type: [String, Boolean],
      default: '',
    },
    errorMessages: {
      type: [Array, String],
      default: () => [],
    },
    rules: {
      type: [Array, String],
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },

    valueWhenIsEmpty: {
      type: String,
      default: '', // "0" or "" or null
    },
    valueOptions: {
      type: Object,
      default() {
        return {
          min: 0,
          minEvent: 'SetValueMin',
        }
      },
    },
    options: {
      type: Object,
      default() {
        return {
          locale: 'pt-BR',
          prefix: '',
          suffix: '',
          length: 21,
          precision: 2,
        }
      },
    },
    // Other v-text-field properties
    properties: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data: () => ({}),
  /*
   v-model="cmpValue": Dessa forma, ao digitar, o valor é atualizado automaticamente no componente pai.
   O valor digitado entra pelo newValue do Set e é emitido para o componente pai.
   the-vue-mask nao funciona corretamente ao incluir valores existentes no componente pai.
  */
  computed: {
    cmpValue: {
      get() {
        return this.value !== null && this.value !== ''
          ? this.humanFormat(this.value.toString())
          : this.valueWhenIsEmpty
      },
      set(newValue) {
        this.$emit('input', this.machineFormat(newValue))
      },
    },
  },

  methods: {
    humanFormat(number) {
      if (isNaN(number)) {
        number = ''
      } else {
        // number = Number(number).toLocaleString(this.options.locale, {maximumFractionDigits: 2, minimumFractionDigits: 2, style: 'currency', currency: 'BRL'});
        number = Number(number).toLocaleString(this.options.locale, {
          maximumFractionDigits: this.options.precision,
          minimumFractionDigits: this.options.precision,
        })
      }
      return number
    },
    machineFormat(number) {
      if (number) {
        number = this.cleanNumber(number)
        // Ajustar quantidade de zeros à esquerda
        number = number.padStart(parseInt(this.options.precision) + 1, '0')
        // Incluir ponto na casa correta, conforme a precisão configurada
        number =
          number.substring(
            0,
            number.length - parseInt(this.options.precision),
          ) +
          '.' +
          number.substring(
            number.length - parseInt(this.options.precision),
            number.length,
          )
        if (isNaN(number)) {
          number = this.valueWhenIsEmpty
        }
      } else {
        number = this.valueWhenIsEmpty
      }
      if (this.options.precision === 0) {
        number = this.cleanNumber(number)
      }
      return parseFloat(number) || 0
    },
    keyDownHandler(key) {
      if (key.code === 'Backspace' && this.cmpValue === '0,00') {
        key.preventDefault()
      }
    },
    keyPress($event) {
      const keyCode = $event.keyCode ? $event.keyCode : $event.which
      // if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
      if (keyCode < 48 || keyCode > 57) {
        // 46 is dot
        $event.preventDefault()
      }
      if (this.targetLength()) {
        $event.preventDefault()
      }
    },
    // Retira todos os caracteres não numéricos e zeros à esquerda
    cleanNumber(value) {
      let result = ''
      if (value) {
        let flag = false
        const arrayValue = value.toString().split('')
        for (let i = 0; i < arrayValue.length; i++) {
          if (this.isInteger(arrayValue[i])) {
            if (!flag) {
              // Retirar zeros à esquerda
              if (arrayValue[i] !== '0') {
                result = result + arrayValue[i]
                flag = true
              }
            } else {
              result = result + arrayValue[i]
            }
          }
        }
      }
      return result
    },
    isInteger(value) {
      let result = false
      if (Number.isInteger(parseInt(value))) {
        result = true
      }
      return result
    },
    targetLength() {
      if (
        Number(this.cleanNumber(this.value).length) >=
        Number(this.options.length)
      ) {
        return true
      } else {
        return false
      }
    },
    onBlur() {
      if (
        this.value.length === 0 ||
        parseFloat(this.value) <= this.valueOptions.min
      ) {
        this.$emit(
          this.valueOptions.minEvent || 'SetValueMin',
          this.valueOptions.min,
        )
      }

      if (
        this.valueOptions.max &&
        parseFloat(this.value) >= this.valueOptions.max
      ) {
        this.$emit(
          this.valueOptions.maxEvent || 'SetValueMax',
          this.valueOptions.max,
        )
      }

      this.$emit('blur')
    },
  },
}
</script>
