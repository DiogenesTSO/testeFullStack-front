<template>
  <v-card v-show="!hideNotFound || rows.length" color="card">
    <v-progress-linear v-show="!hideNotFound && !rows.length && !loadingSistema" indeterminate color="primary" />
    <v-row v-show="!hideNotFound && !rows.length && !loadingSistema">
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
    <v-row v-if="!hideHeader" no-gutters class="d-none d-lg-block po-sticky" style="top: 0; z-index: 1;">
      <v-col v-show="rows.length">
        <div
          class="d-flex py-4 px-3 background elevation-1 font-weight-bold text-subtitle-1"
          :class="$vuetify.theme.dark ? 'lighten-1' : ''"
        >
          <div v-if="selectable" class="d-flex align-center mr-2">
            <v-checkbox v-model="selectAll" class="ma-0 pa-0" hide-details :dense="dense" />
          </div>
          <div v-if="expand" class="d-none d-md-flex align-center my-n2 mr-2">
            <v-btn icon @click="expandAll">
              <v-icon :class="allExpanded ? 'rotate' : ''">
                mdi-chevron-double-down
              </v-icon>
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
                <slot :name="`header_${col.value}`" :header="col">
                  <strong>{{ col.text }}</strong>
                </slot>
              </label>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <slot name="afterHeader" />
    <v-row v-show="rows.length" no-gutters class="mb-2">
      <v-col v-for="(row, index) in rows" :key="'row_' + index + row.id" cols="12">
        <v-divider v-if="index" />

        <div
          class="px-3 d-flex justify-center align-center normal--text text-break"
          :class="dense ? 'py-2' : 'py-4'"
          @click="clickable ? $emit('clickItem', row) : null"
        >
          <div v-if="selectable" class="d-flex align-center mx-2 my-1">
            <v-checkbox v-model="selected" :value="row" class="ma-0 pa-0" hide-details :dense="dense" />
          </div>
          <div v-if="expand" class="d-none d-md-block mr-2">
            <v-btn :class="expanded.includes(index) ? 'rotate' : ''" icon @click="changeExpansion(index)">
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </div>
          <v-row class="flex-grow-1 flex-wrap maw-100" :class="'item px-0 ' + (dense ? 'py-0' : '')">
            <v-col
              v-for="(col, i) in cols"
              :key="'row_col_' + i + col.name + row.id"
              :cols="col.cols ? col.cols : ''"
              :lg="col.lg ? col.lg : ''"
              :class="`d-flex flex-wrap justify-md-${col.justify || 'start'}
                              justify-space-between
                              align-center
                            align-self-${col.align || 'center'}
                            ${col.customClass}`"
            >
              <label v-if="!hideHeaderMobile" class="d-md-none text--disabled">
                {{ col.text }}
              </label>
              <router-link
                v-if="col.router"
                class="text-decoration-none normal--text"
                :to="`/${to}/${row.id}`"
              >
                <slot :name="col.value" :row="row" :index="index">
                  {{ col.value == 'opcoes' ? '' : row[col.value] }}
                </slot>
              </router-link>
              <slot v-else :name="col.value" :row="row" :index="index">
                {{ col.value == 'opcoes' ? '' : row[col.value] }}
              </slot>
            </v-col>
            <v-col v-if="expand" cols="12" class="d-block d-md-none">
              <v-btn text block @click="changeExpansion(index)">
                <v-icon :class="expanded.includes(index) ? 'rotate' : ''">
                  mdi-chevron-down
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </div>
        <v-expand-transition>
          <div v-if="expanded.includes(index)" class="mx-4 pb-4">
            <slot name="extra" :row="row" :index="index" />
          </div>
        </v-expand-transition>
      </v-col>
    </v-row>
    <slot name="footer" />
  </v-card>
</template>

<script>
export default {
  name: 'ColList',

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
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
    expandRows: {
      type: Array,
      default: () => [],
    },
    to: {
      type: String,
      default: '',
    },
    hideNotFound: {
      type: Boolean,
      default: false,
    },
    hideHeader: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'card',
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
    allExpanded() {
      return this.expanded.length >= this.rows.length
    },
  },
  watch: {
    rows: {
      handler() {
        this.selected = []
        this.expanded = []
      },
      deep: true,
    },
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
    'expandRows.length'() {
      this.expanded = this.expandRows
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
    expandAll() {
      if (this.allExpanded) {
        this.expanded = []
      } else {
        this.expanded = this.rows.map((row, i) => i)
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
s
