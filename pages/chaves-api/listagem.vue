<template>
  <div>
    <imobia-col-list 
      :rows="chavesApi" 
      :cols="colunas" 
      dense 
      clickable
      :hide-header-mobile="$vuetify.breakpoint.mobile"
    >
      <template #options>
        <v-btn dark color="primary" small class="ml-1" @click="$nuxt.$emit('criarChaveRapido', true)">
          <v-icon left>
            mdi-plus
          </v-icon>
          Nova Chave
        </v-btn>
      </template>
      <template #filters>
        <chaves-api-filtros v-model="filtros" />
      </template>
      <template #id="{ row }">
        <div class="d-flex flex-column-reverse justify-center">
          <span>
            {{ row.id }}
          </span>
        </div>
      </template>
      <template #nome="{ row }">
        <div class="d-flex flex-column-reverse justify-center">
          <span>
            {{ row.empresa.nome }}
          </span>
        </div>
      </template>
      <template #chave_api="{ row }">
        <div class="d-flex flex-column-reverse justify-center">
          <span>
            {{ row.chave }}
          </span>
        </div>
      </template>
      <template #status="{ row }">
        <div class="d-flex flex-column-reverse justify-center">
          <span>
            <span>
              <v-btn label small :class="statusSite[row.status].cor + ' mr-3'">
                {{ statusSite[row.status].nome }}
              </v-btn>
            </span>
          </span>
        </div>
      </template>
      <template #opcoes="{ row }">
        <v-menu offset-y bottom left close-on-content-click transition="slide-x-transition">
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
                <v-list-item-title>Editar</v-list-item-title>
                <v-list-item-subtitle>
                  Ver ou editar chave
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </imobia-col-list>
    <chaves-api-modal-criar-chave />
    <chaves-api-modal-editar-chave :current-chave="chaveModal" />
    <imobia-load-more
      color="primary"
      :filters="filtros"
      module="chavesApi"
      action="carregarChaves"
      @ordenar="filtros.ordenacao = $event"
      @loading="loading = true"
      @loaded="loading = false"
    />
  </div>
</template>

<script>
export default {
  name: 'ListagemChavesApi',
  meta: {
    title: 'Listagem de chaves de api',
  },
  data() {
    return {
      filtros: {
        nome: '',
        status: 'ATIVO',
        id: '',
        per_page: 20,
      },

      filiais: [],

      statusSite: {
        Ativa: { cor: 'green', nome: 'Ativa' },
        Inativa: { cor: 'red', nome: 'Inativa' },
      },

      colunas: [
        {
          cols: '12',
          lg: '1',
          text: 'Id',
          value: 'id',
        },
        {
          cols: '12',
          lg: '4',
          text: 'Nome',
          value: 'nome',
        },
        {
          cols: '12',
          lg: '4',
          text: 'Chave',
          value: 'chave_api',
        },
        {
          cols: '12',
          lg: '2',
          text: 'Status',
          value: 'status',
        },
        {
          cols: '12',
          lg: '1',
          text: 'Opções',
          customClass: 'text-right',
          value: 'opcoes',
        },
      ],
      chaveModal: {
        id: '',
        chave: '',
        status: '',
      },
    }
  },
  computed: {
    chavesApi() {
      return this.$store.state.chavesApi.chaves
    },
  },

  methods: {
    abrirModal(chave) {
      this.$root.$emit('editarChaveApi', true)
      this.chaveModal = chave
    },
  },
}
</script>
