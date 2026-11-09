import Header from "../../components/Header";
import { Main } from "../../components/Main";
import Post from "../../components/Post";

export default function Home() {
  return (
    <>
      <Header />
      <Main title="Início">
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </Main>
    </>
  );
}
