import Link from "next/link";
import { IconeICon } from "./Icons";

export default function TextPostTop() {
    return (
        <div className="flex flex-col h-fit gap-2">
            <Link href={`/post/1`} className="cursor-pointer contents">
                <h3 className="text-xl font-semibold w-fit">Título do Projeto</h3>
            </Link>
            <h4 className="flex gap-1.5 items-center text-sm"><span><IconeICon /></span>Autor</h4>
        </div>
    )
}