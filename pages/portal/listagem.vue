<template>
  <div>
    <imobia-col-list
      :rows="portais"
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
          @click="abrirModal()"
        >
          <v-icon left>
            mdi-plus
          </v-icon>
          Novo Portal
        </v-btn>
      </template>
      <template #filters>
        <portal-filtros-portal v-model="filtros" />
      </template>
      <template #imoveis="{row}">
        <v-row>
          <v-col cols="12" lg="4">
            <v-card color="card" width="100%">
              <v-img
                width="100%"
                max-height="150px"
                :src="(row.url_logo
                  ? row.url_logo
                  : $vuetify.theme.dark
                    ? 'https://static.useimobia.com.br/sistema/nao_encontrada_dark.png'
                    : 'https://static.useimobia.com.br/sistema/nao_encontrada.png'
                )"
              />
            </v-card>
          </v-col>
          <v-col cols="12" lg="8">
            <v-row>
              <v-col
                :align="$vuetify.breakpoint.mobile ? 'center' : ''"
                :justify="$vuetify.breakpoint.mobile ? 'center' : ''"
              >
                <span>
                  <span>
                    <v-chip label small class="primary pa-3">
                      Código:
                      <b class="ml-1">{{ row.id }}</b>
                    </v-chip>
                  </span>
                </span>
                <span>
                  <span>
                    <h2
                      :class="
                        $vuetify.breakpoint.mobile ? 'text-center mt-3' : ''
                      "
                      class="text--secondary text-truncate mt-2 text-wrap pb-2"
                      style="max-width: 40rem;"
                    >
                      <strong>{{ row.nome }}</strong>
                    </h2>
                  </span>
                </span>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </template>
      <template #padrao="{row}">
        {{ padroesXML[row.id_padrao_xml].nome }}
      </template>
      <template #negociacoes="{row}">
        <div class="d-flex flex-column-reverse justify-center">
          <span>
            <v-tooltip right>
              <template #activator="{ on, attrs} ">
                <span v-bind="attrs" v-on="on">
                  <span>
                    <span>
                      <v-chip
                        label
                        small
                        :class="[
                          statusGratuidade[row.gratuito].color,
                          ' mb-1',
                        ]"
                      >
                        {{ statusGratuidade[row.gratuito].text }}
                      </v-chip>
                    </span>
                  </span>
                </span>
              </template>
            </v-tooltip>
          </span>
        </div>
      </template>
      <template #status="{ row }">
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
              <v-avatar
                left
                size="10"
                :class="statusPotal[row.status].color + ' mr-3'"
              />
            </span>
          </template>
          {{ statusPotal[row.status].text }}
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
                <v-list-item-title>Editar</v-list-item-title>
                <v-list-item-subtitle>
                  Ver ou editar Portal
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
      module="portais"
      action="carregarPortais"
      @ordenar="filtros.ordenacao = $event"
      @loading="loading = true"
      @loaded="loading = false"
    />

    <portal-modal-portal :current-portal="portalModal" />
  </div>
</template>

<script>
export default {
  name: 'ListagemPortais',
  meta: {
    title: 'Listagem de Portais',
  },
  data() {
    return {
      filtros: {
        allinone: '',
        status: 1,
        per_page: 10,
      },
      statusPotal: {
        1: {
          text: 'Aitvo',
          color: 'green',
          colorText: 'white--text',
        },
        0: {
          text: 'Inativo',
          color: 'red',
          colorText: 'white--text',
        },
      },

      statusGratuidade: {
        1: {
          text: 'Grátis',
          color: 'green',
          colorText: 'white--text',
        },
        0: {
          text: 'Pago',
          color: 'red',
          colorText: 'white--text',
        },
      },
      padroesXML: [
        { id: 1, nome: 'Padrão Viva Real' },
        { id: 2, nome: 'Padrão Zap' },
        { id: 3, nome: 'Padrão Imovel Web' },
        { id: 4, nome: 'Padrão Imoveis Santa Catarina' },
        { id: 5, nome: 'Padrão Mercado Livre' },
      ],

      colunas: [
        {
          cols: '12',
          lg: '5',
          text: 'Imoveis',
          value: 'imoveis',
        },
        {
          cols: '12',
          lg: '3',
          text: 'Padrão XML',
          value: 'padrao',
        },
        {
          cols: '12',
          lg: '3',
          text: 'Gratuidade',
          value: 'negociacoes',
        },
        {
          cols: '12',
          lg: '1',
          text: 'opções',
          customClass: 'text-right',
          value: 'status',
        },
      ],
      portalModal: {
        id: '',
        status: 1,
        gratuito: '',
        url_logo: null
      },
    }
  },
  computed: {
    portais() {
      return this.$store.state.portais.portal
    },
  },

  methods: {
    abrirModal(portal){
      this.$root.$emit('modalPortal', true)
      this.portalModal = portal
    }

  }

}
</script>
