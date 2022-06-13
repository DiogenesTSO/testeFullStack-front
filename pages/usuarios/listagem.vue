<template>
  <div>
    <imobia-col-list
      dense
      :rows="usuarios"
      :cols="colunas"
    >
      <template #filters>
        <usuarios-filtros v-model="filtros" />
      </template>

      <template #options>
        <v-btn dark color="primary" small class="ml-1" @click="abrirModal()">
          Novo usuário
        </v-btn>
      </template>

      <template #nome="{ row }">
        {{ row.cliente.nome ? row.cliente.nome : 'Pessoa não encontrada' }}
      </template>

      <template #email="{ row }">
        {{ row.email }}
      </template>

      <template #tipo="{ row }">
        {{ $format.userType(row.funcao) }}
      </template>

      <template #opcoes="{ row }">
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
              <v-avatar
                left
                size="10"
                :class="status[row.status].cor + ' mr-3'"
              />
            </span>
          </template>
          {{ status[row.status].nome }}
        </v-tooltip>
        <v-menu
          offset-y
          bottom
          left
          close-on-content-click
          transition="slide-x-transition"
        >
          <template #activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list color="card">
            <v-list-item
              :to="{ name: 'pessoas-id-geral', params: { id: row.cliente.id } }"
            >
              <v-list-item-avatar class="ma-0">
                <v-icon>mdi-square-edit-outline</v-icon>
              </v-list-item-avatar>
              <v-list-item-content class="pa-0">
                <v-list-item-title>Detalhes</v-list-item-title>
                <v-list-item-subtitle>
                  Ver ou editar pessoa
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              v-if="
                user.is_master || user.is('administrador') || user.id === row.id
              "
              @click="abrirModal(row)"
            >
              <v-list-item-avatar class="ma-0">
                <v-icon>mdi-account</v-icon>
              </v-list-item-avatar>
              <v-list-item-content class="pa-0">
                <v-list-item-title>Usuário</v-list-item-title>
                <v-list-item-subtitle>
                  Ver ou editar acesso do usuário
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </imobia-col-list>

    <imobia-load-more
      color="primary"
      :filters="filtros"
      module="usuarios"
      action="carregarUsuarios"
    />

    <usuarios-modal-cadastro
      :current-usuario="usuarioModal"
      @fechouModal="limparModal()"
    />
  </div>
</template>

<script>
export default {
  name: 'ListagemUsuarios',

  meta: {
    title: 'Listagem de usuários',
  },

  data() {
    return {
      colunas: [
        {
          cols: '12',
          lg: '1',
          text: 'ID',
          value: 'id',
        },
        {
          cols: '12',
          lg: '5',
          text: 'Nome',
          value: 'nome',
        },
        {
          cols: '12',
          lg: '3',
          text: 'E-mail',
          value: 'email',
        },
        {
          cols: '12',
          lg: '2',
          text: 'Tipo',
          value: 'tipo',
        },
        {
          cols: '12',
          lg: '1',
          text: '',
          customClass: 'text-right',
          value: 'opcoes',
        },
      ],

      status: {
        A: {
          cor: 'green',
          nome: 'Ativo',
        },
        B: {
          cor: 'yellow',
          nome: 'Bloqueado',
        },
        I: {
          cor: 'red',
          nome: 'Inativo',
        },
      },

      filtros: {
        nome: '',
        email: '',
        funcao: '',
        status: 'A',
      },

      usuarioModal: {
        id: '',
        nome: '',
        email: '',
        funcao: '',
        senha: '',
        status: 'A',
      },
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
  },

  mounted() {},

  methods: {
    abrirModal(usuario) {
      this.$root.$emit('modalCadastroUsuario', true)
      this.usuarioModal = usuario
    },

    limparModal() {
      this.usuarioModal = {
        id: '',
        nome: '',
        email: '',
        funcao: '',
        senha: '',
        status: 'A',
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
