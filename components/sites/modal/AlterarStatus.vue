<template>
  <imobia-modal
    id="alterarStatusSites"
    small
    :loading-button="loading"
    title="Alterar status do site"
    @save="submit()"
    @close="limpar()"
  >
    <v-form ref="form_status" v-model="valid" lazy-validation class="pt-5">
      <v-row justify="center">
        <v-col cols="12" md="12">
          <v-col cols="12">
            <imobia-select
              v-model="status.status"
              label="Status"
              :items="statusEmpresas"
              required
            />
          </v-col>
        </v-col>
      </v-row>
    </v-form>
  </imobia-modal>
</template>

<script>
export default {
  name: 'ModalalterarStatusSite',

  props: {
    currentStatus: {
      type: Object,
      required: false,
      default: () => {
        return {
          id: '',
          empresa_id: '',
          status: '',
        }
      },
    },
  },

  data() {
    return {
      status: { ...this.currentStatus },
      loading: false,
      valid: false,
      statusSite: [
        { id: 'ATIVO', nome: 'Ativo' },
        { id: 'INATIVO', nome: 'INATIVO' },
      ],
    }
  },

  mounted() {
    this.$nuxt.$on('alterarStatusSitesSites', (status) => {
      this.status = { ...status }
    })
  },

  methods: {
    validar() {
      return new Promise((resolve, reject) => {
        this.$refs.form_status.validate()

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
            .dispatch('sites/atualizarStatusEmpresa', {
              id: this.status.id,
              empresa_id: this.status.empresa_id,
              data: this.status,
            })
            .then(() => {
              this.$root.$emit('alterarStatusSites', false)
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    },

    limpar() {
      this.status = {
        id: '',
        status: '',
        empresa_id: '',
      }
      this.$refs.form_status.resetValidation()

      this.$emit('fechouModal')
    },
  },
}
</script>

<style></style>
