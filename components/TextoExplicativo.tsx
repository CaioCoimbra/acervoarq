'use client';

import Image from 'next/image';
import { useRef, ChangeEvent, useState } from 'react';
import { IconeX } from './Icons';

interface TextoExplicativoProps {
    onChange: (html: string) => void;
}

export default function TextoExplicativo({ onChange }: TextoExplicativoProps) {
    const editorRef = useRef<HTMLDivElement>(null);

    const [showExplicacao, setShowExplicacao] = useState(false)

    const divInputStyle = "flex flex-col gap-2"
    const inputStyle = "bg-zinc-200 rounded-lg pl-3 py-1"

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            editorRef.current?.focus();
            document.execCommand('insertImage', false, base64String);

            if (editorRef.current) {
                onChange(editorRef.current.innerHTML);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleInput = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    return (
        <div className={divInputStyle}>
            <div className="flex justify-between items-center">
                <label>Texto Explicativo</label>
                <div className='flex items-center gap-3'>
                    <span className="flex justify-center items-center border rounded-full h-4 w-4 text-xs text-zinc-400 cursor-pointer" onClick={() => setShowExplicacao(!showExplicacao)}>?</span>
                    <label className="cursor-pointer text-xs bg-zinc-300 hover:bg-zinc-400 px-2 py-1 rounded transition text-zinc-800 font-medium">
                        Inserir Imagem
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </label>
                </div>
            </div>
            <div className={`${showExplicacao ? 'flex' : 'hidden'} relative text-black`}>
                <div className={`${showExplicacao ? 'flex' : 'hidden'} absolute top-0 right-0 justify-end `}>
                    <div className="flex flex-col gap-3 h-fit px-5 py-5 w-[95%] md:max-w-3/5 bg-white rounded-2xl shadow-2xl">
                        <span className="text-xl cursor-pointer w-fit ml-auto" onClick={() => setShowExplicacao(false)}>{IconeX}</span>
                        <h1 className="text-xl font-semibold">Exemplo</h1>
                        <Image src="/sobreaobra.png" alt="exemplo de descricao" fill className="object-contain relative! h-fit! w-auto! rounded-2xl" />
                        <p>Apresente o contexto histórico da obra, seu partido arquitetônico, técnicas construtivas e os destaques dos ambientes internos e externos.</p>
                    </div>
                </div>
            </div>

            <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={handleInput}
                data-placeholder="
                Descreva aqui os detalhes do seu projeto. As imagens inseridas neste campo serão exibidos diretamente na galeria de imagens da página do projeto.
                "
                className={`${inputStyle} h-100 overflow-y-auto outline-none prose max-w-none 
                empty:before:content-[attr(data-placeholder)] 
                empty:before:text-zinc-400 
                empty:before:pointer-events-none
                [&_img]:max-h-40 [&_img]:w-auto [&_img]:inline-block [&_img]:my-1 [&_img]:rounded`}
            />
        </div>
    );
}