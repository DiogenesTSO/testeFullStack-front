<template>
  <div>
    <v-row>
      <v-col cols="12">
        <imobia-col-list
          dense
          :rows="tiposUsuarios"
          :cols="colunas"
          clickable
          @clickItem="showModal"
        >
          <template #options>
            <v-btn
              dark
              color="primary"
              small
              @click="showModalCadastroTipo = true"
            >
              <v-icon left>
                mdi-plus
              </v-icon>
              Novo tipo de usuário
            </v-btn>
          </template>

          <template #nome="{ row }">
            <div />
            {{ row.nome }}
          </template>
          <template #permissoes="{ row }">
            <div
              v-if="row.nome.toLowerCase() === 'administrador'"
              class="d-flex"
            >
              <v-alert
                dense
                text
                class="rounded-pill text-caption px-2 py-1 text-center mb-0"
                color="orange"
              >
                Todas
              </v-alert>
            </div>
            <div v-else class="d-flex align-center">
              <div
                v-for="(permissao, i) in row.permissoesFormatada"
                :key="'permissao_' + i"
              >
                <v-alert
                  v-if="i < 3"
                  dense
                  text
                  class="rounded-pill text-caption px-2 py-1 text-center mr-2 mb-0"
                  color="info"
                >
                  {{ permissao }}
                </v-alert>
                <div v-else-if="i === 3">
                  + {{ row.permissoesFormatada.length - i }}
                </div>
              </div>
            </div>
          </template>

          <template #opcoes="{row}">
            <imobia-button-menu :items="menu" @editar="showModal(row)" />
          </template>
        </imobia-col-list>
      </v-col>
    </v-row>
    <usuarios-modal-tipos-permissoes
      v-model="showModalPermissoes"
      :tipo="tipo"
    />
    <usuarios-modal-cadastro-tipo v-model="showModalCadastroTipo" />
  </div>
</template>

<script>
export default {
  name: 'ListagemUsuarioTipos',

  meta: {
    title: 'Tipos de usuários',
  },

  data() {
    return {
      showModalCadastroTipo: false,
      showModalPermissoes: false,
      tipo: {},
      loading: false,
      menu: [
        {
          icon: 'pencil',
          title: 'Editar',
          subtitle: 'Ver e editar permissões',
          action: 'editar',
        },
      ],
      colunas: [
        {
          cols: '12',
          lg: '4',
          text: 'Tipo',
          value: 'nome',
          align: 'center',
        },
        {
          cols: '12',
          lg: '5',
          text: 'Permissões',
          value: 'permissoes',
          align: 'center',
        },

        {
          cols: '12',
          lg: '3',
          text: '',
          customClass: 'text-right',
          value: 'opcoes',
          align: 'center',
        },
      ],
      /*   tiposUsuarios: [
        {
          nome: 'Administrador',
          isAdmin: true,
          permissoes: ['Todos', 'Imóveis', 'Vendas', 'Locação'],
        },
        {
          nome: 'Outro',
          permissoes: ['Clientes', 'Imóveis', 'Vendas', 'Locação'],
        },
      ], */
    }
  },
  head() {
    return {
      title: 'Listagem de usuários',
    }
  },

  computed: {
    user() {
      return this.$store.state.auth.user
    },

    usuarios() {
      return this.$store.getters['usuarios/usuarios']
    },
    tiposUsuarios() {
      return this.$store.state.usuarios.tiposUsuarios.map(tipo => ({
        ...tipo,
        ...{
          permissoesFormatada: this.$help.removeDuplicates(
            tipo.permissoes.map((p) => {
              const words = p.nome.split(' ')
              words.shift()
              const group = words.join(' ')
              return group
            }),
          ),
        },
      }))
    },
  },

  mounted() {
    this.$store.dispatch('layout/carregando', true)
    this.$store.dispatch('usuarios/carregarUsuariosTipos').then(() => {
      this.$store.dispatch('layout/carregando', false)
    })
    this.$store.dispatch('usuarios/carregarUsuariosPermissoes')
  },

  methods: {
    showModal(item) {
      this.tipo = item
      this.showModalPermissoes = true
    },
  },
}
</script>

<style lang="scss" scoped></style>
