<template>
  <v-text-field
    ref="textField"
    v-model="val"
    :color="color"
    :disabled="disabled"
    :readonly="readonly"
    :label="label"
    :rules="rules"
    hide-details="auto"
    dense
    :suffix="suffix"
    :prefix="prefix"
    :hint="hint"
    :type="type"
    outlined
    :required="required"
    :maxlength="maxlength"
    :loading="loading || loadingCep"
    @keydown="getCursorPosition"
    @keyup="checkCep()"
    @input="inputHandler()"
    @paste="clearPaste"
  />
</template>

<script>
import { debounce } from 'debounce'

export default {
  name: 'ImobiaInput',
  props: {
    // v-model basicamente
    value: {
      type: [Number, String, Boolean, Object],
      default: '',
    },

    maxlength: {
      type: [Number, String],
      default: '',
    },
    // label para parecer em cima da input (se não for declarada, a input funciona normalmente)
    label: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'primary',
    },
    hint: {
      type: [String, Boolean],
      default: '',
    },
    type: {
      type: String,
      required: false,
      default: 'default',
    },
    prefix: {
      type: String,
      required: false,
      default: '',
    },
    suffix: {
      type: String,
      required: false,
      default: '',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    extraRules: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: [Number, Boolean, String],
      default: false,
    },
    number: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      val: this.value,
      cursorPosition: 0,
      types: [],
      charIndex: 0,
      options: {
        default: '',
        cpf: '###.###.###-##',
        cnpj: '##.###.###/####-##',
        celular: '(##) #####-####',
        telefone: '(##) ####-####',
        cep: '#####-###',
        password: '',
      },
      cepError: false,
      loadingCep: false,
    }
  },
  computed: {
    rules() {
      return this.required
        ? [
            !this.cepError || 'CEP não encontrado',
            v => !!v || 'Este campo é obrigatório',
            ...this.extraRules,
          ]
        : [!this.cepError || 'CEP não encontrado', ...this.extraRules]
    },
    currentMask() {
      return this.options[this.types[0]].length < this.val.length
        ? this.options[this.types[1]] ?? this.options[this.types[0]]
        : this.options[this.types[0]]
    },
    charLocations() {
      return this.getAllIndexes(this.currentMask, '#') ?? []
    },
  },
  watch: {
    value(val, lastVal) {
      if (val) {
        /*        this.charLocations.forEach((location) => {
          formattedVal =
            formattedVal.replace?.(this.currentMask[location], '') ?? ''
        })
        /*   console.log(formattedVal)
        this.val = formattedVal */

        this.maskInput(val)
      } else {
        this.val = ''
        this.$emit('input', this.val)
      }
    },
  },

  created() {
    this.types = this.type
      .split(' ')
      .sort((a, b) => this.options[a].length - this.options[b].length)
    this.maskInput(this.value)
  },
  methods: {
    clearPaste(e) {
      if (this.number) {
        e.preventDefault()
        let data = e.clipboardData.getData('text/plain')
        data = data.split('').reduce((acc, cur) => {
          acc += isNaN(cur) ? '' : cur.toString()
          return acc
        })
        this.maskInput(data)
      }
    },
    checkCep() {
      if (this.types[0] === 'cep' && this.val.length >= 9) {
        this.pesquisarCep(this.val.replace('-', ''))
      }
    },
    inputHandler() {
      if (this.options[this.types[0]]) {
        this.maskInput(this.val)
      } else {
        this.$emit('input', this.val)
      }
    },
    getCursorPosition(e) {
      if (e.key === 'Backspace') {
        this.cursorPosition = e.target.selectionStart - 1
      } else if (this.number && isNaN(e.key) && !this.isDefaultKey(e)) {
        e.preventDefault()
      } else {
        this.cursorPosition = this.charLocations.includes(
          e.target.selectionStart,
        )
          ? this.charLocations.includes(e.target.selectionStart + 1)
            ? e.target.selectionStart + 3
            : e.target.selectionStart + 2
          : e.target.selectionStart + 1
      }
    },
    isDefaultKey(event) {
      const defaultKeys = [
        'Delete',
        'ArrowLeft',
        'ArrowUp',
        'ArrowRight',
        'ArrowDown',
        'Tab',
        'Escape',
      ]
      return (
        ((event.key === 'v' || event.key === 'c') && event.ctrlKey) ||
        defaultKeys.includes(event.key)
      )
    },
    maskInput(value) {
      if (this.options[this.types[0]] && value) {
        // define uma variável temporária 'val' para evitar que this.val se modifique sem necessidade ou com bugs
        this.charLocations.forEach((location) => {
          value = value.replace(this.currentMask[location], '')
        })
        let val = value

        // passa por cada caractere especial e coloca na string
        this.charLocations.forEach((location) => {
          // se for possível colcar o caractere, colocar
          if (location < val.length) {
            // aqui passamos  o caractere a ser inserido, o index da string que ele deve ser inserido e a string na qual será adicionado
            // o slice serve para respeitar o tamanho máximo da string
            val = this.insertChar(
              this.currentMask[location],
              location,
              val,
            ).slice(0, this.currentMask.length)
          }
        })
        // formata o valor (sem mascara) e emite o valor
        this.$nextTick(() => {
          this.val = val

          this.$nextTick(() => {
            this.$refs.textField?.$el
              .querySelector('input')
              .setSelectionRange(this.cursorPosition, this.cursorPosition)
          })

          this.$emit('input', value)
        })
      } else if (!value) {
        this.$emit('input', '')
      } else if (!this.options[this.types[0]]) {
        this.val = value
        this.$emit('input', value)
      }
    },
    insertChar(char, index, val) {
      // checa se o caractere ja foi inserido na string (evitar duplicações principalmente na hora de apagar)
      if (val[index] === char) {
        return val
      }
      // insere o caractere no index escolhido
      return val.slice(0, index) + char + val.slice(index)
    },
    getAllIndexes(arr, val) {
      const indexes = []
      let i
      for (i = 0; i < arr.length; i++) {
        if (arr[i] !== val) {
          indexes.push(i)
        }
      }
      return indexes
    },

    pesquisarCep: debounce(function (value) {
      this.loadingCep = true
      fetch('https://viacep.com.br/ws/' + value + '/json/')
        .then(response => response.json())
        .then((res) => {
          this.cepError = res.erro

          if (!res.erro) {
            const endereco = {
              bairro: res.bairro ?? '',
              cidade: res.localidade ?? '',
              rua: res.logradouro ?? '',
              //  complemento: res.complemento ?? '',
              uf: res.uf ?? '',
            }
            this.$emit('address', endereco)
          }
        })
        .finally(() => {
          this.loadingCep = false
        })
    }, 600),
  },
}
</script>

<style></style>
