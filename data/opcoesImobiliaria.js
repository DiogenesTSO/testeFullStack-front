export default [
  {
    icon: 'account',
    text: 'Clientes',
    children: [
      {
        icon: 'plus-thick',
        text: 'Cadastrar Cliente',
        href: process.env.app3Url + '?showModal=modalCadastrarCliente',
      },
      {
        icon: 'format-list-bulleted-square',
        text: 'Listar Clientes',
        href: process.env.app3Url + 'clientes',
      },
    ],
  },
  {
    icon: 'home-city',
    text: 'Imóveis',
    children: [
      {
        icon: 'plus-thick',
        text: 'Cadastrar Imóvel',
        href: process.env.app3Url + 'imovel',
      },
      {
        icon: 'format-list-bulleted-square',
        text: 'Listar Imóveis',
        href: process.env.app3Url + 'imoveis',
      },
      {
        icon: 'shape-plus',
        text: 'Tipos',
        href: process.env.app3Url + 'tipos-imoveis',
      },
      {
        icon: 'puzzle',
        text: 'Características',
        href: process.env.app3Url + 'caracteristicas',
      },
      {
        icon: 'laptop',
        text: 'Portais',
        href: process.env.app3Url + 'imoveis-para-portais',
      },
      {
        icon: 'city',
        text: 'Empreendimentos',
        href: process.env.app3Url + 'empreendimentos',
      },
    ],
  },
  {
    icon: 'sign-real-estate',
    text: 'Locações',
    children: [
      {
        icon: 'plus-thick',
        text: 'Cadastrar locação',
        href: process.env.app3Url + 'locacoes/create',
      },
      {
        icon: 'format-list-bulleted-square',
        text: 'Listar Locações',
        href: process.env.app3Url + 'locacoes',
      },
      {
        icon: 'bank-transfer-in',
        text: 'Recebimentos',
        href: process.env.app3Url + 'recebimentos/locacoes',
      },
      {
        icon: 'bank-transfer-out',
        text: 'Repasses',
        href: process.env.app3Url + 'repasses/locacoes',
      },

      {
        icon: 'text-box',
        text: 'Extrato de repasses',
        href: process.env.app3Url + 'extrato-repasses',
      },

      {
        icon: 'account-cash',
        text: 'Comissões',
        href: process.env.app3Url + 'comissoes-locacoes/imobiliaria',
      },
      {
        icon: 'update',
        text: 'Reajustes',
        href: process.env.app3Url + 'reajustes',
      },
      {
        icon: 'file-chart',
        text: 'Gerar DIMOB',
        href: process.env.app3Url + 'DIMOB',
      },
      {
        icon: 'account-alert',
        text: 'Despesas de proprietários',
        href: process.env.app3Url + 'repasses-futuros/locacoes',
      },
    ],
  },
  {
    icon: 'finance',
    text: 'Financeiro',
    children: [
      {
        icon: 'format-list-bulleted-square',
        text: 'Listar Contas',
        href: process.env.app3Url + 'contas',
      },
      {
        icon: 'bank-transfer',
        text: 'Extrato de caixa',
        href: process.env.app3Url + 'caixas',
      },
      {
        icon: 'calendar-month',
        text: 'Fluxo de caixa por mês',
        href: process.env.app3Url + 'fluxo-caixa-por-mes',
      },
      {
        icon: 'calendar-today',
        text: 'Fluxo de caixa por dia',
        href: process.env.app3Url + 'fluxo-caixa-por-dia/realizado',
      },

      {
        icon: 'credit-card-multiple',
        text: 'Formas de pagamento',
        href: process.env.app3Url + 'formas-pagamento',
      },
      {
        icon: 'tag-text',
        text: 'Categoria de contas',
        href: process.env.app3Url + 'categorias-contas',
      },
      {
        icon: 'plus-thick',
        text: 'Cadastrar fornecedor',
        href: process.env.app3Url + '?showModal=modalCadastrarFornecedor',
      },
      {
        icon: 'format-list-bulleted-square',
        text: 'Listar Fornecedores',
        href: process.env.app3Url + 'fornecedores',
      },
    ],
  },
  {
    icon: 'receipt',
    text: 'Notas fiscais',
    children: [
      {
        icon: 'book-information-variant',
        text: 'Informações fiscais',
        href: process.env.app3Url + 'nota-fiscal/informacoes-fiscais',
      },
      {
        icon: 'toolbox',
        text: 'Serviços fiscais',
        href: process.env.app3Url + 'nota-fiscal/servicos',
      },
      {
        icon: 'format-list-bulleted-square',
        text: 'Notas fiscais geradas',
        href: process.env.app3Url + 'nota-fiscal/listagem',
      },
      {
        icon: 'plus-thick',
        text: 'Emitir NF avulsa',
        href: process.env.app3Url + '?showModal=modalNotaFiscalAvulsa',
      },
    ],
  },
  {
    icon: 'tag-outline',
    text: 'Vendas',
    children: [
      {
        icon: 'plus-thick',
        text: 'Cadastrar Venda',
        to: 'vendas-cadastro',
      },
      {
        icon: 'format-list-bulleted-square',
        text: 'Listar vendas',
        to: 'vendas-listagem',
      },
    ],
  },
]
