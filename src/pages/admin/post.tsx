import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "../../../components/Header";
import { Main } from "../../../components/Main";
import TextoExplicativo from "../../../components/TextoExplicativo";
import Image from "next/image";
import { IconeX } from "../../../components/Icons";

type CreatePostResult = { post?: { id: string }; error?: string };

export default function Post() {
    const divInputStyle = "flex flex-col gap-2";
    const inputStyle = "bg-zinc-200 rounded-lg pl-3 py-1";
    const [showExplicacao, setShowExplicacao] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        setError(null);

        try {
            const formData = new FormData(event.currentTarget);
            const response = await fetch("/api/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(Object.fromEntries(formData.entries())),
            });
            const result = await response.json() as CreatePostResult;

            if (!response.ok || !result.post) {
                setError(result.error ?? "Não foi possível criar o projeto.");
                return;
            }

            await router.push(`/post/${result.post.id}`);
        } catch {
            setError("Não foi possível criar o projeto.");
        }
    }

    return (
        <div>
            <Header />
            <Main title="Novo Projeto">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row justify-between gap-3">
                        <div className="flex flex-col md:w-1/2 gap-3">
                            <div className={divInputStyle}>
                                <label htmlFor="nome">Nome do Projeto</label>
                                <input id="nome" name="nome" type="text" className={inputStyle} placeholder="Ex: UNDB" />
                            </div>
                            <div className={divInputStyle}>
                                <label htmlFor="autores">Autores</label>
                                <input id="autores" name="autores" type="text" className={inputStyle} placeholder="Dê os devidos créditos" />
                            </div>
                            <div className={divInputStyle}>
                                <label htmlFor="dataConclusao">Data de Conclusão</label>
                                <input id="dataConclusao" name="dataConclusao" type="text" className={inputStyle} placeholder="Data de Conclusão" />
                            </div>
                            <div className={divInputStyle}>
                                <label htmlFor="localizacao">Localização</label>
                                <input id="localizacao" name="localizacao" type="text" className={inputStyle} placeholder="Ex: Av. Coronel Colares Moreira, 443A - Jardim Renascença, São Luís - MA" />
                            </div>
                            <div className={divInputStyle}>
                                <label htmlFor="categoria">Categoria</label>
                                <input id="categoria" name="categoria" type="text" className={inputStyle} placeholder="Ex: Universidade" />
                            </div>
                            <div className={divInputStyle}>
                                <label htmlFor="area">Área</label>
                                <input id="area" name="area" type="text" className={inputStyle} placeholder="Área construída (opcional)" />
                            </div>
                            <div className={divInputStyle}>
                                <label htmlFor="imagens">Imagem</label>
                                <input id="imagens" name="imagens" type="text" className={inputStyle} placeholder="URL da imagem (opcional)" />
                            </div>
                        </div>
                        <div className="flex flex-col md:w-1/2 gap-3">
                            <div className="flex justify-between items-center pr-1">
                                <label htmlFor="descricaoResumida">Descrição Resumida</label>
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
                            <textarea id="descricaoResumida" name="descricaoResumida" className={`${inputStyle} h-full resize-none min-h-60`} placeholder="Fale mais sobre o projeto..." />
                            <label htmlFor="descricao">Descrição completa</label>
                            <textarea id="descricao" name="descricao" className={`${inputStyle} h-full resize-none min-h-60`} placeholder="Descrição completa do projeto..." />
                        </div>
                    </div>
                    <TextoExplicativo />
                    {error && <p role="alert" className="text-red-700">{error}</p>}
                    <div className="flex gap-5 w-full justify-end">
                        <Link href="/" className="bg-zinc-200 w-30 h-12 rounded-lg flex items-center justify-center">Cancelar</Link>
                        <button type="submit" className="bg-zinc-900 text-white w-30 h-12 rounded-lg">Enviar</button>
                    </div>
                </form>
            </Main>
        </div>
    );
}
