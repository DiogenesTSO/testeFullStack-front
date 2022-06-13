<template>
  <div>
    <v-menu
      offset-y
      offset-x
      bottom
      left
      close-on-content-click
      transition="slide-x-reverse-transition"
    >
      <template #activator="{ on, attrs }">
        <div v-bind="attrs" v-on="on">
          <slot name="activator">
            <v-btn icon small>
              <v-icon>
                mdi-dots-{{ horizontal ? 'horizontal' : 'vertical' }}
              </v-icon>
            </v-btn>
          </slot>
        </div>
      </template>

      <v-list v-if="items.length" color="card">
        <v-list-item
          v-for="(item, i) in items"
          v-show="item.render ? item.render(object) : true"
          :key="'item_' + i"
          :class="`${item.color}--text`"
          :to="item.to ? item.to(object) : null"
          :target="item.target"
          @click="item.action ? $emit(item.action, object) : null"
        >
          <v-list-item-icon v-if="item.icon" class="mr-3">
            <v-icon>mdi-{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="pa-0">
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
            <v-list-item-subtitle
              :class="`${item.color}--text text--lighten-2`"
            >
              {{ item.subtitle }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <slot />
    </v-menu>
  </div>
</template>

<script>
export default {
  props: {
    horizontal: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default: () => [],
    },
    object: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style></style>
