<template>
  <div>
    <!-- <v-card color="card" class="mb-2">
      <v-tabs
        v-model="teste"
        fixed-tabs
        centered
        class="px-2"
        background-color="card"
      >
        <v-tab v-for="(item, i) in items" :key="'tab-' + i" class="mt-2">
          <v-icon class="mr-2">
            {{ item.icon }}
          </v-icon>
          {{ item.text }}
        </v-tab>
      </v-tabs>
    </v-card> -->
    <v-card :loading="loading" :disabled="loading" color="card">
      <template #progress>
        <v-progress-linear color="primary" indeterminate />
      </template>
      <v-card-text>
        <v-row v-if="!hideLeftHeader && !hideHeader">
          <v-col v-if="!hideLeft" cols="12" md="3" class="d-flex flex-column">
            <slot name="headerLeft" />
            <v-divider v-if="tabs.length" class="my-2" />
          </v-col>
          <v-divider
            v-if="!hideLeft"
            class="d-none d-md-inline-flex"
            vertical
          />
          <v-col
            cols="12"
            :md="hideLeft ? '12' : '9'"
            class="d-flex flex-column"
          >
            <v-tabs
              v-if="tabs.length"
              v-model="model"
              show-arrows
              centered
              center-active
              background-color="card"
            >
              <template v-for="(item, i) in tabs">
                <v-tab
                  v-if="(item.render ? item.render(object) : true)"
                  :key="'tab-' + i"
                  nuxt
                  :to="item.to"
                >
                  <v-icon v-if="!item.tipo" class="mr-2">
                    {{ item.icon }}
                  </v-icon>
                  <component :is="`svgs-${item.icon}`" v-else />
                  <span class="font-visby font-weight-black">
                    {{ item.text }}
                  </span>
                </v-tab>
              </template>
            </v-tabs>
            <v-spacer />
            <v-divider v-if="tabs.length" class="my-2" />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-if="!hideLeft"
            class="py-0 d-none d-md-inline-flex"
            cols="12"
            md="4"
            lg="3"
          >
            <slot name="left" />
          </v-col>

          <v-divider
            v-if="!hideLeft"
            class="d-none d-md-inline-flex"
            vertical
          />

          <v-col
            cols="12"
            :md="hideLeft ? '12' : '8'"
            :lg="hideLeft ? '12' : '9'"
            :class="'pr-6 ' + (hideLeft ? 'pl-6' : '')"
          >
            <v-tabs
              v-if="tabs.length && hideLeftHeader && !hideHeader"
              v-model="model"
              show-arrows
              centered
              center-active
              background-color="card"
            >
              <v-tab
                v-for="(item, i) in tabs"
                :key="'tab-' + i"
                nuxt
                :to="item.to"
              >
                <v-icon class="mr-2">
                  {{ item.icon }}
                </v-icon>
                <span class="font-visby font-weight-black">
                  {{ item.text }}
                </span>
              </v-tab>
            </v-tabs>
            <v-divider
              v-if="tabs.length && hideLeftHeader && !hideHeader"
              class="mt-3 mb-6"
            />

            <slot />
          </v-col>
        </v-row>

        <v-row>
          <v-col class="d-none d-md-block" cols="12" md="3">
            <slot name="bottomLeft" />
          </v-col>
          <v-divider
            v-if="!hideLeft"
            class="d-none d-md-inline-flex"
            vertical
          />
          <v-col
            cols="12"
            md="9"
            class="d-flex justify-space-between align-center"
          >
            <div>
              <slot name="actionLeft" />
            </div>
            <div>
              <slot name="actionCenter">
                <v-btn
                  small
                  color="primary"
                  class="mr-1"
                  :disabled="currentTabIndex <= 0"
                  @click="changeTab(-1)"
                >
                  <v-icon>
                    mdi-chevron-left
                  </v-icon>
                </v-btn>
                <v-btn
                  small
                  color="primary"
                  class="ml-1"
                  :disabled="currentTabIndex >= tabs.length - 1"
                  @click="changeTab(+1)"
                >
                  <v-icon>
                    mdi-chevron-right
                  </v-icon>
                </v-btn>
              </slot>
            </div>

            <v-tooltip left color="transparent">
              <template #activator="{ on, attrs }">
                <div v-bind="attrs" v-on="on">
                  <v-btn
                    :loading="loading"
                    :disabled="disableSave"
                    color="success"
                    class="mr-3"
                    @click="$emit('save')"
                  >
                    <v-icon left>
                      mdi-check
                    </v-icon>
                    Salvar
                  </v-btn>
                </div>
              </template>
              <v-alert
                v-if="disableSave && disabledTooltip"
                icon="mdi-alert"
                border="bottom"
                colored-border
                elevation="2"
                color="warning"
              >
                <span v-html="disabledTooltip" />
              </v-alert>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'ImobiaTabCard',
  props: {
    tabs: {
      type: Array,
      default: () => [],
    },
    hideLeft: {
      type: Boolean,
      default: false,
    },
    hideLeftHeader: {
      type: Boolean,
      default: false,
    },
    hideHeader: {
      type: Boolean,
      default: false,
    },
    object: {
      type: Object,
      default: () => {},
    },
    disableSave: {
      type: [Boolean, Number, String],
      default: false,
    },
    loading: {
      type: [Boolean, Number, String],
      default: false,
    },
    disabledTooltip: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      model: 1,
    }
  },
  computed: {
    currentTabIndex() {
      return this.tabs.findIndex(
        tab => tab.to === this.model || tab.to.name === this.$route.name,
      )
    },
  },
  methods: {
    changeTab(value) {
      if (
        this.currentTabIndex + value >= 0 &&
        this.currentTabIndex + value < this.tabs.length
      ) {
        this.$router.push(this.tabs[this.currentTabIndex + value].to)
      }
    },
  },
}
</script>

<style></style>
