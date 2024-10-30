<template>
  <v-tooltip
    :bottom="bottom"
    :top="top"
    :left="left"
    :right="right"
    open-delay="200"
    close-delay="200"
    :min-width="minWidth"
    color="transparent"
    content-class="opacity-1"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        dark
        :outlined="outlined"
        v-bind="attrs"
        :color="type"
        :icon="!fab"
        :fab="fab"
        :x-small="large ? false : true"
        @click="$emit('click', $event)"
        v-on="on"
      >
        <v-icon dense>
          {{ (icon || icons[type]) }}
        </v-icon>
      </v-btn>
    </template>
    <v-alert
      :icon="icon || icons[type]"
      border="bottom"
      colored-border
      elevation="2"
      class="ma-0"
      :color="type"
    >
      <slot />
    </v-alert>
  </v-tooltip>
</template>

<script>
export default {
  name: 'InfoTooltip',
  props: {
    icon: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'info',
    },

    minWidth: {
      type: String,
      default: '',
    },

    fab: {
      type: Boolean,
      default: false,
    },
    large: {
      type: Boolean,
      default: false,
    },
    bottom: {
      type: Boolean,
      default: false,
    },
    top: {
      type: Boolean,
      default: true,
    },
    left: {
      type: Boolean,
      default: false,
    },
    right: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      icons: {
        success: 'mdi-check-bold',
        info: 'mdi-information-variant',
        error: 'mdi-close-octagon',
        warning: 'mdi-alert',

        // jesus: 'mdi-cross',
      },
    }
  },
  mounted() {},
}
</script>

<style></style>
