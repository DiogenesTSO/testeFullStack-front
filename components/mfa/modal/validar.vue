<template>
  <imobia-modal
    id="modalValidarMfa"
    v-model="show"
    title="Autenticação em 2 fatores"
    :disabled="loading"
    small
    no-action
    @input="reset"
  >
    <div>
      <div class="mb-4">
        Informe o código de validação para concluir o login
      </div>
      <div>
        <v-otp-input v-model="codigo_mfa" :disabled="loading" @input="formatToUpperCase" @finish="validar" />
      </div>
    </div>
  </imobia-modal>
</template>

<script>
export default {
  name: 'ModalValidarMfa',
  data() {
    return {
      show: false,
      loading: false,
      mensagem: true,
      usuario: {},
      codigo_mfa: ''
    }
  },

  mounted() {
    this.$nuxt.$on('modalValidarMfaMfa', (dados) => {
      this.usuario = dados
    })
  },

  methods: {
    validar() {
      this.loading = true
      this.$store.dispatch('auth/challengeMfa', { codigo: this.codigo_mfa, user: this.usuario }).then(() => {
        if (this.$route.name === 'index') {
          this.show = false
          window.location.reload()
        } else {
          this.$router.push({
            name: 'index'
          })
        }
      }).finally(() => {
        this.show = false
        this.loading = false
      })
    },

    formatToUpperCase() {
      this.codigo_mfa = this.codigo_mfa.toUpperCase()
    },

    reset(val = 0) {
      if (!val) {
        Object.assign(this.$data, this.$options.data())
      }
    },
  },
}
</script>

<style></style>
