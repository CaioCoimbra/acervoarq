import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

const { mockPush } = vi.hoisted(() => ({ mockPush: vi.fn() }))

vi.mock('../../components/Header', () => ({
    default: () => <header data-testid="header" />,
}))
vi.mock('next/router', () => ({
    useRouter: () => ({ push: mockPush }),
}))

import Login from '../../src/pages/admin/login'

describe('Login (caracterização)', () => {
    beforeEach(() => vi.clearAllMocks())
    afterEach(() => vi.unstubAllGlobals())

    it('renderiza os campos de email e senha e o botão Entrar', () => {
        const { container } = render(<Login />)

        expect(screen.getByTestId('header')).toBeTruthy()
        expect(screen.getByRole('heading', { name: 'Login' })).toBeTruthy()
        expect(screen.getByLabelText('Login').getAttribute('type')).toBe('email')
        expect(screen.getByLabelText('Senha').getAttribute('type')).toBe('password')
        expect(screen.getByLabelText('Senha').getAttribute('minlength')).toBe('8')
        expect(screen.getByRole('button', { name: 'Entrar' })).toBeTruthy()
        expect(container.querySelector('form')).not.toBeNull()
    })

    it('envia as credenciais à API e navega para o formulário ao autenticar', async () => {
        const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 })
        vi.stubGlobal('fetch', fetchMock)
        mockPush.mockResolvedValue(true)
        render(<Login />)

        fireEvent.change(screen.getByLabelText('Login'), { target: { value: 'pessoa@exemplo.com' } })
        fireEvent.change(screen.getByLabelText('Senha'), { target: { value: 'senha-segura' } })
        fireEvent.click(screen.getByRole('button', { name: 'Entrar' }))

        await waitFor(() => expect(fetchMock).toHaveBeenCalledWith('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'pessoa@exemplo.com', password: 'senha-segura' }),
        }))
        expect(mockPush).toHaveBeenCalledWith('/admin/post')
    })

    it('exibe a mensagem genérica da API em credenciais inválidas', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 401 }))
        render(<Login />)

        fireEvent.change(screen.getByLabelText('Login'), { target: { value: 'pessoa@exemplo.com' } })
        fireEvent.change(screen.getByLabelText('Senha'), { target: { value: 'senha-errada' } })
        fireEvent.click(screen.getByRole('button', { name: 'Entrar' }))

        expect((await screen.findByRole('alert')).textContent).toBe('Email ou senha inválidos.')
        expect(mockPush).not.toHaveBeenCalled()
    })
})
