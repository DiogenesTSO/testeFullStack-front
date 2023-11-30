<template>
  <imobia-modal
    id="criarChaveRapido"
    medium
    :loading-button="loading"
    title="Criar chave de API externa"
    @save="submit()"
    @close="limpar()"
  >
    <v-form ref="form_chave" v-model="valid" lazy-validation class="pt-5">
      <v-row>
        <v-col cols="12" md="3">
          <imobia-input v-model="chaveApi.empresa_id" label="Id da empresa" required />
        </v-col>
        <v-col cols="12" md="6">
          <imobia-input v-model="chaveApi.chave" label="Chave de API" required />
        </v-col>
      </v-row>
    </v-form>
  </imobia-modal>
</template>

<script>
export default {
  name: 'CriarChaveRapido',

  data() {
    return {
      chaveApi: {
        empresa_id: '',
        chave: '',
      },
      loading: false,
      valid: false,
    }
  },

  methods: {
    validar() {
      return new Promise((resolve, reject) => {
        this.$refs.form_chave.validate()

        this.$nextTick(() => {
          resolve(this.valid)
        })
      })
    },

    submit() {
      this.validar().then((valid) => {
        if (valid) {
          this.loading = true

          this.$store
            .dispatch('chavesApi/cadastrarChave', {
              data: this.chaveApi,
            })
            .then(() => {
              this.$root.$emit('criarChaveRapido', false)
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    },

    limpar() {
      this.chaveApi = {
        empresa_id: '',
        chave: '',
      }
      this.$refs.form_chave.resetValidation()

      this.$emit('fechouModal')
    },
  },
}
</script>

<style></style>
