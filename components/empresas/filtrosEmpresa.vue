<template>
  <imobia-filters
    :filters="filtros"
    :reset-function="limparFiltros"
    module="empresas"
    action="carregarEmpresas"
    title="Pesquisar Empresas"
    hide-more
  >
    <v-row>
      <v-col cols="12" lg="8">
        <imobia-input
          v-model="filtros.nome"
          dense
          outlined
          hide-details
          label="Nome"
        />
      </v-col>
      <v-col cols="12" lg="2">
        <imobia-input
          v-model="filtros.id"
          dense
          outlined
          hide-details
          label="Codigo empresa"
        />
      </v-col>
      <v-col cols="12" lg="2">
        <imobia-select
          v-model="filtros.status"
          label="Status"
          :items="statusEmpresas"
        />
      </v-col>
    </v-row>
  </imobia-filters>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      filtros: {
        nome: '',
        status: 'A',
        id: '',
        per_page: 20,
      },

      statusEmpresas: [
        { id: 'A', nome: 'Ativo' },
        { id: 'B', nome: 'Bloqueada' },
        { id: 'C', nome: 'Cancelada' },
        { id: 'E', nome: 'Teste expirado' },
        { id: 'M', nome: 'Em migração' },
        { id: 'T', nome: 'Em teste' },
      ],
    }
  },
  watch: {
    filtros: {
      handler() {
        this.$emit('input', this.filtros)
      },
      deep: true,
    },
  },

  mounted() {
    this.$emit('input', this.filtros)
  },

  methods: {
    limparFiltros() {
      this.filtros = {
        allinone: '',
        status: 1,
        per_page: 20,
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
