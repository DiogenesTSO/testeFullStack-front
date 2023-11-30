<template>
  <imobia-modal
    id="editarChaveApi"
    small
    :loading-button="loading"
    title="Alterar status da chave"
    @save="submit()"
    @close="limpar()"
  >
    <v-form ref="form_chave_api_editar" v-model="valid" lazy-validation class="pt-5">
      <v-row justify="center">
        <v-col cols="12" md="12">
          <v-col cols="12">
            <imobia-select v-model="chaveApi.status" label="Status" :items="statusChave" required />
          </v-col>
        </v-col>
      </v-row>
    </v-form>
  </imobia-modal>
</template>

<script>
export default {
  name: 'ModalEditarChave',

  props: {
    currentChave: {
      type: Object,
      required: false,
      default: () => {
        return {
          chaveApi: {
            id: '',
            empresa_id: '',
            chave: '',
            status: ''
          },
        }
      },
    },
  },

  data() {
    return {
      chaveApi: { ...this.currentChave },
      loading: false,
      valid: false,
      statusChave: [
        { id: 'Ativa', nome: 'Ativa' },
        { id: 'Inativa', nome: 'Inativa' },
      ],
    }
  },

    
  watch: {
    currentChave: {
      handler() {
        this.chaveApi = { ...this.currentChave }
      },
      deep: true,
    },
  },

  methods: {
    validar() {
      return new Promise((resolve, reject) => {
        this.$refs.form_chave_api_editar.validate()

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
            .dispatch('chavesApi/atualizarChave', {
              id: this.chaveApi.id,
              data: this.chaveApi,
            })
            .then(() => {
              this.limpar()
              this.$root.$emit('editarChaveApi', false)
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    },

    limpar() {
      this.chaveApi = {
        id: '',
        empresa_id: '',
        chave: '',
        status: ''
      }
      this.$refs.form_chave_api_editar.resetValidation()

      this.$emit('fechouModal')
    },
  },
}
</script>

<style></style>
