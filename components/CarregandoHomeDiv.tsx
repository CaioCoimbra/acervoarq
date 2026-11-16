export default function CarregandoHomeDiv() {
    const spanStyle = "h-6 w-full bg-zinc-300 dark:bg-zinc-700 rounded-full animate-pulse"

    return (
        <>
            <span className={`h-0! w-30! ${spanStyle}`} />
            <div className="hidden md:flex flex-col gap-5 md:gap-3 -my-5 md:-my-12">
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
                    <div className="flex flex-col justify-between w-1/3 gap-3">
                        <span className={`h-7! w-50! ${spanStyle}`} />
                        <span className={`h-4! w-30! ${spanStyle}`} />
                        <div className="flex flex-1 w-full bg-zinc-300 dark:bg-zinc-700 rounded-lg animate-pulse" />
                        <div className="flex h-6 gap-2">
                            <span className={`h-5 w-30! ${spanStyle}`} />
                            <span className={`h-5 w-30! ${spanStyle}`} />
                            <span className={`h-5 w-30! ${spanStyle}`} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex md:hidden flex-col gap-3 md:gap-3 -my-5 md:-my-12">
                <span className={`h-7! w-50! ${spanStyle}`} />
                <span className={`h-4! w-30! ${spanStyle}`} />
                <div className="flex flex-col md:gap-3 md:flex-row">
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
                </div>
                <div className="flex flex-col justify-between gap-3">
                    <div className="flex h-6 gap-2">
                        <span className={`h-5 w-30! ${spanStyle}`} />
                        <span className={`h-5 w-30! ${spanStyle}`} />
                        <span className={`h-5 w-30! ${spanStyle}`} />
                    </div>
                    <div className="flex h-30 w-full bg-zinc-300 dark:bg-zinc-700 rounded-lg animate-pulse" />
                </div>
            </div>
        </>
    )
}