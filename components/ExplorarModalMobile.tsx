'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import ExplorarItem from "./ExplorarItem";
import { IconeX, IconeLupa } from "./Icons";

interface PostData {
    id?: number | string;
    nome: string;
    autor: string;
    data: string;
    localizacao: string;
    categoria: string;
    area: string;
    descricao_resumida: string;
    texto_explicativo: string;
    criado: string;
}

interface ExplorarModalMobileProps {
    ativado: boolean;
    setAtivado: (valor: boolean) => void;
    onSelecionarPost?: (post: PostData) => void;
}

export default function ExplorarModalMobile(props: ExplorarModalMobileProps) {
    const [busca, setBusca] = useState("");
    const [resultados, setResultados] = useState<PostData[]>([]);
    const [buscando, setBuscando] = useState(false);

    const realizarBusca = (termo: string) => {
        if (termo.trim() === "") {
            setResultados([]);
            return;
        }

        setBuscando(true);
        fetch(`https://acervoarq.site/api/buscar_post.php?q=${encodeURIComponent(termo)}`)
            .then((res) => res.json())
            .then((data) => {
                setResultados(Array.isArray(data) ? data : []);
                setBuscando(false);
            })
            .catch((erro) => {
                console.error("Erro na busca:", erro);
                setBuscando(false);
            });
    };

    useEffect(() => {
        if (!props.ativado) return;

        if (busca.trim() === "") {
            setResultados([]);
            return;
        }

        const timer = setTimeout(() => {
            realizarBusca(busca);
        }, 300);

        return () => clearTimeout(timer);
    }, [busca, props.ativado]);

    if (!props.ativado) return null;

    return (
        <div className="md:hidden">
            <div className="flex flex-col items-end h-screen w-screen bg-black/98 backdrop-blur-sm text-white text-right fixed top-0 pt-5 px-3 left-0 font-semibold overflow-y-auto pb-24">
                <span className="pb-5" onClick={() => props.setAtivado(false)}>{IconeX}</span>
                <h1 className="text-3xl pb-5">
                    {busca.trim() === "" ? "Explorar" : buscando ? "Buscando..." : "Resultados"}
                </h1>
                <ul className="flex flex-col gap-5 text-2xl">
                    {busca.trim() === "" ? (
                        <>
                            <li>Início</li>
                            <ExplorarItem texto="Projetos & Ações" >
                                <li>Futuros Possíveis</li>
                                <li>Processos e Experimentos</li>
                            </ExplorarItem>
                            <ExplorarItem texto="Pesquisa & Análise" >
                                <li>Dados de Pesquisa</li>
                                <li>Artigos e Textos</li>
                                <li>Territórios e Lugares</li>
                            </ExplorarItem>
                        </>
                    ) : resultados.length > 0 ? (
                        resultados.map((post, index) => (
                            <li
                                key={post.id ?? index}
                                onClick={() => {
                                    if (props.onSelecionarPost) {
                                        props.onSelecionarPost(post);
                                    }
                                    props.setAtivado(false);
                                }}
                            >
                                <Link href={`/post/${post.id}`} className="flex flex-col items-end">
                                    <span>{post.nome}</span>
                                    <span className="text-sm font-normal text-zinc-400">({post.autor})</span>
                                </Link>
                            </li>
                        ))
                    ) : (
                        !buscando && (
                            <li className="text-lg font-normal text-zinc-400">
                                Nenhum resultado encontrado para &quot;{busca}&quot;
                            </li>
                        )
                    )}
                </ul>
            </div>
            <div className="flex justify-between bottom-0 fixed h-15 w-full left-0 px-3 py-3 gap-2">
                <input
                    className="backdrop-blur-3xl backdrop-saturate-150 bg-white/10 border border-white/20 flex-1 rounded-2xl pl-3 shadow-[0_0_18px_3px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.3)] outline-none"
                    type="text"
                    placeholder="Buscar..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                />

                <button
                    type="button"
                    onClick={() => realizarBusca(busca)}
                    className="backdrop-blur-3xl backdrop-saturate-150 bg-white/10 border border-white/20 flex justify-center items-center rounded-full w-[10vw] shadow-[0_0_18px_3px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.3)]"
                >
                    {IconeLupa}
                </button>
            </div>
        </div>
    );
}