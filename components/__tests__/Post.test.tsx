import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('../ImagesPost', () => ({
    default: () => <div data-testid="image-post" />,
}))
vi.mock('../TextPost', () => ({
    default: () => <div data-testid="text-post" />,
}))
vi.mock('../TextPostTop', () => ({
    default: () => <div data-testid="text-post-top" />,
}))
vi.mock('../TextPostBottom', () => ({
    default: () => <div data-testid="text-post-bottom" />,
}))
vi.mock('next/link', () => ({
    default: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>,
}))

import Post from '../Post'

describe('Post (caracterização)', () => {
    it('renderiza as composições desktop e mobile com seus subcomponentes', () => {
        render(<Post post={{
            id: 'post-123',
            nome: 'Casa de Vidro',
            autores: 'Lina Bo Bardi',
            dataConclusao: '1951',
            localizacao: 'São Paulo',
            categoria: 'Residencial',
            descricaoResumida: 'Descrição',
            imagens: null,
        }} />)

        expect(screen.getByRole('link')).toHaveAttribute('href', '/post/post-123')
        expect(screen.getAllByTestId('image-post')).toHaveLength(2)
        expect(screen.getByTestId('text-post')).toBeTruthy()
        expect(screen.getByTestId('text-post-top')).toBeTruthy()
        expect(screen.getByTestId('text-post-bottom')).toBeTruthy()
    })
})
