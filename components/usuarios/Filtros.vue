<template>
  <imobia-filters
    :filters="filtros"
    :reset-function="limparFiltros"
    module="usuarios"
    action="carregarUsuarios"
    title="Pesquisar usuário"
    hide-more
  >
    <v-row>
      <v-col cols="12" lg="7">
        <imobia-input
          v-model="filtros.nome"
          dense
          outlined
          hide-details
          label="Nome"
        />
      </v-col>
      <v-col cols="12" lg="3">
        <imobia-input
          v-model="filtros.email"
          dense
          outlined
          hide-details
          label="E-mail"
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
        nome: '',
        email: '',
        status: 'A',
      },

      statusOptions: [
        { id: null, nome: 'Todos' },
        { id: 'A', nome: 'Ativos' },
        { id: 'B', nome: 'Bloqueados' },
        { id: 'I', nome: 'Inativos' },
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
        nome: '',
        email: '',
        status: 'A',
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
