<template>
  <div>
    <v-dialog
      v-model="dialog"
      :persistent="persistent"
      :max-width="large ? '1000px' : small ? '400px' : '750px'"
      scrollable
      @click:outside="$emit('close')"
    >
      <v-card v-if="!clean && !loading" color="card" :disabled="disabled">
        <v-card-title class="primary--text">
          {{ title }}
          <v-spacer />
          <v-btn class="mt-n2 mr-n4" icon @click="closeModal()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider />
        <v-card-text class="pt-5">
          <slot />
        </v-card-text>
        <v-card-actions v-if="!noAction" class="pt-2">
          <v-spacer />
          <slot name="actions">
            <v-btn
              dark
              :loading="loadingButton"
              color="green"
              @click="$emit('save')"
            >
              Salvar
            </v-btn>
          </slot>
        </v-card-actions>
      </v-card>
      <v-card v-else-if="loading" color="card">
        <v-card-title class="primary--text">
          {{ title }}
          <v-spacer />
          <v-btn dark class="mt-n2 mr-n4" icon @click="closeModal()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-skeleton-loader type="article" />
        </v-card-text>
      </v-card>
      <div v-else>
        <v-card max-height="100%" class="overflow-hidden">
          <slot />
          <v-btn
            dark
            absolute
            top
            right
            icon
            small
            color="error"
            @click="closeModal()"
          >
            <v-icon>mdi-close-thick</v-icon>
          </v-btn>
        </v-card>
      </div>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    id: {
      type: [Number, String],
      default: '',
    },
    value: {
      type: [Boolean, Number, String],
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    loadingButton: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: [Boolean, Number, String],
      default: false,
    },
    noAction: {
      type: Boolean,
      default: false,
    },
    persistent: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    large: {
      type: Boolean,
      default: false,
    },
    clean: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialog: this.value,
    }
  },
  watch: {
    dialog() {
      this.$emit('input', this.dialog)
      this.$emit(this.dialog ? 'opened' : 'closed')
    },
    value() {
      this.$emit(this.value ? 'open' : 'close')
      this.dialog = this.value
    },
  },
  mounted() {
    if (this.id) {
      this.$nuxt.$on(this.id, (state) => {
        this.$emit(state ? 'open' : 'close')
        this.dialog = state
      })
    }
  },
  destroyed() {
    this.$nuxt.$off(this.id)
  },
  methods: {
    closeModal() {
      this.$emit('close')
      this.dialog = false
    },
  },
}
</script>

<style></style>
