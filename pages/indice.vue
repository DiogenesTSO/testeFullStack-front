<template>
  <div>
    <imobia-col-list
      dense
      :rows="indices"
      :cols="colunas"
    >
      <template #filters>
        <indice-filtros-indice v-model="filtros" />
      </template>

      <template #options>
        <v-btn dark color="primary" small class="ml-1" @click="abrirModal()">
          <v-icon left>
            mdi-plus
          </v-icon>
          Novo indice
        </v-btn>
      </template>

      <template #nome>
        CUB/SC
      </template>
      <template #Valor>
        R$ 1000
      </template>
      <template #variacao>
        10%
      </template>
      <template #data_indice>
        10/02/2008
      </template>

      <template #data_cadastro>
        18/03/2022
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
            <v-btn dark icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list color="card">
            <v-list-item @click="abrirModal(row)">
              <v-list-item-avatar class="ma-0">
                <v-icon>mdi-square-edit-outline</v-icon>
              </v-list-item-avatar>
              <v-list-item-content class="pa-0">
                <v-list-item-title>Detalhes</v-list-item-title>
                <v-list-item-subtitle>
                  Ver ou editar tipo
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="remover(row.id)">
              <v-list-item-avatar class="ma-0">
                <v-icon>mdi-delete</v-icon>
              </v-list-item-avatar>
              <v-list-item-content class="pa-0">
                <v-list-item-title>Remover</v-list-item-title>
                <v-list-item-subtitle>
                  Remover permanentemente
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
    <indice-modal-indice
      :current-indice="indiceModal"
      @fechouModal="limparModal()"
    />
  </div>
</template>

<script>
export default {
  name: 'Indice',

  meta: {
    title: 'Listagem de indice',
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
          lg: '2',
          text: 'Nome',
          value: 'nome',
        },
        {
          cols: '12',
          lg: '2',
          text: 'Valor',
          value: 'Valor',
        },
        {
          cols: '12',
          lg: '2',
          text: 'Variação',
          value: 'variacao',
        },
        {
          cols: '12',
          lg: '2',
          text: 'Data Indice',
          value: 'data_indice',
        },
        {
          cols: '12',
          lg: '2',
          text: 'Data do cadastro',
          value: 'data_cadastro',
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

      indiceModal: {
        id: '',
        nome: '',
        email: '',
        status: 'A',
      },
    }
  },
  head() {
    return {
      title: 'Listagem de indice',
    }
  },

  computed: {
    indices() {
      return this.$store.getters['usuarios/usuarios']
    },
  },

  mounted() {},

  methods: {
    abrirModal(indice) {
      this.$root.$emit('modalIndice', true)
      this.indiceModal = indice
    },
 
    remover(id) {
      this.$nuxt.$emit('confirm', {
        title: 'Remover indice',
        text:
          'Você tem certeza que deseja remover esse indice? Isso não poderá ser revertido.',
        okText: 'Remover',
        okColor: 'red',
        done: () => {
          this.$store.dispatch('layout/carregando', true)

          this.$store.dispatch('imoveis/removerImoveisEmpreendimento', id).finally(() => {
            this.$store.dispatch('layout/carregando', false)
          })
        },
      })
    },

    limparModal() {
      this.indiceModal = {
        id: '',
        nome: '',
        email: '',
        status: 'A',
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
