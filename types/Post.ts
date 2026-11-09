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

export type FeedPost = Pick<
  Post,
  | "id"
  | "nome"
  | "autores"
  | "dataConclusao"
  | "localizacao"
  | "categoria"
  | "descricaoResumida"
  | "imagens"
>

export type PostDetails = Pick<
  Post,
  | "id"
  | "nome"
  | "autores"
  | "dataConclusao"
  | "localizacao"
  | "categoria"
  | "area"
  | "descricaoResumida"
  | "descricao"
  | "imagens"
>
