<template>
  <v-app dark>
    <v-row justify="center" class="mt-6">
      <v-col cols="2">
        <svgs-triste />
      </v-col>
      <v-col cols="6">
        <p
          v-if="error.statusCode === 404"
          class="text-h2"
          v-html="(error.header || pageNotFound)"
        />
        <p v-else class="text-h2 red--text" v-html="otherError" />

        <v-btn
          v-if="error.statusCode !== 404"
          dark
          small
          color="red"
          @click="abrirChatMovidesk()"
        >
          <v-icon left>
            mdi-chat-question
          </v-icon>
          Abrir chamado no suporte
        </v-btn>
        <br>
        <v-btn dark small class="mt-2" color="primary" @click="$router.back()">
          <v-icon left>
            mdi-arrow-u-left-top
          </v-icon>
          Voltar para última página
        </v-btn>
        <br>
        <v-btn dark small class="mt-2" to="/" color="primary">
          <v-icon left>
            mdi-view-dashboard
          </v-icon>
          Ir para dashboard
        </v-btn>
      </v-col>
      <v-col cols="12">
        <code>{{ error.message }}</code>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: 'Página não encontrada.',
      otherError: 'Ops! <br> Ocorreu um erro no sistema.',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },

  methods: {
    abrirChatMovidesk() {
      // eslint-disable-next-line
      movideskChatWidgetChangeWindowState('maximized')
    },
  },
}
</script>
