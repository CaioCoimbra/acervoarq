import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'

import ExplorarModalDesktop from '../ExplorarModalDesktop'
import ExplorarModalMobile from '../ExplorarModalMobile'

describe('ExplorarModalDesktop (caracterização)', () => {
    it('só renderiza ativado e solicita fechamento ao sair com o mouse', () => {
        const setAtivado = vi.fn()
        const { container, rerender } = render(
            <ExplorarModalDesktop ativado={false} setAtivado={setAtivado} />,
        )

        expect(container.firstChild).toBeNull()
        rerender(<ExplorarModalDesktop ativado setAtivado={setAtivado} />)

        expect(screen.getByPlaceholderText('Buscar...')).toBeTruthy()
        expect(screen.getByText('Sugestões')).toBeTruthy()
        expect(container.querySelectorAll('ul li')).toHaveLength(3)

        fireEvent.mouseLeave(container.firstChild!)
        expect(setAtivado).toHaveBeenCalledWith(false)
    })
})

describe('ExplorarModalMobile (caracterização)', () => {
    it('só renderiza ativado e solicita fechamento ao clicar no ícone X', () => {
        const setAtivado = vi.fn()
        const { container, rerender } = render(
            <ExplorarModalMobile ativado={false} setAtivado={setAtivado} />,
        )

        expect(container.firstChild).toBeNull()
        rerender(<ExplorarModalMobile ativado setAtivado={setAtivado} />)

        expect(screen.getByRole('heading', { name: 'Explorar' })).toBeTruthy()
        expect(screen.getByPlaceholderText('Buscar...')).toBeTruthy()

        fireEvent.click(container.querySelector('span.pb-5')!)
        expect(setAtivado).toHaveBeenCalledWith(false)
    })
})
