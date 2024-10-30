<template>
  <div
    class="d-flex"
    style="height: 40px !important;"
    :class="type === 'multi' ? 'w-100' : ''"
  >
    <div :class="type === 'multi' ? 'shrink' : 'w-100'">
      <imobia-vuetify-money
        v-model="val"
        :class="inputClass"
        :color="color"
        :disabled="disabled"
        :readonly="readonly"
        :label="label"
        validate-on-blur
        :hide-details="type === 'multi' ? false : 'auto'"
        :hint="subLabel || checkHint()"
        dense
        :rules="rules"
        outlined
        lazy-validation
        :required="required"
        :persistent-hint="!!(subLabel || type === 'multi')"
        :prefix="prefix ? prefix : selected === 'real' ? 'R$' : ''"
        :suffix="suffix ? suffix : selected === 'percentual' ? '%' : ''"
        :options="{
          locale: 'pt-BR',
          prefix: '',
          suffix: '',
          length: 21,
          precision: decimalLength,
        }"
        @blur="blurHandler"
      >
        <!-- <template #prepend>
      <v-btn dark-toggle
        v-if="type === 'multi'"
        v-model="selected"
        mandatory
        color="primary"
      >
        <v-btn dark value="real" small>
          <v-icon small>
            mdi-currency-brl
          </v-icon>
        </v-btn>

        <v-btn dark value="percentual" small>
          <v-icon small>
            mdi-percentual
          </v-icon>
        </v-btn>
      </v-btn-toggle>
    </template> -->
        <template #message>
          <v-tooltip
            v-if="type === 'multi' && (val || !wasFocused || !required)"
            right
          >
            <template #activator="{ on, attrs }">
              <a
                v-bind="attrs"
                class="clickable-text primary--text text-no-wrap"
                v-on="on"
                @click="changeType"
              >
                (Preencher em {{ selected == 'real' ? '%' : 'R$' }})
              </a>
            </template>
            <span>Clique para alterar</span>
          </v-tooltip>
          <span
            v-else-if="type === 'multi' && !val && wasFocused"
            class="error--text text-no-wrap"
          >
            Este campo é obrigatório
          </span>
        </template>
      </imobia-vuetify-money>
    </div>

    <h3 v-if="type === 'multi'" :class="'mr-2 my-3 ml-4 font-weight-regular '">
      {{ selected === 'real' ? '' : 'R$' }}&nbsp;{{
        hint ? $format.money(hint) : '0,00'
      }}{{ selected === 'real' ? '%' : '' }}
    </h3>
  </div>
</template>

<script>
export default {
  name: 'Value',
  props: {
    color: {
      type: String,
      default: 'green',
    },
    inputClass: {
      type: String,
      default: '',
    },
    refValue: {
      type: [String, Number],
      default: 0,
    },
    // Define o tipo da input: percentual, real ou multi (select com dinheiro e porcentagem)
    type: {
      type: String,
      default: '',
    },
    // caso seja necessário usar um sufixo ou prefixo (diferente de % e R$)
    prefix: {
      type: String,
      default: '',
    },
    suffix: {
      type: String,
      default: '',
    },
    // Define o valor máximo que a input aceita
    max: {
      type: [String, Number],
      default: '',
    },
    // v-model basicamente
    value: {
      type: [Number, String, Boolean, Object],
      default: 0,
    },
    required: {
      type: [Boolean, String, Number],
      default: false,
    },
    // label para parecer em cima da input (se não for declarada, a input funciona normalmente)
    label: {
      type: String,
      default: '',
    },
    subLabel: {
      type: String,
      default: '',
    },
    decimalLength: {
      type: [String, Number],
      default: 2,
    },
    readonly: {
      type: Boolean,
      default: false,
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
      wasFocused: false,
      val: this.type === 'multi' ? this.value[this.select] : this.value ?? 0,
      selected: this.type === 'multi' ? this.select : this.type,
      rules: this.required
        ? [
            (v) => {
              return this.testVal() || 'Este campo é obrigatório!'
            },
          ]
        : [],
    }
  },
  computed: {
    hint() {
      return this.selected === 'real'
        ? this.value?.percentual
        : this.value?.real
    },
  },
  watch: {
    refValue() {
      if (this.val) {
        if (this.selected === 'percentual') {
          this.$emit('input', {
            percentual: this.val,
            real: (this.val / 100) * parseFloat(this.refValue),
          })
        } else {
          this.$emit('input', {
            percentual: (100 * this.val) / parseFloat(this.refValue),
            real: this.val,
          })
        }
      }
    },
    selected() {
      this.val = this.value[this.selected]
    },
    value: {
      handler() {
        this.val =
          this.type === 'multi' ? this.value[this.selected] : this.value
        this.$nextTick(() => {
          this.val =
            this.type === 'multi' ? this.value[this.selected] : this.value
        })
      },
      deep: true,
    },

    val() {
      if (this.val < 0) {
        this.$nextTick(() => {
          this.val = -1 * this.val
        })
      }

      if (this.type !== 'multi') {
        if (this.max !== '' && this.val > parseFloat(this.max)) {
          this.$nextTick(() => {
            this.val = parseFloat(this.max)
            this.$emit('input', this.val)
          })
        } else {
          this.$nextTick(() => {
            this.$emit('input', parseFloat(this.val))
          })
        }
      }

      if (this.type === 'multi' && this.refValue) {
        if (this.selected === 'percentual') {
          if (this.val > 100) {
            this.$nextTick(() => {
              this.val = 100
              this.$emit('input', {
                real: this.refValue,
                percentual: 100,
              })
            })
            return
          }
        } else if (this.val > this.refValue) {
          this.$nextTick(() => {
            this.val = this.refValue
            this.$emit('input', {
              real: parseFloat(this.refValue),
              percentual: 100,
            })
          })
          return
        }
        if (this.selected === 'percentual') {
          this.$emit('input', {
            percentual: this.val,
            real: (this.val / 100) * parseFloat(this.refValue),
          })
        } else {
          this.$emit('input', {
            percentual: (100 * this.val) / parseFloat(this.refValue),
            real: this.val,
          })
        }
      }
    },
    max() {
      if (this.max !== '' && this.val > parseFloat(this.max)) {
        this.val = parseFloat(this.max)
        this.$emit('input', parseFloat(this.val))
      } else {
        this.$emit('input', parseFloat(this.val))
      }
    },
  },

  methods: {
    blurHandler() {
      this.$emit('blur')
      this.wasFocused = true
    },
    checkHint() {
      return this.refValue ? '  ' : ''
    },
    testVal() {
      return this.type === 'multi'
        ? this.value[this.selected] > 0
        : this.value > 0
    },
    changeType() {
      this.selected = this.selected === 'percentual' ? 'real' : 'percentual'
    },
  },
}
</script>

<style></style>
