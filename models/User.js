function User(obj) {
  this.id = obj.id
  this.cliente_id = obj.cliente_id
  this.empresa = obj.empresa ?? {}
  this.corretor_id = obj.corretor_id
  this.nome = obj.nome
  this.email = obj.email
  this.celular = obj.celular
  this.telefone01 = obj.telefone01
  this.telefone02 = obj.telefone02
  this.cpf = obj.cpf
  this.cargo = obj.cargo
  this.filial = obj.filial
  this.url_imagem = obj.url_imagem
  this.funcao = obj.funcao
  this.permissoes = obj.permissoes
  this.dashboard_home = obj.dashboard_home
  this.is_master = obj.is_master
  this.tem_homologacao_bancaria = obj.tem_homologacao_bancaria
}
User.prototype.can = function (permission) {
  return this.permissoes ? this.permissoes.includes(permission) : false
}

User.prototype.is = function (funcao) {
  return this.funcao ? this.funcao.includes(funcao) : false
}

export { User }
