<template>
  <div class="notification">
    <v-slide-x-reverse-transition group>
      <v-alert
        v-for="(not, i) in notifications"
        :key="not.message + i"
        prominent
        elevation="5"
        :type="not.type"
        :dismissible="not.dismissible"
      >
        <v-row align="center">
          <v-col cols="12" class="grow" v-html="not.message" />
          <v-col v-if="not.redirect" cols="12" class="shrink">
            <v-btn
              dark
              color="info"
              @click="
                $router.push({ name: not.redirect, params: { id: not.id } })
              "
            >
              {{ not.action }}
            </v-btn>
          </v-col>
        </v-row>
      </v-alert>
    </v-slide-x-reverse-transition>
  </div>
</template>

<script>
export default {
  props: {
    timeout: {
      type: [String, Number],
      required: false,
      default: 4000,
    },
  },
  data() {
    return {
      notifications: [],
    }
  },
  computed: {
  },
  created() {
    /*     Padrao de data:
    {type: 'tipo', action: 'html customizável', message:'mensagem'} */
    this.$nuxt.$on('notify', (data) => {
      this.pushNotification(data)
    })
  },
  mounted() {
    if (this.$route.params.loggedIn) {
      this.pushNotification({
        type: 'success',
        message: 'Bem vindo de volta ' + this.usuario.nome,
      })
    }
  },
  destroyed() {
    this.$nuxt.$off('notify')
  },
  methods: {
    pushNotification(data) {
      this.notifications.push(data)

      setTimeout(() => {
        this.notifications.shift()
      }, data.timeout ?? this.timeout)
    },
  },
}
</script>

<style>
.notification {
  max-width: 400px;
  position: fixed;
  z-index: 300;
  right: 0;
  margin: 3rem;
}
</style>
