import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { requireAuth } from "../../../lib/requireAuth";

type CreatePostResponse = { post?: { id: string }; error?: string };

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

export default async function createPost(
  req: NextApiRequest,
  res: NextApiResponse<CreatePostResponse>,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Método não permitido." });
  }

  const session = await requireAuth(req, res);
  if (!session) return;

  if (!isRecord(req.body)) {
    return res.status(400).json({ error: "Dados inválidos." });
  }

  const nome = stringValue(req.body.nome);
  const descricaoResumida = stringValue(req.body.descricaoResumida);
  if (!nome || !descricaoResumida) {
    return res.status(422).json({ error: "Nome e descrição resumida são obrigatórios." });
  }

  try {
    const post = await prisma.post.create({
      data: {
        nome,
        autores: stringValue(req.body.autores),
        dataConclusao: optionalString(req.body.dataConclusao),
        localizacao: optionalString(req.body.localizacao),
        categoria: optionalString(req.body.categoria),
        area: optionalString(req.body.area),
        descricaoResumida,
        descricao: stringValue(req.body.descricao),
        imagens: optionalString(req.body.imagens),
        authorId: session.userId,
      },
      select: { id: true },
    });

    return res.status(201).json({ post: { id: post.id } });
  } catch {
    return res.status(500).json({ error: "Erro interno." });
  }
}
