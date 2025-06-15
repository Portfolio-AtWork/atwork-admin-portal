import { ReactNode } from 'react';

type PageHeaderProps = {
  title: string;
  children?: ReactNode;
};

export const PageHeader = ({ title, children }: PageHeaderProps) => {
  return (
    <div
      className="flex justify-between items-center mb-6"
      data-testid="page-header"
    >
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="flex gap-2">{children}</div>
    </div>
  );
};
