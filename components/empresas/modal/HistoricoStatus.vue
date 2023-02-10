<template>
  <imobia-modal
    id="historicoStatus"
    v-model="show"
    :loading-button="loading"
    no-action="true"
    large
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
        <template #usuario="{ row }">
          {{ row.usuario_alteracao?.nome }}
        </template>
        <template #data="{ row }">
          {{ $format.date(row.data_alteracai, 'DD/MM/YYYY HH:mm') }}
        </template>
        <template #motivo="{ row }">
          {{ row.motivo_status }}
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
          lg: 2,
        },
        {
          text: 'Status Anterior',
          value: 'fim',
          lg: 2,
        },
        {
          text: 'Usuário',
          value: 'usuario',
          justify: 'center',
          customClass: 'text-no-wrap',
          lg: 3,
        },
        {
          text: 'Data Alteração',
          value: 'data',
          lg: 3,
        },
        {
          text: 'Motivo',
          value: 'motivo',
          lg: 2,
        }
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
