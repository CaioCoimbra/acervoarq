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
  if (req.method !== "PUT") {
    res.setHeader("Allow", "PUT");
    return res.status(405).json({ error: "Método não permitido." });
  }

  const session = await requireAuth(req, res);
  if (!session) return;

  const id = req.query.id;
  if (typeof id !== "string" || !isRecord(req.body)) {
    return res.status(400).json({ error: "Dados inválidos." });
  }

  try {
    const post = await prisma.post.update({
      where: { id },
      data: {
        nome: stringValue(req.body.nome),
        autores: stringValue(req.body.autores),
        dataConclusao: optionalString(req.body.dataConclusao),
        localizacao: optionalString(req.body.localizacao),
        categoria: optionalString(req.body.categoria),
        area: optionalString(req.body.area),
        descricaoResumida: stringValue(req.body.descricaoResumida),
        descricao: stringValue(req.body.descricao),
        imagens: optionalString(req.body.imagens),
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
