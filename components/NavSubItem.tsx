import Link from "next/link";

interface NavSubItemProps {
    title: string
    texto: string
}

export default function NavSubItem(props: NavSubItemProps) {

    const liStyle = 'hover:text-white cursor-pointer w-fit'

    return (
        <Link
            href={{
                pathname: '/archive',
                query: { title: props.title, texto: props.texto },
            }}
            onClick={(e) => {
                e.preventDefault();
                window.location.href = `/archive?title=${encodeURIComponent(props.title)}&texto=${encodeURIComponent(props.texto)}`;
            }}
            className="contents"
        >
            <li className={liStyle}>
                {props.title}
            </li>
        </Link>
    )
}