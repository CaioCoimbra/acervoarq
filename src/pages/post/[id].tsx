import type { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Header from "../../../components/Header";
import ImagePost from "../../../components/ImagesPost";
import { Main } from "../../../components/Main";
import { getPost } from "../../lib/posts";
import { getSessionUserId, SESSION_COOKIE_NAME } from "../../lib/auth";
import type { PostDetails } from "../../../types/Post";

interface PostPageProps {
    post: PostDetails;
    authenticated?: boolean;
    isOwner?: boolean;
}

export default function Post({ post, authenticated = false, isOwner = false }: PostPageProps) {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    async function handleDelete(): Promise<void> {
        if (!window.confirm("Deseja excluir este projeto?")) return;

        try {
            const response = await fetch(`/api/posts/${post.id}`, { method: "DELETE" });
            if (!response.ok) {
                setError("Não foi possível excluir o projeto.");
                return;
            }
            await router.push("/");
        } catch {
            setError("Não foi possível excluir o projeto.");
        }
    }

    return (
        <>
            <Header authenticated={authenticated} />
            <Main title={post.nome}>
                {isOwner && <div className="flex justify-end gap-4">
                    <Link href={`/admin/post/${post.id}`}>Editar projeto</Link>
                    <button type="button" onClick={handleDelete}>Excluir projeto</button>
                </div>}
                {error && <p role="alert">{error}</p>}
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col md:flex-row">
                        <ImagePost images={post.imagens} />
                        <ul className="flex flex-col text-lg gap-3">
                            <li className="font-semibold">Autor: {post.autores}</li>
                            <li className="font-semibold">Data: {post.dataConclusao ?? "—"}</li>
                            <li className="font-semibold">Localização: {post.localizacao ?? "—"}</li>
                            <li className="font-semibold">Categoria: {post.categoria ?? "—"}</li>
                            <li className="font-semibold">Área: {post.area ?? "—"}</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold">Descrição</h3>
                        <p>{post.descricao}</p>
                    </div>
                </div>
            </Main>
        </>
    );
}

export const getServerSideProps: GetServerSideProps<PostPageProps> = async ({ params, req }) => {
    const id = params?.id;
    if (typeof id !== "string") return { notFound: true };

    const post = await getPost(id);
    if (!post) return { notFound: true };

    const { authorId, ...publicPost } = post;
    const userId = await getSessionUserId(req.cookies[SESSION_COOKIE_NAME]);
    return { props: { post: publicPost, authenticated: Boolean(userId), isOwner: Boolean(userId && userId === authorId) } };
};
