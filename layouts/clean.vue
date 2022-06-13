<template>
  <v-app>
    <imobia-notify />

    <v-main>
      <Nuxt />
    </v-main>

    <imobia-page-load />
  </v-app>
</template>

<script>
export default {
  data() {
    return {}
  },

  head() {
    return {
      title: this.titulo,
    }
  },
  computed: {
    titulo() {
      return this.$store.state.layout.title
    },
  },

  mounted() {
    this.$store.dispatch('layout/carregarModoEscuro')
  },

  methods: {
    toggleDarkMode() {
      this.$store.dispatch('layout/atualizarModoEscuro')
    },
  },
}
</script>
<style></style>
