<template>
  <imobia-modal
    id="modalIndice"
    small
    :loading-button="loading"
    :title="(indice.id ? 'Editar' : 'Cadastrar') + ' indice'"
    @save="submit()"
    @close="limpar()"
  >
    <v-form ref="form_indice" v-model="valid" lazy-validation class="pt-5">
      <v-row justify="center">
        <v-col cols="12" md="12">
          <v-col cols="12">
            <imobia-select v-model="indice.opcao" :items="IndiceOptions" label="Indice" required />
          </v-col>
          <v-col cols="12">
            <imobia-date-picker v-model="indice.email" label="Data do Indice" required />
          </v-col>
          <v-col cols="12">
            <imobia-input v-model="indice.valor" label="Valor" required />
          </v-col>
          <v-col cols="12">
            <imobia-input v-model="indice.variacao" label="variação" />
          </v-col>
        </v-col>
      </v-row>
    </v-form>
  </imobia-modal>
</template>

<script>
import moment from 'moment'
export default {
  name: 'ModalIndice',

  props: {
    currentIndice: {
      type: Object,
      required: false,
      default: () => {
        return {
          id: '',
          nome: '',
          opcao: '1',
          data_indice: moment().format('YYYY-MM'),
          valor: '',
          variacao: '',
        }
      },
    },
  },

  data() {
    return {
      indice: { ...this.currentIndice },
      loading: false,
      

      IndiceOptions: [
        { id: '1', nome: 'CUB/PR' },
        { id: '2', nome: 'CUB/RS' },
        { id: '3', nome: 'CUB/SP' },
        { id: '4', nome: 'CUB/SC' },
        { id: '5', nome: 'IGP-M' },
      ],
    }
  },

  computed: {
    indices() {
      return this.$store.getters['usuarios/tiposUsuarios'].map((tipo) => {
        return {
          id: tipo.nome.toLowerCase().replace(/ /g, '_'),
          nome: tipo.nome,
        }
      })
    },
  },

  watch: {
    currentIndice: {
      handler() {
        this.indice = { ...this.currentIndice }
        if (this.currentIndice.nome) {
          this.indice.nome = this.currentIndice.cliente.nome
        }
        if (this.currentIndice.id) {
          this.indice.id = this.currentIndice.id
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

          if (this.indice.id) {
            action = 'usuarios/atualizarUsuario'
          } else {
            action = 'usuarios/cadastrarUsuario'
          }

          this.$store
            .dispatch(action, this.indice)
            .then(() => {
              this.$root.$emit('modalIndice', false)
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    },

    limpar() {
      this.indice = {
        id: '',
        nome: '',
        status: 'A',
      }

      this.alterarSenha = false

      this.$refs.form_indice.resetValidation()

      this.$emit('fechouModal')
    },
  },
}
</script>

<style></style>
