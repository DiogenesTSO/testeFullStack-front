<template>
  <div>
    <imobia-col-list
      :rows="sites"
      :cols="colunas"
      dense
      clickable
      :hide-header-mobile="$vuetify.breakpoint.mobile"
    >
      <template #options>
        <v-btn
          dark
          color="primary"
          small
          class="ml-1"
          @click="$nuxt.$emit('criarSiteRapido', true)"
        >
          <v-icon left>
            mdi-plus
          </v-icon>
          Nova Chave
        </v-btn>
      </template>
      <template #filters>
        <sites-filtros-site v-model="filtros" />
      </template>
      <template #id="{row}">
        <div class="d-flex flex-column-reverse justify-center">
          <span>
            {{ row.id }}
          </span>
        </div>
      </template>
      <template #nome="{row}">
        <div class="d-flex flex-column-reverse justify-center">
          <span>
            {{ row.empresa.nome }}
          </span>
        </div>
      </template>
      <template #url="{row}">
        <div class="d-flex flex-column-reverse justify-center">
          <span>
            {{ row.url }}
          </span>
        </div>
      </template>
      <template #apiKey="{row}">
        <div class="d-flex flex-column-reverse justify-center">
          <span>
            {{ row.api_key ? row.api_key : 'Esse site não tem chave API' }}
          </span>
        </div>
      </template>
      <template #status="{row}">
        <div class="d-flex flex-column-reverse justify-center">
          <span>
            <span>
              <v-btn
                label
                small
                :class="statusSite[row.status].cor + ' mr-3'"
              >
                {{ statusSite[row.status].nome }}
              </v-btn>
            </span>
          </span>
        </div>
      </template>
      <template #opcoes="{row}">
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
    <!-- <sites-modal-alterar-status :current-status="chaveModal" /> -->
    <sites-modal-criar-site />
    <sites-editar-site :current-site="siteModal" />
    <imobia-load-more
      color="primary"
      :filters="filtros"
      module="sites"
      action="carregarSites"
      @ordenar="filtros.ordenacao = $event"
      @loading="loading = true"
      @loaded="loading = false"
    />
  </div>
</template>

<script>
export default {
  name: 'ListagemSites',
  meta: {
    title: 'Listagem de Chaves',
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
        ATIVO: { cor: 'green', nome: 'Ativo' },
        INATIVO: { cor: 'red', nome: 'Inativo' },
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
          lg: '3',
          text: 'Nome',
          value: 'nome',
        },
        {
          cols: '12',
          lg: '3',
          text: 'Url site',
          value: 'url',
        },
        {
          cols: '12',
          lg: '3',
          text: 'API key',
          value: 'apiKey',
        },
        {
          cols: '12',
          lg: '1',
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
      siteModal: {
        id: '',
        url: '',
        empresa: {},
        email_interesse_imovel: '',
        api_key: '',
        status: '',
      },
    }
  },
  computed: {
    sites() {
      return this.$store.state.sites.sites
    },
  },

  methods: {
    abrirModal(site) {
      this.$root.$emit('editarSite', true)
      this.siteModal = site
    },
  },
}
</script>
