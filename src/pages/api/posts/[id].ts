import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { requireAuth } from "../../../lib/requireAuth";

type UpdatePostResponse = { post?: { id: string }; error?: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringValue(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function optionalString(value: unknown): string | null {
  const result = stringValue(value);
  return result || null;
}

export default async function updatePost(
  req: NextApiRequest,
  res: NextApiResponse<UpdatePostResponse>,
) {
  if (req.method !== "PUT" && req.method !== "DELETE") {
    res.setHeader("Allow", "PUT, DELETE");
    return res.status(405).json({ error: "Método não permitido." });
  }

  const session = await requireAuth(req, res);
  if (!session) return;

  const id = req.query.id;
  if (typeof id !== "string") {
    return res.status(400).json({ error: "Dados inválidos." });
  }

  let body: Record<string, unknown> | null = null;
  if (req.method === "PUT") {
    if (!isRecord(req.body)) {
      return res.status(400).json({ error: "Dados inválidos." });
    }
    body = req.body;
  }

  try {
    const existingPost = await prisma.post.findUnique({
      where: { id },
      select: { authorId: true },
    });
    if (!existingPost) {
      return res.status(404).json({ error: "Projeto não encontrado." });
    }
    if (existingPost.authorId !== session.userId) {
      return res.status(403).json({ error: "Sem permissão para alterar este projeto." });
    }

    if (req.method === "DELETE") {
      const post = await prisma.post.delete({ where: { id }, select: { id: true } });
      return res.status(200).json({ post: { id: post.id } });
    }

    const post = await prisma.post.update({
      where: { id },
      data: {
        nome: stringValue(body?.nome),
        autores: stringValue(body?.autores),
        dataConclusao: optionalString(body?.dataConclusao),
        localizacao: optionalString(body?.localizacao),
        categoria: optionalString(body?.categoria),
        area: optionalString(body?.area),
        descricaoResumida: stringValue(body?.descricaoResumida),
        descricao: stringValue(body?.descricao),
        imagens: optionalString(body?.imagens),
      },
      select: { id: true },
    });

    return res.status(200).json({ post: { id: post.id } });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2025"
    ) {
      return res.status(404).json({ error: "Projeto não encontrado." });
    }

    return res.status(500).json({ error: "Erro interno." });
  }
}
