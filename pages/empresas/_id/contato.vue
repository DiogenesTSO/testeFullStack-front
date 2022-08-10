<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col cols="12" md="4">
          <imobia-input v-model="empresa.filial.telefone_01" type="telefone" required label="Telefone primário" />
        </v-col>
        <v-col cols="6" md="4">
          <imobia-input v-model="empresa.filial.telefone_02" type="telefone" label="Telefone secundário" />
        </v-col>
        <v-col cols="6" md="4">
          <imobia-input v-model="empresa.filial.celular" type="telefone" label="Celular" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'EmpresaContato',
  transition: 'slide-y-transition',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      empresa: this.$help.deepClone(this.value)
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

<style>

</style>
