<template>
  <imobia-modal
    id="alterarStatus"
    small
    :loading-button="loading"
    title="Alterar status de empresas"
    @save="submit()"
    @close="limpar()"
  >
    <v-form ref="form_status" v-model="valid" lazy-validation class="pt-5">
      <v-row justify="center">
        <v-col cols="12" md="12">
          <v-col cols="12">
            <imobia-select
              v-model="status.status"
              label="Status"
              :items="statusEmpresas"
              required
            />
          </v-col>
          <v-col v-if="status.status === 'C'" cols="12">
            <imobia-date-picker
              v-model="status.data_cancelamento"
              label="Cancelado em"
              required
            />
          </v-col>
          <v-col v-if="status.status === 'T'" cols="12">
            <imobia-date-picker
              v-model="status.data_fim_teste"
              label="Data para fim do teste"
              required
            />
          </v-col>
          <v-col v-if="status.status === 'B'" cols="12">
            <imobia-date-picker
              v-model="status.data_ultimo_bloqueio"
              label="Bloqueado em"
              required
            />
          </v-col>
          <v-col v-if="status.status === 'E'" cols="12">
            <imobia-date-picker
              v-model="status.data_fim_teste"
              label="Data para fim do teste"
              required
            />
          </v-col>
          <v-col cols="12">
            <imobia-input
              v-model="status.motivo_status"
              large
              label="Motivo da alteração"
              required
            />
          </v-col>
        </v-col>
      </v-row>
    </v-form>
  </imobia-modal>
</template>

<script>
import moment from 'moment'
export default {
  name: 'ModalalterarStatus',

  props: {
    currentStatus: {
      type: Object,
      required: false,
      default: () => {
        return {
          id: '',
          status: '',
          motivo_status: '',
          data_fim_teste: moment().format('YYYY-MM-DD'),
          data_cancelamento: moment().format('YYYY-MM-DD'),
          data_ultimo_bloqueio: moment().format('YYYY-MM-DD'),
        }
      },
    },
  },

  data() {
    return {
      status: { ...this.currentStatus },
      loading: false,
      valid: false,
      statusEmpresas: [
        { id: 'A', nome: 'Ativo' },
        { id: 'B', nome: 'Bloqueada' },
        { id: 'C', nome: 'Cancelada' },
        { id: 'E', nome: 'Teste expirado' },
        { id: 'M', nome: 'Em migração' },
        { id: 'T', nome: 'Em teste' },
      ],
    }
  },

  watch: {
    currentStatus: {
      handler() {
        this.status = { ...this.currentStatus }
      },
      deep: true,
    },
  },

  methods: {
    validar() {
      return new Promise((resolve, reject) => {
        this.$refs.form_status.validate()

        this.$nextTick(() => {
          resolve(this.valid)
        })
      })
    },

    submit() {
      this.validar().then((valid) => {
        if (valid) {
          this.loading = true

          this.$store
            .dispatch('empresas/atualizarStatusEmpresa', this.status)
            .then((res) => {
              this.$root.$emit('notify', res),
              this.$root.$emit('alterarStatus', false)
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    },

    limpar() {
      this.status = {
        id: '',
        status: '',
        motivo_status: '',
        data_fim_teste: moment().format('YYYY-MM-DD'),
        data_cancelamento: moment().format('YYYY-MM-DD'),
        data_ultimo_bloqueio: moment().format('YYYY-MM-DD'),
      }
      this.$refs.form_status.resetValidation()

      this.$emit('fechouModal')
    },
  },
}
</script>

<style></style>
