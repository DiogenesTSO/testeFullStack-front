<template>
  <v-row>
    <v-col cols="12">
      <imobia-tab-card
        :loading="loading"
        :tabs="items"
        :disable-save="disableSave"
        :disabled-tooltip="disabledMessage"
        @save="submit"
      >
        <template #headerLeft>
          <v-list class="py-0" color="transparent">
            <v-list-item>
              <v-list-item-avatar class="justify-center">
                <v-avatar>
                  <v-img
                    width="100%"
                    max-height="50px"
                    :src="(empresa.configuracoes.url_logo
                      ? empresa.configuracoes.url_logo
                      : $vuetify.theme.dark
                        ? 'https://static.useimobia.com.br/sistema/nao_encontrada_dark.png'
                        : 'https://static.useimobia.com.br/sistema/nao_encontrada.png'
                    )"
                  />
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  {{ empresa.nome }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  CNPJ: {{ $format.mask(empresa.cnpj, 'cnpj') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </template>
        <template #left>
          <div class="d-flex flex-column">
            <div v-if="empresa.status_asaas !== 'ativo'" class="mb-2">
              <imobia-input
                v-model="empresa.onboarding_url"
                label="Onboarding URL"
                :disabled="empresa.status_asaas === 'ativo' ? true : false"
              />
              <v-btn text small color="primary" @click="gerarUrl()">
                <v-icon left>
                  mdi-plus
                </v-icon>
                Gerar nova URL
              </v-btn>
            </div>
            <div>
              <v-btn
                label
                small
                :class="statusContasAsaas[empresa.status_asaas].cor + ' mr-3'"
              >
                Status Asaas: {{ statusContasAsaas[empresa.status_asaas].nome }}
              </v-btn>
            </div>
          </div>
        </template>
        <NuxtChild v-model="empresa" keep-alive />
      </imobia-tab-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'EdicaoEmpresa',
  meta: {
    title: 'Edição de empresa',
  },

  data() {
    return {
      loading: false,
      empresa: {
        plano: {
          valor_real: '',
        },
        configuracoes: {
          url_logo: '',
          expectativa_operacoes: 0,
          temMensalidade: false,
          valor_mensalidade: 0,
          tipo_acesso: '',
        },
        tipo: '',
        nome_empresa: '',
        nome_fantasia: '',
        data_nascimento_asaas: '',
        cpfcnpj: '',
        cnpj: '',
        creci: '',
        cnae: '',
        cep: '',
        endereco: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade_id: '',
        cidade: {},
        filial: {
          telefone_01: '',
          telefone_02: '',
          celular: '',
        },
        nome_admin: '',
        email: '',
        tipo_acesso: '',
        suporte: 1,
        caixas: [],
        financeiro: false,
        nota_fiscal: false,
        venda: false,
        locacao: false,
        valor_modulo_locacao: 0,
        altera_mensalidade: false,
        documentos: [],
        documentosRemovidos: [],
        onboarding_url: '',
        status_asaas: 'inativo',
        documentos_asaas: [],
      },
      cidades: [],

      statusContasAsaas: {
        ativo: { cor: 'green', nome: 'Ativo' },
        pendente: { cor: 'warning', nome: 'Pendente' },
        inativo: { cor: 'red', nome: 'Inativo' },
      },

      items: [
        {
          icon: 'mdi-account',
          text: 'Geral',
          to: 'geral',
        },

        {
          icon: 'mdi-map-marker',
          text: 'Endereço',
          to: 'endereco',
        },
        {
          icon: 'mdi-phone',
          text: 'Contatos',
          to: 'contato',
        },
        {
          icon: 'mdi-monitor-screenshot',
          text: 'Sistema',
          to: 'sistema',
        },
        {
          icon: 'mdi-bank',
          text: 'Caixa digital',
          to: 'caixa',
        },
        {
          icon: 'pix',
          tipo: 'svg',
          text: 'Pix',
          to: 'pix',
        },
        {
          icon: 'mdi-file-document',
          text: 'Contratos',
          to: 'contratos',
        },
        {
          icon: 'mdi-file-document-arrow-right-outline',
          text: 'Documentos ASAAS',
          to: 'documentos_asaas',
        },
      ],
    }
  },

  mounted() {
    this.carregarEmpresa()
    this.carregarCaixa()
  },

  methods: {
    carregarEmpresa() {
      this.$store
        .dispatch('empresas/carregarEmpresa', this.$route.params.id)
        .then((response) => {
          this.empresa = {
            ...this.empresa,
            ...response,
            ...{
              altera_mensalidade: response.configuracoes.tem_mensalidade,
              documentosRemovidos: [],
              valor_taxa_cobranca: response.plano
                ? response.plano.valor_real
                : 0,
              configuracoes: {
                expectativa_operacoes:
                  response.configuracoes.expectativa_operacoes,
                temMensalidade: response.configuracoes.temMensalidade,
                valor_mensalidade: response.configuracoes.valor_mensalidade,
                tipo_acesso: response.configuracoes.tipo_acesso,
                suporte: response.configuracoes.suporte,
                cobranca_manual: !!response.configuracoes.cobranca_manual,
                dias_boleto_automatico:
                  response.configuracoes.dias_boleto_automatico,
              },
            },
          }
        })
    },

    carregarCaixa() {
      const form = {
        empresa_id: this.$route.params.id,
        tipo: 'bancario',
      }
      this.$store
        .dispatch('empresas/carregarCaixa', {
          empresa_id: this.$route.params.id,
          data: form,
        })
        .then((response) => {
          this.empresa.caixas = response
        })
    },

    gerarUrl() {
      this.$store.dispatch('layout/carregando', true)
      this.$store
        .dispatch('empresas/novaOnboardingUrl', {
          empresa_id: this.$route.params.id,
        })
        .then((res) => {
          this.empresa.onboarding_url = res.nova_url
        })
        .finally(() => {
          this.$store.dispatch('layout/carregando', false)
        })
    },

    async submit() {
      try {
        this.loading = true

        const form = {
          ...this.empresa,
          ...{
            // Edição geral de empresa
            tipo: this.empresa.tipo,
            nome_fantasia: this.empresa.nome_fantasia,
            nome: this.empresa.nome,
            cnpj: this.empresa.cnpj,
            cpf: this.empresa.cnpj,
            creci: this.empresa.creci,
            cnae: this.empresa.cnae,
            data_nascimento_asaas:
              this.empresa.tipo === 'PF'
                ? this.empresa.data_nascimento_asaas
                : null,
            // Edição de endereço de empresas
            cep: this.empresa.cep,
            cidade_id: this.empresa.cidade_id,
            bairro: this.empresa.bairro,
            endereco: this.empresa.endereco,
            numero: this.empresa.numero,
            complemento: this.empresa.complemento,
            // Edição do contato da empresa
            filial: {
              id: this.empresa.filial.id,
              telefone_01: this.empresa.filial.telefone_01,
              telefone_02: this.empresa.filial.telefone_02,
              celular: this.empresa.filial.celular,
            },
            // Edição das informações de sistema da empresa
            taxa_cobranca: {
              valor_real: this.empresa.valor_taxa_cobranca,
            },
            tipo_acesso: this.empresa.configuracoes.tipo_acesso,
            dias_boleto_automatico: this.empresa.configuracoes
              .dias_boleto_automatico,
            suporte: this.empresa.suporte,
            // Edição de modulos de acesso
            modulos: [
              {
                modulo: 'venda',
                valor: this.empresa.venda === true ? 1 : 0,
              },
              {
                modulo: 'locacao',
                valor:
                  this.empresa.locacao === true
                    ? this.empresa.valor_modulo_locacao
                    : 0,
              },
              {
                modulo: 'nota_fiscal',
                valor: this.empresa.nota_fiscal === true ? 1 : 0,
              },
              {
                modulo: 'financeiro',
                valor: this.empresa.financeiro === true ? 1 : 0,
              },
            ],
            // edicão da senha de acesso do Asaas
            senha_asaas: this.empresa.senha_asaas,
          },
        }
        this.$store.dispatch('layout/carregando', true)
        this.$store.dispatch('layout/mensagemCarregando', 'Atualizando Empresa')

        if (this.empresa.documentos_asaas.length) {
          await this.$store.dispatch('empresas/enviarDocumentoAsaas', {
            file: this.empresa.documentos_asaas,
            type:
              this.empresa.tipo === 'LIMITED'
                ? 'SOCIAL_CONTRACT'
                : this.empresa.tipo === 'INDIVIDUAL'
                ? 'ENTREPRENEUR_REQUIREMENT'
                : '',
            empresa_id: this.empresa.id,
          })
        }

        const res = await this.$store.dispatch('empresas/editarEmpresa', {
          id: this.empresa.id,
          data: form,
        })
        // o for .. of não retorna o index por padrão
        // esse é um hack que permite pegar o index e a foto
        for (const [i, arquivo] of this.empresa.documentos
          .filter((arquivo) => !arquivo.id)
          .entries()) {
          const form = new FormData()
          form.append('documento', arquivo.file)
          // aguarda a imagem ser enviada para enviar a próxima
          await this.$store.dispatch(
            'layout/mensagemCarregando',
            `Enviando arquivos (${i + 1})`,
          )
          await this.$store.dispatch('empresas/cadastrarArquivos', {
            id: res.id,
            data: form,
          })
        }

        for (const arquivo of this.empresa.documentosRemovidos.filter(
          (id) => id,
        )) {
          // aguarda a imagem ser deletada para deletar a próxima
          this.$store.dispatch(
            'layout/mensagemCarregando',
            `Removendo arquivos (${arquivo})`,
          )
          await this.$store.dispatch('empresas/removerArquivos', {
            empresa_id: res.id,
            id: arquivo,
          })
        }
      } catch (err) {
        console.log(err)
      } finally {
        this.$store.dispatch('layout/carregando', false)
        window.location.reload()
        this.carregarCaixa()
        this.carregarEmpresa()
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
