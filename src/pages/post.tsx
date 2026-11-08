import Header from "../../components/Header";
import Main from "../../components/Main";

export default function Post() {

    const divInputStyle = "flex flex-col gap-2"
    const inputStyle = "bg-zinc-200 rounded-lg pl-3 py-1"

    return (
        <div>
            <Header />
            <Main title="Novo Projeto">
                <div className="flex flex-col md:flex-row justify-between gap-3">
                    <div className="flex flex-col md:w-1/2 gap-3">
                        <div className={divInputStyle}>
                            <label htmlFor="">Nome do Projeto</label>
                            <input type="text" className={inputStyle} placeholder="Ex: UNDB"/></div>
                        <div className={divInputStyle}>
                            <label htmlFor="">Autores</label>
                            <input type="text" className={inputStyle} placeholder="Dê os devidos créditos"/></div>
                        <div className={divInputStyle}>
                            <label htmlFor="">Data de Conclusão</label>
                            <input type="text" className={inputStyle} placeholder="Data de Conclusão"/></div>
                        <div className={divInputStyle}>
                            <label htmlFor="">Localização</label>
                            <input type="text" className={inputStyle} placeholder="Ex: Av. Coronel Colares Moreira, 443A - Jardim Renascença, São Luís - MA"/></div>
                        <div className={divInputStyle}>
                            <label htmlFor="">Categoria</label>
                            <input type="text" className={inputStyle} placeholder="Ex: Universidade"/></div>
                    </div>
                    <div className="flex flex-col md:w-1/2 gap-3">
                        <label htmlFor="">Descrição</label>
                        <textarea className={`${inputStyle} h-full resize-none min-h-60`} placeholder="Fale mais sobre o projeto..."/>
                    </div>
                </div>
                <div className={divInputStyle}>
                    <label htmlFor="">Galeria de Imagens</label>
                    <input type="file" src="" alt="" className={`${inputStyle} h-30`}/>
                </div>
                <div className="flex gap-5 w-full justify-end">
                    <button className="bg-zinc-200 w-30 h-12 rounded-lg">Cancelar</button>
                    <button className="bg-zinc-900 text-white w-30 h-12 rounded-lg">Entrar</button>
                </div>
            </Main>
        </div>
    )
}