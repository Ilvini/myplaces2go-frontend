export interface s {
  error: boolean
  message: string
  results: IPlaces
}

export interface IPlaces {
  results: {
    uuid: string
    nome: string
    lat: number
    lon: number
    endereco: string
    imagens: string[]
    avaliacao_media: any
    avaliacoes: any[]
    informacoes_adicionais: InformacoesAdicionais
    horario_funcionamento: any[]
    aberto: boolean
    favorito: boolean
    avaliado: boolean
  }
}

export interface InformacoesAdicionais {
  Curiosidade: Curiosidade[]
  Dica: Dica[]
  Lenda: Lenda[]
  Outros: Outro[]
}

export interface Curiosidade {
  id: number
  titulo: string
  descricao: string
}

export interface Dica {
  id: number
  titulo: string
  descricao: string
}

export interface Lenda {
  id: number
  titulo: string
  descricao: string
}

export interface Outro {
  id: number
  titulo: string
  descricao: string
}

