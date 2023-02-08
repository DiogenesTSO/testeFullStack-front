export default {

  operacoes(state) {
    return [{
      color: 'green',
      value: state.dashboardOperacoes.operacoes_liquidadas,
      text: 'Operações Liquidadas',
    },
    {
      color: 'orange',
      value: state.dashboardOperacoes.operacoes_cadastradas,
      text: 'Operações Cadastradas',
    }
    ]
  },
  geramBoletos(state) {
    return [{
      color: 'green',
      value: state.dashboardGeramBoletos.geram_boletos,
      text: 'Geram boletos',
    },
    {
      color: 'orange',
      value: state.dashboardGeramBoletos.nao_geram_boletos,
      text: 'Não Geram boletos',
    }
    ]
  },
}

