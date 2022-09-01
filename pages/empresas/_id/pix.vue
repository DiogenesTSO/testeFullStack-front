<template>
  <div>
    <v-row>
      <v-col>
        <v-btn
          :disabled="empresa.tem_pix"
          color="MedSpringGreen"
          @click="criarChave"
        >
          Criar PIX
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-radio-group hide-details>
          <v-simple-table class="card elevation-2">
            <thead>
              <tr>
                <th class="text-left">
                  Apelido
                </th>
                <th class="text-left">
                  Tipo
                </th>
                <th class="text-left">
                  Chave
                </th>
                <th class="text-left">
                  Status
                </th>
                <th class="text-left" />
              </tr>
            </thead>
            <tbody>
              <tr v-for="(chave, i) in chavesEmpresa" :key="'chave_' + i">
                <td>{{ chave.apelido }}</td>
                <td>{{ chave.tipo }}</td>
                <td>
                  {{
                    chave.tipo === 'CNPJ'
                      ? $format.mask(chave.chave, 'cnpj')
                      : chave.chave
                  }}
                </td>
                <td>{{ chave.status }}</td>
                <td>
                  <div class="d-flex">
                    <v-btn dark color="red" icon>
                      <v-icon small @click="removerChave(i, chave)">
                        mdi-trash-can
                      </v-icon>
                    </v-btn>
                  </div>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-radio-group>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'EmpresaPix',
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
    }
  },

  computed: {
    chavesEmpresa() {
      return this.$store.state.empresas.chaves
    },
  },
  watch: {
    empresa: {
      handler() {
        this.$emit('input', this.empresa)
      },
      deep: true,
    },
  },
  mounted() {
    this.carregarChaves()
  },
  methods: {
    carregarChaves() {
      this.$store.dispatch('empresas/carregarChavesPix', {
        empresa_id: this.empresa.id,
      })
    },
    criarChave() {
      this.$store.dispatch('empresas/cadastrarPix', {
        empresa_id: this.empresa.id,
        data: { apelido: 'testePix', type: 'EVP' },
      })
    },
  },
}
</script>

<style></style>
