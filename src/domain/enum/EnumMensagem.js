const Enum = require('./Enum')

module.exports = Enum({
  MEMBRO_EXISTENTE: 'Este membro já está cadastrado. Matrícula, CPF ou email já existe.',
  FALHA_CRIAR_MEMBRO: 'Houve uma falha ao criar novo membro, tente novamente.',
  FALHA_BUSCAR_TODOS_MEMBROS: 'Falha ao buscar todos os membros da Nave.',
  MEMBRO_NAO_ENCONTRADO: 'Nenhum membro foi encontrado.',
  FALHA_BUSCAR_MEMBRO: 'Falha ao buscar membro.',
  FALHA_BUSCAR_MEMBROS_ATIVOS: 'Falha ao buscar os membros ativos da Nave.',
  FALHA_ATUALIZAR_MEMBRO: 'Houve uma falha ao atualizar membro, tente novamente.',
  DIRETOR_NAO_MEMBRO: 'Esta matrÍcula não pertence a nenhum membro da Atletica.',
  FALHA_CRIAR_DIRETOR: 'Houve uma falha ao criar novo diretor, tente novamente.',
  SEM_DIRETORIA: 'Sem diretoria atual',
  FALHA_BUSCAR_DIRETORIA: 'Falha ao buscar diretoria atual',
  FALHA_HISTORICO: 'Falha ao buscar hitorico',
  CARGO_NAO_ENCONTRAD: 'Cargo não encontrado',
  FALHA_BUSCAR_CARGO: 'Falha ao buscar cargo',
  FALHA_ATUALIZAR_CARGO: 'Houve uma falha ao atualizar cargo, tente novamente.'

})
