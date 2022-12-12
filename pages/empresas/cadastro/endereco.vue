<template>
  <v-row>
    <v-col>
      <v-row>
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
</template>

<script>
export default {
  name: 'EmpresaEndereco',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      empresa: this.value,
      loadingCidade: false,
      valid: false,
    }
  },
  watch: {
    empresa: {
      handler() {
        this.$emit('input', this.empresa)
      },
      deep: true,
    },
  },
  methods: {
    fillAddress(endereco) {
      this.empresa.endereco = this.$format.endereco(endereco)
      this.loadingCidade = true
      const queryCidade = {
        q: endereco.cidade,
        uf: endereco.uf,
      }
      this.$store
        .dispatch('autocomplete/carregarCidades', queryCidade)
        .then((res) => {
          this.empresa.cidade = res
        })
        .finally(() => {
          this.loadingCidade = false
        })

      this.empresa.rua = endereco.rua
      this.empresa.bairro = endereco.bairro
      this.empresa.complemento = endereco.complemento
    },
  },
}
</script>
