import type { GetServerSideProps } from "next";
import Header from "../../../components/Header";
import ImagePost from "../../../components/ImagesPost";
import { Main } from "../../../components/Main";
import { getPost } from "../../lib/posts";
import type { PostDetails } from "../../../types/Post";

interface PostPageProps {
    post: PostDetails;
}

export default function Post({ post }: PostPageProps) {
    return (
        <>
            <Header />
            <Main title={post.nome}>
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

export const getServerSideProps: GetServerSideProps<PostPageProps> = async ({ params }) => {
    const id = params?.id;
    if (typeof id !== "string") return { notFound: true };

    const post = await getPost(id);
    if (!post) return { notFound: true };

    return { props: { post } };
};
