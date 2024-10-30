<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col cols="12" md="4">
          <imobia-input v-model="empresa.telefone_01" type="telefone" required label="Telefone primário" />
        </v-col>
        <v-col cols="6" md="4">
          <imobia-input v-model="empresa.telefone_02" type="telefone" label="Telefone secundário" />
        </v-col>
        <v-col cols="6" md="4">
          <imobia-input v-model="empresa.celular" type="celular" label="Celular" />
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
      empresa: this.value,
    }
  },
  watch: {
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
