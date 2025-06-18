import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { describe, expect, it } from 'vitest';

import { TextField } from '@/components/inputs/TextField';

describe('TextField', () => {
  it('renders the label and input correctly', () => {
    const Wrapper = () => {
      const { register } = useForm();
      return (
        <TextField
          label="Nome"
          placeholder="Digite seu nome"
          register={register('name')}
        />
      );
    };

    render(<Wrapper />);

    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite seu nome')).toBeInTheDocument();
  });

  it('shows an error message when error is provided', () => {
    const Wrapper = () => {
      const { register } = useForm();
      return (
        <TextField
          label="Email"
          register={register('email')}
          error="Campo obrigatório"
        />
      );
    };

    render(<Wrapper />);

    expect(screen.getByText('Campo obrigatório')).toBeInTheDocument();
  });

  it('defaults to type="text" when no type is provided', () => {
    const Wrapper = () => {
      const { register } = useForm();
      return <TextField label="Login" register={register('login')} />;
    };

    render(<Wrapper />);
    const input = screen.getByLabelText('Login') as HTMLInputElement;
    expect(input.type).toBe('text');
  });

  it('supports other input types like password or email', () => {
    const Wrapper = () => {
      const { register } = useForm();
      return (
        <TextField label="Senha" type="password" register={register('senha')} />
      );
    };

    render(<Wrapper />);
    const input = screen.getByLabelText('Senha') as HTMLInputElement;
    expect(input.type).toBe('password');
  });
});
