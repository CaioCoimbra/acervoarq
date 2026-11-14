import Link from "next/link";
import ImagePost from "./ImagesPost";
import TextPost from "./TextPost";
import TextPostBottom from "./TextPostBottom";
import TextPostTop from "./TextPostTop";

export default function Post() {
    return (
        <>
            <div className="hidden md:flex w-full h-95">
                <Link href={`/post/1`} className="cursor-pointer contents">
                    <ImagePost />
                </Link>
                <TextPost />
            </div>
            <div className="flex flex-col gap-3 md:hidden">
                <TextPostTop />
                <Link href={`/post/1`} className="cursor-pointer contents">
                    <ImagePost />
                </Link>
                <TextPostBottom />
            </div>
        </>
    )
}