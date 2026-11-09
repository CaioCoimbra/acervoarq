import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'

vi.mock('next/link', () => ({
    default: ({ href, children }: { href: string; children: ReactNode }) => (
        <a href={href}>{children}</a>
    ),
}))
vi.mock('next/image', () => ({
    default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}))
vi.mock('../ExplorarModalMobile', () => ({
    default: ({ ativado }: { ativado: boolean }) => (
        <div data-testid="modal-mobile" data-ativado={String(ativado)} />
    ),
}))
vi.mock('../ExplorarModalDesktop', () => ({
    default: ({ ativado }: { ativado: boolean }) => (
        <div data-testid="modal-desktop" data-ativado={String(ativado)} />
    ),
}))

import Header from '../Header'
import HeaderSearch from '../HeaderSearch'

describe('Header (caracterização)', () => {
    it('renderiza a logo e os itens atuais de navegação', () => {
        render(<Header />)

        const logo = screen.getByAltText('Mom Edições')
        expect(logo.getAttribute('src')).toBe('/momedicoes.png')
        expect(logo.closest('a')?.getAttribute('href')).toBe('/')
        expect(screen.getByText('Início')).toBeTruthy()
        expect(screen.getByText('Projetos & Ações ▾')).toBeTruthy()
        expect(screen.getByText('Pesquisa & Análise ▾')).toBeTruthy()
    })

    it('exibe os dois botões de busca e alterna os modais conforme o botão', () => {
        const { container } = render(<HeaderSearch />)
        const buttons = container.querySelectorAll('button')

        expect(buttons).toHaveLength(2)
        expect(screen.getByTestId('modal-mobile').getAttribute('data-ativado')).toBe('false')
        expect(screen.getByTestId('modal-desktop').getAttribute('data-ativado')).toBe('false')

        fireEvent.click(buttons[0])
        expect(screen.getByTestId('modal-desktop').getAttribute('data-ativado')).toBe('true')
        fireEvent.click(buttons[0])
        expect(screen.getByTestId('modal-desktop').getAttribute('data-ativado')).toBe('false')

        fireEvent.click(buttons[1])
        expect(screen.getByTestId('modal-mobile').getAttribute('data-ativado')).toBe('true')
    })
})
