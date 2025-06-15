import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { describe, expect, it } from 'vitest';

import { DateField } from '@/components/inputs/DateField';

describe('DateField', () => {
  it('renders label and input with given id', () => {
    const Wrapper = () => {
      const { register } = useForm();
      return (
        <DateField
          id="birth-date"
          label="Data de nascimento"
          register={register('birth')}
        />
      );
    };

    render(<Wrapper />);

    const input = screen.getByLabelText(
      'Data de nascimento',
    ) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.id).toBe('birth-date');
    expect(input.type).toBe('date');
  });

  it('generates a uuid id when not provided', () => {
    const Wrapper = () => {
      const { register } = useForm();
      return <DateField label="Data" register={register('date')} />;
    };

    render(<Wrapper />);
    const input = screen.getByLabelText('Data') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.id).toBeTruthy(); // UUID is dynamically generated
  });

  it('renders an error message when error is passed', () => {
    const Wrapper = () => {
      const { register } = useForm();
      return (
        <DateField
          label="Data"
          register={register('date')}
          error="Campo obrigatório"
        />
      );
    };

    render(<Wrapper />);
    expect(screen.getByText('Campo obrigatório')).toBeInTheDocument();
  });

  it('passes the max attribute to the input', () => {
    const Wrapper = () => {
      const { register } = useForm();
      return (
        <DateField label="Data" max="2025-12-31" register={register('date')} />
      );
    };

    render(<Wrapper />);
    const input = screen.getByLabelText('Data') as HTMLInputElement;
    expect(input.max).toBe('2025-12-31');
  });
});
