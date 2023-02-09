import moment from 'moment'
function capitalizeFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export default {
  operacoes(state) {
    return [...state.dashboardOperacoes].sort((a, b) => {
      if (a.ano < b.ano) {
        return -1
      } else if (a.ano === b.ano && a.mes < b.mes) {
        return -1
      } else if (a.ano === b.ano && a.mes > b.mes) {
        return 1
      } else if (a.ano > b.ano) {
        return 1
      }

      return 0
    }).map((elemento) => {
      return {
        text: capitalizeFirst(
          moment.monthsShort(
            (elemento.mes) - 1,
          ),
        ),
        data: {
          pagamentos: {
            text: 'Cadastradas',
            value: elemento.quantidade_gerada,
            color: 'yellow',
            previsao: 30000
          },
          recebimentos: {
            text: 'Liquidadas',
            value: elemento.quantidade_liquidada,
            color: 'green',
            previsao: 30000
          }
        },
      }
    })
  },
  geramBoletos(state) {
    return [{
      color: 'green',
      value: state.dashboardGeramBoletos.geram_boletos,
      text: 'Geram boletos',
    },
    {
      color: 'blue',
      value: state.dashboardGeramBoletos.nao_geram_boletos,
      text: 'Não Geram boletos',
    }
    ]
  },
  statusEmpresas(state) {
    return [{
      color: 'green',
      value: state.dashboardStatusEmpresas.ativas,
      text: 'Ativas',
    },
    {
      color: 'orange',
      value: state.dashboardStatusEmpresas.bloqueadas,
      text: 'Bloqueadas',
    },
    {
      color: 'red',
      value: state.dashboardStatusEmpresas.canceladas,
      text: 'Canceladas',
    }
    ]
  },
}

