import Link from "next/link"
import { ReactNode } from "react"

interface ArchiveItemProps {
    children: ReactNode
}


export default function ArchiveItem(props: ArchiveItemProps) {
    return (

        <Link href={"https://acervoarq.site/Documentacao_Resumida_Acervo_Digital_AU_EC.pdf"} target="_blank">
            <li className="flex flex-col text-center gap-1.5">
                {props.children}
            </li>
        </Link>
        
    )
}