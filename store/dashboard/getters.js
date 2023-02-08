export default {

  operacoes(state) {
    console.log('state')
    console.log(state)
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
}

