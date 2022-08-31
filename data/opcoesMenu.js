export default [
  {
    icon: 'account-group',
    text: 'Empresas',
    active: false,
    group: 'empresas',
    children: [
      {
        icon: 'plus-thick',
        text: 'Cadastrar empresa ',
        active: false,
        group: 'empresas',
        to: 'empresas-cadastro',
      },
      {
        icon: 'format-list-bulleted-square',
        text: 'Listar empresas ',
        active: false,
        group: 'empresas',
        to: 'empresas-listagem',
      },
    ],
  },

  {
    icon: 'web',
    text: 'Portais',
    active: false,
    group: 'portal',
    children: [
      {
        icon: 'box-shadow',
        text: 'Tipo Destaques',
        active: false,
        group: 'portal',
        to: 'portal-listagem-destaques',
      },
      {
        icon: 'format-list-bulleted-square',
        text: 'Listar portais',
        active: false,
        group: 'portal',
        to: 'portal-listagem',
      },
    ],
  },
  {
    icon: 'image',
    text: 'Banner',
    active: false,
    group: 'banner',
    to: 'banner',
  },
  {
    icon: 'link',
    text: 'Chaves de API',
    active: false,
    group: 'chaves',
  },

  {
    icon: 'file-chart',
    text: 'Indices',
    active: false,
    group: 'Indice',
    to: 'indice',
  },
  {
    icon: 'database',
    text: 'Banco de dados',
    active: false,
    group: 'vendas',
  },
  // {
  //   icon: 'sign-real-estate',
  //   text: 'Locações',
  //   active: false,
  //   children: [
  //     {
  //       icon: 'plus-thick',
  //       text: 'Cadastrar locação',
  //       href: process.env.app3Url + 'locacoes/create',
  //     },
  //     {
  //       icon: 'format-list-bulleted-square',
  //       text: 'Listar locações',
  //       href: process.env.app3Url + 'locacoes',
  //     },
  //     {
  //       icon: 'bank-transfer-in',
  //       text: 'Recebimentos',
  //       to: 'locacoes-recebimentos',
  //     },
  //     {
  //       icon: 'bank-transfer-out',
  //       text: 'Repasses',
  //       to: 'locacoes-repasses',
  //     },

  //     {
  //       icon: 'text-box',
  //       text: 'Extrato de repasses',
  //       href: process.env.app3Url + 'extrato-repasses',
  //     },

  //     {
  //       icon: 'hand-coin', // 'account-cash'
  //       text: 'Comissões',
  //       href: process.env.app3Url + 'comissoes-locacoes/imobiliaria',
  //     },
  //     {
  //       icon: 'update',
  //       text: 'Reajustes',
  //       to: 'locacoes-reajustes',
  //     },
  //     {
  //       icon: 'update',
  //       text: 'Renovações',
  //       to: 'locacoes-renovacoes',
  //     },
  //     {
  //       icon: 'file-chart',
  //       text: 'Gerar DIMOB',
  //       href: process.env.app3Url + 'DIMOB',
  //     },
  //     {
  //       icon: 'account-alert',
  //       text: 'Despesas de proprietários',
  //       href: process.env.app3Url + 'repasses-futuros/locacoes',
  //     },
  //   ],
  // },
  // {
  //   icon: 'finance',
  //   text: 'Financeiro',
  //   active: false,
  //   children: [
  //     {
  //       icon: 'format-list-bulleted-square',
  //       text: 'Contas',
  //       to: 'financeiro-contas',
  //     },
  //     {
  //       icon: 'wallet',
  //       text: 'Caixas',
  //       to: 'financeiro-caixas',
  //     },
  //     /*       {
  //       icon: 'bank-transfer',
  //       text: 'Extrato de caixa',
  //       href: process.env.app3Url + 'caixas',
  //     }, */
  //     {
  //       icon: 'calendar-month',
  //       text: 'Fluxo de caixa por mês',
  //       href: process.env.app3Url + 'fluxo-caixa-por-mes',
  //     },
  //     {
  //       icon: 'calendar-today',
  //       text: 'Fluxo de caixa por dia',
  //       to: 'financeiro-fluxo-caixa-dia-realizado',
  //     },

  //     {
  //       icon: 'credit-card-multiple',
  //       text: 'Formas de pagamento',
  //       to: 'financeiro-formas-pagamento',
  //     },
  //     {
  //       icon: 'tag-text',
  //       text: 'Categoria de contas',
  //       to: 'financeiro-centros-de-custo',
  //     },
  //   ],
  // },
  // {
  //   icon: 'receipt',
  //   text: 'Notas fiscais',
  //   active: false,
  //   render: (config) => {
  //     return config.migrate
  //   },
  //   children: [
  //     {
  //       icon: 'book-information-variant',
  //       text: 'Informações fiscais',
  //       href: process.env.app3Url + 'nota-fiscal/informacoes-fiscais',
  //     },
  //     {
  //       icon: 'toolbox',
  //       text: 'Serviços fiscais',
  //       href: process.env.app3Url + 'nota-fiscal/servicos',
  //     },
  //     {
  //       icon: 'format-list-bulleted-square',
  //       text: 'Notas fiscais geradas',
  //       href: process.env.app3Url + 'nota-fiscal/listagem',
  //     },
  //     {
  //       icon: 'plus-thick',
  //       text: 'Emitir NF avulsa',
  //       href: process.env.app3Url + '?showModal=modalNotaFiscalAvulsa',
  //     },
  //   ],
  // },
]
