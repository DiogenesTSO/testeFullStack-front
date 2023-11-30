<template>
  <imobia-filters
    :filters="filtros"
    :reset-function="limparFiltros"
    module="chavesApi"
    action="carregarChaves"
    title="Pesquisar chaves de api"
    hide-more
  >
    <v-row>
      <v-col cols="12" lg="2">
        <imobia-input v-model="filtros.empresa_id" dense outlined hide-details label="Id empresa" />
      </v-col>
      <v-col cols="12" lg="2">
        <imobia-select v-model="filtros.status" label="Status" :items="statusSites" />
      </v-col>
    </v-row>
  </imobia-filters>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => { },
    },
  },
  data() {
    return {
      filtros: {
        status: 'Ativa',
        empresa_id: '',
        per_page: 20,
      },

      statusSites: [
        { id: 'Ativa', nome: 'Ativa' },
        { id: 'Inativa', nome: 'Inativa' },
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
        empresa_id: '',
        status: 'Ativa',
        per_page: 20,
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
