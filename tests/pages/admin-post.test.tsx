import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'

vi.mock('../../components/Header', () => ({
    default: () => <header data-testid="header" />,
}))
vi.mock('next/image', () => ({
    default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}))

import Post from '../../src/pages/admin/post'
import TextoExplicativo from '../../components/TextoExplicativo'

describe('Formulário de novo projeto (caracterização)', () => {
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
        expect(screen.getByRole('button', { name: 'Cancelar' })).toBeTruthy()
        expect(screen.getByRole('button', { name: 'Enviar' })).toBeTruthy()
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
})
