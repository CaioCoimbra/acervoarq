import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'

vi.mock('../../components/Header', () => ({
    default: () => <header data-testid="header" />,
}))

import Login from '../../src/pages/admin/login'

describe('Login (caracterização)', () => {
    it('renderiza os campos de email e senha e o botão Entrar', () => {
        const { container } = render(<Login />)

        expect(screen.getByTestId('header')).toBeTruthy()
        expect(screen.getByRole('heading', { name: 'Login' })).toBeTruthy()
        expect(container.querySelector('input[type="email"]')).not.toBeNull()
        expect(container.querySelector('input[type="password"]')).not.toBeNull()
        expect(screen.getByRole('button', { name: 'Entrar' })).toBeTruthy()
        expect(container.querySelector('form')).toBeNull()
    })

    it('mantém os valores dos campos após clicar em Entrar', () => {
        const { container } = render(<Login />)
        const email = container.querySelector<HTMLInputElement>('input[type="email"]')!
        const password = container.querySelector<HTMLInputElement>('input[type="password"]')!

        fireEvent.change(email, { target: { value: 'pessoa@exemplo.com' } })
        fireEvent.change(password, { target: { value: 'senha' } })
        fireEvent.click(screen.getByRole('button', { name: 'Entrar' }))

        expect(email.value).toBe('pessoa@exemplo.com')
        expect(password.value).toBe('senha')
    })
})
