<template>
  <imobia-filters
    :filters="filtros"
    :reset-function="limparFiltros"
    module="portais"
    action="carregarPortais"
    title="Pesquisar portal"
    hide-more
  >
    <v-row>
      <v-col cols="12" lg="10">
        <imobia-input
          v-model="filtros.allinone"
          dense
          outlined
          hide-details
          label="Nome"
        />
      </v-col>
      <v-col cols="12" lg="2">
        <imobia-select
          v-model="filtros.status"
          label="Status"
          :items="statusOptions"
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
        allinone: '',
        status: {},
      },

      statusOptions: [
        { id: null, nome: 'Todos' },
        { id: 1, nome: 'Ativos' },
        { id: 0, nome: 'Inativos' },
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
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
