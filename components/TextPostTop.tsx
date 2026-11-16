import Link from "next/link";
import { IconeICon } from "./Icons";

interface TextProps {
    id: number | string
    nome: string
    autor: string
}

export default function TextPostTop(props: TextProps) {
    return (
        <div className="flex flex-col h-fit gap-2">
            <Link href={`/post/${props.id}/`} className="cursor-pointer contents">
                <h3 className="text-xl font-semibold w-fit">{props.nome}</h3>
            </Link>
            <h4 className="flex gap-1.5 items-center text-sm"><span><IconeICon /></span>{props.autor}</h4>
        </div>
    )
}