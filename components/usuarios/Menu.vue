<template>
  <div>
    <v-menu
      v-model="userMenu"
      :close-on-content-click="false"
      :nudge-width="200"
      max-width="350px"
      nudge-bottom="6"
      offset-y
      bottom
      left
    >
      <template #activator="{ on, attrs }">
        <v-avatar size="36" v-bind="attrs" color="primary" v-on="on">
          <span class="white--text">
            {{ $format.initials(user.nome) }}
          </span>
        </v-avatar>
      </template>

      <v-card max-width="350px" color="card">
        <v-list color="card">
          <v-list-item>
            <v-list-item-avatar>
              <v-avatar size="36" color="primary">
                <span class="white--text">
                  {{ $format.initials(user.nome) }}
                </span>
              </v-avatar>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ user.nome }}</v-list-item-title>
              <v-list-item-subtitle class="text-wrap">
                {{ user.empresa.nome }} - {{ user.empresa.id }}
              </v-list-item-subtitle>
            </v-list-item-content>

            <!-- <v-list-item-action>
              <v-btn dark icon @click="userMenu = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-list-item-action> -->
          </v-list-item>
        </v-list>
        <v-divider />
        <v-list color="card" dense>
          <v-tooltip left>
            <template #activator="{ on }">
              <div v-on="on">
                <v-list-item
                  :disabled="!!user.is_master"
                  :to="{
                    name: 'pessoas-id-geral',
                    params: { id: user.cliente_id },
                  }"
                >
                  <v-list-item-icon>
                    <v-icon>
                      mdi-account
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Minha conta</v-list-item-title>
                </v-list-item>
              </div>
            </template>
            {{
              user.is_master ? 'Opção não disponível para usuário Master' : null
            }}
          </v-tooltip>

          <!-- <v-list-group no-action>
            <template #activator>
              <v-list-item-icon>
                <v-icon>
                  mdi-cog
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Configurações</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item to="/configuracoes/gerais/empresa">
              <v-list-item-title>Configurações gerais</v-list-item-title>
            </v-list-item>
            <v-list-item to="/configuracoes/financeiras/contas">
              <v-list-item-title>
                Configurações financeiras
              </v-list-item-title>
            </v-list-item>
            <v-list-item
              v-if="configuracoes.site"
              target="_blank"
              :href="app3Url + 'sites/dashboard'"
            >
            <v-list-item-title>Configurações do site</v-list-item-title>
            </v-list-item>
          </v-list-group> -->
          <v-list-group no-action>
            <template #activator>
              <v-list-item-icon>
                <v-icon>
                  mdi-account-group
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Usuários</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item :to="{ name: 'usuarios-listagem' }">
              <v-list-item-title>Listar usuários</v-list-item-title>
            </v-list-item>
            <v-list-item to="/usuarios/tipos">
              <v-list-item-title>
                Tipos de usuários e permissões
              </v-list-item-title>
            </v-list-item>
          </v-list-group>
          <!-- <v-list-group no-action>
            <template #activator>
              <v-list-item-icon>
                <v-icon>
                  mdi-file-document
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Documentos e contratos</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              @click="$nuxt.$emit('modalCadastroModeloDocumento', true)"
            >
              <v-list-item-title>
                Cadastrar modelo
              </v-list-item-title>
            </v-list-item>
            <v-list-item :to="{ name: 'documentos-listagem' }">
              <v-list-item-title>
                Listar modelos
              </v-list-item-title>
            </v-list-item>
          </v-list-group> -->

          <!-- <v-list-item to="/filiais/listagem">
            <v-list-item-icon>
              <v-icon>
                mdi-bank
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title>Filiais</v-list-item-title>
          </v-list-item> -->

          <!-- <v-list-item
            v-if="user.is_master"
            @click="$nuxt.$emit('modalAlterarEmpresa', true)"
          >
            <v-list-item-icon>
              <v-icon color="primary">
                mdi-swap-horizontal
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title class="primary--text">
              Alterar empresa
            </v-list-item-title>
          </v-list-item> -->
          <!-- <v-list-item @click="$help.downloadErrorLog()">
            <v-list-item-icon>
              <v-icon color="orange darken-1">
                mdi-bug
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title class="orange--text text--darken-1">
              Log de erros
            </v-list-item-title>
          </v-list-item> -->
          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon color="error">
                mdi-logout-variant
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              <span class="error--text">
                Sair
              </span>
            </v-list-item-title>
          </v-list-item>
          <v-divider />
          <v-list-item>
            <v-list-item-avatar>
              <v-icon>
                mdi-brightness-4
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Modo escuro</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-switch
                :input-value="$vuetify.theme.dark"
                color="primary"
                @click="toggleDarkMode"
              />
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
    <usuarios-modal-alterar-empresa v-if="user.is_master" />
  </div>
</template>

<script>
export default {
  name: 'Template',
  props: {},
  data() {
    return {
      userMenu: false,
      app3Url: process.env.app3Url,
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    // configuracoes() {
    //   return this.$store.state.configuracoes.configuracoesSistema
    // },
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
    },
    toggleDarkMode() {
      this.$store.dispatch('layout/atualizarModoEscuro')
    },
  },
}
</script>

<style></style>
