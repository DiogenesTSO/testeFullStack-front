<template>
  <div>
    <v-row>
      <v-col cols="12">
        <imobia-col-list
          hide-header
          :rows="banners"
          :cols="colunas"
          clickable
          @clickItem="showModal"
        >
          <template #options>
            <v-btn
              dark
              color="primary"
              small
              @click="abrirModal()"
            >
              <v-icon left>
                mdi-plus
              </v-icon>
              Novo banner
            </v-btn>
          </template>
          <template #nome="{ row }">
            <v-row>
              <v-col cols="12" lg="4">
                <v-card color="card" width="100%">
                  <v-img
                    width="100%"
                    max-height="150px"
                    :src="(row.foto_capa
                      ? row.foto_capa.url
                      : $vuetify.theme.dark
                        ? 'http://placekitten.com/200/300'
                        : 'https://static.useimobia.com.br/sistema/nao_encontrada.png'
                    )"
                  />
                </v-card>
              </v-col>
              <v-col cols="12" lg="8">
                <v-row>
                  <v-col>
                    <span>
                      <span>
                        <h2
                 
                 
                          class="text--secondary text-truncate mt-2 text-wrap pb-2"
                          style="max-width: 40rem;"
                        >
                          <strong>Banner para o carnaval</strong>
                        </h2>
                      </span>
                    </span>
                  </v-col>
                </v-row>
                <v-divider class="mt-1 mr-12 mb-2" />
                <v-row>
                  <v-col>
                    <span class="text--secondary">
                      <strong>Sistema:</strong>
                      <span>
                        Imobia-2
                      </span>
 
                    </span>
                  </v-col>
                </v-row>
                <br>
                <v-row>
                  <v-col
                    class="text-left"
                  />
                </v-row>
                <div class="d-flex flex-column-reverse">
                  <span>
                    <v-tooltip>
                      <template #activator="{ on, attrs} ">
                        <span v-bind="attrs" v-on="on">
                          <div
                            style="display: inline-block;"
                            class="text--secondary "
                          >
                            <span>Data de Inicio</span>
                            <p>
                     
                              <strong>
                                16/03/2022
                              </strong>
                            </p>
                          </div>
                         
                          <div
                            style="display: inline-block;padding-left: 10%; "
                            class=" text--secondary "
                          >
                            <span>Data do fim:</span>
                            <br>
 
                            <p>
                     
                              <strong>
                                16/03/2022
                              </strong>
                            </p>
                 
                          </div>
                        </span>
                
                      </template>
                      
                    </v-tooltip>
 
                  </span>
                </div>
              </v-col>
            </v-row>
          </template>
 
          <template #opcoes="{row}">
            <imobia-button-menu :items="menu" @editar="abrirModal(row)" />
          </template>
        </imobia-col-list>
      </v-col>
    </v-row>
 
    <banner-modal-banner v-model="showModalCadastroTipo" />
  </div>
</template>
<script>
export default {
  name: 'Baners',
 
  meta: {
    title: 'Banners',
  },
 
  data() {
    return {
      status: '1',
      nome: '',
      tipo: {},
      loading: false,
      menu: [
        {
          icon: 'pencil',
          title: 'Editar',
          subtitle: 'Editar banner',
          action: 'editar',
        },
        {
          icon: 'trash',
          title: 'Excluir',
          subtitle: 'Remover banner',
          action: 'remover',
        },
      ],
      colunas: [
        {
          cols: '12',
          lg: '10',
          text: 'Imagem',
          value: 'nome',
          align: 'center',
        },
      

        {
          cols: '12',
          lg: '2',
          text: '',
          customClass: 'text-right',
          value: 'opcoes',
          align: 'center',
        },
      ],
      statusOptions: {
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
    }
  },
  head() {
    return {
      title: 'Listagem de banners',
    }
  },
 
  computed: {
 
    banners() {
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
    abrirModal(banner) {
      this.$root.$emit('modalBanner', true)
      this.bannerModal = banner
    },
 
  },
}
</script>
 
<style lang="scss" scoped></style>
