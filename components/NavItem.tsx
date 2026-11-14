import { ReactNode } from "react"
import NavItemMenu from "./NavItemMenu"

interface NavItemProps {
    modal?: boolean
    texto: string
    isOpen: boolean
    onHover: () => void
    onLeave: () => void
    children?: ReactNode
}

export default function NavItem(props: NavItemProps) {
    return (
        <li
            onMouseEnter={() => {
                if (props.modal) {
                    props.onHover()
                }
            }}
        >
            <span className="hover:text-white cursor-pointer">{props.texto}</span>
            <NavItemMenu ativado={props.isOpen} onLeave={props.onLeave}>
                {props.children}
            </NavItemMenu>
        </li>
    )
}