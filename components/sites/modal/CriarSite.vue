<template>
  <imobia-modal
    id="criarSiteRapido"
    medium
    :loading-button="loading"
    title="Criar chave de API"
    @save="submit()"
    @close="limpar()"
  >
    <v-form ref="form_site" v-model="valid" lazy-validation class="pt-5">
      <v-row>
        <v-col cols="12" md="9">
          <imobia-input v-model="site.url" label="Url" required />
        </v-col>
        <v-col cols="12" md="3">
          <imobia-input
            v-model="site.empresa_id"
            label="Id da empresa"
            required
          />
        </v-col>
        <v-col cols="12" md="6">
          <imobia-input
            v-model="site.email_interesse_imovel"
            label="Email de interesse"
            required
          />
        </v-col>
        <v-col cols="12" md="6">
          <imobia-input v-model="site.api_key" label="Chave de API" required />
        </v-col>
      </v-row>
    </v-form>
  </imobia-modal>
</template>

<script>
export default {
  name: 'CriarSiteRapido',

  data() {
    return {
      site: {
        empresa_id: '',
        email_interesse_imovel: '',
        url: '',
        api_key: '',
      },
      loading: false,
      valid: false,
    }
  },

  methods: {
    validar() {
      return new Promise((resolve, reject) => {
        this.$refs.form_site.validate()

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
            .dispatch('sites/cadastrarChave', {
              empresa_id: this.site.empresa_id,
              data: this.site,
            })
            .then(() => {
              this.$root.$emit('criarSiteRapido', false)
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    },

    limpar() {
      this.site = {
        empresa_id: '',
        url: '',
        email_interesse_imovel: '',
        api_key: '',
      }
      this.$refs.form_site.resetValidation()

      this.$emit('fechouModal')
    },
  },
}
</script>

<style></style>
