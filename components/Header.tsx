import HeaderSearch from "./HeaderSearch"
import Logo from "./Logo"
import Nav from "./Nav"

export default function Header() {
    return (
        <header className="flex fixed top-0 h-[6vh] w-full bg-linear-to-br bg-zinc-900 text-[#BABABA]">
            <div className="flex flex-row items-center justify-between max-w-360 w-full mx-auto py-2 px-4">
                <Logo />
                <Nav />
                <HeaderSearch />
            </div>
        </header>
    )
}