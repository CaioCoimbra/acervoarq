import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'

import Nav from '../Nav'

describe('Nav (caracterização)', () => {
    it('renderiza os três itens principais', () => {
        render(<Nav />)

        expect(screen.getByText('Início')).toBeTruthy()
        expect(screen.getByText('Projetos & Ações ▾')).toBeTruthy()
        expect(screen.getByText('Pesquisa & Análise ▾')).toBeTruthy()
    })

    it('abre o submenu no hover e fecha ao sair', () => {
        const { container } = render(<Nav />)

        fireEvent.mouseEnter(screen.getByText('Projetos & Ações ▾'))
        expect(screen.getByText('Futuros Possíveis')).toBeTruthy()
        expect(screen.getByText('Processos e Experimentos')).toBeTruthy()

        const menu = container.querySelector('nav ul > div')
        expect(menu).not.toBeNull()
        fireEvent.mouseLeave(menu!)
        expect(screen.queryByText('Futuros Possíveis')).toBeNull()
    })

    it('exibe os itens do submenu de pesquisa ao passar o mouse', () => {
        render(<Nav />)

        fireEvent.mouseEnter(screen.getByText('Pesquisa & Análise ▾'))
        expect(screen.getByText('Dados de Pesquisa')).toBeTruthy()
        expect(screen.getByText('Artigos e Textos')).toBeTruthy()
        expect(screen.getByText('Territórios e Lugares')).toBeTruthy()
    })
})
