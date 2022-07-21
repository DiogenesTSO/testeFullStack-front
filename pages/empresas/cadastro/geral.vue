<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col cols="12" md="5">
            <imobia-input label="Nome fantasia" />
          </v-col>
          <v-col cols="12" md="5">
            <imobia-select :items="tiposEmpresa" label="Tipo de empresa" />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-row>
          <v-col cols="12" md="4">
            <imobia-input label="CNPJ" />
          </v-col>
          <v-col cols="12" md="3">
            <imobia-input label="CRECI" />
          </v-col>
          <v-col cols="12" md="4">
            <imobia-input label="Razão social" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>


<script>
export default {
  name: 'EmpresaGeral',
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
      tiposEmpresa: [
        { label: 'Pessoa Física', value: 'PF' },
        { label: 'Empresário Individual', value: 'INDIVIDUAL' },
        { label: 'MEI', value: 'MEI' },
        { label: 'LTDA ou EIRELI', value: 'LIMITED' },
      ],
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

