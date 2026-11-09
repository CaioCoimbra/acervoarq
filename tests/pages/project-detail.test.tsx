import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

const { push } = vi.hoisted(() => ({ push: vi.fn() }))

vi.mock('../../src/lib/prisma', () => ({
    prisma: { post: { findUnique: vi.fn() } },
}))
vi.mock('../../components/Header', () => ({
    default: () => <header data-testid="header" />,
}))
vi.mock('../../components/ImagesPost', () => ({
    default: ({ images }: { images: string | null }) => <div data-testid="image-post">{images}</div>,
}))
vi.mock('next/router', () => ({ useRouter: () => ({ push }) }))
vi.mock('next/link', () => ({
    default: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>,
}))

import Post, { getServerSideProps } from '../../src/pages/post/[id]'
import { prisma } from '../../src/lib/prisma'

const findUnique = prisma.post.findUnique as unknown as ReturnType<typeof vi.fn>
const imageUrl = 'https://images.example.org/casa-de-vidro.jpg'
const post = {
    id: 'casa-de-vidro',
    nome: 'Casa de Vidro',
    autores: 'Lina Bo Bardi',
    dataConclusao: '1951',
    localizacao: 'Morumbi, São Paulo, SP',
    categoria: 'Residencial',
    area: '700 m²',
    descricaoResumida: 'Residência modernista.',
    descricao: 'Descrição completa do projeto.',
    imagens: imageUrl,
}

describe('Página de projeto', () => {
    beforeEach(() => vi.clearAllMocks())
    afterEach(() => {
        vi.restoreAllMocks()
        vi.unstubAllGlobals()
    })

    it('renderiza os metadados, descrição e imagem do projeto recebido', () => {
        render(<Post post={post} />)

        expect(screen.getByTestId('header')).toBeTruthy()
        expect(screen.getByRole('heading', { name: 'Casa de Vidro' })).toBeTruthy()
        expect(screen.getByTestId('image-post').textContent).toBe(imageUrl)
        expect(screen.getByText(/Lina Bo Bardi/)).toBeTruthy()
        expect(screen.getByText(/1951/)).toBeTruthy()
        expect(screen.getByText(/Morumbi, São Paulo, SP/)).toBeTruthy()
        expect(screen.getByText(/Residencial/)).toBeTruthy()
        expect(screen.getByText(/700 m²/)).toBeTruthy()
        expect(screen.getByRole('heading', { name: 'Descrição' })).toBeTruthy()
        expect(screen.getByText('Descrição completa do projeto.')).toBeTruthy()
    })

    it('carrega um projeto pelo id da rota', async () => {
        findUnique.mockResolvedValue(post)

        const result = await getServerSideProps({ params: { id: 'casa-de-vidro' } } as never)

        expect(findUnique).toHaveBeenCalledWith(expect.objectContaining({ where: { id: 'casa-de-vidro' } }))
        expect(result).toEqual({ props: { post } })
    })

    it('retorna 404 quando o id não existe', async () => {
        findUnique.mockResolvedValue(null)

        const result = await getServerSideProps({ params: { id: 'inexistente' } } as never)

        expect(result).toEqual({ notFound: true })
    })

    it('pede confirmação antes de excluir o projeto e retorna ao feed', async () => {
        const confirm = vi.spyOn(window, 'confirm').mockReturnValue(true)
        const fetchMock = vi.fn().mockResolvedValue({ ok: true })
        vi.stubGlobal('fetch', fetchMock)
        render(<Post post={post} />)

        fireEvent.click(screen.getByRole('button', { name: 'Excluir projeto' }))

        await waitFor(() => expect(fetchMock).toHaveBeenCalledWith(
            '/api/posts/casa-de-vidro',
            expect.objectContaining({ method: 'DELETE' }),
        ))
        expect(confirm).toHaveBeenCalled()
        await waitFor(() => expect(push).toHaveBeenCalledWith('/'))
    })

    it('não exclui quando a confirmação é recusada', () => {
        vi.spyOn(window, 'confirm').mockReturnValue(false)
        const fetchMock = vi.fn()
        vi.stubGlobal('fetch', fetchMock)
        render(<Post post={post} />)

        fireEvent.click(screen.getByRole('button', { name: 'Excluir projeto' }))

        expect(fetchMock).not.toHaveBeenCalled()
    })
})
