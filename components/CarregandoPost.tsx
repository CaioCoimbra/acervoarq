import Header from "./Header";
import Main from "./Main";

export default function CarregandoPost() {

    const spanStyle = "h-6 w-full bg-zinc-300 dark:bg-zinc-700 rounded-full animate-pulse"

    return (
        <div>
            <Header />
            <Main>
                <div className="flex flex-col gap-5 md:gap-3">
                    <span className={`w-60! ${spanStyle} animate-pulse`} />
                    <div className="flex flex-col gap-5 md:gap-3 md:flex-row">
                        <div className="flex h-37.5 w-full md:w-2/3 pr-0 md:pr-3 justify-between md:my-0 md:h-full gap-2 md:gap-3">
                            <div className="w-3/4 bg-zinc-300 dark:bg-zinc-700 rounded-lg animate-pulse" />

                            <div className="flex flex-col justify-between w-1/4 h-full md:gap-3 md:w-1/4 md:h-95">
                                <ul className="flex flex-col justify-between h-full">
                                    <li className="w-full rounded-lg h-[30%] animate-pulse bg-zinc-300 dark:bg-zinc-700" />
                                    <li className="w-full rounded-lg h-[30%] animate-pulse bg-zinc-300 dark:bg-zinc-700" />
                                    <li className="w-full rounded-lg h-[30%] animate-pulse bg-zinc-300 dark:bg-zinc-700" />
                                </ul>
                            </div>
                        </div>
                        <ul className="flex w-1/3 flex-col text-lg gap-3">
                            <li className="font-semibold flex gap-3 items-center"><span className={spanStyle} /></li>
                            <li className="font-semibold flex gap-3 items-center"><span className={spanStyle} /></li>
                            <li className="font-semibold flex gap-3 items-center"><span className={spanStyle} /></li>
                            <li className="font-semibold flex gap-3 items-center"><span className={spanStyle} /></li>
                            <li className="font-semibold flex gap-3 items-center"><span className={spanStyle} /></li>

                        </ul>
                    </div>
                    <div className="flex flex-col flex-1 gap-3">
                        <span className={`w-30! ${spanStyle}`} />
                        <div className="h-50 w-full bg-zinc-300 dark:bg-zinc-700 rounded-lg animate-pulse" />
                    </div>
                </div>
            </Main>
        </div>
    )
}