<template>
  <v-form ref="formTab2" v-model="valid">
    <v-row>
      <v-col cols="12">
        <label class="text-h6 font-weight-bold">Dados do Administrador</label>
      </v-col>
      <v-col>
        <v-row>
          <v-col cols="12" md="6">
            <imobia-input
              v-model="empresa.nome_admin"
              required
              label="Nome do administrador"
            />
          </v-col>
          <v-col cols="12" md="5">
            <imobia-input
              v-model="empresa.email"
              required
              label="E-mail do administrador"
            />
          </v-col>
          <v-col cols="12" md="3">
            <imobia-input v-model="empresa.telefone_01" type="celular" required label="Celular" />
          </v-col>
          <v-col cols="12" md="5">
            <imobia-input
              v-model="empresa.senha"
              type="password"
              required
              label="Senha"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-form>
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
          this.empresa.cidade_id = res.id
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
