<template>
  <div>
    <v-text-field
      ref="input"
      v-model="val"
      :class="small ? 'transform-small centered-input' : ' centered-input'"
      outlined
      type="number"
      hide-details="auto"
      :label="label"
      :rules="rules"
      :required="required"
      text-center
      dense
      append-icon="mdi-plus"
      prepend-inner-icon="mdi-minus"
      @focus="selectAll()"
      @click:append="increaseValue()"
      @click:prepend-inner="decreaseValue()"
    />
  </div>
</template>

<script>
export default {
  name: 'ImobiaInputNumber',
  props: {
    value: {
      type: [String, Number],
      default: 0,
    },
    label: {
      type: String,
      default: '',
    },
    max: {
      type: [String, Number],
      default: '',
    },
    min: {
      type: [String, Number],
      default: '',
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      val: this.value,
    }
  },

  computed: {
    required() {
      return !!(this.max || this.min)
    },
    rules() {
      return this.required
        ? [
            v =>
              !!(parseInt(v) <= parseInt(this.max)) ||
              'Valor máximo é ' + this.max,
            v =>
              !!(parseInt(v) >= parseInt(this.min)) ||
              'Valor minimo é ' + this.min,
            v => !!(parseInt(v) > 0 || 'Por favor forneça um valor '),
          ]
        : []
    },
  },
  watch: {
    value() {
      this.val = this.value ? parseInt(this.value) : 0
    },
    val() {
      this.$emit('input', parseInt(this.val))
    },
  },

  methods: {
    selectAll() {
      this.$nextTick(() => {
        this.$refs.input.$el.querySelector('input').select()
      })
    },
    increaseValue() {
      if (this.val < this.max || !this.required) {
        this.val++
        this.$emit('increase', this.val)
      }
    },
    decreaseValue() {
      if (this.val >= 1) {
        this.val--
        this.$emit('decrease', this.val)
      }
    },
  },
}
</script>
<style scoped>
.transform-small {
  transform: scale(0.6);
  min-width: 100px !important;
  max-width: 100px !important;
  margin-top: -8px;
  margin-bottom: -8px;
  margin-left: -20px;
  margin-right: -20px;
}
</style>
