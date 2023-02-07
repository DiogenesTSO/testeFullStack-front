<template>
  <v-row>
    <v-col cols="12">
      <span class="text-h6">Arquivos</span>

      <imobia-drop-zone
        v-model="empresa.documentos"
        class="mt-2"
        @delete="empresa.documentosRemovidos.push(...$event.map((img) => img.id))"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Contratos',
  transition: 'slide-y-transition',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      imageSelectedIndex: 0,
      showModal: false,
      empresa: this.value,
    }
  },
  watch: {
    value: {
      handler() {
        this.empresa = this.value
      },
      deep: true,
    },
    empresa: {
      handler() {
        this.$emit('input', this.empresa)
      },
      deep: true,
    },
  },
}
</script>
