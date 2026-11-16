'use client';

import { useState, useEffect } from "react";
import { IconeLupa, IconeFlexa } from "./Icons";
import Link from "next/link";

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

interface ExplorarModalDesktopProps {
    ativado: boolean;
    setAtivado: (valor: boolean) => void;
    onSelecionarPost?: (post: PostData) => void; 
}

export default function ExplorarModalDesktop(props: ExplorarModalDesktopProps) {
    const [busca, setBusca] = useState("");
    const [resultados, setResultados] = useState<PostData[]>([]);
    const [buscando, setBuscando] = useState(false);

    useEffect(() => {
        if (!props.ativado) return;

        if (busca.trim() === "") {
            setResultados([]);
            return;
        }

        const timer = setTimeout(() => {
            setBuscando(true);
            fetch(`https://acervoarq.site/api/buscar_post.php?q=${encodeURIComponent(busca)}`)
                .then((res) => res.json())
                .then((data) => {
                    setResultados(Array.isArray(data) ? data : []);
                    setBuscando(false);
                })
                .catch((erro) => {
                    console.error("Erro na busca:", erro);
                    setBuscando(false);
                });
        }, 300);

        return () => clearTimeout(timer);
    }, [busca, props.ativado]);

    if (!props.ativado) return null;

    const liStyle = "flex items-center gap-1 h-5 hover:text-white cursor-pointer transition-all duration-300ms hover:gap-3";

    const sugestoesPadrao = ["Arquitetura Moderna", "Urbanismo", "Patrimônio Histórico"];

    return (
        <div className="hidden md:flex flex-col justify-center absolute w-full left-0 top-0 mt-[6vh]">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md h-screen" />
            <div className="flex justify-center w-full bg-zinc-900/95 backdrop-blur-lg mb-30" onMouseLeave={() => props.setAtivado(false)}>
                <div className="flex flex-col gap-5 w-155 pt-10 pb-20 ">
                    <div className="flex gap-3">
                        <span className="py-1">{IconeLupa}</span>
                        <input
                            className="flex flex-1 text-2xl bg-transparent outline-none"
                            type="text"
                            placeholder="Buscar..."
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                            autoFocus
                        />
                    </div>
                    <div className="flex flex-col gap-5">
                        <h1 className="text-xl">
                            {busca.trim() === "" ? "Sugestões" : buscando ? "Buscando..." : "Resultados"}
                        </h1>
                        <ul className="flex flex-col gap-3">
                            {busca.trim() === "" ? (
                                sugestoesPadrao.map((sugestao, index) => (
                                    <li
                                        key={index}
                                        className={liStyle}
                                        onClick={() => setBusca(sugestao)}
                                    >
                                        {sugestao} {<IconeFlexa />}
                                    </li>
                                ))
                            ) : resultados.length > 0 ? (
                                resultados.map((post, index) => (
                                    <li
                                        key={post.id ?? index}
                                        className={liStyle}
                                        onClick={() => {
                                            if (props.onSelecionarPost) {
                                                props.onSelecionarPost(post);
                                            }
                                            props.setAtivado(false);
                                        }}
                                    >
                                        <Link href={`/post/${post.id}`} className="contents">
                                            <span>{post.nome}</span>
                                            <span className="text-xs text-zinc-400">({post.autor})</span>
                                        </Link>
                                        {<IconeFlexa />}
                                    </li>
                                ))
                            ) : (
                                !buscando && (
                                    <li className="text-zinc-400 h-5">
                                        Nenhum resultado encontrado para &quot;{busca}&quot;
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}