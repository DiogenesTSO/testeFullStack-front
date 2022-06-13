<template>
  <v-select
    v-model="val"
    dense
    outlined
    hide-details="auto"
    :multiple="multiple"
    :items="items"
    :disabled="disabled"
    :required="required"
    :return-object="returnObject"
    :rules="rules"
    item-text="nome"
    :clearable="clearable"
    item-value="id"
    :label="label"
    no-data-text="Nenhum resultado encontrado"
    :menu-props="{ bottom: true, offsetY: true }"
    @input="$emit('input', val)"
  >
    <template #selection="{ item, index }">
      <span v-if="index === 0" class="text-truncate">{{ item.nome }}</span>

      <span v-if="index === 1" class="grey--text text-caption pl-1">
        (+{{ val.length - 1 }})
      </span>
    </template>
  </v-select>
</template>

<script>
export default {
  name: 'ImobiaSelect',
  props: {
    label: {
      type: String,
      default: '',
    },
    multiple: {
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
    clearable: {
      type: Boolean,
      default: false,
    },
    returnObject: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [Number, String, Boolean, Object, Array],
      default: 0,
    },
    items: {
      type: Array,
      default: () => [],
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      val: this.value,
    }
  },
  computed: {
    rules() {
      return this.required ? [v => !!v || 'Este campo é obrigatório'] : []
    },
  },
  watch: {
    value() {
      this.val = this.value
    },
  },
  mounted() {},
}
</script>

<style></style>
