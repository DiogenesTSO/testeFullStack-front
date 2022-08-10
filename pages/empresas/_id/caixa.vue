<template>
  <div>
    <span class="text-h6">Acesso ao Asaas</span>
    <v-row>
      <v-col cols="12" md="6" class="mt-3 mb-3">
        <imobia-input v-model="empresa.email_asaas" disabled label="E-mail" />
      </v-col>
      <v-col cols="12" md="6" class="mt-3">
        <imobia-input v-model="empresa.senha_asaas" label="Senha" />
      </v-col>
    </v-row>
    <span class="text-h6">Cadastrar caixa</span>
    <v-row>
      <v-col cols="12" md="6" class="mt-3">
        <imobia-input
          v-model="caixa.nome"
          :disabled="disabled"
          required
          label="Nome do caixa"
        />
      </v-col>
      <v-col cols="6" lg="3">
        <v-checkbox v-model="caixa.asaas" label="Conta bancária Asaas" />
      </v-col>
      <v-col cols="12" md="6">
        <imobia-input
          v-model="caixa.correntista"
          :disabled="disabled"
          required
          label="Nome do correntista"
        />
      </v-col>
      <v-col cols="12" md="6">
        <imobia-input
          v-model="empresa.cnpj"
          :disabled="disabled"
          required
          label="CPF/CPNJ do correntista"
          type="cpf cnpj"
        />
      </v-col>
      <v-col cols="12" md="6">
        <imobia-auto-complete
          v-model="bancoObj"
          :disabled="disabled"
          :loading="loadingBanco"
          return-object
          :items="bancos"
          required
          label="Banco"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          v-model="caixa.tipo"
          :disabled="disabled"
          dense
          hide-details="auto"
          outlined
          :items="tipoContaOptions"
          label="Tipo de conta"
        />
      </v-col>
      <v-col cols="12" md="6">
        <imobia-input
          v-model="caixa.agencia"
          :disabled="disabled"
          number
          required
          maxlength="4"
          dense
          outlined
          label="Agência"
        />
      </v-col>
      <v-col cols="12" md="6" class="mb-3">
        <imobia-input
          v-model="caixa.contaComDigito"
          :disabled="disabled"
          required
          dense
          outlined
          label="Conta (com dígito)"
          @input="formatConta"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-center">
        <v-btn

          color="primary"
          class="mb-3"
          @click="submit"
        >
          Cadastrar caixa
        </v-btn>
      </v-col>
      <v-col>
        <v-spacer />
      </v-col>
    </v-row>
    <v-row>
      <span class="text-h6 ml-4">Listagem de caixas</span>
    </v-row>
    <v-row>
      <v-col>
        <v-radio-group
          hide-details
        >
          <v-simple-table class="card elevation-2">
            <thead>
              <tr>
                <th class="text-left">
                  Nome
                </th>
                <th class="text-left">
                  Correntista
                </th>
                <th class="text-left">
                  CPF/CNPJ
                </th>
                <th class="text-left">
                  Banco
                </th>
                <th class="text-left">
                  Agência
                </th>
                <th class="text-left">
                  Conta
                </th>
                <th class="text-left" />
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(caixa, i) in empresa.caixas"
                :key="'caixa_' + i"
              >
                <td>{{ caixa.nome }}</td>
                <td>{{ caixa.correntista }}</td>
                <td>{{ $format.mask(caixa.correntista_documento, 'cnpj') }}</td>
                <td>{{ caixa.banco.Nome }}</td>
                <td>{{ caixa.agencia }}</td>
                <td>
                  {{
                    caixa.conta +
                      (caixa.conta_digito ? '-' + caixa.conta_digito : '')
                  }}
                </td>
                <td>
                  <div class="d-flex">
                    <v-btn dark color="info" icon>
                      <v-icon small @click="editarConta(i, caixa)">
                        mdi-pencil
                      </v-icon>
                    </v-btn>
                  </div>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-radio-group>
        <empresas-modal-caixa-bancario
          v-model="showModal"
          :empresa="empresa"
          :conta-prop="caixaObj"
          @save="pushData"
        />
      </v-col>
    </v-row>
  </div>
</template>


<script>
export default {
  name: 'EmpresaCaixa',
  transition: 'slide-y-transition',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      empresa: this.value,
      tiposEmpresa: [
        { id: 'PF', nome: 'Pessoa Física' },
        { id: 'INDIVIDUAL', nome: 'Empresário Individual' },
        { id: 'MEI', nome: 'MEI' },
        { id: 'LIMITED', nome: 'LTDA ou EIRELI' },
      ],
      tipoContaOptions: [
        {
          text: 'Conta Corrente',
          value: 'CONTA_CORRENTE',
        },
        {
          text: 'Conta Poupança',
          value: 'CONTA_POUPANCA',
        },
      ],
      caixa: {
        nome: '',
        tipo: {},
        agencia: '',
        conta: '',
        conta_digito: '',
        conta_tipo: '',
        banco: '',
        banco_codigo: '',
        correntista: '',
        correntista_documento: '',
        status: 1,
        asaas: 0,
        contaComDigito: '',
      },
      editar: false,
      caixaObj: {},
      showModal: false,
      index: 0,
      loadingBanco: false,
      bancoObj: {},
      conta: {},
    }
  },

  computed: {
    bancos() {
      return this.$store.state.empresas.bancos.map((banco) => {
        return {
          id: banco.id,
          nome: banco.name,
        }
      })
    },

  },

  watch: {
    value: {
      handler() {
        this.empresa = this.value
      },
      deep: true,
    },
    empresa: {
      handler() {
        this.$emit('input', this.empresa)
      },
      deep: true,
    },
  },

  mounted() {
    this.carregarnovobanco()
    this.formatConta()
  },

  methods: {
    setup(){
      if (this.value.banco_codigo !== this.bancoObj.id) {
        this.bancoObj = this.bancos.find(
          item => item.id === this.value.banco_codigo,
        ) ?? {
          id: this.value.banco_codigo,
          nome: this.value.banco,
        }
      }
    },

    editarConta(index, caixa) {
      this.editar = true
      this.caixaObj = caixa
      this.showModal = true
      // this.index = index
    },

    carregarnovobanco() {
      this.$store
        .dispatch('empresas/carregarBancos')
    },

    submit() {
      this.formatConta()
      const form = {
        ...this.caixa,
        ...{
          banco: this.bancoObj.nome,
          banco_codigo: this.bancoObj.id,
          conta: this.caixa.conta,
          conta_digito: this.caixa.conta_digito,
          tipo: "bancario",
          correntista_documento: this.empresa.cnpj,
          conta_tipo: this.caixa.tipo,
        }
      }

      this.$store
        .dispatch('empresas/cadastrarCaixa', {
          id: this.empresa.id,
          data: form
        })
        .finally(() => {
          this.$router.go(this.$router.currentRoute)
        })
    },

    formatConta() {
      this.$nextTick(() => {
        this.caixa.contaComDigito = this.caixa.contaComDigito?.replace(/[^0-9]+/g, '')
        this.caixa.contaComDigito = this.caixa.contaComDigito?.replace('-', '')

        if (this.caixa.contaComDigito?.length > 1) {
          const conta = this.caixa.contaComDigito.slice(
            0,
            this.caixa.contaComDigito.length - 1,
          )
          const digito = this.caixa.contaComDigito.slice(
            this.caixa.contaComDigito.length - 1,
          )

          this.caixa.conta = conta
          this.caixa.conta_digito = digito
        }
      })
    },
  }
}

</script>
