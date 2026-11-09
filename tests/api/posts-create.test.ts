import { beforeEach, describe, expect, it, vi } from "vitest";
import type { NextApiRequest, NextApiResponse } from "next";

vi.mock("../../src/lib/prisma", () => ({
  prisma: { post: { create: vi.fn() } },
}));
vi.mock("../../src/lib/requireAuth", () => ({ requireAuth: vi.fn() }));

import { prisma } from "../../src/lib/prisma";
import { requireAuth } from "../../src/lib/requireAuth";
import createPost from "../../src/pages/api/posts";

const postModel = prisma.post as unknown as { create: ReturnType<typeof vi.fn> };
const auth = vi.mocked(requireAuth);
const postFields = {
  nome: "Casa de Vidro",
  autores: "Lina Bo Bardi",
  dataConclusao: "1951",
  localizacao: "Morumbi",
  categoria: "Residencial",
  area: "700 m²",
  descricaoResumida: "Residência modernista.",
  descricao: "Descrição completa.",
  imagens: "https://images.example.org/casa.jpg",
};

function makeRequest(body: unknown, method = "POST") {
  return { method, body } as unknown as NextApiRequest;
}

function makeResponse() {
  return {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
    setHeader: vi.fn().mockReturnThis(),
  } as unknown as NextApiResponse;
}

describe("POST /api/posts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates a post owned by the authenticated user", async () => {
    auth.mockResolvedValue({ userId: "user-1" });
    postModel.create.mockResolvedValue({ id: "post-1", ...postFields, authorId: "user-1" });
    const res = makeResponse();

    await createPost(makeRequest(postFields), res);

    expect(postModel.create).toHaveBeenCalledWith({
      data: { ...postFields, authorId: "user-1" },
      select: { id: true },
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ post: { id: "post-1" } });
  });

  it("stops when the request has no authenticated session", async () => {
    auth.mockResolvedValue(null);
    const res = makeResponse();

    await createPost(makeRequest(postFields), res);

    expect(postModel.create).not.toHaveBeenCalled();
  });

  it("returns 405 for methods other than POST", async () => {
    const res = makeResponse();

    await createPost(makeRequest({}, "GET"), res);

    expect(res.setHeader).toHaveBeenCalledWith("Allow", "POST");
    expect(res.status).toHaveBeenCalledWith(405);
  });
});
