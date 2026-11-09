'use client';

import { useRef, ChangeEvent } from 'react';

export default function TextoExplicativo() {

    const editorRef = useRef<HTMLDivElement>(null);

    const divInputStyle = "flex flex-col gap-2"
    const inputStyle = "bg-zinc-200 rounded-lg pl-3 py-1"

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const imageUrl = URL.createObjectURL(file);
        editorRef.current?.focus();
        document.execCommand('insertImage', false, imageUrl);
    };

    return (
        <div className={divInputStyle}>
            <div className="flex justify-between items-center">
                <label>Texto Explicativo</label>
                <div className='flex items-center gap-3'>
                    <span className="flex justify-center items-center border rounded-full h-4 w-4 text-xs text-zinc-400 cursor-pointer">?</span>
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
            
            <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                data-placeholder="
                Descreva aqui os detalhes do seu projeto. As imagens inseridos neste campo serão exibidos diretamente na galeria de imagens da página do projeto.
                "
                className={`${inputStyle} h-100 overflow-y-auto outline-none prose max-w-none 
                empty:before:content-[attr(data-placeholder)] 
                empty:before:text-zinc-400 
                empty:before:pointer-events-none
                [&_img]:max-h-40 [&_img]:w-auto [&_img]:inline-block [&_img]:my-1 [&    _img]:rounded`}
            />
        </div>
    );
}