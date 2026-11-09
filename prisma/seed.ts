import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
});
const prisma = new PrismaClient({ adapter });

const seedUserId = "seed-acervoarq-user";
const posts = [
  {
    id: "seed-casa-de-vidro",
    nome: "Casa de Vidro",
    autores: "Lina Bo Bardi",
    dataConclusao: "1951",
    localizacao: "Morumbi, São Paulo, SP",
    categoria: "Residencial",
    area: "700 m²",
    descricaoResumida: "Residência modernista suspensa entre a vegetação do Morumbi.",
    descricao:
      "Projetada para Lina Bo Bardi e Pietro Maria Bardi, a Casa de Vidro se apoia em pilotis e integra a paisagem por meio de grandes panos de vidro. O projeto combina estrutura leve, espaços contínuos e a presença da vegetação nativa.",
    imagens: "https://commons.wikimedia.org/wiki/Special:FilePath/Architecture_building_.jpg",
  },
  {
    id: "seed-mesquita-das-perolas",
    nome: "Mesquita das Pérolas",
    autores: "Desconhecido",
    dataConclusao: "1654",
    localizacao: "Forte de Agra, Agra, Índia",
    categoria: "Religiosa",
    area: "Não informada",
    descricaoResumida: "Mesquita de mármore branco construída no complexo do Forte de Agra.",
    descricao:
      "Conhecida como Moti Masjid, a Mesquita das Pérolas foi construída durante o reinado de Shah Jahan. O edifício de mármore branco organiza seus espaços em torno de um pátio e é um exemplo da arquitetura mogol do século XVII.",
    imagens: "https://commons.wikimedia.org/wiki/Special:FilePath/Pearl_Mosque.jpg",
  },
  {
    id: "seed-mesquita-kuraby",
    nome: "Mesquita de Kuraby",
    autores: "Desconhecido",
    dataConclusao: "1990",
    localizacao: "Kuraby, Brisbane, Austrália",
    categoria: "Religiosa",
    area: "Não informada",
    descricaoResumida: "Mesquita comunitária que atende a comunidade muçulmana de Brisbane.",
    descricao:
      "A Mesquita de Kuraby é um espaço de culto e convivência comunitária no subúrbio de Brisbane. Seu conjunto inclui salas de oração e áreas de apoio, refletindo a expansão de instituições religiosas e culturais na região.",
    imagens: "https://commons.wikimedia.org/wiki/Special:FilePath/Kuraby_Mosque,_Brisbane.jpg",
  },
];

async function main(): Promise<void> {
  await prisma.user.upsert({
    where: { id: seedUserId },
    update: {},
    create: {
      id: seedUserId,
      email: "seed@acervoarq.local",
      passwordHash: "not-a-login-account",
    },
  });

  for (const post of posts) {
    await prisma.post.upsert({
      where: { id: post.id },
      update: post,
      create: { ...post, authorId: seedUserId },
    });
  }

  const seededPosts = await prisma.post.findMany({
    where: { id: { in: posts.map(({ id }) => id) } },
  });
  console.log(`Seed concluído: Prisma retornou ${seededPosts.length} posts.`);
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => prisma.$disconnect());
