<template>
  <div>
    <v-form ref="formGeral" v-model="validGeral">
      <v-row>
        <v-col cols="12">
          <label class="text-h6 font-weight-bold">Dados da Empresa</label>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-col cols="12" md="3">
              <imobia-select
                v-model="empresa.tipo"
                :items="tiposEmpresa"
                required
                label="Tipo de empresa"
              />
            </v-col>
            <v-col cols="12" md="5">
              <imobia-input
                v-model="empresa.nome_fantasia"
                required
                label="Nome fantasia"
              />
            </v-col>
            <v-col cols="12" md="4">
              <imobia-input
                v-model="empresa.nome_empresa"
                required
                label="Razão social"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-col v-if="empresa.tipo === 'PF'" cols="12" md="3">
              <imobia-input
                v-model="empresa.cnpj"
                required
                type="cpf"
                label="CPF"
              />
            </v-col>
            <v-col v-if="empresa.tipo === 'MEI' || empresa.tipo === 'LIMITED' || empresa.tipo === 'INDIVIDUAL'" cols="12" md="3">
              <imobia-input
                v-model="empresa.cnpj"
                required
                type="cnpj"
                label="CNPJ"
              />
            </v-col>
            <v-col v-if="empresa.tipo === 'PF'" cols="12" md="3">
              <imobia-date-picker 
                v-model="empresa.data_nascimento"
                required
                label="Data Nascimento"
                :format="dateFormat"
              />
            </v-col>
            <v-col cols="12" md="3">
              <imobia-input v-model="empresa.telefone_01" type="telefone" required label="Telefone" />
            </v-col>
            <v-col cols="12" md="3">
              <imobia-input v-model="empresa.celular" type="celular" label="Celular" />
            </v-col>
            <v-col cols="12" md="5">
              <imobia-input
                v-model="empresa.email_empresa"
                required
                label="E-mail corporativo"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-col cols="12">
              <label class="text-h6 font-weight-bold">Endereço da Empresa</label>
            </v-col>
            <v-col cols="12" md="4">
              <imobia-input
                v-model="empresa.cep"
                required
                label="CEP"
                type="cep"
                number
                @address="fillAddress"
              />
            </v-col>
            <v-col cols="12" md="4">
              <imobia-auto-complete
                v-model="empresa.cidade"
                :loading="loadingCidade"
                module="cidades"
                label="Cidade"
              />
            </v-col>
            <v-col cols="12" md="4">
              <imobia-auto-complete
                v-model="empresa.estado"
                :loading="loadingCidade"
                module="estados"
                label="Estado"
              />
            </v-col>
            <v-col cols="12" md="4">
              <imobia-input v-model="empresa.bairro" label="Bairro" />
            </v-col>
            <v-col cols="12" md="8" lg="6">
              <imobia-input v-model="empresa.endereco" label="Rua" />
            </v-col>
            <v-col cols="6" md="4" lg="2">
              <imobia-input v-model="empresa.numero" label="Número" />
            </v-col>
            <v-col cols="6" md="4" lg="4">
              <imobia-input v-model="empresa.complemento" label="Complemento" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'EmpresaGeral',
  transition: 'slide-y-transition',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      validGeral: false,
      empresa: this.value,
      tiposEmpresa: [
        { id: 'PF', nome: 'Pessoa Física' },
        { id: 'INDIVIDUAL', nome: 'Empresário Individual' },
        { id: 'MEI', nome: 'MEI' },
        { id: 'LIMITED', nome: 'LTDA ou EIRELI' },
      ],
    }
  },

  watch: {
    empresa: {
      immediate: true,
      handler() {
        this.$emit('input', this.empresa)
      },
      deep: true,
    },
  },
  mounted() {
    this.$emit("setFormRef", "geral", this.$refs.formGeral)
  },
}
</script>
