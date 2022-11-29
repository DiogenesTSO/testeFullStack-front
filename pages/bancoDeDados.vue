<template>
  <div>
    <imobia-col-list
      :rows="empresas"
      :cols="colunas"
      dense
      clickable
      :hide-header-mobile="$vuetify.breakpoint.mobile"
    >
      <template #filters>
        <empresas-filtros-empresa v-model="filtros" />
      </template>
      <template #logo="{ row }">
        <v-row>
          <v-col cols="12" lg="4">
            <v-card color="card" width="100%">
              <v-img
                width="100%"
                max-height="150px"
                :src="(row.configuracoes.url_logo
                  ? row.configuracoes.url_logo
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
                      style="max-width: 40rem; "
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
      <template #informacoes="{ row }">
        <div class="d-flex flex-column-reverse justify-center">
          <span>
            {{ row.url_site ? url_site : 'Url do site não informada' }}
          </span>
          <span>
            Data de cadastro: {{ $format.date(row.created_at, 'DD/MM/YYYY') }}
          </span>
        </div>
      </template>
      <template #status="{ row }">
        <div class="d-flex flex-column-reverse justify-center">
          <span>
            <span>
              <v-btn
                label
                small
                :class="statusEmpresas[row.status].cor + ' mr-3'"
                @click="alterarStatus(row)"
              >
                {{ statusEmpresas[row.status].nome }}
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
            <v-list-item @click="gerarXmlClientes(row.id)">
              <v-list-item-avatar class="ma-0">
                <v-icon>mdi-file-code-outline</v-icon>
              </v-list-item-avatar>
              <v-list-item-content class="pa-0">
                <v-list-item-title>
                  Gerar XML de clientes
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="gerarXmlImoveis(row.id)">
              <v-list-item-avatar class="ma-0">
                <v-icon>mdi-file-code-outline</v-icon>
              </v-list-item-avatar>
              <v-list-item-content class="pa-0">
                <v-list-item-title>
                  Gerar XML de imóveis
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </imobia-col-list>
    <empresas-modal-alterar-status :current-status="statusModal" />
    <imobia-load-more
      color="primary"
      :filters="filtros"
      module="empresas"
      action="carregarEmpresas"
      @ordenar="filtros.ordenacao = $event"
      @loading="loading = true"
      @loaded="loading = false"
    />
  </div>
</template>
<script>



export default {
  name: 'BancoDeDados',
  meta: {
    title: 'Exportar XML',
  },
  data() {
    return {
      filtros: {
        nome: '',
        status: 'A',
        id: '',
        per_page: 20,
      },
      filiais: [],
      statusEmpresas: {
        A: { cor: 'green', nome: 'Ativo' },
        B: { cor: 'red', nome: 'Bloqueado' },
        C: { cor: 'red', nome: 'Cancelada' },
        E: { cor: 'red', nome: 'Teste expirado' },
        M: { cor: 'yellow', nome: 'Em migração' },
        T: { cor: 'green', nome: 'Em teste' },
      },
      colunas: [
        {
          cols: '12',
          lg: '5',
          text: 'Logo Empresa',
          value: 'logo',
        },
        {
          cols: '12',
          lg: '3',
          text: 'Informações',
          value: 'informacoes',
        },
        {
          cols: '12',
          lg: '3',
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
      statusModal: {
        id: '',
        status: '',
      },
    }
  },
  computed: {
    empresas() {
      return this.$store.state.empresas.empresas
    }
  },
  methods: {
    gerarXmlClientes(id) {
      this.$store.dispatch('layout/carregando', true)
      this.$store.dispatch('bancoDeDados/gerarXmlClientes', id)
        .then((xml) => {
          const filename = "clientes.xml"
          const pom = document.createElement('a')
          const bb = new Blob([xml], { type: 'text/plain' })

          pom.setAttribute('href', window.URL.createObjectURL(bb))
          pom.setAttribute('download', filename)

          pom.dataset.downloadurl = ['text/plain', pom.download, pom.href].join(':')
          pom.draggable = true
          pom.classList.add('dragout')

          pom.click()
          this.$store.dispatch('layout/carregando', false)
        })
    },
    gerarXmlImoveis(id) {
      this.$store.dispatch('layout/carregando', true)
      this.$store.dispatch('bancoDeDados/gerarXmlImoveis', id)
        .then((xml) => {
          const filename = "imoveis.xml"
          const pom = document.createElement('a')
          const bb = new Blob([xml], { type: 'text/plain' })

          pom.setAttribute('href', window.URL.createObjectURL(bb))
          pom.setAttribute('download', filename)

          pom.dataset.downloadurl = ['text/plain', pom.download, pom.href].join(':')
          pom.draggable = true
          pom.classList.add('dragout')

          pom.click()
          this.$store.dispatch('layout/carregando', false)
        })
    },
    alterarStatus(status) {
      this.$root.$emit('alterarStatus', true)
      this.statusModal = status
    }
  }
}
</script>
