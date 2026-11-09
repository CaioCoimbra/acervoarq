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

import Post from '../Post'

describe('Post (caracterização)', () => {
    it('renderiza as composições desktop e mobile com seus subcomponentes', () => {
        render(<Post />)

        expect(screen.getAllByTestId('image-post')).toHaveLength(2)
        expect(screen.getByTestId('text-post')).toBeTruthy()
        expect(screen.getByTestId('text-post-top')).toBeTruthy()
        expect(screen.getByTestId('text-post-bottom')).toBeTruthy()
    })
})
