<template>
  <div>
    <v-card
      :disabled="loading"
      :loading="true"
      :color="transparent ? 'transparent' : 'card'"
      :class="transparent ? 'elevation-0' : 'mb-7'"
      class="elevation-0"
    >
      <v-card-title class="text-h6">
        {{ title }}
      </v-card-title>
      <v-card-subtitle v-if="!hidePagination">
        {{
          loading
            ? 'Carregando...'
            : 'Mostrando ' +
              (itemsLength ||
                (currentMeta.to ? currentMeta.to : 0) +
                ' de ' +
                (currentMeta.total ? currentMeta.total : 0))
        }}
      </v-card-subtitle>
      <v-card-text>
        <v-form ref="filters" @submit.prevent="filter()">
          <slot />
          <v-row v-if="!hideMore">
            <v-col>
              <imobia-collapse color="primary" top>
                <slot name="extra" />
              </imobia-collapse>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" lg="2">
              <imobia-select
                v-if="order"
                v-model="ordenacao.campo"
                :items="ordensCampo"
                label="Ordenar por"
              />
            </v-col>
            <v-col class="d-flex d-lg-block justify-center" cols="12" lg="3">
              <v-radio-group
                v-if="order"
                v-model="ordenacao.ordem"
                class="mt-1"
                dense
                hide-details
                row
              >
                <v-radio label="Crescente" value="asc" />
                <v-radio label="Decrescente" value="desc" />
              </v-radio-group>
            </v-col>
            <v-col class="d-lg-block d-none" lg="4" />
            <v-col
              v-if="!noAction"
              class="d-flex d-lg-block text-right justify-center"
              cols="12"
              lg="3"
            >
              <v-btn text class="mr-2" @click="reset()">
                <v-icon class="mr-1">
                  mdi-broom
                </v-icon>
                Limpar
              </v-btn>
              <v-btn type="submit" dark color="primary">
                <v-icon class="mr-1">
                  mdi-magnify
                </v-icon>
                Procurar
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
    <v-divider v-if="transparent && resume" class="mb-5 mt-n5" />
    <v-row v-if="resume" class="mt-n4 mb-4 text-h6" justify="center">
      <slot name="resume" />
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Pesquisar',
    },
    module: {
      type: String,
      default: '',
    },
    order: {
      type: Boolean,
      default: false,
    },
    resume: {
      type: Boolean,
      default: false,
    },
    transparent: {
      type: Boolean,
      default: false,
    },
    openResume: {
      type: Boolean,
      default: false,
    },
    hideMore: {
      type: Boolean,
      default: false,
    },
    hidePagination: {
      type: Boolean,
      default: false,
    },
    itemsLength: {
      type: Number,
      default: 0,
    },
    action: {
      type: String,
      default: '',
    },
    noAction: {
      type: Boolean,
      default: false,
    },
    filters: {
      type: [Object, Array],
      default: () => {},
    },
    ordensCampo: {
      type: [Object, Array],
      default: () => {},
    },
    resetFunction: {
      type: Function,
      default: () => {
        this.$refs.filters.reset()
      },
    },
  },
  data() {
    return {
      loading: false,
      ordenacao: {
        campo: 'codigo',
        ordem: 'desc',
      },
      resumoCollapse: this.openResume,
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
    action() {
      this.filter()
    },

    currentMeta: {
      handler() {
        this.resumoCollapse = true
      },
      deep: true,
    },

    /*   filters: {
      handler() {
        this.filter()
      },
      deep: true,
    }, */
    ordenacao: {
      handler() {
        // o campo de filtros deveria ser um v-model, com o campo ordenação dentro
        // como não foi estruturado assim, a gente chama essa função
        this.$emit('ordenar', this.ordenacao)
      },
      deep: true,
    },
  },

  mounted() {
    this.filter()
  },

  methods: {
    async reset() {
      await this.resetFunction()
      this.filter()
    },

    filter() {
      this.$store.dispatch('layout/carregando', true)
      this.$emit('submit')

      this.loading = true
      const filters = this.$help.removeEmpty(this.filters)
      this.$store
        .dispatch(this.module + '/' + this.action, {
          ...filters,
          ordenacao: this.ordenacao,
        })
        .finally((res) => {
          this.$emit('loaded', res)
          this.loading = false
          this.$store.dispatch('layout/carregando', false)
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
