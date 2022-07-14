<template>
  <imobia-modal
    id="modalDestaque"
    :loading-button="loading"
    :title="(destaque.id ? 'Editar' : 'Cadastrar') + ' tipo de destaque'"
    small
    @save="submit()"
    @close="limpar()"
  >
    <v-form ref="form_destaque" v-model="valid" lazy-validation class="pt-5">
      <v-row justify="center">
        <v-col cols="12" md="12">
          <v-col cols="12">
            <imobia-input
              v-model="destaque.nome"
              required
              label="Nome"
            />
          </v-col>

          <v-col cols="12">
            <imobia-input
              v-model="destaque.nome_tag"
              label="Tag XML"
              required
            />
          </v-col>
          <v-col cols="12">
            <imobia-select
              v-model="destaque.id_padrao_xml"
              :items="padroesXML"
              required
              label="Padrão XML"
            />
          </v-col>
        </v-col>
      </v-row>
    </v-form>
  </imobia-modal>
</template>

<script>
export default {
  name: 'ModalTipoDestaque',

  props: {
    currentDestaque: {
      type: Object,
      required: false,
      default: () => {
        return {
          id: '',
          nome: '',
          nome_tag: '',
          id_padrao_xml: [],
          status: 1,
        }
      },
    },
  },

  data() {
    return {
      destaque: { ...this.currentDestaque },
      loading: false,
      valid: false,
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
    currentDestaque: {
      handler() {
        this.destaque = { ...this.currentDestaque }
      },
      deep: true,
    },
  },



  methods: {
    validar() {
      return new Promise((resolve, reject) => {
        this.$refs.form_destaque.validate()

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

          if (this.destaque.id) {
            action = 'portais/atualizarTipoDestaque'
          } else {
            action = 'portais/cadastrarTipoDestaque'
          }

          this.$store
            .dispatch(action, this.destaque)
            .then(() => {
              this.$root.$emit('modalDestaque', false)
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    },

    limpar() {
      this.destaque = {
        id: '',
        nome: '',
        nome_tag: '',
        id_padrao_xml: [],
        status: 1,
      }
      this.$refs.form_destaque.resetValidation()

      this.$emit('fechouModal')
    },
  },
}
</script>

<style></style>
