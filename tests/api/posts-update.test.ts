import { beforeEach, describe, expect, it, vi } from "vitest";
import type { NextApiRequest, NextApiResponse } from "next";

vi.mock("../../src/lib/prisma", () => ({
  prisma: { post: { findUnique: vi.fn(), update: vi.fn() } },
}));
vi.mock("../../src/lib/requireAuth", () => ({ requireAuth: vi.fn() }));

import { prisma } from "../../src/lib/prisma";
import { requireAuth } from "../../src/lib/requireAuth";
import updatePost from "../../src/pages/api/posts/[id]";

const postModel = prisma.post as unknown as {
  findUnique: ReturnType<typeof vi.fn>;
  update: ReturnType<typeof vi.fn>;
};
const auth = vi.mocked(requireAuth);
const fields = {
  nome: "Casa de Vidro Atualizada",
  autores: "Lina Bo Bardi",
  dataConclusao: "1951",
  localizacao: "Morumbi",
  categoria: "Residencial",
  area: "700 m²",
  descricaoResumida: "Residência modernista.",
  descricao: "Descrição completa.",
  imagens: "https://images.example.org/casa.jpg",
};

function makeRequest(body: unknown, method = "PUT") {
  return { method, body, query: { id: "post-1" } } as unknown as NextApiRequest;
}

function makeResponse() {
  return {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
    setHeader: vi.fn().mockReturnThis(),
  } as unknown as NextApiResponse;
}

describe("PUT /api/posts/[id]", () => {
  beforeEach(() => vi.clearAllMocks());

  it("updates a post for an authenticated session", async () => {
    auth.mockResolvedValue({ userId: "user-1" });
    postModel.findUnique.mockResolvedValue({ authorId: "user-1" });
    postModel.update.mockResolvedValue({ id: "post-1" });
    const res = makeResponse();

    await updatePost(makeRequest(fields), res);

    expect(postModel.update).toHaveBeenCalledWith({
      where: { id: "post-1" },
      data: fields,
      select: { id: true },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ post: { id: "post-1" } });
  });

  it("does not update without an authenticated session", async () => {
    auth.mockResolvedValue(null);
    const res = makeResponse();

    await updatePost(makeRequest(fields), res);

    expect(postModel.update).not.toHaveBeenCalled();
  });

  it("returns 404 when the post does not exist", async () => {
    auth.mockResolvedValue({ userId: "user-1" });
    postModel.findUnique.mockResolvedValue({ authorId: "user-1" });
    postModel.update.mockRejectedValue({ code: "P2025" });
    const res = makeResponse();

    await updatePost(makeRequest(fields), res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("returns 403 and does not update a post owned by another user", async () => {
    auth.mockResolvedValue({ userId: "user-1" });
    postModel.findUnique.mockResolvedValue({ authorId: "user-2" });
    const res = makeResponse();

    await updatePost(makeRequest(fields), res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(postModel.update).not.toHaveBeenCalled();
  });
});
