import { useRouter } from "next/router";
import ArchiveGrid from "../../components/ArchiveGrid";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Main from "../../components/Main";

export default function Archive() {
  const router = useRouter();
  const title = (router.query.title as string) || "Futuros Possíveis";
  const texto = (router.query.texto as string) || "Texto padrão caso não seja enviado nenhum.";

  return (
    <>
      <Header />
      <Main title={title}>
        {texto && (
          <p className="text-justify -mb-4 md:-mb-9 ">
            {texto}
          </p>
        )}
        <ArchiveGrid key={title} />
      </Main>
      <Footer />
    </>
  );
}