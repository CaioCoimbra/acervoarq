import Link from "next/link";
import ImagePost from "./ImagesPost";
import TextPost from "./TextPost";
import TextPostBottom from "./TextPostBottom";
import TextPostTop from "./TextPostTop";
import type { FeedPost } from "../types/Post";

export default function Post({ post }: { post: FeedPost }) {
    return (
        <Link href={`/post/${post.id}`} className="block">
            <div className="hidden md:flex w-full h-95">
                <ImagePost />
                <TextPost post={post} />
            </div>
            <div className="flex flex-col gap-3 md:hidden">
                <TextPostTop nome={post?.nome} autores={post?.autores} />
                <ImagePost />
                <TextPostBottom post={post} />
            </div>
        </Link>
    )
}
