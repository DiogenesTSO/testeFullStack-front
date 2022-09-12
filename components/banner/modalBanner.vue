<template>
  <imobia-modal
    id="modalBanner"
    :loading-button="loading"
    :title="(banner.id ? 'Editar' : 'Cadastrar') + ' banner'"
    @save="submit()"
    @close="limpar()"
  >
    <v-form ref="form_banner" v-model="valid" lazy-validation class="pt-5">
      <v-row justify="center">
        <v-col cols="12" md="4">
          <v-col cols="12" md="12">
            <imobia-image-upload v-model="banner.url" />
          </v-col>
        </v-col>
        <v-col cols="12" md="6">
          <v-col cols="12">
            <imobia-select
              v-model="banner.sistema"
              :items="SistemaOptions"
              label="Sistema"
            />
          </v-col>
          <v-col cols="12">
            <imobia-date-picker
              v-model="banner.data_inicio"
              label="Data do Inicio"
              required
            />
          </v-col>
          <v-col cols="12">
            <imobia-date-picker
              v-model="banner.data_fim"
              label="Data do fim"
              required
            />
          </v-col>
          <v-col cols="12">
            <imobia-input
              v-model="banner.link"
              label="Link ao clicar no banner"
            />
          </v-col>
        </v-col>
      </v-row>
    </v-form>
  </imobia-modal>
</template>

<script>
import moment from 'moment'
export default {
  name: 'ModalBanner',

  props: {
    currentBanner: {
      type: Object,
      required: false,
      default: () => {
        return {
          id: '',
          sistema: '3',
          url: '',
          link: '',
          status: 1,
          data_inicio: moment().format('YYYY-MM-DD'),
          data_fim: moment().format('YYYY-MM-DD'),
        }
      },
    },
  },

  data() {
    return {
      banner: { ...this.currentBanner },
      loading: false,
      valid: false,
      SistemaOptions: [
        { id: '2', nome: 'Imobia-2' },
        { id: '3', nome: 'Imobia-3' },
      ],
    }
  },

  watch: {
    currentBanner: {
      handler() {
        this.banner = { ...this.currentBanner }
      },
      deep: true,
    },
  },

  methods: {
    validar() {
      return new Promise((resolve, reject) => {
        this.$refs.form_banner.validate()

        this.$nextTick(() => {
          resolve(this.valid)
        })
      })
    },

    submit() {
      this.validar().then((valid) => {
        if (valid) {
          this.loading = true

          const action = ''

          const formData = new FormData()

          Object.entries(this.banner).forEach(([key, value]) => {
            if (value !== null) {
              formData.append(key, value)
            }
          })
          if (typeof this.banner.url === 'string' || this.banner.url === null) {
            formData.delete('url')
          }

          this.$store
            .dispatch('banners/cadastrarBanner', formData)
            .finally(() => {
              this.loading = false
              this.$root.$emit('modalBanner', false)
            })

          this.$store.dispatch(action, this.banner).then(() => {
            this.$root.$emit('modalBanner', false)
          })
        }
      })
    },

    limpar() {
      this.banner = {
        id: '',
        nome: '',
        status: 'A',
      }

      this.alterarSenha = false

      this.$refs.form_banner.resetValidation()

      this.$emit('fechouModal')
    },
  },
}
</script>

<style></style>
