<template>
  <v-data-table
    hide-default-footer
    :headers="headers"
    :items="items"
    :dense="dense"
    disable-filtering
    calculate-widths
    :show-select="selectable"
    disable-pagination
    disable-sort
    no-data-text="Nada encontrado"
    class="w-100"
    :class="
      transparent
        ? 'transparent'
        : $vuetify.theme.dark
          ? 'card lighten-1'
          : 'card darken-1'
    "
    :loading="loading"
    loading-text="Carregando..."
  >
    <template
      v-for="header in headers"
      #[getHeader(header.value)]="{item, index}"
    >
      <slot :name="header.value" :item="item" :index="index">
        {{ item[header.value] }}
      </slot>
    </template>
    <template #body.append>
      <slot name="footer" />
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'ImobiaTable',

  props: {
    dense: {
      type: Boolean,
      default: false,
    },
    transparent: {
      type: Boolean,
      default: false,
    },
    selectable: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },

    clickable: {
      type: Boolean,
      default: false,
    },

    value: {
      type: Array,
      default: () => [],
    },

    headers: {
      type: Array,
      default: () => [],
    },

    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectAll: false,
      selected: this.value,
    }
  },
  watch: {
    selectAll() {
      this.selectAll ? (this.selected = this.rows) : (this.selected = [])
    },
    'selected.length'() {
      this.$emit('input', this.selected)
    },
    'value.length'() {
      this.selected = this.value
    },
  },
  methods: {
    getHeader(name) {
      return 'item.' + name
    },
  },
}
</script>

<style lang="scss">
.item {
  padding: 8px;
}
</style>
