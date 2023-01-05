<template>
  <imobia-modal
    id="editarSite"
    medium
    :loading-button="loading"
    title="Editar chave de API"
    @save="submit()"
    @close="limpar()"
  >
    <v-form ref="form_site" v-model="valid" lazy-validation class="pt-5">
      <v-row>
        <v-col cols="12" md="6">
          <imobia-input v-model="site.url" label="Url" required />
        </v-col>
        <v-col cols="12" md="3">
          <imobia-input v-model="site.id" label="Id da empresa" required />
        </v-col>
        <v-col cols="12" md="3">
          <imobia-select v-model="site.status" :items="status_options" label="Status" />
        </v-col>
        <v-col cols="12" md="6">
          <imobia-input v-model="site.email_interesse_imovel" label="Email de interesse" required />
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
  name: 'EditarSite',

  props: {
    currentSite: {
      type: Object,
      required: false,
      default: () => {
        return {
          id: '',
          url: '',
          empresa: {},
          email_interesse_imovel: '',
          api_key: '',
          status: '',

        }
      },
    },
  },
  data() {
    return {
      site: { ...this.currentSite },
      loading: false,
      valid: false,
      status_options: [{ id: 'INATIVO', nome: 'Inativo' }, { id: 'ATIVO', nome: 'Ativo' }]
    }
  },
  watch: {
    currentSite: {
      handler() {
        this.site = { ...this.currentSite }
      },
      deep: true,
    },
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
            .dispatch('sites/atualizarChave', {
              id: this.site.id,
              empresa_id: this.site.empresa.id,
              data: this.site,
            })
            .then(() => {
              this.$root.$emit('editarSite', false)
              this.$nuxt.$emit('notify', {
                type: 'success',
                message: 'Chave editada com sucesso',
              })
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    },

    limpar() {
      this.site = {
        id: '',
        url: '',
        empresa: {},
        email_interesse_imovel: '',
        api_key: '',
        status: '',

      }
      this.$refs.form_site.resetValidation()

      this.$emit('fechouModal')
    },
  },
}
</script>

<style>

</style>
