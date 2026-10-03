import { useState } from "react"
import NavItemMenu from "./NavItemMenu"

export default function NavItem(props) {
    const [ativado, setAtivado] = useState(false)

    return (
        <>
            <li
                className="cursor-pointer hover:text-white"
                onMouseEnter={() => {
                    if (props.modal) {
                        setAtivado(true)
                    }
                }}
            >
                {props.texto}
            </li>
            <NavItemMenu ativado={ativado} setAtivado={setAtivado} >
                {props.children}
            </NavItemMenu>
        </>
    )
}