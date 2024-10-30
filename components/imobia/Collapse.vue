<template>
  <div>
    <v-expand-transition v-if="top">
      <div v-show="isOpen">
        <div :class="'pb-2 rounded ' + backgroundColor">
          <slot />
        </div>
      </div>
    </v-expand-transition>

    <v-btn
      class="px-0"
      small
      block
      :color="color"
      text
      @click="isOpen = !isOpen"
    >
      <v-divider class="mr-2" />
      <slot name="label">
        <span v-if="!hideLabel">{{ isOpen ? 'Menos' : 'Mais' }} opções</span>
      </slot>
      <v-icon :class="'chevron ' + (isOpen ? 'spin-180' : '')">
        mdi-chevron-down
      </v-icon>
      <v-divider class="ml-2" />
    </v-btn>

    <v-expand-transition v-if="!top">
      <div v-show="isOpen">
        <div :class="'pt-2 rounded ' + backgroundColor">
          <slot />
        </div>
      </div>
    </v-expand-transition>
  </div>
</template>

<script>
export default {
  name: 'ImobiaCollapse',
  props: {
    color: {
      type: String,
      default: '',
    },
    top: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [Boolean, Number, String],
      default: false,
    },
    hideLabel: {
      type: [Boolean, Number, String],
      default: false,
    },
    backgroundColor: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isOpen: this.value,
    }
  },
  watch: {
    value() {
      this.isOpen = this.value
    },
    isOpen() {
      this.$emit('input', this.isOpen)
    },
  },
  methods: {
    resetForm() {
      this.$refs.filters.reset()
    },
  },
}
</script>

<style lang="scss" scoped>
.chevron {
  transition: 0.3s;
}
.spin-180 {
  transform: rotate(180deg);
}
</style>
