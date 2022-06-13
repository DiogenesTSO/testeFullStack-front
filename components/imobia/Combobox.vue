<template>
  <div>
    <v-combobox
      v-model="val"
      dense
      hide-selected
      :label="label"
      hide-details="auto"
      multiple
      outlined
      small-chips
      deletable-chips
      :hint="hint"
    />
  </div>
</template>

<script>
export default {
  name: 'ImobiaCombobox',
  props: {
    value: {
      type: [Number, String, Boolean, Object, Array],
      default: () => {},
    },
    label: {
      type: String,
      default: '',
    },
    hint: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      val: this.value,
    }
  },
  watch: {
    value: {
      handler() {
        this.val = this.value
      },
      deep: true,
    },
    'val.length'() {
      this.$emit('input', this.val)
    },
  },
  mounted() {},
}
</script>

<style></style>
