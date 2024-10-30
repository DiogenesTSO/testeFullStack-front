<template>
  <v-list :nav="nav" :dense="dense" :shaped="shaped" :rounded="rounded">
    <template v-for="(item, i) in items">
      <v-list-group
        v-if="
          item.children &&
            (item.render ? item.render(configuracoes) : true)
        "
        :key="'parent-' + item.text"
        :value="collapse ? false : item.active"
        class="mt-2"
        link
        :color="color"
        :class="item.active ? 'list-group-active' : ''"
        @input="changeActive($event, i)"
      >
        <template #activator>
          <v-list-item-icon>
            <v-icon :color="item.active ? 'primary' : ''">
              {{ 'mdi-' + item.icon }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title class="font-visby font-weight-bold">
            {{ item.text }}
          </v-list-item-title>
        </template>
        <template v-for="child in item.children">
          <v-list-item
            v-if="(child.render ? child.render(configuracoes) : true)
            "
            :key="'child-' + child.text"
            dense
            class="mt-2"
            link
            :disabled="child.disabled"
            :to="child.to ? { name: child.to } : ''"
            :href="child.href"
            :target="child.href ? '' : ''"
            @click="setOpened(child)"
          >
            <v-list-item-icon v-if="child.icon">
              <v-icon
                dense
                :color="color"
                :class="
                  child.key === value.key
                    ? 'primary--text text--lighten-2 '
                    : ''
                "
              >
                mdi-{{ child.icon }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ child.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list-group>
      <v-list-item
        v-else-if="
          (item.render ? item.render(configuracoes) : true)
        "
        :key="'children-' + item.text"
        link
        :to="item.to ? { name: item.to } : ''"
        :href="item.href"
        :target="item.href ? '' : ''"
      >
        <v-list-item-icon v-if="item.icon">
          <v-icon :color="iconColor">
            mdi-{{ item.icon }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
export default {
  name: 'ListAction',
  props: {
    value: {
      type: Object,
      required: true,
    },
    data: {
      type: [Object, Array],
      required: true,
    },
    action: {
      type: String,
      required: false,
      default: '',
    },
    shaped: {
      type: [String, Number, Boolean],
      required: false,
      default: false,
    },
    nav: {
      type: [String, Number, Boolean],
      required: false,
      default: false,
    },
    rounded: {
      type: [String, Number, Boolean],
      required: false,
      default: false,
    },
    color: {
      type: [String, Number, Boolean],
      required: false,
      default: '',
    },
    dense: {
      type: [String, Number, Boolean],
      required: false,
      default: false,
    },
    iconColor: {
      type: [String, Number, Boolean],
      required: false,
      default: '',
    },
    collapse: {
      type: [String, Number, Boolean],
      required: false,
      default: false,
    },
  },
  data() {
    return {
      items: this.data.map(item => ({
        ...item,
        ...{ active: this.$route.path.includes(item.group) },
      })),
    }
  },
  computed: {

  },

  watch: {
    'data.length'() {
      this.items = this.data.map(item => ({
        ...item,
        ...{ active: this.$route.path.includes(item.group) },
      }))
    },
    collapse() {
      this.items = this.data.map(item => ({
        ...item,
        ...{
          active: this.$route.path.includes(item.group),
        },
      }))
    },
  },

  methods: {
    changeActive(event, index) {
      this.items[index].active = event
    },
    checkActive(item) {
      return this.$route.path.includes(item.group)
    },
    setOpened(item, action = '') {
      if (!action) {
        this.$emit('input', item)
      } else {
        this.$emit(action, item)
      }
    },
  },
}
</script>

<style lang="scss">
.list-group-active {
  .v-list-group__header {
    background-color: var(--v-background-base);
    border-bottom-right-radius: 32px !important;
    border-top-right-radius: 32px !important;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
      0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  }
}
</style>
