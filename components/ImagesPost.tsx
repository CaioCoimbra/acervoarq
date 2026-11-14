import { useState } from "react"

/* eslint-disable @next/next/no-img-element */
export default function ImagePost() {

    const [selectedImage, setSelectedImage] = useState(null)

    const imageUrl = "https://static.vecteezy.com/system/resources/thumbnails/043/789/153/small/beautiful-mosque-under-the-blue-sky-islamic-architecture-design-photo.jpg"

    return (
        <>
            <div className="flex h-37.5 w-full md:w-2/3 pr-0 md:pr-3 justify-between md:my-0 md:h-full gap-2 md:gap-3">
                <div className="w-3/4 cursor-pointer" onClick={() => setSelectedImage(imageUrl)}>
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
                        <li className="relative w-full rounded-lg h-[30%] z-0 isolate">
                            <img
                                src="https://static.vecteezy.com/system/resources/thumbnails/043/789/153/small/beautiful-mosque-under-the-blue-sky-islamic-architecture-design-photo.jpg"
                                alt=""
                                className="w-full h-full rounded-lg object-cover opacity-50"
                            />
                            <span className="absolute w-full h-full flex justify-center items-center font-extrabold text-2xl md:text-6xl opacity-100 inset-0 text-white pointer-events-none">+8</span>
                        </li>
                    </ul>
                </div>
            </div>

            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm cursor-zoom-out"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-5xl max-h-[90vh] w-full flex items-center justify-center">
                        <img
                            src={selectedImage}
                            alt="Expanded view"
                            className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl animate-in fade-in zoom-in-95 duration-200"
                        />
                    </div>
                </div>
            )}
        </>
    )
}
