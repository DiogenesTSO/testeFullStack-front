<template>
  <v-row>
    <v-col cols="12">
      <span class="text-h6">Envio de documentos ASAAS</span>

      <imobia-drop-zone
        v-model="empresa.documentos_asaas"
        class="mt-2"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'DocumentosAsaas',
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
      documento: []
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
