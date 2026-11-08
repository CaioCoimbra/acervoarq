/* eslint-disable @next/next/no-img-element */
export default function ImagePost() {
    return (
        <div className="flex h-37.5 w-full md:w-2/3 pr-0 md:pr-3 justify-between md:my-0 md:h-full gap-2 md:gap-3">
            <div className="w-3/4">
                <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/043/789/153/small/beautiful-mosque-under-the-blue-sky-islamic-architecture-design-photo.jpg"
                    alt=""
                    className="w-full h-full rounded-lg object-cover"
                />
            </div>
            <div className="flex flex-col justify-between w-1/4 h-full md:gap-3 md:w-1/4 md:h-95">
                <ul className="flex flex-col justify-between h-full">
                    <li className="w-full  rounded-lg h-[30%]">
                        <img
                            src="https://static.vecteezy.com/system/resources/thumbnails/043/789/153/small/beautiful-mosque-under-the-blue-sky-islamic-architecture-design-photo.jpg"
                            alt=""
                            className="w-full h-full rounded-lg object-cover"
                        />
                    </li>
                    <li className="w-full rounded-lg h-[30%]">
                        <img
                            src="https://static.vecteezy.com/system/resources/thumbnails/043/789/153/small/beautiful-mosque-under-the-blue-sky-islamic-architecture-design-photo.jpg"
                            alt=""
                            className="w-full h-full rounded-lg object-cover"
                        />
                    </li>
                    <li className="w-full rounded-lg h-[30%]">
                        <img
                            src="https://static.vecteezy.com/system/resources/thumbnails/043/789/153/small/beautiful-mosque-under-the-blue-sky-islamic-architecture-design-photo.jpg"
                            alt=""
                            className="w-full h-full rounded-lg object-cover"
                        />
                    </li>
                </ul>
            </div>
        </div>
    )
}
