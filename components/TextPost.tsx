import TextPostBottom from "./TextPostBottom";
import TextPostTop from "./TextPostTop";

interface TextPostProps {
    id: number | string
    nome: string;
    autor: string;
    descricao_resumida: string;
    localizacao: string;
    data: string;
    categoria: string;
}

export default function TextPost(props: TextPostProps) {

    return (
        <div className="flex flex-col h-full justify-between w-1/3 gap-1.5">
            <TextPostTop id={props.id} nome={props.nome} autor={props.autor} />
            <TextPostBottom descricao_resumida={props.descricao_resumida} localizacao={props.localizacao} data={props.data} categoria={props.categoria} />
        </div>
    )
}