<template>
  <div class="overflow-hidden">
    <v-row class="ma-0">
      <v-col class="pa-0 d-none d-md-flex" md="6" lg="4">
        <v-img class="bg-login" :src="$vuetify.theme.dark ? '/bg-login-dark.webp' : '/bg-login.webp'" />
      </v-col>
      <v-col class="form-container" cols="12" md="6" lg="4">
        <v-row class="justify-center">
          <div class="theme-change">
            <v-scale-transition leave-absolute group>
              <span v-if="$vuetify.theme.dark" key="lightmode" @click="toggleDarkMode">
                <v-icon color="yellow darken-3">
                  mdi-white-balance-sunny
                </v-icon>
              </span>
              <span v-else key="darkmode" @click="toggleDarkMode">
                <v-icon>mdi-weather-night</v-icon>
              </span>
            </v-scale-transition>
          </div>

          <v-col class="text-center" cols="10" md="9" xl="7">
            <img class="logo" :src="$vuetify.theme.dark ? '/logo-v-dark.png' : '/logo-v.png'">
          </v-col>
          <v-col cols="10" md="9" xl="7">
            <v-slide-x-transition hide-on-leave>
              <v-form v-if="!recuperacaoSenha" key="1" ref="form" v-model="valid">
                <h4 class="text-h4 primary--text">
                  Entrar
                </h4>
                <p>Bem-vindo de volta ao controle Imobia!</p>

                <v-text-field
                  v-model="formData.email"
                  type="email"
                  class="mb-2"
                  required
                  outlined
                  :rules="[(v) => !!v || 'Este campo é obrigatório']"
                  hide-details="auto"
                  label="E-mail"
                  prepend-inner-icon="mdi-account"
                />

                <v-text-field
                  v-model="formData.password"
                  type="password"
                  required
                  outlined
                  :rules="[(v) => !!v || 'Este campo é obrigatório']"
                  hide-details="auto"
                  label="Senha"
                  prepend-inner-icon="mdi-lock"
                  @keyup.enter="submit"
                />
                <div>
                  <v-switch v-model="formData.lembrar" inset :label="`Lembrar-me`" />
                </div>

                <v-btn
                  dark
                  :loading="loading"
                  color="primary"
                  block
                  large
                  elevation="0"
                  @click="submit"
                >
                  Entrar
                </v-btn>
              </v-form>

              <v-form v-if="recuperacaoSenha && !enviou" key="2">
                <h4 class="text-h4 primary--text">
                  Esqueci minha senha
                </h4>
                <p>Insira o seu E-mail para alterar sua senha.</p>
                <v-text-field
                  v-model="formData.email"
                  prepend-inner-icon="mdi-account"
                  type="email"
                  class="my-4"
                  required
                  outlined
                  hide-details
                  label="E-mail"
                />
                <v-row class="mt-4">
                  <v-col>
                    <v-btn dark text :loading="loading" block @click="recuperacaoSenha = false">
                      Voltar
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn dark :loading="loading" color="primary" block @click="recuperarSenha">
                      Enviar
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
              <div v-if="enviou" key="3">
                <h4 class="text-h4 primary--text">
                  E-mail enviado para {{ formData.email }}
                </h4>
                <p>
                  Por favor verifique seu e-mail para seguir os passos.
                  <br>
                  Lembre-se de olhar em
                  <b>Spam</b> ou <b>Lixo Eletrônico</b>
                  também.
                </p>
                <v-row>
                  <v-col>
                    <v-btn
                      dark
                      text
                      :loading="loading"
                      block
                      @click="
                        recuperacaoSenha = false
                        enviou = false
                      "
                    >
                      Voltar
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                      dark
                      :loading="loading"
                      :disabled="disabled"
                      color="primary"
                      block
                      large
                      text
                      elevation="0"
                      @click="recuperarSenha"
                    >
                      Enviar novamente {{ 30 > intervalo ? intervalo : '' }}
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
            </v-slide-x-transition>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="pa-0 d-none d-md-flex" md="6" lg="4">
        <v-img class="bg-login" :src="$vuetify.theme.dark ? '/bg-login-dark.webp' : '/bg-login.webp'" />
      </v-col>
    </v-row>
    <mfa-modal-validar />
  </div>
</template>

<script>
export default {
  layout: 'clean',
  meta: {
    public: true,
  },
  data() {
    return {
      formData: {
        email: '',
        password: '',
        lembrar: true,
      },
      loading: false,
      valid: false,

      recuperacaoSenha: false,
      enviou: false,
      disabled: false,
      intervalo: 0,
    }
  },

  head() {
    return {
      title: 'Login',
    }
  },

  mounted() {
    this.$store.dispatch('layout/carregarModoEscuro')
  },

  methods: {
    recuperarSenha() {
      this.loading = true
      this.intervalo = 30
      if (!this.enviou) {
        this.$store
          .dispatch(
            'recuperacaoSenha/enviarEmailRecuperacaoSenha',
            this.formData.email,
          )
          .then((res) => {
            this.enviou = true
          })
          .finally(() => {
            this.loading = false
          })
        const interval = setInterval(() => {
          this.disabled = true
          this.intervalo--
          if (this.intervalo <= 0) {
            clearInterval(interval)
            this.disabled = false
            this.intervalo = 30
          }
        }, 1000)
      } else {
        this.enviou = false
        this.loading = false
      }
    },

    submit() {
      this.$nextTick(() => {
        if (this.$refs.form.validate()) {
          this.valid = true
        }
      })
      if (this.valid === false) {
        return
      }
      this.loading = true
      this.$store
        .dispatch('auth/login', { dados: this.formData, nuxt: this.$nuxt })
        .finally(() => {
          this.loading = false
        })
    },

    toggleDarkMode() {
      this.$store.dispatch('layout/atualizarModoEscuro')
    },
  },
}
</script>

<style lang="scss">
.v-application {
  .form-container {
    height: 100vh;
    display: flex;
    align-items: center;

    .v-text-field {
      .v-input__control .v-input__slot {
        border-radius: 10px !important;
      }

      fieldset {
        border-width: 1px;
      }

      &.v-input--is-focused fieldset {
        border-color: var(--v-primary-base);
      }
    }
  }

  &.theme--light {
    .form-container {
      background: var(--v-background-base) !important;
    }
  }

  &.theme--dark {
    .form-container {
      background: var(--v-sidebarbg-base) !important;

      .v-text-field {
        .v-input__control .v-input__slot {
          background: var(--v-background-base);
        }

        &:not(.v-input--is-focused) fieldset {
          border-color: var(--v-background-base);
        }
      }
    }
  }

  .overflow-hidden {
    overflow-y: hidden;
  }

  .theme-change {
    position: relative;

    span {
      position: absolute;
      cursor: pointer;
    }
  }

  .logo {
    max-height: 120px;
    margin: auto;
  }

  .bg-login {
    height: 100vh;
  }
}
</style>
