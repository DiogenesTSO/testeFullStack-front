<template>
  <imobia-modal
    id="modalAlterarEmpresa"
    v-model="show"
    small
    title="Alterar Empresa"
    :loading-button="loading"
    @input="reset"
    @save="submit"
  >
    <v-form ref="formAlterarEmpresa" v-model="valid" @submit="submit">
      <imobia-auto-complete
        v-model="codigoEmpresa"
        module="empresas"
        label="Empresa"
        required
      />
    </v-form>
  </imobia-modal>
</template>

<script>
export default {
  name: 'AlterarEmpresa',
  props: {},
  data() {
    return {
      show: false,
      loading: false,
      valid: true,
      codigoEmpresa: '',
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
  },
  methods: {
    submit() {
      this.$refs.formAlterarEmpresa.validate()
      if (!this.valid) {
        return false
      }
      this.loading = true
      this.$store
        .dispatch('auth/atualizarUsuarioEmpresa', {
          empresa_id: this.codigoEmpresa,
        })
        .then((res) => {
          this.reset()

          this.show = false
        })
        .finally(() => {
          this.loading = false
        })
    },

    reset(val = 0) {
      if (!val) {
        this.$refs.formAlterarEmpresa.reset()
      }
    },
  },
}
</script>

<style></style>
