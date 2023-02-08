<template>
  <v-card :loading="loading ? 'primary' : ''" class="h-100 d-flex flex-column" color="card">
    <div class="mt-2">
      <v-list-item>
        <v-list-item-avatar class="justify-center">
          <v-avatar class="align-self-center" color="orange">
            <v-icon class="white--text">
              mdi-home-city
            </v-icon>
          </v-avatar>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>
            <span class="text-h5 normal--text">Boletos</span>
          </v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <span class="text-h5 orange--text">
            {{
              data.operacoes_cadastradas
            }}
          </span>
        </v-list-item-action>
      </v-list-item>
    </div>
    <v-card-text class="grow">
      <div class="d-flex flex-column align-center px-3 h-100">
        <v-responsive width="100%" aspect-ratio="1">
          <imobia-chart-am
            :options="{ donut: true }"
            :reset="$vuetify.theme.dark"
            :data="data"
            type="pie"
            :hover="hoverIndex"
            :blur="blurIndex"
          />
        </v-responsive>
        <div class="grow">
          <div class="d-flex flex-wrap align-center">
            <v-list-item-group v-for="(categoria, i) in data" :key="'categoria_' + i">
              <v-list-item
                :to="{
                  name: 'imoveis-listagem',
                  query: { tipo_imovel_id: `[${categoria.id}]` },
                }"
                ripple
                style="min-height: 25px;"
                @mouseleave="blurIndex = i"
                @mouseover="hoverIndex = i"
              >
                <v-icon small class="align-self-center mr-2" :color="categoria.color">
                  mdi-label
                </v-icon>

                <v-list-item-title>
                  {{ categoria.text }}
                </v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    showData: {
      type: Boolean,
      default: true,
    },
    data: {
      type: [Object, Array],
      default: () => { },
    },
  },
  data() {
    return {
      hoverIndex: 0,
      blurIndex: 0,
    }
  },
}
</script>
