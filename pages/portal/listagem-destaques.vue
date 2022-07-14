<template>
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
            Cadastrar Tipo de destaque
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="item in destaque" :key="item" cols="12">
        <v-card color="card">
          <v-card-text>
            <v-row align="center">
              <v-col cols="1" class="d-flex flex-column">             
                {{ item.id }}
              </v-col>
              <v-col cols="3" class="d-flex flex-column">             
                {{ item.nome }}
              </v-col>
              <v-col cols="3" class="d-flex flex-column">
                {{ item.nome_tag }}
              </v-col>
              <v-col cols="3" class="d-flex flex-column">
                {{ padroesXML[item.id_padrao_xml].nome }}
              </v-col>

              <v-col cols="2" class="d-flex justify-end">
                <v-tooltip bottom>
                  <template #activator="{ on, attrs }">
                    <span v-bind="attrs" style=" margin-top: 8px;" v-on="on">
                      <v-avatar
                        left
                        size="10"
                        :class="status[item.status].cor + ' mr-3'"
                      />
                    </span>
                  </template>
                  {{ status[item.status].nome }}
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
                    <v-list-item @click="abrirModal(item)">
                      <v-list-item-avatar class="ma-0">
                        <v-icon>mdi-square-edit-outline</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title>Detalhes</v-list-item-title>
                        <v-list-item-subtitle>
                          Ver ou editar tipo de Destaque
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <portal-modal-tipo-destaque :current-destaque="destaqueModal " />
  </div>
</template>

<script>
export default {
  data(){
    return {
      destaque: {},
      destaqueModal: {
        id: '',
        nome: '',
        nome_tag: '',
        id_padrao_xml: [],
        status: 1,
      },
      padroesXML: [
        { id: 1, nome: 'Padrão Viva Real' },
        { id: 2, nome: 'Padrão Zap' },
        { id: 3, nome: 'Padrão Imovel Web' },
        { id: 4, nome: 'Padrão Imoveis Santa Catarina' },
        { id: 5, nome: 'Padrão Mercado Livre' },
      ],
      status: {
        1: {
          cor: 'green',
          nome: 'Ativo',
        },
        0: {
          cor: 'red',
          nome: 'Inativo',
        },
      },
    }
  },

  mounted(){
    this.$store
      .dispatch('portais/carregarTipoDestaques') 
      .then((res) => {
        this.destaque = res
      })
  },

  methods: {
    abrirModal(destaque){
      this.$root.$emit('modalDestaque', true)
      this.destaqueModal = destaque
    }
  }

}

</script>
