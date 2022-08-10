<template>
  <imobia-modal
    id="modalPortal"
    :loading-button="loading"
    :title="(portal.id ? 'Editar' : 'Cadastrar') + ' portal'"
    @save="submit()"
    @close="limpar()"
  >
    <v-form ref="form_portal" v-model="valid" lazy-validation class="pt-5">
      <v-row justify="center">
        <v-col cols="12" md="4">
          <v-col cols="12" md="12">
            <imobia-image-upload v-model="portal.url_logo" />
          </v-col>
        </v-col>
        <v-col cols="12" md="6">
          <v-col cols="12">
            <imobia-input v-model="portal.nome" label="Nome do portal" required />
          </v-col>
          <v-col cols="12">
            <imobia-select v-model="portal.gratuito" label="Gratuidade" :items="gratuidadeOptions" required />
          </v-col>
          <v-col cols="12">
            <imobia-input v-model="portal.descricao" label="descricao" required />
          </v-col>
          <v-col cols="12">
            <imobia-select v-model="portal.id_padrao_xml" :items="padroesXML" label="Padrão XML" required />
          </v-col>
          <v-col cols="12">
            <imobia-input v-model="portal.url" label="url do portal" required />
          </v-col>
          <v-col cols="12">
            <imobia-select v-model="portal.status" label="Status" :items="statusOptions" required />
          </v-col>
        </v-col>
      </v-row>
    </v-form>
  </imobia-modal>
</template>

<script>
export default {
  name: 'ModalPortal',

  props: {
    currentPortal: {
      type: Object,
      required: false,
      default: () => {
        return {
          id: '',
          nome: '',
          descricao: '',
          url: '',
          id_padrao_xml: [],
          status: 1,
          gratuito: '',
          url_logo: '',
        }
      },
    },
  },

  data() {
    return {
      portal: { ...this.currentPortal },
      loading: false,
      valid: false,
      statusOptions: [
        { id: 1, nome: 'Ativo' },
        { id: 0, nome: 'Inativo' },
      ],
      gratuidadeOptions: [
        { id: 1, nome: 'Grátis' },
        { id: 0, nome: 'Pago' },
      ],
      padroesXML: [
        { id: 1, nome: 'Padrão Viva Real' },
        { id: 2, nome: 'Padrão Zap' },
        { id: 3, nome: 'Padrão Imovel Web' },
        { id: 4, nome: 'Padrão Imoveis Santa Catarina' },
        { id: 5, nome: 'Padrão Mercado Livre' },
      ]
    }
  },



  watch: {
    currentPortal: {
      handler() {
        this.portal = { ...this.currentPortal }
      },
      deep: true,
    },
  },



  methods: {
    validar() {
      return new Promise((resolve, reject) => {
        this.$refs.form_portal.validate()

        this.$nextTick(() => {
          resolve(this.valid)
        })
      })
    },

    submit() {
      this.validar().then((valid) => {
        if (valid) {
          this.loading = true

          let action = ''

          if (this.portal.id) {
            action = 'portais/atualizarTipoDestaque'
          } else {
            action = 'portais/cadastrarPortal'
          }

          this.$store
            .dispatch(action, this.portal)
            .then(() => {
              this.$root.$emit('modalPortal', false)
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
        status: 1,
        gratuito: '',
        url_logo: null
      }
      this.$refs.form_portal.resetValidation()

      this.$emit('fechouModal')
    },
  },
}
</script>

<style></style>
