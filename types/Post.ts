export interface Post {
  id: string
  nome: string
  autores: string
  dataConclusao: string | null
  localizacao: string | null
  categoria: string | null
  area: string | null
  descricaoResumida: string
  descricao: string
  imagens: string | null
  authorId: string
  createdAt: Date
}
