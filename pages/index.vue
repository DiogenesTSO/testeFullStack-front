<template>
  <v-row>
    <imobia-modal id="modalImg" clean large>
      <!-- <a :href="banner.link || '#'" target="_blank">
        <v-img v-ripple :src="banner.url_completa" />
      </a> -->
    </imobia-modal>
  </v-row>
</template>

<script>
import moment from 'moment'
export default {
  meta: {
    title: 'Dashboard',
  },

  data() {
    return {
      mesReferencia: moment().format('MMM'),
      colors: this.generateColors(),
    }
  },

  computed: {
    usuarioPermitidoFinanceiro() {
      return (
        this.$help.checkPermission(
          {
            permissions: [
              'ver financeiro',
              'editar financeiro',
              'remover financeiro',
            ],
          },
          this.user,
        ) || this.user.is('administrador')
      )
    },
    user() {
      return this.$store.state.auth.user
    },

  },


  methods: {
    generateColors() {
      const colors = []

      for (let i = 0; i < 36; i++) {
        const color = this.$help.hslToRgb(
          i * 20 + 60,
          Math.random() / 5 + 0.8,
          Math.random() / 3 + 0.4,
        )
        colors.push(
          `#${parseInt(color[0]).toString(16).padStart(2, '0')}${parseInt(
            color[1],
          )
            .toString(16)
            .padStart(2, '0')}${parseInt(color[2])
            .toString(16)
            .padStart(2, '0')}`,
        )
      }
      /*  colors.sort((a, b) => {
        return this.$help.randomInt(-1, 1)
      }) */
      return colors
    },

  },
}
</script>

<style></style>
