import { useState } from "react";
import Header from "../../../components/Header";
import Main from "../../../components/Main";
import TextoExplicativo from "../../../components/TextoExplicativo";
import Image from "next/image";
import { IconeX } from "../../../components/Icons";

export default function Post() {

    const divInputStyle = "flex flex-col gap-2"
    const inputStyle = "bg-zinc-200 rounded-lg pl-3 py-1 placeholder:text-zinc-400 text-black h-[32px]"

    const [showExplicacao, setShowExplicacao] = useState(false)

    const [nome, setNome] = useState("")
    const [autor, setAutor] = useState("")
    const [data, setData] = useState("")
    const [localizacao, setLocalizacao] = useState("")
    const [categoria, setCategoria] = useState("")
    const [areaValor, setAreaValor] = useState("")
    const [areaUnidade, setAreaUnidade] = useState("m²")
    const [descricaoResumida, setDescricaoResumida] = useState("")

    const [textoExplicativo, setTextoExplicativo] = useState("")

    const [carregando, setCarregando] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setCarregando(true)

        const dadosPost = {
            nome,
            autor,
            data,
            localizacao,
            categoria,
            area: `${areaValor} ${areaUnidade}`,
            descricao_resumida: descricaoResumida,
            texto_explicativo: textoExplicativo
        }

        try {
            const resposta = await fetch('https://acervoarq.site/api/postar.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosPost),
            })

            const resultado = await resposta.json()

            if (resultado.sucesso || resposta.ok) {
                alert("Projeto cadastrado com sucesso!")
                setNome("")
                setAutor("")
                setData("")
                setLocalizacao("")
                setCategoria("")
                setAreaValor("")
                setDescricaoResumida("")
                setTextoExplicativo("")
            } else {
                alert("Erro ao cadastrar: " + (resultado.erro || "Erro desconhecido"))
            }
        } catch (erro) {
            console.error("Erro na requisição:", erro)
            alert("Ocorreu um erro de conexão com o servidor.")
        } finally {
            setCarregando(false)
        }
    }

    return (
        <div>
            <Header />
            <Main title="Novo Projeto">
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row justify-between gap-3">
                    <div className="flex flex-col md:w-1/2 gap-3">
                        <div className={divInputStyle}>
                            <label htmlFor="">Nome do Projeto</label>
                            <input
                                type="text"
                                className={inputStyle}
                                placeholder="Ex: UNDB"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                        </div>
                        <div className={divInputStyle}>
                            <label htmlFor="">Autor(es)</label>
                            <input
                                type="text"
                                className={inputStyle}
                                placeholder="Dê os devidos créditos"
                                value={autor}
                                onChange={(e) => setAutor(e.target.value)}
                            />
                        </div>
                        <div className={divInputStyle}>
                            <label htmlFor="">Ano de Conclusão</label>
                            <input
                                type="text"
                                className={inputStyle}
                                placeholder="Data de Conclusão"
                                value={data}
                                onChange={(e) => setData(e.target.value)}
                            />
                        </div>
                        <div className={divInputStyle}>
                            <label htmlFor="">Localização</label>
                            <input
                                type="text"
                                className={inputStyle}
                                placeholder="Ex: Av. Coronel Colares Moreira, 443A - Jardim Renascença, São Luís - MA"
                                value={localizacao}
                                onChange={(e) => setLocalizacao(e.target.value)}
                            />
                        </div>
                        <div className={divInputStyle}>
                            <label htmlFor="">Categoria</label>
                            <input
                                type="text"
                                className={inputStyle}
                                placeholder="Ex: Universidade"
                                value={categoria}
                                onChange={(e) => setCategoria(e.target.value)}
                            />
                        </div>
                        <div className={divInputStyle}>
                            <label htmlFor="">Área</label>
                            <div className="flex">
                                <input
                                    type="text"
                                    className={`${inputStyle} flex flex-1 rounded-r-none`}
                                    placeholder="Ex: 1.500"
                                    value={areaValor}
                                    onChange={(e) => setAreaValor(e.target.value)}
                                />
                                <select
                                    name=""
                                    id=""
                                    className={`${inputStyle} rounded-l-none py-1! px-0!`}
                                    value={areaUnidade}
                                    onChange={(e) => setAreaUnidade(e.target.value)}
                                >
                                    <option value="m²">m²</option>
                                    <option value="km²">km²</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:w-1/2 gap-3">
                        <div className="flex justify-between items-center pr-1">
                            <label htmlFor="">Descrição Resumida</label>
                            <span className="flex justify-center items-center border rounded-full h-4 w-4 text-xs text-zinc-400 cursor-pointer" onClick={() => setShowExplicacao(!showExplicacao)}>?</span>
                        </div>
                        <div className={`${showExplicacao ? 'flex' : 'hidden'} relative text-black`}>
                            <div className={`${showExplicacao ? 'flex' : 'hidden'} absolute top-0 right-0 justify-end `}>
                                <div className="flex flex-col gap-3 h-fit px-5 py-5 w-[95%] md:max-w-3/5 bg-white rounded-2xl shadow-2xl">
                                    <span className="text-xl cursor-pointer w-fit ml-auto" onClick={() => setShowExplicacao(false)}>{IconeX}</span>
                                    <h1 className="text-xl font-semibold">Exemplo</h1>
                                    <Image src="/descricaoresumida.png" alt="exemplo de descricao" fill className="object-contain relative! h-fit! w-auto! rounded-2xl" />
                                    <p>Esse texto serve como a apresentação principal do projeto na página inicial (Home), sendo fundamental para capturar a atenção imediata do visitante ao sintetizar, em poucas linhas, a verdadeira essência e o conceito central da proposta.</p>
                                </div>
                            </div>
                        </div>
                        <textarea
                            className={`${inputStyle} h-full resize-none min-h-60`}
                            placeholder="Fale mais sobre o projeto..."
                            value={descricaoResumida}
                            onChange={(e) => setDescricaoResumida(e.target.value)}
                        />
                    </div>
                </form>
                <div className="mt-4">
                    <TextoExplicativo onChange={(html) => setTextoExplicativo(html)} />
                </div>

                <div className="flex gap-5 w-full justify-end mt-4">
                    <button type="button" className="bg-zinc-200 w-30 h-12 rounded-lg text-black">Cancelar</button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={carregando}
                        className="bg-zinc-900 text-white w-30 h-12 rounded-lg disabled:opacity-50 cursor-pointer"
                    >
                        {carregando ? "Enviando..." : "Enviar"}
                    </button>
                </div>
            </Main>
        </div>
    )
}