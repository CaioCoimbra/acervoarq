import Link from 'next/link';
import ImagePost from './ImagesPost';
import TextPost from './TextPost';
import TextPostTop from './TextPostTop';
import TextPostBottom from './TextPostBottom';

interface PostProps {
    id: number | string;
    nome: string;
    autor: string;
    descricao_resumida: string;
    localizacao: string;
    data: string;
    categoria: string;
    texto_explicativo?: string; 
}

export default function Post({ 
    id, 
    nome, 
    autor, 
    descricao_resumida, 
    localizacao, 
    data, 
    categoria, 
    texto_explicativo = "" 
}: PostProps) {

    const extrairImagensDoHtml = (html: string): string[] => {
        if (!html) return [];
        
        if (typeof window === 'undefined') return [];

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const imgs = doc.querySelectorAll('img');
        return Array.from(imgs).map(img => img.src);
    };

    const imagens = extrairImagensDoHtml(texto_explicativo);

    return (
        <>
            <div className="hidden md:flex w-full h-95">
                <Link href={`/post/${id}/`} className="cursor-pointer contents">
                    <ImagePost imagens={imagens} />
                </Link>
                <TextPost 
                    key={id} 
                    id={id} 
                    nome={nome} 
                    autor={autor} 
                    descricao_resumida={descricao_resumida} 
                    localizacao={localizacao} 
                    data={data} 
                    categoria={categoria} 
                />
            </div>
            <div className="flex flex-col gap-3 md:hidden">
                <TextPostTop key={id} id={id} nome={nome} autor={autor} />
                <Link href={`/post/${id}/`} className="cursor-pointer contents">
                    <ImagePost imagens={imagens} />
                </Link>
                <TextPostBottom 
                    key={id} 
                    descricao_resumida={descricao_resumida} 
                    localizacao={localizacao} 
                    data={data} 
                    categoria={categoria} 
                />
            </div>
        </>
    );
}