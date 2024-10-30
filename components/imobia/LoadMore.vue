<template>
  <v-btn
    v-show="showButton"
    dark
    class="px-0"
    small
    block
    :loading="loading"
    :color="color"
    text
    @click="loadMore()"
  >
    <v-divider class="mr-2" />
    <v-icon class="mr-1">
      mdi-chevron-down
    </v-icon>
    <slot name="label">
      Carregar Mais
    </slot>

    <v-divider class="ml-2" />
  </v-btn>
</template>

<script>
export default {
  name: 'ImobiaLoadMore',
  props: {
    module: {
      type: String,
      default: '',
    },
    action: {
      type: String,
      default: '',
    },
    filters: {
      type: [Object, Array],
      default: () => {},
    },
    color: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isOpen: this.value,
      loading: false,
      showButton: true,
      ordenacao: {
        tipo_ordenacao: '',
        sentido_ordenacao: 'DESC',
      },
    }
  },
  computed: {
    currentMeta() {
      if (this.module) {
        return this.$store.state[this.module].currentMeta ?? {}
      }
      return {}
    },
  },
  watch: {
    currentMeta: {
      handler() {
        if (
          this.currentMeta.current_page >= this.currentMeta.last_page ||
          !this.currentMeta.total
        ) {
          this.showButton = false
        } else {
          this.showButton = true
        }
      },
      deep: true,
    },
  },
  methods: {
    loadMore() {
      const page = this.currentMeta.current_page + 1
      this.$emit('loading')
      this.loading = true
      const filters = {
        ...this.$help.removeEmpty(this.filters),
        ...{ page },
      }

      this.$store
        .dispatch(this.module + '/' + this.action, filters)
        .finally(() => {
          this.loading = false
          this.$emit('loaded')
        })
    },
  },
}
</script>
