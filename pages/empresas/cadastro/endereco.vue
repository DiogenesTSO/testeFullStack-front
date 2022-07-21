<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col cols="12" md="4">
          <imobia-input
            label="CEP"
            type="cep"
            number
          />
        </v-col>
        <v-col cols="12" md="4">
          <imobia-auto-complete
            return-object
            :loading="loadingCidade"
            module="cidades"
            label="Cidade"
          />
        </v-col>
        <v-col cols="12" md="4">
          <imobia-input label="Bairro" />
        </v-col>
        <v-col cols="12" md="8" lg="6">
          <imobia-input label="Rua" />
        </v-col>
        <v-col cols="6" md="4" lg="2">
          <imobia-input label="Número" />
        </v-col>
        <v-col cols="6" md="4" lg="4">
          <imobia-input label="Complemento" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'PessoasGeral',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      pessoa: this.value,
      loadingCidade: false,
      valid: false,
    }
  },
  watch: {
    pessoa: {
      handler() {
        this.$emit('input', this.pessoa)
      },
      deep: true,
    },
  },
  methods: {
    fillAddress(endereco) {
      this.pessoa.endereco = this.$format.endereco(endereco)
      this.loadingCidade = true
      const queryCidade = {
        q: endereco.cidade,
        uf: endereco.uf,
      }
      this.$store
        .dispatch('autocomplete/carregarCidades', queryCidade)
        .then((res) => {
          this.pessoa.cidade = res
        })
        .finally(() => {
          this.loadingCidade = false
        })

      this.pessoa.rua = endereco.rua
      this.pessoa.bairro = endereco.bairro
      this.pessoa.complemento = endereco.complemento
    },
  },
}
</script>
