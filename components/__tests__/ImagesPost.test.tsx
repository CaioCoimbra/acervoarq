import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'

import ImagePost from '../ImagesPost'

describe('ImagesPost (caracterização)', () => {
    it('renderiza todas as URLs cadastradas, sem repetir a imagem principal', () => {
        const urls = ['https://example.org/1.jpg', 'https://example.org/2.jpg', 'https://example.org/3.jpg', 'https://example.org/4.jpg', 'https://example.org/5.jpg']
        const { container } = render(<ImagePost images={urls.join('\n')} />)

        expect(Array.from(container.querySelectorAll('img')).map((image) => image.getAttribute('src'))).toEqual(urls)
    })

    it('usa uma única imagem como principal sem criar miniaturas duplicadas', () => {
        const { container } = render(<ImagePost images="https://example.org/1.jpg" />)

        const images = container.querySelectorAll('img')
        expect(images).toHaveLength(1)
        expect(images[0].getAttribute('src')).toBe('https://example.org/1.jpg')
    })

    it('mantém a imagem padrão quando não há imagens cadastradas', () => {
        const { container } = render(<ImagePost />)

        expect(container.querySelector('img')?.getAttribute('src')).toBe('https://static.vecteezy.com/system/resources/thumbnails/043/789/153/small/beautiful-mosque-under-the-blue-sky-islamic-architecture-design-photo.jpg')
    })
})
