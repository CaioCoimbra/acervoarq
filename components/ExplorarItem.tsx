import { ReactNode, useState } from "react"
import { IconeFlexa } from "./Icons"

interface ExplorarItemProps{
    texto: string
    children: ReactNode
}


export default function ExplorarItem(props: ExplorarItemProps) {

    const [itemAberto, setItemAberto] = useState(false)

    return (
        <li onClick={() => { setItemAberto(!itemAberto) }}>
            <div className="flex justify-end items-center">
                {props.texto}
                <span className={`transition-transform duration-200 pl-1 ${itemAberto ? 'rotate-90' : ''}`}>{IconeFlexa(5)}</span>
            </div>

            {props.children && (
                <ul className={`${!itemAberto ? 'hidden' : 'flex'} flex-col gap-3 text-xl py-5 pl-4`}>
                    {props.children}
                </ul>
            )}
        </li>
    )
}   