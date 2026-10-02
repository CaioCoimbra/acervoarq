import HeaderSearch from "./HeaderSearch"
import Logo from "./Logo"
import Nav from "./Nav"

export default function Header() {
    return (
        <header className="
        flex fixed top-0
        h-[8vh] w-full
        bg-linear-to-br from-[#1f1f1f] to-[#000000] opacity-90
        text-[#BABABA]
        ">
            <div className="flex flex-row items-center justify-between w-full px-5 py-2">
                <Logo />
                <Nav />
                <HeaderSearch />
            </div>
        </header>
    )
}