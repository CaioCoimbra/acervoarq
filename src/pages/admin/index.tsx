import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Main from "../../../components/Main";
import { IconDelete, IconEdit, IconOpen } from "../../../components/Icons";
import Link from "next/link";


interface PostData {
    id: number;
    nome: string;
    autor: string;
    descricao_resumida: string;
    localizacao: string;
    data: string;
    categoria: string;
}

export default function Painel() {
    const [posts, setPosts] = useState<PostData[]>([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        fetch('https://acervoarq.site/api/listar_post.php')
            .then((res) => res.json())
            .then((data) => {
                setPosts(data);
                setCarregando(false);
            })
            .catch((erro) => {
                console.error("Erro ao buscar:", erro);
                setCarregando(false);
            });
    }, []);

    const handleDeletar = async (id: number) => {
        if (!confirm("Tem certeza que deseja excluir este projeto?")) return;

        try {
            const resposta = await fetch('https://acervoarq.site/api/modificar_post.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ acao: "deletar", id: id }),
            });

            const resultado = await resposta.json();

            if (resultado.sucesso) {
                setPosts(posts.filter((post) => post.id !== id));
            } else {
                alert("Erro ao deletar: " + (resultado.erro || "Erro desconhecido"));
            }
        } catch (erro) {
            console.error("Erro na requisição:", erro);
            alert("Ocorreu um erro de conexão com o servidor.");
        }
    };

    return (
        <div>
            <Header />
            <Main title="Painel Administrativo">
                {carregando ? (
                    <p>Carregando posts...</p>
                ) : posts.length === 0 ? (
                    <p>Nenhum post encontrado.</p>
                ) : (
                    <div className="overflow-x-scroll md:overflow-x-hidden">
                        <table className="border rounded-lg px-3 py-2 min-w-154.25 md:min-w-full text-center table-fixed overflow-scroll ">
                            <thead className="">
                                <tr>
                                    <th className="border p-2 md:w-[4%]">ID</th>
                                    <th className="border p-2 md:w-[15%]">Nome do Projeto</th>
                                    <th className="border p-2 md:w-[15%]">Autor</th>
                                    <th className="border p-2 md:w-[15%]">Localização</th>
                                    <th className="border p-2 md:w-[6%]">Data</th>
                                    <th className="border p-2 md:w-[15%]">Categoria</th>
                                    <th className="border p-2 md:w-[10%]">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {posts.map((post) => (
                                    <tr key={post.id} className="border">
                                        <td className="h-16.25 border p-2 align-middle whitespace-nowrap">{post.id}</td>
                                        <td className="h-16.25 border p-2 align-middle wrap-break-word">{post.nome}</td>
                                        <td className="h-16.25 border p-2 align-middle wrap-break-word">{post.autor}</td>
                                        <td className="h-16.25 border p-2 align-middle wrap-break-word">{post.localizacao}</td>
                                        <td className="h-16.25 border p-2 align-middle whitespace-nowrap">{post.data}</td>
                                        <td className="h-16.25 border p-2 align-middle wrap-break-word">{post.categoria}</td>
                                        <td className="h-16.25 border p-2">
                                            <div className="flex w-full justify-around items-end flex-row-reverse">
                                                <div
                                                    className="cursor-pointer"
                                                    onClick={() => handleDeletar(post.id)}
                                                >
                                                    {IconDelete}
                                                </div>
                                                <div className="cursor-pointer">{IconEdit}</div>
                                                <Link href={`/post/${post.id}/`} target="_blank">
                                                    <div className="cursor-pointer">{IconOpen}</div>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <div className="flex justify-center items-center gap-4">
                    <Link href={'/admin/post/'} className="w-fit">
                        <span className="flex justify-center text-center w-10 h-10 text-3xl rounded-full bg-white text-black">+</span>
                    </Link>
                    <h4 className="font-semibold text-xl">Adicionar</h4>
                </div>
            </Main>
        </div>
    )
}