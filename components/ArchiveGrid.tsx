"use client";

import { useState, useEffect } from "react";
import ArchiveItem from "./ArchiveItem";
import { IconFile, IconFolder } from "./Icons";

const itensIniciais = [
    { tipo: "folder", titulo: "Projetos Residenciais" },
    { tipo: "folder", titulo: "Urbanismo e Espaço Público" },
    { tipo: "folder", titulo: "Restauro e Patrimônio Histórico" },
    { tipo: "folder", titulo: "Concursos e Premiações" },
    { tipo: "folder", titulo: "Maquetes Físicas e Estudos" },
    { tipo: "folder", titulo: "Registros Fotográficos de Obra" },
    { tipo: "file", titulo: "Planta Baixa - Pavimento Térreo (1978)" },
    { tipo: "file", titulo: "Corte Longitudinal e Fachada Norte" },
    { tipo: "file", titulo: "Memorial Descritivo - Centro Cultural" },
    { tipo: "file", titulo: "Croqui Original - Estudo de Volumetria" },
    { tipo: "file", titulo: "Detalhamento Construtivo - Brises e Estrutura" },
    { tipo: "file", titulo: "Prancha de Implantação e Paisagismo" },
    { tipo: "file", titulo: "Caderno de Especificações de Materiais" },
    { tipo: "file", titulo: "Levantamento Topográfico e Cadastral" },
    { tipo: "file", titulo: "Anotações de Canteiro e Diário de Obra" },
    { tipo: "file", titulo: "Perspectiva Axonométrica Explodida" },
    { tipo: "file", titulo: "Estudo de Insolação e Ventilação Cruzada" },
    { tipo: "file", titulo: "Inventário de Mobiliário Modernista" },
    { tipo: "file", titulo: "Correspondências e Memoriais de Cálculo" },
    { tipo: "file", titulo: "Prancha Final - Concurso Pavilhão Nacional" },
    { tipo: "folder", titulo: "Projetos Institucionais e Culturais" },
    { tipo: "folder", titulo: "Habitação Social e Conjuntos" },
    { tipo: "folder", titulo: "Paisagismo e Espaços Abertos" },
    { tipo: "folder", titulo: "Interiores e Design de Mobiliário" },
    { tipo: "folder", titulo: "Obras Não Construídas" },
    { tipo: "folder", titulo: "Pesquisas e Publicações Acadêmicas" },
    { tipo: "folder", titulo: "Cadernos de Croquis (1970–1995)" },
    { tipo: "folder", titulo: "Projetos de Expografia e Museografia" },
    { tipo: "file", titulo: "Planta de Cobertura e Águas Pluviais" },

];

export default function ArchiveItems() {
    const divStyle = 'aspect-square flex items-center justify-center bg-zinc-300 dark:bg-zinc-700 rounded-lg cursor-pointer hover:opacity-85';
    const [itens, setItens] = useState(itensIniciais);

    useEffect(() => {
        const embaralhados = [...itensIniciais];
        for (let i = embaralhados.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [embaralhados[i], embaralhados[j]] = [embaralhados[j], embaralhados[i]];
        }
        setItens(embaralhados);
    }, []);

    return (
        <div className="w-full">
            <ul className="w-full grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-5">
                {itens.map((item) => (
                    <ArchiveItem key={item.titulo}>
                        <div className={divStyle}>
                            {item.tipo === "folder" ? IconFolder : IconFile}
                        </div>
                        <h4 className="text-xs">{item.titulo}</h4>
                    </ArchiveItem>
                ))}
            </ul>
        </div>
    );
}