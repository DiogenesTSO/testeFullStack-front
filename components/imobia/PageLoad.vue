<template>
  <div class="pageLoad">
    <v-overlay :value="carregando" :opacity="0.7" color="background">
      <div class="text-center">
        <v-avatar class="pulse mb-3" size="80">
          <svgs-logo />
        </v-avatar>
        <div class="loadingText">
          <span>C</span>
          <span>A</span>
          <span>R</span>
          <span>R</span>
          <span>E</span>
          <span>G</span>
          <span>A</span>
          <span>N</span>
          <span>D</span>
          <span>O</span>
        </div>
        {{ mensagem }}
      </div>
    </v-overlay>
  </div>
</template>

<script>
export default {
  name: 'PageLoad',

  computed: {
    carregando() {
      return this.$store.getters['layout/loading']
    },
    mensagem() {
      return this.$store.state.layout.loadingMessage
    },
  },
}
</script>

<style lang="scss">
.pageLoad {
  .pulse {
    animation: pulse 1s infinite;
    animation-direction: alternate;
    -webkit-animation-name: pulse;
    animation-name: pulse;
  }

  .loadingText {
    span {
      color: var(--v-primary-base);
      font-size: 25px;
      display: inline-block;
      margin: 0 -0.075em;
      animation: loadingText 1s infinite alternate;
      @for $i from 1 through 6 {
        &:nth-child(#{$i + 1}) {
          animation-delay: #{$i * 0.1}s;
        }
      }
    }
  }

  .v-application.theme--dark {
    .loadingText {
      span {
        color: white !important;
      }
    }
  }
}

@-webkit-keyframes pulse {
  0% {
    -webkit-transform: scale(1);
  }
  100% {
    -webkit-transform: scale(1.1);
  }
}
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
}

@keyframes loadingText {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.8);
  }
}
</style>
