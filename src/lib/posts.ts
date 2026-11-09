import { prisma } from "./prisma";
import type { FeedPost, PostDetails } from "../../types/Post";

export const POSTS_PER_PAGE = 10;

export interface PostsPage {
  posts: FeedPost[];
  page: number;
  totalPages: number;
}

export async function getPost(id: string): Promise<PostDetails | null> {
  return prisma.post.findUnique({
    where: { id },
    select: {
      id: true,
      nome: true,
      autores: true,
      dataConclusao: true,
      localizacao: true,
      categoria: true,
      area: true,
      descricaoResumida: true,
      descricao: true,
      imagens: true,
    },
  });
}

export async function getPosts(requestedPage: number): Promise<PostsPage> {
  const totalPosts = await prisma.post.count();
  const totalPages = Math.max(1, Math.ceil(totalPosts / POSTS_PER_PAGE));
  const page = Math.min(Math.max(Math.floor(requestedPage) || 1, 1), totalPages);
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      nome: true,
      autores: true,
      dataConclusao: true,
      localizacao: true,
      categoria: true,
      descricaoResumida: true,
      imagens: true,
    },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    skip: (page - 1) * POSTS_PER_PAGE,
    take: POSTS_PER_PAGE,
  });

  return { posts, page, totalPages };
}
