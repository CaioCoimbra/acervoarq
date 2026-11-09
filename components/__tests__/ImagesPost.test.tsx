import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'

import ImagePost from '@/components/ImagesPost'

// A.3 — Caracterização de components/ImagesPost.tsx
//
// Comportamento ATUAL (sem modificar o código):
// - O componente não recebe props e renderiza um layout de galeria:
//   1 imagem grande (75% da largura) + lista de 3 miniaturas (25%).
// - Todas as 4 tags <img> usam a MESMA URL hardcoded (imagem de mesquita
//   do Vecteezy) — é placeholder repetido, não um array de imagens distintas.
// - Usa <img> nativo (eslint-disable @next/next/no-img-element), não next/image.
// - Todos os atributos alt são strings vazias.
describe('ImagesPost (caracterização)', () => {
    it('renderiza 4 imagens: 1 principal + 3 miniaturas', () => {
        const { container } = render(<ImagePost />)

        const images = Array.from(container.querySelectorAll('img'))
        expect(images).toHaveLength(4)

        const thumbnails = container.querySelectorAll('ul img')
        expect(thumbnails).toHaveLength(3)
        expect(images.filter((image) => !image.closest('ul'))).toHaveLength(1)
    })

    it('usa a mesma URL hardcoded em todas as imagens', () => {
        const { container } = render(<ImagePost />)

        const expectedSrc =
            'https://static.vecteezy.com/system/resources/thumbnails/043/789/153/small/beautiful-mosque-under-the-blue-sky-islamic-architecture-design-photo.jpg'

        const images = container.querySelectorAll('img')
        for (const img of images) {
            expect(img.getAttribute('src')).toBe(expectedSrc)
        }
    })

    it('todas as imagens têm alt vazio (comportamento atual)', () => {
        const { container } = render(<ImagePost />)

        const images = container.querySelectorAll('img')
        for (const img of images) {
            expect(img.getAttribute('alt')).toBe('')
        }
    })
})
