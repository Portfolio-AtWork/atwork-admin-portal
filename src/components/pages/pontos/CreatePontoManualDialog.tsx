import { CalendarPlus } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { MessagesResource } from '@/i18n/resources';
import { CreatePontoManualCommand } from '@/services/types/ponto';

interface CreatePontoManualDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<CreatePontoManualCommand, 'ID_Funcionario'>) => void;
  isPending: boolean;
}

type CreatePontoManualForm = {
  DT_Ponto: string; // datetime-local retorna string
};

function parseDateTimeLocalAsSaoPaulo(dateTimeLocalStr: string): Date {
  // Parse a string 'yyyy-MM-ddTHH:mm' para Date no fuso local (browser)
  const localDate = new Date(dateTimeLocalStr);

  // Cria objeto Intl.DateTimeFormat para São Paulo
  const saoPauloTZ = 'America/Sao_Paulo';
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: saoPauloTZ,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  // Extrai as partes formatadas em SP para pegar o offset
  const parts = formatter.formatToParts(localDate);
  const spYear = parts.find((p) => p.type === 'year')?.value ?? '0';
  const spMonth = parts.find((p) => p.type === 'month')?.value ?? '01';
  const spDay = parts.find((p) => p.type === 'day')?.value ?? '01';
  const spHour = parts.find((p) => p.type === 'hour')?.value ?? '00';
  const spMinute = parts.find((p) => p.type === 'minute')?.value ?? '00';
  const spSecond = parts.find((p) => p.type === 'second')?.value ?? '00';

  // Cria Date para SP sem timezone (assume local)
  const spDate = new Date(
    `${spYear}-${spMonth}-${spDay}T${spHour}:${spMinute}:${spSecond}.000`,
  );

  // Calcula diferença de tempo entre localDate e spDate para ajustar UTC
  const offsetMs = localDate.getTime() - spDate.getTime();

  // Corrige o valor somando essa diferença para obter o UTC correto
  return new Date(localDate.getTime() - offsetMs);
}

export const CreatePontoManualDialog = ({
  open,
  onOpenChange,
  onSubmit,
  isPending,
}: CreatePontoManualDialogProps) => {
  const { register, handleSubmit } = useForm<CreatePontoManualForm>();

  const handleFormSubmit = (data: CreatePontoManualForm) => {
    // Interpreta a data como estando no fuso horário de São Paulo
    const dateUtc = parseDateTimeLocalAsSaoPaulo(data.DT_Ponto);
    onSubmit({ DT_Ponto: dateUtc });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <CalendarPlus className="mr-2" />
          {MessagesResource.CREATE_PONTO}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{MessagesResource.NEW_PONTO}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="datetime-local"
              {...register('DT_Ponto', { required: true })}
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? MessagesResource.SAVING : MessagesResource.SAVE}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
