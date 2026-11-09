import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

const { push } = vi.hoisted(() => ({ push: vi.fn() }))

vi.mock('../../components/Header', () => ({
    default: () => <header data-testid="header" />,
}))
vi.mock('next/image', () => ({
    default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}))
vi.mock('next/router', () => ({ useRouter: () => ({ push }) }))
vi.mock('next/link', () => ({
    default: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>,
}))

import Post from '../../src/pages/admin/post'
import TextoExplicativo from '../../components/TextoExplicativo'

describe('Formulário de novo projeto (caracterização)', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })
    afterEach(() => vi.unstubAllGlobals())

    it('renderiza os campos, a área explicativa e os botões atuais', () => {
        render(<Post />)

        expect(screen.getByTestId('header')).toBeTruthy()
        expect(screen.getByRole('heading', { name: 'Novo Projeto' })).toBeTruthy()
        expect(screen.getByPlaceholderText('Ex: UNDB')).toBeTruthy()
        expect(screen.getByPlaceholderText('Dê os devidos créditos')).toBeTruthy()
        expect(screen.getByPlaceholderText('Data de Conclusão')).toBeTruthy()
        expect(screen.getByPlaceholderText('Ex: Av. Coronel Colares Moreira, 443A - Jardim Renascença, São Luís - MA')).toBeTruthy()
        expect(screen.getByPlaceholderText('Ex: Universidade')).toBeTruthy()
        expect(screen.getByText('Descrição Resumida')).toBeTruthy()
        expect(screen.getByPlaceholderText('Fale mais sobre o projeto...')).toBeTruthy()
        expect(screen.getByText('Texto Explicativo')).toBeTruthy()
        expect(screen.getByRole('link', { name: 'Cancelar' })).toHaveAttribute('href', '/')
        expect(screen.getByRole('button', { name: 'Enviar' })).toBeTruthy()
        expect(screen.getByPlaceholderText('Área construída (opcional)')).toBeTruthy()
        expect(screen.getByPlaceholderText('URL da imagem (opcional)')).toBeTruthy()
        expect(screen.getByPlaceholderText('Descrição completa do projeto...')).toBeTruthy()
        expect(screen.getByPlaceholderText('Ex: UNDB')).toHaveAttribute('required')
        expect(screen.getByPlaceholderText('Fale mais sobre o projeto...')).toHaveAttribute('required')
    })

    it('mantém a explicação aberta inicialmente e permite ocultá-la e reabri-la', () => {
        const { container } = render(<Post />)
        const explanation = screen.getByText(/Esse texto serve como a apresentação principal/)
        const tooltip = explanation.closest('.relative')
        const closeButton = container.querySelector('span.text-xl.cursor-pointer')

        expect(tooltip?.className).toContain('flex')
        fireEvent.click(closeButton!)
        expect(tooltip?.className).toContain('hidden')

        fireEvent.click(screen.getAllByText('?')[0])
        expect(tooltip?.className).toContain('flex')
    })

    it('renderiza o editor explicativo como área editável com opção de inserir imagem', () => {
        const { container } = render(<TextoExplicativo />)

        expect(screen.getByText('Inserir Imagem')).toBeTruthy()
        expect(container.querySelector('[contenteditable="true"]')).not.toBeNull()
        expect(container.querySelector('input[type="file"][accept="image/*"]')).not.toBeNull()
    })

    it('envia os campos do projeto e redireciona para o detalhe criado', async () => {
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ post: { id: 'post-created' } }),
        })
        vi.stubGlobal('fetch', fetchMock)
        render(<Post />)

        fireEvent.change(screen.getByPlaceholderText('Ex: UNDB'), { target: { value: 'Casa de Vidro' } })
        fireEvent.change(screen.getByPlaceholderText('Dê os devidos créditos'), { target: { value: 'Lina Bo Bardi' } })
        fireEvent.change(screen.getByPlaceholderText('Data de Conclusão'), { target: { value: '1951' } })
        fireEvent.change(screen.getByPlaceholderText('Ex: Av. Coronel Colares Moreira, 443A - Jardim Renascença, São Luís - MA'), { target: { value: 'Morumbi' } })
        fireEvent.change(screen.getByPlaceholderText('Ex: Universidade'), { target: { value: 'Residencial' } })
        fireEvent.change(screen.getByPlaceholderText('Área construída (opcional)'), { target: { value: '700 m²' } })
        fireEvent.change(screen.getByPlaceholderText('URL da imagem (opcional)'), { target: { value: 'https://images.example.org/casa.jpg' } })
        fireEvent.change(screen.getByPlaceholderText('Fale mais sobre o projeto...'), { target: { value: 'Residência modernista.' } })
        fireEvent.change(screen.getByPlaceholderText('Descrição completa do projeto...'), { target: { value: 'Descrição longa.' } })
        fireEvent.click(screen.getByRole('button', { name: 'Enviar' }))

        await waitFor(() => expect(push).toHaveBeenCalledWith('/post/post-created'))
        expect(fetchMock).toHaveBeenCalledWith('/api/posts', expect.objectContaining({
            method: 'POST',
            body: JSON.stringify({
                nome: 'Casa de Vidro',
                autores: 'Lina Bo Bardi',
                dataConclusao: '1951',
                localizacao: 'Morumbi',
                categoria: 'Residencial',
                area: '700 m²',
                imagens: 'https://images.example.org/casa.jpg',
                descricaoResumida: 'Residência modernista.',
                descricao: 'Descrição longa.',
            }),
        }))
    })

    it('exibe erros de validação da API', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: false,
            json: async () => ({ error: 'Nome e descrição resumida são obrigatórios.' }),
        }))
        render(<Post />)
        fireEvent.change(screen.getByPlaceholderText('Ex: UNDB'), { target: { value: 'Casa de Vidro' } })
        fireEvent.change(screen.getByPlaceholderText('Fale mais sobre o projeto...'), { target: { value: 'Descrição curta' } })
        fireEvent.click(screen.getByRole('button', { name: 'Enviar' }))

        expect(await screen.findByRole('alert')).toHaveTextContent('Nome e descrição resumida são obrigatórios.')
    })
})
