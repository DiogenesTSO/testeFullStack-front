<template>
  <v-item-group
    v-model="selected"
    active-class="selecionado"
    :multiple="!single"
  >
    <v-container>
      <v-row>
        <v-col
          v-for="(item, i) in items"
          :key="'item_' + i"
          :cols="cols"
          :sm="sm"
          :md="md"
          :lg="lg"
        >
          <v-item v-slot="{ active, toggle }">
            <v-responsive
              v-ripple
              aspect-ratio="1"
              :class="
                'cursor-pointer select-none  rounded elevation-2 ' +
                  (active ? 'dz-selected' : '')
              "
              width="100%"
              @click="toggle"
            >
              <slot :active="active" :item="item" />
            </v-responsive>
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>

<script>
export default {
  props: {
    single: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [Array, Number],
      default: () => [],
    },
    emitValue: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      default: () => [],
    },
    cols: {
      type: [String, Number],
      default: '6',
    },
    sm: {
      type: [String, Number],
      default: '4',
    },
    md: {
      type: [String, Number],
      default: '3',
    },
    lg: {
      type: [String, Number],
      default: '2',
    },
  },

  data() {
    return {
      selected: this.emitValue
        ? this.value.map(item =>
          this.items.findIndex(it => it[this.emitValue] === item),
        )
        : this.value,
    }
  },
  watch: {
    value: {
      handler() {
        if (this.selected && typeof this.selected === 'object') {
          if (this.value.length !== this.selected.length) {
            this.selected = this.emitValue
              ? this.value.map(item =>
                this.items.findIndex(it => it[this.emitValue] === item),
              )
              : this.value
          }
        } else {
          this.selected = this.value
        }
      },
      deep: true,
    },
    selected: {
      handler() {
        this.emitData()
      },
      deep: true,
    },
  },
  mounted() {},
  methods: {
    emitData() {
      if (this.emitValue) {
        this.$emit(
          'input',
          this.selected.map(index => this.items[index][this.emitValue]),
        )
      } else {
        this.$emit('input', this.selected)
      }
    },
  },
}
</script>

<style></style>
