import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('../../src/lib/prisma', () => ({
    prisma: { post: { findMany: vi.fn(), count: vi.fn() } },
}))
vi.mock('../../components/Header', () => ({
    default: () => <header data-testid="header" />,
}))
vi.mock('../../components/Post', () => ({
    default: ({ post }: { post: { nome: string } }) => <article data-testid="post">{post.nome}</article>,
}))

import { Main } from '../Main'
import Home, { getServerSideProps } from '../../src/pages/index'
import { prisma } from '../../src/lib/prisma'

const postModel = prisma.post as unknown as {
    findMany: ReturnType<typeof vi.fn>
    count: ReturnType<typeof vi.fn>
}

function makePost(id: string) {
    return {
        id,
        nome: `Projeto ${id}`,
        autores: 'Equipe de Arquitetura',
        dataConclusao: '2020',
        localizacao: 'São Luís, MA',
        categoria: 'Cultural',
        descricaoResumida: 'Descrição resumida',
        imagens: null,
    }
}

describe('Main e página inicial (caracterização)', () => {
    beforeEach(() => vi.clearAllMocks())

    it('renderiza o título e os children recebidos por props', () => {
        render(
            <Main title="Título de teste">
                <p>Conteúdo recebido</p>
            </Main>,
        )

        expect(screen.getByRole('heading', { name: 'Título de teste' })).toBeTruthy()
        expect(screen.getByText('Conteúdo recebido')).toBeTruthy()
    })

    it('compõe Header e título Início com os projetos recebidos', () => {
        render(<Home posts={[makePost('1'), makePost('2')]} page={1} totalPages={1} />)

        expect(screen.getByTestId('header')).toBeTruthy()
        expect(screen.getByRole('heading', { name: 'Início' })).toBeTruthy()
        expect(screen.getAllByTestId('post')).toHaveLength(2)
        expect(screen.getByText('Projeto 1')).toBeTruthy()
        expect(screen.getByText('Projeto 2')).toBeTruthy()
    })

    it('busca dez projetos da página requisitada e informa os limites da paginação', async () => {
        const posts = Array.from({ length: 10 }, (_, index) => makePost(String(index + 11)))
        postModel.count.mockResolvedValue(12)
        postModel.findMany.mockResolvedValue(posts)

        const result = await getServerSideProps({ query: { page: '2' } } as never)

        expect(postModel.findMany).toHaveBeenCalledWith(expect.objectContaining({ skip: 10, take: 10 }))
        expect(result).toEqual({
            props: { posts, page: 2, totalPages: 2 },
        })
    })

    it('limita uma página solicitada acima do total à última página existente', async () => {
        postModel.count.mockResolvedValue(12)
        postModel.findMany.mockResolvedValue([makePost('11'), makePost('12')])

        const result = await getServerSideProps({ query: { page: '99' } } as never)

        expect(postModel.findMany).toHaveBeenCalledWith(expect.objectContaining({ skip: 10, take: 10 }))
        expect(result).toEqual({
            props: { posts: [makePost('11'), makePost('12')], page: 2, totalPages: 2 },
        })
    })

    it('limita a página ao intervalo válido e esconde navegação nos extremos', () => {
        render(<Home posts={[makePost('1')]} page={1} totalPages={2} />)

        expect(screen.queryByRole('link', { name: 'Anterior' })).toBeNull()
        expect(screen.getByRole('link', { name: 'Próxima' })).toHaveAttribute('href', '/?page=2')
    })

    it('não oferece próxima página quando os resultados acabam', () => {
        render(<Home posts={[makePost('11')]} page={2} totalPages={2} />)

        expect(screen.getByRole('link', { name: 'Anterior' })).toHaveAttribute('href', '/')
        expect(screen.queryByRole('link', { name: 'Próxima' })).toBeNull()
    })
})
