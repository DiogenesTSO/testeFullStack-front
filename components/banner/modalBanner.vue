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
            <imobia-image-upload />
          </v-col>
        </v-col>
        <v-col cols="12" md="6">
          <v-col cols="12">
            <imobia-select v-model="banner.sistema" multiple :items="SistemaOptions" label="Sistema" required />
          </v-col>
          <v-col cols="12">
            <imobia-date-picker v-model="banner.email" label="Data do Inicio" required />
          </v-col>
          <v-col cols="12">
            <imobia-date-picker v-model="banner.email" label="Data do fim" required />
          </v-col>
          <v-col cols="12">
            <imobia-input v-model="banner.link" label="Link ao clicar no banner" />
          </v-col>
        </v-col>
      </v-row>
    </v-form>
  </imobia-modal>
</template>

<script>
export default {
  name: 'ModalBanner',

  props: {
    currentBanner: {
      type: Object,
      required: false,
      default: () => {
        return {
          id: '',
          nome: '',
          sistema: '1',
          link: '',
        }
      },
    },
  },

  data() {
    return {
      banner: { ...this.currentBanner },
      loading: false,
      

      SistemaOptions: [
        { id: '1', nome: 'Imobia-2' },
        { id: '2', nome: 'Imobia-3' },
      ],
    }
  },

  computed: {
    banners() {
      return this.$store.getters['usuarios/tiposUsuarios'].map((tipo) => {
        return {
          id: tipo.nome.toLowerCase().replace(/ /g, '_'),
          nome: tipo.nome,
        }
      })
    },
  },

  watch: {
    currentBanner: {
      handler() {
        this.banner = { ...this.currentBanner }
        if (this.currentUsuario.nome) {
          this.banner.nome = this.currentBanner.cliente.nome
        }
        if (this.currentBanner.id) {
          this.banner.id = this.currentBanner.id
        }
      },
      deep: true,
    },
  },


  methods: {
    submit() {
      this.validar().then((valid) => {
        if (valid) {
          this.loading = true

          let action = ''

          if (this.usuario.id) {
            action = 'usuarios/atualizarUsuario'
          } else {
            action = 'usuarios/cadastrarUsuario'
          }

          this.$store
            .dispatch(action, this.banner)
            .then(() => {
              this.$root.$emit('modalBanner', false)
            })
            .finally(() => {
              this.loading = false
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
