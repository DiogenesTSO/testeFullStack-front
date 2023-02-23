<template>
  <div class="ml-auto mr-auto">
    <v-card color="card">
      <v-card-title class="text-h6">
        Importar clientes ou imóveis
      </v-card-title>
      <v-row cols="4" class="d-flex justify-center">
        <v-col cols="4">
          <!-- //verificar a possibilidade de um autocomplete para empresas -->
          <!-- <imobia-auto-complete
            v-model="empresa"
            return-object
            :items="empresas"
            class="mt-3"
            required
            module="empresas"
            label="Empresa"
          />  -->
          <imobia-input
            v-model="empresa"
            label="Código da empresa"
          />
        </v-col>
      </v-row>
      <v-row cols="4" class="d-flex justify-center">
        <v-col cols="4">
          <imobia-select
            v-model="modulo"
            cols="4"
            label="Módulo"
            :items="modulos"
          />
        </v-col>
      </v-row>
      <v-row cols="4" class="d-flex justify-center">
        <v-col cols="3">
          <imobia-drop-zone
            v-model="arquivo"
            size="{        
              cols: '6',
              sm: '4',
              md: '3',
              lg: '2',}"
            :max-length="0"
          />
        </v-col>
      </v-row>
      <v-row class="d-flex justify-center">
        <v-col cols="4" class="d-flex justify-end">
          <v-btn 
            :loading="loading" 
            color="success" 
            @click="submit()"
          >
            <v-icon left>
              mdi-check
            </v-icon>
            Importar
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Importacoes',
  meta: {
    title: 'Importações'
  },
  data() {
    return {
      empresas: [],
      loading: false,
      empresa: '',
      modulo: '',
      modulos: [
        { id: 2, nome: 'Clientes' },
        { id: 3, nome: 'Imóveis' }
      ],
      arquivo: []
    }
  },

  computed: {
    loadingSistema() {
      return this.$store.state.layout.loading
    }
  },
  watch: {
    
  },
  mounted() {
    this.$store.dispatch('empresas/carregarEmpresas')
      .then((res) => {
        this.empresas = res
      })
  },
  methods: {
    submit() {
      this.loading = true

      const form = new FormData()
      form.append('file', this.arquivo[0].file)

      if (this.modulo === 2) {
        this.$store.dispatch('empresas/importarClientes', {
          empresaId: this.empresa,
          file: form
        }).finally(() => {
          this.loading = false
        })
      }
      if (this.modulo === 3) {
        this.$store.dispatch('empresas/importarImoveis', {
          empresaId: this.empresa,
          file: form
        }).then((res) => {
          this.loading = false
        }).finally(() => {
          this.loading = false
        })
      }
    },
  }
}

</script>
