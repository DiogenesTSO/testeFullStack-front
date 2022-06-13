<template>
  <v-stepper v-model="current" :class="color" non-linear vertical outlined>
    <template
      v-for="(step, i) in stepsCmp"
      :complete="current > step"
      :step="i + 1"
    >
      <v-stepper-step
        :id="'step-' + (i + 1)"
        :key="'step-' + (i + 1)"
        :complete="current > i + 1"
        :editable="editable"
        :step="i + 1"
      >
        {{ step.title }}
        <small>{{ step.subtitle }}</small>
      </v-stepper-step>

      <v-stepper-content :key="'content-' + (i + 1)" :step=" (i + 1)">
        <slot :name="step.key" />

        <div class="d-flex justify-end mt-5">
          <v-btn
            v-if="current > 1"
            dark
            class="mr-2"
            text
            @click="previousStep"
          >
            Voltar
          </v-btn>
          <v-btn
            v-if="current !== stepsCmp.length"
            dark
            color="primary"
            @click="nextStep"
          >
            Próximo
          </v-btn>
          <v-btn v-else dark color="success" @click="$emit('save')">
            Salvar
          </v-btn>
        </div>
      </v-stepper-content>
    </template>
  </v-stepper>
</template>

<script>
export default {
  name: 'Template',
  props: {
    steps: {
      type: Array,
      default: () => [],
    },
    value: {
      type: [String, Number],
      default: 1,
    },
    color: {
      type: [String, Number],
      default: 'card',
    },

    nonLinear: {
      type: [Boolean, Number, String],
      default: false,
    },
    editable: {
      type: [Boolean, String],
      default: false,
    },
    validate: {
      type: Function,
      default: () => true,
    },
    jumpStep: {
      type: Function,
      default: () => 1,
    },
  },
  data() {
    return {
      current: this.value,
    }
  },
  computed: {
    stepsCmp() {
      return this.steps
        .map((step, i) => {
          return { ...{ key: i + 1 }, ...step }
        })
        .filter(step => !step.hidden)
    },
  },
  watch: {
    value() {
      this.current = this.value
    },
    current() {
      this.$emit('input', this.current)
    },
  },
  methods: {
    previousStep() {
      this.current -= this.stepsCmp[this.current - 2].disabled ? 2 : 1
      setTimeout(() => {
        this.$vuetify.goTo(
          '#step-' + (this.current > 1 ? this.current - 1 : this.current),
          { offset: -100 },
        )
      }, 600)
    },
    nextStep() {
      this.validate(this.stepsCmp[this.current - 1]).then((valid) => {
        if (valid) {
          this.current += this.stepsCmp[this.current].disabled ? 2 : 1
          setTimeout(() => {
            this.$vuetify.goTo('#step-' + (this.current - 1), { offset: -100 })
          }, 600)
        }
      })
    },
  },
}
</script>
