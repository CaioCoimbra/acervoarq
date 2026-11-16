'use client';

import { useState, useEffect } from 'react';

import Header from "../../../components/Header";
import {
    IconeArea,
    IconeCategoria,
    IconeData,
    IconeICon,
    IconePin
} from "../../../components/Icons";

import ImagePost from "../../../components/ImagesPost";
import Main from "../../../components/Main";
import CarregandoPost from '../../../components/CarregandoPost';
import Footer from '../../../components/Footer';

interface PostProps {
    id: number | string;
    nome: string;
    autor: string;
    descricao_resumida: string;
    localizacao: string;
    data: string;
    categoria: string;
    area: string;
    texto_explicativo: string;
}

export default function PostPage() {
    const [idUrl, setIdUrl] = useState<string | null>(null);
    const [post, setPost] = useState<PostProps | null>(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const pathSegments = window.location.pathname
            .split('/')
            .filter(Boolean);

        const lastSegment = pathSegments[pathSegments.length - 1];

        if (lastSegment && lastSegment !== 'post') {
            setIdUrl(lastSegment);
        } else {
            const params = new URLSearchParams(window.location.search);
            setIdUrl(params.get('id'));
        }
    }, []);

    useEffect(() => {
        if (idUrl === null) return;

        if (!idUrl) {
            setCarregando(false);
            return;
        }

        fetch(`https://acervoarq.site/api/post.php?id=${encodeURIComponent(idUrl)}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Erro ao buscar post');
                }
                return res.json();
            })
            .then((data: PostProps) => {
                setPost(data || null);
            })
            .catch((erro) => {
                console.error("Erro ao buscar post:", erro);
                setPost(null);
            })
            .finally(() => {
                setCarregando(false);
            });

    }, [idUrl]);

    const extrairImagensDoHtml = (html: string): string[] => {
        if (!html) return [];
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const imgs = doc.querySelectorAll('img');
        return Array.from(imgs).map(img => img.src);
    };

    if (carregando) {
        return <CarregandoPost />;
    }

    if (!post) {
        return <p>Post não encontrado.</p>;
    }

    const imagensDoTexto = extrairImagensDoHtml(post.texto_explicativo);

    return (
        <>
            <Header />
            <Main title={post.nome}>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-5 md:gap-3 md:flex-row">
                        <ImagePost imagens={imagensDoTexto} clicavel />

                        <ul className="flex flex-col text-lg gap-3">
                            <li className="font-semibold flex gap-3 items-center"><IconeICon /> Autor: {post.autor}</li>
                            <li className="font-semibold flex gap-3 items-center"><IconeData /> Data: {post.data}</li>
                            <li className="font-semibold flex gap-3 items-center"><IconePin /> Localização: {post.localizacao}</li>
                            <li className="font-semibold flex gap-3 items-center"><IconeCategoria /> Categoria: {post.categoria}</li>
                            <li className="font-semibold flex gap-3 items-center">{IconeArea} Área: {post.area}</li>
                        </ul>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <div className='flex flex-col gap-1.5'>
                            <h3 className="font-semibold text-xl">Descrição Resumida</h3>
                            <p className='whitespace-pre-line'>{post.descricao_resumida}</p>
                        </div>
                        <div className='flex flex-col gap-1.5'>
                            <h3 className="font-semibold mb-2 text-xl">Sobre a Obra</h3>
                            <div
                                className="prose max-w-none [&_img]:max-h-80 [&_img]:w-auto [&_img]:my-2 [&_img]:rounded-lg"
                                dangerouslySetInnerHTML={{ __html: post.texto_explicativo }}
                            />
                        </div>
                    </div>
                </div>
            </Main>
            <Footer />
        </>
    );
}