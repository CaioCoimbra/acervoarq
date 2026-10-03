export default function NavItemMenu(props) {
    if (!props.ativado) return null

    return (
        <div className="hidden md:flex flex-col justify-center absolute w-full left-0 top-[6vh]" onMouseLeave={() => props.setAtivado(false)}>
            <div className="flex justify-center w-full bg-zinc-900/95 backdrop-blur-lg h-50">
                {props.children && (
                    <ul className={`flex flex-col w-155 py-10`}>
                        {props.children}
                    </ul>
                )}
            </div>
        </div>
    )
}