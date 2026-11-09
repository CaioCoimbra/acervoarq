import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('../../../components/Header', () => ({
    default: () => <header data-testid="header" />,
}))
vi.mock('../../../components/ImagesPost', () => ({
    default: () => <div data-testid="image-post" />,
}))

import Post from './[id]'

describe('Página de projeto (caracterização)', () => {
    it('renderiza metadados, descrição hardcoded e galeria de imagens', () => {
        render(<Post />)

        expect(screen.getByTestId('header')).toBeTruthy()
        expect(screen.getByRole('heading', { name: 'Nome do Projeto' })).toBeTruthy()
        expect(screen.getByTestId('image-post')).toBeTruthy()

        expect(screen.getByText('Autor:')).toBeTruthy()
        expect(screen.getByText('Data:')).toBeTruthy()
        expect(screen.getByText('Localização:')).toBeTruthy()
        expect(screen.getByText('Catégoria:')).toBeTruthy()
        expect(screen.getByText('Área:')).toBeTruthy()

        expect(screen.getByRole('heading', { name: 'Descrição' })).toBeTruthy()
        expect(
            screen.getByText(/A fusão entre a ancestralidade do Oriente Médio e a estética contemporânea/),
        ).toBeTruthy()
    })
})
