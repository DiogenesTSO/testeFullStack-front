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
        :value="dataFormatada"
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
    </template>
    <v-date-picker
      v-model="val"
      width="290"
      type="month"
      header-color="primary"
      color="primary"
      locale="pt-br"
      :disabled="disabled"
      @input="emitInput()"
    />
  </v-menu>
</template>

<script>
import moment from 'moment'

export default {
  name: 'DatePicker',

  props: {
    value: {
      type: Object,
      default: () => ({
        min: moment().startOf('month').format('YYYY-MM-DD'),
        max: moment().endOf('month').format('YYYY-MM-DD'),
      }),
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
      val: this.value.min
        ? moment(this.value.min).format('YYYY-MM')
        : moment().format('YYYY-MM'),
    }
  },
  computed: {
    rules() {
      return this.required ? [v => !!v || 'Este campo é obrigatório'] : []
    },
    dataFormatada() {
      return this.$format.capitalizeFirst(
        moment(this.val).format('MMMM [de] YYYY'),
      )
    },
  },
  watch: {
    value() {
      this.val = moment(this.value.min).format('YYYY-MM')
    },
  },
  mounted() {
    if (!this.value.min && this.currentDate) {
      this.val = moment().format('YYYY-MM')
    }
  },
  methods: {
    emitInput() {
      this.$emit('input', {
        min: moment(this.val).startOf('month').format('YYYY-MM-DD'),
        max: moment(this.val).endOf('month').format('YYYY-MM-DD'),
      })
    },
  },
}
</script>

<style lang="scss"></style>
