export default function NavItem(props) {
    return (
        <li className="cursor-pointer hover:text-white">
            {props.texto}
        </li>
    )
}