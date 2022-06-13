<template>
  <v-menu
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    :offset-x="left || right"
    :left="left"
    :right="right"
    min-width="auto"
    max-width="290"
  >
    <template #activator="{ on, attrs }">
      <v-text-field
        v-if="range"
        v-model="dataFormatada"
        :required="required"
        :rules="rules"
        dense
        readonly
        outlined
        hide-details="auto"
        :label="label"
        :disabled="disabled"
        v-bind="attrs"
        v-on="on"
      />
      <v-text-field
        v-else
        :value="val"
        :required="required"
        :rules="rules"
        dense
        type="date"
        outlined
        hide-details="auto"
        :label="label"
        :disabled="disabled"
        v-bind="attrs"
        @input="checkDate"
        v-on="on"
      />
    </template>
    <v-date-picker
      v-model="val"
      width="290"
      header-color="primary"
      color="primary"
      locale="pt-br"
      :min="min"
      :range="range"
      :disabled="disabled"
      @input="emitInput"
    />
  </v-menu>
</template>

<script>
import moment from 'moment'

export default {
  name: 'DatePicker',

  props: {
    value: {
      type: [Object, Array, String],
      default: () => moment().format('YYYY-MM-DD'),
    },
    range: {
      type: Boolean,
      default: false,
    },
    min: {
      type: String,
      default: '',
    },
    left: {
      type: Boolean,
      default: false,
    },
    right: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    currentDate: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      val: this.range ? Object.values(this.value).filter(v => v) : this.value,
    }
  },
  computed: {
    rules() {
      return this.required ? [v => !!v || 'Este campo é obrigatório'] : []
    },
    dataFormatada() {
      if (this.range) {
        const value = this.val
        const datas = value.sort().map((data) => {
          return moment(data).format('DD/MM/YYYY')
        })
        return datas.join(' ~ ')
      } else {
        return this.val
      }
    },
  },
  watch: {
    value() {
      if (this.val !== this.value) {
        this.$nextTick(() => {
          this.val = this.range
            ? Object.values(this.value).filter(v => v)
            : this.value
        })
      }
    },
  },
  mounted() {
    if (!this.range && !this.value && this.currentDate) {
      this.val = moment().format('YYYY-MM-DD')

      this.$emit('input', this.val)
    }
  },
  methods: {
    format(date) {
      const rangeFormatada = []

      if (this.range) {
        for (let i = 0; i < date.length; i++) {
          rangeFormatada[i] = moment(date[i]).format('DD/MM/YYYY')
        }
      }

      return this.range ? rangeFormatada : moment(date).format('LL')
    },
    checkDate(value) {
      if (moment(value, 'YYYY-MM-DD', true).isValid()) {
        this.val = value
        this.$emit('input', value)
      }
    },

    emitInput() {
      if (this.range) {
        const value = this.val
        const formatted = {
          min: value.sort()[0],
          max: value.sort()[1],
        }
        this.$emit('input', formatted)
      } else {
        this.$emit('input', this.val)
      }
    },
  },
}
</script>

<style></style>
