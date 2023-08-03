<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col cols="12" md="3">
            <imobia-select v-model="empresa.tipo" :items="tiposEmpresa" required label="Tipo de empresa" />
          </v-col>
          <v-col cols="12" md="5">
            <imobia-input v-model="empresa.nome_fantasia" required label="Nome fantasia" />
          </v-col>
          <v-col cols="12" md="4">
            <imobia-input v-model="empresa.nome" required label="Razão social" />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-row justify="center">
          <v-col cols="12" md="3">
            <imobia-input v-model="empresa.cnpj" required type="cpf cnpj" label="CNPJ" />
          </v-col>
          <v-col v-if="empresa.tipo === 'PF'" cols="12" md="3">
            <imobia-date-picker
              v-model="empresa.data_nascimento"
              left
              min="1890-01-01"
              label="Data de nascimento"
            />
          </v-col>
          <v-col cols="12" md="3">
            <imobia-input v-model="empresa.creci" required label="CRECI" />
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
        { id: 'PF', nome: 'Pessoa Física' },
        { id: 'INDIVIDUAL', nome: 'Empresário Individual' },
        { id: 'MEI', nome: 'MEI' },
        { id: 'LIMITED', nome: 'LTDA ou EIRELI' },
      ],
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

