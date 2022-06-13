<template>
  <imobia-modal
    v-model="show"
    title="Alterar Permissões"
    :loading-button="loading"
    @input="reset"
    @save="submit"
  >
    <v-form ref="formTiposPermissoes" v-model="valid" @submit="submit">
      <v-row>
        <v-col>
          <imobia-input
            v-model="tipoNome"
            label="Nome do tipo de usuário"
            required
          />
        </v-col>
      </v-row>
      <v-row>
        <template v-for="(grupos, i) in gruposChunks">
          <v-col :key="'grupoChunk_' + i" class="mx-6">
            <v-list
              v-for="(grupo, i) in grupos"
              :key="'grupo_' + i"
              color="card"
            >
              <span class="text--disabled">{{ grupo }}</span>
              <v-list-item
                v-for="permissao in permissoes.filter((p) => p.group === grupo)"
                :key="'permissao_' + permissao.id"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ permissao.nome }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-switch
                    v-model="permissoesSelecionadas"
                    :value="permissao.id"
                    dense
                    color="primary"
                  />
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-col>
          <!--        <v-divider
            v-if="i + 1 < gruposChunks.length"
            :key="'divider_' + i"
            vertical
          /> -->
        </template>
      </v-row>
    </v-form>
  </imobia-modal>
</template>

<script>
export default {
  name: 'ModalCadastroTiposUsuarios',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: false,
      loading: false,
      valid: true,
      tipoNome: '',
      permissoesSelecionadas: [],
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

  methods: {
    submit() {
      this.$refs.formTiposPermissoes.validate()
      if (!this.valid) {
        return false
      }
      this.loading = true
      this.$store
        .dispatch('usuarios/cadastrarUsuariosTipo', {
          role: this.tipoNome,
          permissions: this.permissoesSelecionadas,
        })
        .then(() => {
          this.show = false
        })
        .finally(() => {
          this.loading = false
        })
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
