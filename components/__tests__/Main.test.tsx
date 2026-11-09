import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('../../components/Header', () => ({
    default: () => <header data-testid="header" />,
}))
vi.mock('../../components/Post', () => ({
    default: () => <article data-testid="post" />,
}))

import { Main } from '../Main'
import Home from '../../src/pages/index'

describe('Main e página inicial (caracterização)', () => {
    it('renderiza o título e os children recebidos por props', () => {
        render(
            <Main title="Título de teste">
                <p>Conteúdo recebido</p>
            </Main>,
        )

        expect(screen.getByRole('heading', { name: 'Título de teste' })).toBeTruthy()
        expect(screen.getByText('Conteúdo recebido')).toBeTruthy()
    })

    it('compõe Header, título Início e cinco Posts fixos na página inicial atual', () => {
        render(<Home />)

        expect(screen.getByTestId('header')).toBeTruthy()
        expect(screen.getByRole('heading', { name: 'Início' })).toBeTruthy()
        expect(screen.getAllByTestId('post')).toHaveLength(5)
    })
})
