<template>
  <imobia-modal
    v-model="show"
    title="Editar permissões"
    :loading-button="loading"
    @input="reset"
    @save="submit"
  >
    <v-form ref="formTiposPermissoes" v-model="valid" @submit="submit">
      <v-list subheader color="card">
        <template v-for="(grupo, i) in grupos">
          <v-list-item :key="'grupo_' + i">
            <v-list-item-icon>
              <v-icon>
                mdi-{{ icones[grupo.replace(' ', '').toLowerCase()] }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{ grupo }}
            </v-list-item-title>
            <v-checkbox
              v-for="permissao in permissoes.filter((p) => p.group === grupo)"
              :key="'permissao_' + permissao.id"
              class="ml-4"
              dense
              color="primary"
              :label="permissao.nome"
            />
          </v-list-item>
        </template>
      </v-list>
    </v-form>
  </imobia-modal>
</template>

<script>
export default {
  name: 'ModalTiposPermissoes',
  props: {
    value: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      show: false,
      loading: false,
      valid: true,
      icones: {
        imoveis: 'home-city',
        clientes: 'account-group',
        tiposimoveis: 'shape-plus',
        caracteristicas: 'puzzle',
        locacoes: 'sign-real-estate',
        configuracoes: 'cog',
        usuarios: 'account-tie',
        financeiro: 'finance',
        sistema: 'monitor-dashboard',
        filiais: 'bank',
        visitas: 'key-chain-variant',
      },
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    permissoes() {
      const permissoes = this.$store.state.usuarios.permissoes.map((p) => {
        const words = p.nome.split(' ')
        const permission = words.shift()
        const group = words.join(' ')
        return { group, nome: permission, id: p.id }
      })
      return permissoes
    },
    gruposChunks() {
      return this.$help.chunks(this.grupos, 2)
    },
    grupos() {
      return this.$help.removeDuplicates(this.permissoes.map(p => p.group))
    },
  },
  watch: {
    value() {
      this.show = this.value
    },
    show() {
      this.$emit('input', this.show)
    },
  },
  mounted() {
    this.$store.dispatch('usuarios/carregarUsuariosTipos')
  },
  methods: {
    submit() {
      this.$refs.formTiposPermissoes.validate()
      if (!this.valid) {
        return false
      }
      this.loading = true
    },

    reset(val = 0) {
      if (!val) {
        this.$refs.formTiposPermissoes.reset()
      }
    },
  },
}
</script>

<style></style>
