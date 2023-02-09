<template>
  <v-card min-height="300" class="h-100 d-flex flex-column" color="card" :loading="loading ? 'primary' : ''">
    <v-card-title>
      Resumo de operações dos últimos 12 meses
      <!--  <v-spacer />
          <v-btn dark icon color="primary" class="mt-n3 mr-n3">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn> -->
    </v-card-title>
    <v-card-subtitle>
      Operações cadastradas e liquidadas dos últimos 12 meses
    </v-card-subtitle>
    <v-card-text class="grow">
      <imobia-chart-am
        :reset="$vuetify.theme.dark"
        :data="data"
        :options="{ stacked: true }"
        type="column"
      />
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
      default: false,
    },
    data: {
      type: [Object, Array],
      default: () => { },
    },
  },
}
</script>
