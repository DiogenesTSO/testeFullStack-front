<template :loading="loading">
  <div>
    <v-row align="center" class="my-2">
      <v-col cols="12">
        <div class="d-flex justify-space-between">
          <v-btn
            small
            color="primary"
            class="ml-2"
            @click="abrirModal()"
          >
            <v-icon left>
              mdi-plus 
            </v-icon>
            Cadastrar Banner
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="item in banner.data"
        :key="item.data"
        cols="12"
        md="4"
        lg="6"
      >
        <v-card max-width="100%">
          <div class="d-flex align-center">
            <v-img
              width="100%"
              max-height="170px"
              :src="(item.url
                ? item.url
                : $vuetify.theme.dark
                  ? 'https://static.useimobia.com.br/sistema/nao_encontrada_dark.png'
                  : 'https://static.useimobia.com.br/sistema/nao_encontrada.png'
              )"
            />
          </div>
          <v-card-text>
            <div class="d-flex align-center">
              <div>
                <v-card-title class="text-truncate">
                  Imobia-{{ item.sistema }}
                </v-card-title>
                <v-card-subtitle class="text-left text-disabled">
                  Banner do dia {{ $format.date(item.data_inicio, 'DD/MM/YYYY') }} até {{ $format.date(item.data_fim, 'DD/MM/YYYY') }}
                </v-card-subtitle>
              </div>
            </div>
            
            <v-btn
              color="primary"
              block
              class="mt-4"
              @click="abrirModal(item)"
            >
              Editar
            </v-btn>
            <v-btn
              color="red"
              block
              class="mt-4"
              @click="removerBanner(item.id)"
            >
              Excluir
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <banner-modal-banner :current-banner="bannerModal" />
  </div>
</template>
<script>

import moment from 'moment'
export default {
  name: 'Baners',
 
  meta: {
    title: 'Banners',
  },
 
  data() {
    return {
      banner: {},
      bannerModal: {
        id: '',
        sistema: '3',
        url: [],
        link: '',
        status: 1,
        data_inicio: moment().format('YYYY-MM-DD'),
        data_fim: moment().format('YYYY-MM-DD'),
      },
    }
  },
  head() {
    return {
      title: 'Listagem de banners',
    }
  },


  mounted (){
    this.$store
      .dispatch('banners/carregarBanner') 
      .then((res) => {
        this.banner = res
      })
  },

  methods: {
    removerBanner(id) {
      this.$nuxt.$emit('confirm', {
        title: 'Remover Banner',
        text:
          'Você tem certeza que deseja remover esse Banner? Isso não poderá ser revertido.',
        okText: 'Remover',
        okColor: 'red',
        done: () => {
          this.$store.dispatch('layout/carregando', true)

          this.$store
            .dispatch('banners/removerBanner', id)
            .finally(() => {
              this.$store.dispatch('layout/carregando', false)
            })
        },
      })
    },
    abrirModal(banner) {
      this.$root.$emit('modalBanner', true)
      this.bannerModal = banner
    },
  },
 
}
</script>
 
<style lang="scss" scoped></style>
