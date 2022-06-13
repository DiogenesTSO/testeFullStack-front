<template>
  <v-navigation-drawer
    v-model="drawer"
    fixed
    disable-resize-watcher
    class="app-navigation-menu"
    mini-variant-width="68"
    floating
    color="sidebarbg"
    :permanent="!$vuetify.breakpoint.xsOnly"
    :expand-on-hover="!$vuetify.breakpoint.xsOnly"
    @mouseover.native="mini = false"
    @mouseleave.native="mini = true"
  >
    <v-list shaped flat class="vertical-nav-menu-items">
      <v-list-item to="/" class="pl-4">
        <v-list-item-icon>
          <v-avatar size="35">
            <svgs-logo />
          </v-avatar>
        </v-list-item-icon>
        <v-list-item-title :class="'text-h4 ml-4 d-flex align-center'">
          <svgs-marca class="w-75" />
        </v-list-item-title>
      </v-list-item>
    </v-list>
    <div class="sidebarOptions">
      <imobia-list-action
        v-model="selected"
        :collapse="mini"
        class="vertical-nav-menu-items"
        color="primary"
        shaped
        :data="items"
      />
    </div>
  </v-navigation-drawer>
</template>

<script>
import opcoesMenu from '@/data/opcoesMenu.js'

export default {
  name: 'SideBar',
  data() {
    return {
      drawer: false,
      selected: {},
      items: opcoesMenu,
      mini: true,
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },

    isDark() {
      return this.$vuetify.theme.dark
    },
  },
  mounted() {
    this.drawer = !this.$vuetify.breakpoint.xsOnly
    this.$nuxt.$on('openSideBar', () => {
      this.drawer = true
      this.$nextTick(() => {
        this.mini = false
      })
    })
  },
}
</script>

<style lang="scss">
.sidebarOptions {
  position: relative;

  .list-group-active {
    .v-list-item__title {
      font-weight: 600;
    }
  }
}

/* Seta a estilização do componente de sidebar  */
.app-navigation-menu {
  transition-duration: 0.4s !important;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1), ease !important;
  will-change: box-shadow, transform !important;
  .v-list-item {
    padding: 0 18px 0 22px;
    padding-top: 0px;
    padding-right: 18px;
    padding-bottom: 0px;
    padding-left: 22px;
  }
  .v-subheader {
    padding: 0 18px 0 22px;
    padding-top: 0px;
    padding-right: 18px;
    padding-bottom: 0px;
    padding-left: 22px;
  }
}
.vertical-nav-menu-items {
  padding-right: 20px !important;
  .v-list-item {
    height: 44px;
    min-height: 44px;
    justify-content: flex-start !important;
  }
  .v-list-item__icon {
    &:first-child {
      margin: 0 12px 0 0;
      margin-top: 0px;
      margin-right: 12px;
      margin-bottom: 0px;
      margin-left: 0px;
      align-self: center;
    }
  }
}
.app-navigation-menu.v-navigation-drawer--mini-variant {
  &:not(.v-navigation-drawer--is-mouseover) {
    .vertical-nav-menu-items {
      padding-right: 5px !important;
    }
  }
}
</style>
