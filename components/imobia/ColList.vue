<template>
  <div v-show="!hideNotFound || rows.length">
    <slot name="filters" />

    <v-row v-if="$slots.options" align="center">
      <v-col cols="12">
        <slot name="options" />
      </v-col>
    </v-row>
    <v-row
      v-show="!hideNotFound && !rows.length && !loadingSistema"
      class="mb-2"
    >
      <v-col>
        <v-row justify="center" align="center">
          <v-col cols="6" justify="center" align="center">
            <div style="width: 30%;">
              <svgs-nao-encontrado />
            </div>
            <h2 class="text-center primary--text text--lighten-1">
              Nenhum resultado encontrado
            </h2>
            <p class="grey--text text--darken-1">
              Não foi encontrado nenhum resultado com os filtros aplicados.
            </p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="d-none d-lg-block">
      <v-col v-show="rows.length">
        <v-card v-if="!hideHeader" elevation="1" color="card">
          <v-card-text class="d-flex">
            <div v-if="selectable" class="d-flex align-center mr-2">
              <v-checkbox
                v-model="selectAll"
                class="ma-0 pa-0"
                hide-details
                :dense="dense"
              />
            </div>
            <div
              v-if="expand"
              class="d-none d-md-flex align-center my-n2 mr-2 ml-n2"
            >
              <v-btn icon color="transparent">
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </div>
            <v-row class="d-none d-lg-flex flex-grow-1">
              <v-col
                v-for="(col, i) in cols"
                :key="'header_' + col.value + i"
                :cols="col.cols ? col.cols : ''"
                :lg="col.lg ? col.lg : ''"
                :class="
                  'align-self-' +
                    (col.align ? col.align : 'center') +
                    ' d-flex ' +
                    (col.justify ? 'justify-' + col.justify : 'start')
                "
              >
                <label>
                  <strong>{{ col.text }}</strong>
                </label>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-show="rows.length" class="mb-2">
      <v-col
        v-for="(row, index) in rows"
        :key="'row_' + index + row.id"
        class="pt-1 pb-2"
        cols="12"
      >
        <v-card
          elevation="1"
          :ripple="clickable ? true : false"
          :color="color"
          @click="clickable ? $emit('clickItem', row) : null"
        >
          <v-card-text
            class="d-flex justify-center normal--text text-break"
            :class="dense ? 'py-3' : ''"
          >
            <div v-if="selectable" class="d-flex align-center mr-2 my-1">
              <v-checkbox
                v-model="selected"
                :value="row"
                class="ma-0 pa-0"
                hide-details
                :dense="dense"
              />
            </div>
            <div v-if="expand" class="d-none d-md-flex align-center mr-2 ml-n2">
              <v-btn
                :class="expanded.includes(index) ? 'rotate' : ''"
                icon
                @click="changeExpansion(index)"
              >
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </div>
            <v-row
              class="flex-grow-1 flex-wrap maw-100"
              :class="'item px-0 ' + (dense ? 'py-0' : '')"
            >
              <v-col
                v-for="(col, i) in cols"
                :key="'row_col_' + i + col.name + row.id"
                :cols="col.cols ? col.cols : ''"
                :lg="col.lg ? col.lg : ''"
                :class="
                  'align-self-' +
                    (col.align ? col.align : 'center') +
                    ' ' +
                    col.customClass
                "
              >
                <router-link
                  v-if="col.router"
                  class="text-decoration-none normal--text"
                  :to="`/${to}/${row.id}`"
                >
                  <label v-if="!hideHeaderMobile" class="d-lg-none">
                    <strong>{{ col.text }}</strong>
                    <br>
                  </label>
                  <div>
                    <slot :name="col.value" :row="row" :index="index">
                      {{ col.value == 'opcoes' ? '' : row[col.value] }}
                    </slot>
                  </div>
                </router-link>
                <div v-else>
                  <label v-if="!hideHeaderMobile" class="d-lg-none">
                    <strong>{{ col.text }}</strong>
                    <br>
                  </label>
                  <div>
                    <slot :name="col.value" :row="row" :index="index">
                      {{ col.value == 'opcoes' ? '' : row[col.value] }}
                    </slot>
                  </div>
                </div>
              </v-col>
              <v-col v-if="expand" cols="12" class="d-block d-md-none">
                <v-btn text block @click="changeExpansion(index)">
                  <v-icon :class="expanded.includes(index) ? 'rotate' : ''">
                    mdi-chevron-down
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
          <v-expand-transition>
            <div v-if="expanded.includes(index)" class="mx-4 pb-4">
              <v-divider class="my-4" />
              <slot name="extra" :row="row" :index="index" />
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'ColList',

  props: {
    dense: {
      type: Boolean,
      default: false,
    },
    selectable: {
      type: Boolean,
      default: false,
    },
    expand: {
      type: Boolean,
      default: false,
    },
    hideHeaderMobile: {
      type: Boolean,
      default: false,
    },
    cols: {
      type: Array,
      default: () => [],
    },
    rows: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Array,
      default: () => [],
    },
    clickable: {
      type: Boolean,
      default: false,
    },
    to: {
      type: String,
      default: '',
    },
    hideNotFound: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'card',
    },
    hideHeader: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectAll: false,
      selected: this.value,
      expanded: [],
    }
  },
  computed: {
    loadingSistema() {
      return this.$store.state.layout.loading
    },
  },
  watch: {
    selectAll() {
      this.selectAll ? (this.selected = this.rows) : (this.selected = [])
    },
    'selected.length'() {
      if (!this.selected) {
        this.selected = []
      }
      this.$emit('input', this.selected)
      if (!this.selected?.length) {
        this.selectAll = false
      }
    },
    'value.length'() {
      this.selected = this.value
    },
  },
  methods: {
    changeExpansion(index) {
      if (this.expanded.includes(index)) {
        this.expanded.splice(
          this.expanded.findIndex(i => i === index),
          1,
        )
      } else {
        this.expanded.push(index)
      }
    },
  },
}
</script>

<style lang="scss">
.item {
  padding: 8px;
}
.rotate {
  transform: rotate(180deg);
}
</style>
