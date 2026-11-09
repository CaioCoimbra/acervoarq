import { useState } from "react";
import Header from "../../../components/Header";
import { Main } from "../../../components/Main";
import TextoExplicativo from "../../../components/TextoExplicativo";
import Image from "next/image";
import { IconeX } from "../../../components/Icons";

export default function Post() {

    const divInputStyle = "flex flex-col gap-2"
    const inputStyle = "bg-zinc-200 rounded-lg pl-3 py-1"

    const [showExplicacao, setShowExplicacao] = useState(true)


    return (
        <div>
            <Header />
            <Main title="Novo Projeto">
                <div className="flex flex-col md:flex-row justify-between gap-3">
                    <div className="flex flex-col md:w-1/2 gap-3">
                        <div className={divInputStyle}>
                            <label htmlFor="">Nome do Projeto</label>
                            <input type="text" className={inputStyle} placeholder="Ex: UNDB" /></div>
                        <div className={divInputStyle}>
                            <label htmlFor="">Autores</label>
                            <input type="text" className={inputStyle} placeholder="Dê os devidos créditos" /></div>
                        <div className={divInputStyle}>
                            <label htmlFor="">Data de Conclusão</label>
                            <input type="text" className={inputStyle} placeholder="Data de Conclusão" /></div>
                        <div className={divInputStyle}>
                            <label htmlFor="">Localização</label>
                            <input type="text" className={inputStyle} placeholder="Ex: Av. Coronel Colares Moreira, 443A - Jardim Renascença, São Luís - MA" /></div>
                        <div className={divInputStyle}>
                            <label htmlFor="">Categoria</label>
                            <input type="text" className={inputStyle} placeholder="Ex: Universidade" /></div>
                    </div>
                    <div className="flex flex-col md:w-1/2 gap-3">
                        <div className="flex justify-between items-center pr-1">
                            <label htmlFor="">Descrição Resumida</label>
                            <span className="flex justify-center items-center border rounded-full h-4 w-4 text-xs text-zinc-400 cursor-pointer" onClick={() => setShowExplicacao(true)}>?</span>
                        </div>
                        <div className={`${showExplicacao ? 'flex' : 'hidden'} relative`}>
                            <div className={`${showExplicacao ? 'flex' : 'hidden'} absolute top-0 right-0 justify-end `}>
                                <div className="flex flex-col gap-3 h-fit px-5 py-5 w-[95%] md:max-w-3/5 bg-white rounded-2xl shadow-2xl">
                                    <span className="text-xl cursor-pointer w-fit ml-auto" onClick={() => setShowExplicacao(false)}>{IconeX}</span>
                                    <Image src="/descricaoresumida.png" alt="exemplo de descricao" fill className="object-contain relative! h-fit! w-auto! rounded-2xl" />
                                    <p>Esse texto serve como a apresentação principal do projeto na página inicial (Home), sendo fundamental para capturar a atenção imediata do visitante ao sintetizar, em poucas linhas, a verdadeira essência e o conceito central da proposta.</p>
                                </div>
                            </div>
                        </div>
                        <textarea className={`${inputStyle} h-full resize-none min-h-60`} placeholder="Fale mais sobre o projeto..." />
                    </div>
                </div>
                <TextoExplicativo />
                <div className="flex gap-5 w-full justify-end">
                    <button className="bg-zinc-200 w-30 h-12 rounded-lg">Cancelar</button>
                    <button className="bg-zinc-900 text-white w-30 h-12 rounded-lg">Enviar</button>
                </div>
            </Main>
        </div>
    )
}