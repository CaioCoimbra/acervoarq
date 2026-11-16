import CarregandoHomeDiv from "./CarregandoHomeDiv";
import Header from "./Header";
import Main from "./Main";

export default function CarregandoHome() {
    const spanStyle = "h-6 w-full bg-zinc-300 dark:bg-zinc-700 rounded-full animate-pulse"

    return (
        <div>
            <Header />
            <Main>
                <span className={`w-30! ${spanStyle}`} />
                <span className="-m-7 md:-m-14" />
                <CarregandoHomeDiv />
                <CarregandoHomeDiv />
            </Main>
        </div>
    )
}