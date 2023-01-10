<template>
  <imobia-modal
    id="modalCadastroUsuario"
    small
    :loading-button="loading"
    :title="(usuario.id ? 'Editar' : 'Cadastrar') + ' usuário'"
    @save="submit()"
    @close="limpar()"
  >
    <v-form ref="form_usuario" v-model="valid" lazy-validation class="pt-5">
      <v-row justify="center">
        <v-col cols="12">
          <imobia-input 
            v-model="usuario.nome" 
            label="Nome" 
            required 
          />
        </v-col>
        <v-col cols="12">
          <imobia-input 
            v-model="usuario.email" 
            label="E-mail" 
            required 
          />
        </v-col>
        <v-col cols="12">
          <imobia-input
            v-model="tipoUsuario"
            disabled
            label="Tipo de usuário"
          />
        </v-col>
        <v-col cols="12">
          <imobia-select
            v-model="usuario.is_master"
            :disabled="!user.is_master"
            label="Usuario Master"
            :items="tiposMaster"
          />
        </v-col>
        <v-col v-if="usuario.id === user.id" v-show="usuario.id" cols="12">
          <v-checkbox
            v-model="alterarSenha"
            label="Alterar senha"
            color="primary"
            row
            dense
            hide-details="auto"
          />
        </v-col>
        <v-col cols="12">
          <v-expand-transition>
            <v-row v-if="alterarSenha || !usuario.id">
              <v-col cols="12">
                <imobia-input
                  v-model="usuario.password"
                  required
                  type="password"
                  label="Senha"
                />
              </v-col>
              <v-col cols="12">
                <imobia-input
                  v-model="usuario.password_confirmation"
                  required
                  type="password"
                  label="Confirmar senha"
                />
              </v-col>
            </v-row>
          </v-expand-transition>
        </v-col>
        <v-col v-show="usuario.id" cols="12">
          <imobia-select
            v-model="usuario.status"
            label="Status"
            :items="statusOptions"
          />
        </v-col>
      </v-row>
    </v-form>
  </imobia-modal>
</template>

<script>
export default {
  name: 'CadastroUsuario',

  props: {
    currentUsuario: {
      type: Object,
      required: false,
      default: () => {
        return {
          id: '',
          nome: '',
          email: '',
          funcao: 'administrador',
          password: '',
          password_confirmation: '',
          status: 'A',
          is_master: ''
        }
      },
    },
  },

  data() {
    return {
      usuario: { ...this.currentUsuario },
      valid: false,
      loading: false,
      alterarSenha: false,

      statusOptions: [
        { id: 'A', nome: 'Ativo' },
        { id: 'B', nome: 'Bloqueado' },
        { id: 'I', nome: 'Inativo' },
      ],
      tipoUsuario: 'Administrador',
      tiposMaster: [
        { id: 0, nome: 'Não' },
        { id: 1, nome: 'Sim' },
      ],
    }
  },

  computed: {
    user() {
      return this.$store.state.auth.user
    },
  },

  watch: {
    currentUsuario: {
      handler() {
        this.usuario = { ...this.currentUsuario }
        if (this.currentUsuario.nome) {
          this.usuario.nome = this.currentUsuario.nome
        }
        if (this.currentUsuario.id) {
          this.usuario.id = this.currentUsuario.id
        }
      },
      deep: true,
    },
  },

  beforeCreate() {
    this.$store.dispatch('usuarios/carregarUsuariosTipos')
  },

  methods: {
    validar() {
      return new Promise((resolve, reject) => {
        this.$refs.form_usuario.validate()

        const customValid = []

        if (
          this.usuario.password !== this.usuario.password_confirmation &&
          this.usuario.password !== ''
        ) {
          customValid.push('As senhas não coincidem.')
        }

        this.$nextTick(() => {
          customValid.forEach(item =>
            this.$root.$emit('notify', {
              type: 'warning',
              message: item,
            }),
          )

          resolve(this.valid && !customValid.length)
        })
      })
    },

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
            .dispatch(action, this.usuario)
            .then(() => {
              this.$root.$emit('modalCadastroUsuario', false)
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    },

    limpar() {
      this.usuario = {
        id: '',
        nome: '',
        email: '',
        funcao: 'administrador',
        password: '',
        password_confirmation: '',
        status: 'A',
      }

      this.alterarSenha = false

      this.$refs.form_usuario.resetValidation()

      this.$emit('fechouModal')
    },
  },
}
</script>

<style></style>
