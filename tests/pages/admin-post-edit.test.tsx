import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const { push } = vi.hoisted(() => ({ push: vi.fn() }));
vi.mock("../../src/lib/posts", () => ({ getPost: vi.fn() }));
vi.mock("../../src/lib/auth", () => ({
  SESSION_COOKIE_NAME: "acervoarq_session",
  getSessionUserId: vi.fn(),
}));
vi.mock("../../components/Header", () => ({ default: () => <header data-testid="header" /> }));
vi.mock("next/image", () => ({ default: () => null }));
vi.mock("next/router", () => ({ useRouter: () => ({ push }) }));
vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>,
}));

import { getPost } from "../../src/lib/posts";
import { getSessionUserId } from "../../src/lib/auth";
import EditPost, { getServerSideProps } from "../../src/pages/admin/post/[id]";

const post = {
  id: "post-1",
  authorId: "owner-1",
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

describe("Edição de projeto", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("preenche o formulário com os dados atuais do projeto", () => {
    render(<EditPost post={post} />);

    expect(screen.getByRole("heading", { name: "Editar Projeto" })).toBeTruthy();
    expect(screen.getByDisplayValue("Casa de Vidro")).toBeTruthy();
    expect(screen.getByDisplayValue("Lina Bo Bardi")).toBeTruthy();
    expect(screen.getByDisplayValue("700 m²")).toBeTruthy();
    expect(screen.getByDisplayValue("Descrição completa.")).toBeTruthy();
  });

  it("carrega o projeto indicado pela rota", async () => {
    vi.mocked(getPost).mockResolvedValue(post);
    vi.mocked(getSessionUserId).mockResolvedValue("owner-1");

    const result = await getServerSideProps({ params: { id: "post-1" }, req: { cookies: {} } } as never);

    expect(getPost).toHaveBeenCalledWith("post-1");
    const { authorId, ...editablePost } = post;
    expect(result).toEqual({ props: { post: editablePost } });
  });

  it("retorna 404 se o projeto não existir", async () => {
    vi.mocked(getPost).mockResolvedValue(null);

    vi.mocked(getSessionUserId).mockResolvedValue("owner-1");
    const result = await getServerSideProps({ params: { id: "missing" }, req: { cookies: {} } } as never);

    expect(result).toEqual({ notFound: true });
  });

  it("envia PUT para atualizar e retorna ao detalhe", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ post: { id: post.id } }),
    });
    vi.stubGlobal("fetch", fetchMock);
    render(<EditPost post={post} />);
    fireEvent.change(screen.getByPlaceholderText("Ex: UNDB"), { target: { value: "Casa Atualizada" } });
    fireEvent.click(screen.getByRole("button", { name: "Enviar" }));

    await waitFor(() => expect(push).toHaveBeenCalledWith(`/post/${post.id}`));
    expect(fetchMock).toHaveBeenCalledWith(
      `/api/posts/${post.id}`,
      expect.objectContaining({ method: "PUT" }),
    );
  });
});
