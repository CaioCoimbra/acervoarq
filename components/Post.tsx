import ImagePost from "./ImagesPost";
import TextPost from "./TextPost";
import TextPostBottom from "./TextPostBottom";
import TextPostTop from "./TextPostTop";

export default function Post() {
    return (
        <>
            <div className="hidden md:flex w-full h-95">
                <ImagePost />
                <TextPost />
            </div>
            <div className="flex flex-col gap-3 md:hidden">
                <TextPostTop />
                <ImagePost />
                <TextPostBottom />
            </div>
        </>
    )
}