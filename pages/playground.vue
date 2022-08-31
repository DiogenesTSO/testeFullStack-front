<template>
  <div>
    <v-btn color="primary" @click="criarChave">
      CRIAR PIX
    </v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({}),

  computed: {
    usuario() {
      return this.$store.getters['auth/currentUser']
    },
  },

  mounted() {},
  methods: {
    criarChave() {
      this.$store.dispatch('empresas/cadastrarPix', {
        empresa_id: this.usuario.empresa.id,
        data: { apelido: 'testePix', type: 'EVP' },
      })
    },
  },
}
</script>
