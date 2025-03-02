import { CopyX, Pencil, X } from 'lucide-react';
import { ReactNode } from 'react';

import { MessagesResource } from '@/i18n/resources';

interface TableActionsProps {
  row: unknown;
  updateAction?: (row: unknown) => void;
  deleteAction?: (row: unknown) => void;
  cancelAction?: (row: unknown) => void;
  customActions?: {
    action: (row: unknown) => void;
    title: string;
    color?: string;
    icon: ReactNode;
  }[];
}

export const TableActions = ({
  row,
  updateAction = undefined,
  deleteAction = undefined,
  cancelAction = undefined,
  customActions = [],
}: TableActionsProps) => {
  return (
    <div className="flex w-full gap-3">
      {updateAction && (
        <button
          type="button"
          onClick={() => updateAction(row)}
          title={MessagesResource.EDIT}
        >
          <Pencil className="w-5 h-5" />
        </button>
      )}
      {deleteAction && (
        <button
          type="button"
          onClick={() => deleteAction(row)}
          title={MessagesResource.DELETE}
        >
          <X className="w-5 h-5" color="#b30000" />
        </button>
      )}
      {cancelAction && (
        <button
          type="button"
          onClick={() => cancelAction(row)}
          title={MessagesResource.CANCEL}
        >
          <CopyX className="w-5 h-5" color="#b30000" />
        </button>
      )}
      {customActions.map(
        (item, idx) =>
          item.action && (
            <button
              key={idx.toString()}
              type="button"
              onClick={() => item.action(row)}
              title={item.title}
            >
              {item.icon}
            </button>
          ),
      )}
    </div>
  );
};
