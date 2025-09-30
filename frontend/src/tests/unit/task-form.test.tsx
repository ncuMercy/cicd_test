import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import TaskForm from '@/presentation/components/task-form'

describe('TaskForm', () => {
  const mockOnSubmit = vi.fn()
  const mockOnCancel = vi.fn()

  const defaultProps = {
    onSubmit: mockOnSubmit,
    onCancel: mockOnCancel
  }

  it('renders form fields', () => {
    render(<TaskForm {...defaultProps} />)
    
    expect(screen.getByText(/Create New Task/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Create Task/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument()
  })
})