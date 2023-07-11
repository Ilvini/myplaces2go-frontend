export type SubCategory = {
  id: string
  nome: string
}

export type FolderProps = {
  id: string
  nome: string
  slug: string
  cor: string
}

export type Subcategoria = {
  id: string
  nome: string
}

export type Anexo = {
  id: string
  nome: string
  url: string
}

export type FichaProps = {
  id: string
  categoria: string
  cor: string
  nome: string
  qtd_abas: number
  anexos: Anexo[]
  status: string
  qtd_membros: number
  qtd_arquivos: number
}

export type CommitProps = {
  id: string
  descricao: string
  arquivo_link?: string
  arquivo_nome?: string
  data_hora?: string
  data_aviso?: string
  data_aviso_estado?: boolean
  contato_nome?: string
  contato_email?: string
  contato_telefone1?: string
  contato_telefone2?: string
  contato1_is_whatsapp?: boolean
  contato2_is_whatsapp?: boolean
}

export type TabProps = {
  id: string
  nome: string
  descricao: string
  comentarios: CommitProps[]
}

export type FichaDataProps = {
  id: string
  nome: string
  descricao: string
  abas: TabProps[]
  membros_da_ficha: MemberProps[]
  membros: MemberProps[]
}

export type MemberProps = {
  id: string
  nome: string
  foto: string
}
