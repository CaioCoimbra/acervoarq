'use client';

import { useState } from 'react';

/* eslint-disable @next/next/no-img-element */

interface ImagePostProps {
    imagens?: string[];
    clicavel?: boolean
}

export default function ImagePost({ imagens = [], clicavel = false }: ImagePostProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isZoomed, setIsZoomed] = useState(false);

    const handleOpenImage = (img: string) => {
        setSelectedImage(img);
        setIsZoomed(false);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
        setIsZoomed(false);
    };

    if (!imagens || imagens.length === 0) {
        return (
            <div className="flex h-37.5 w-full md:w-2/3 pr-0 md:pr-3 justify-between md:my-0 md:h-full gap-2 md:gap-3">
                <div className="w-3/4 bg-zinc-300 dark:bg-zinc-700 rounded-lg animate-pulse" />
                <div className="flex flex-col justify-between w-1/4 h-full md:gap-3 md:w-1/4 md:h-95">
                    <ul className="flex flex-col justify-between h-full">
                        <li className="w-full rounded-lg h-[30%] animate-pulse bg-zinc-300 dark:bg-zinc-700" />
                        <li className="w-full rounded-lg h-[30%] animate-pulse bg-zinc-300 dark:bg-zinc-700" />
                        <li className="w-full rounded-lg h-[30%] animate-pulse bg-zinc-300 dark:bg-zinc-700" />
                    </ul>
                </div>
            </div>
        );
    }

    const imagemPrincipal = imagens[0];
    const imagensLaterais = imagens.slice(1, 4);
    const totalRestante = imagens.length - 4;

    return (
        <>
            <div className="flex w-full md:w-2/3 pr-0 md:pr-3 justify-between gap-2 md:gap-3 h-full md:h-95">

                <div className={`w-3/4 h-full ${clicavel ? 'cursor-zoom-in' : ''} `} onClick={clicavel ? () => handleOpenImage(imagemPrincipal) : undefined}>
                    <img
                        src={imagemPrincipal}
                        alt="Principal"
                        className="w-full h-full rounded-lg object-cover"
                    />
                </div>

                <div className="flex flex-col justify-between w-1/4 md:gap-3 md:w-1/4 md:h-95">
                    <ul className="flex flex-col justify-between h-full">
                        {imagensLaterais.map((img, index) => (
                            <li key={index} className={`w-full rounded-lg h-[30%] ${clicavel ? 'cursor-zoom-in' : ''}`} onClick={clicavel ? () => handleOpenImage(img) : undefined}>
                                <img
                                    src={img}
                                    alt={`Miniatura ${index + 1}`}
                                    className="w-full h-full rounded-lg object-cover"
                                />
                            </li>
                        ))}

                        {imagens.length > 4 && (
                            <li
                                className="relative w-full rounded-lg h-[30%] z-0 isolate cursor-zoom-in"
                                onClick={() => handleOpenImage(imagens[3])}
                            >
                                <img
                                    src={imagens[3]}
                                    alt="Mais imagens"
                                    className="w-full h-full rounded-lg object-cover opacity-50"
                                />
                                <span className="absolute w-full h-full flex justify-center items-center font-extrabold text-2xl md:text-6xl opacity-100 inset-0 dark:text-white text-zinc-600 pointer-events-none">
                                    +{totalRestante}
                                </span>
                            </li>
                        )}
                    </ul>
                </div>
            </div>

            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black/85 p-4 backdrop-blur-sm cursor-zoom-out"
                    onClick={handleCloseModal}
                >
                    <div className="relative flex-1 w-full max-w-5xl flex items-center justify-center overflow-hidden">
                        <img
                            src={selectedImage}
                            alt="Expanded view"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsZoomed((prev) => !prev);
                            }}
                            className={`max-h-[75vh] max-w-full rounded-lg object-contain shadow-2xl transition-transform duration-300 ease-out ${
                                isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
                            }`}
                        />
                    </div>
                    <div
                        className="flex items-center gap-2 overflow-x-auto max-w-full py-2 px-4 bg-black/50 rounded-xl mt-2 cursor-default"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {imagens.map((img, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => {
                                    setSelectedImage(img);
                                    setIsZoomed(false);
                                }}
                                className={`relative h-16 w-16 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                                    selectedImage === img
                                        ? 'border-white scale-105 opacity-100'
                                        : 'border-transparent opacity-50 hover:opacity-80'
                                }`}
                            >
                                <img
                                    src={img}
                                    alt={`Thumbnail ${idx + 1}`}
                                    className="h-full w-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}