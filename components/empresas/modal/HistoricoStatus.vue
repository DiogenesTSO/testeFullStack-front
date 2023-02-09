<template>
  <imobia-modal
    id="historicoStatus"
    v-model="show"
    :loading-button="loading"
    no-action="true"
    title="Histórico de alterações de status"
    @input="reset"
  >
    <div>
      <imobia-col-table :cols="colunasAtivos" :rows="statusPassados">
        <template #inicio="{ row }">
          {{ row.status_novo }}
        </template>
        <template #fim="{ row }">
          {{ row.status_anterior }}
        </template>
        <template #opcoes="{ row }">
          <imobia-icon-tooltip 
            class="po-absolute"
            large
          >
            <div>
              <span class="font-weight-bold">Cadastrado por:</span>
              {{ row.usuario_alteracao.nome }}
            </div>
          </imobia-icon-tooltip>
        </template>
      </imobia-col-table>
    </div>
  </imobia-modal>
</template>

<script>

export default {
  name: 'HistoricoStatus',
  props: {
    statusPassados: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      valid: true,
      colunasAtivos: [
        {
          text: 'Status Atual',
          value: 'inicio',
          lg: 3,
        },
        {
          text: 'Status Passado',
          value: 'fim',
          lg: 3,
        },
        {
          text: 'Usuário',
          value: 'observacoes',
          justify: 'center',
          customClass: 'text-no-wrap',
          lg: 3,
        },
      ],
    }
  },
  computed: {
    configuracoes() {
      return this.$store.state.configuracoes.configuracoesSistema
    },
  },
}
</script>

<style></style>
