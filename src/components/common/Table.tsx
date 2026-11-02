import React from 'react';
import { cn } from '../../lib/utils';

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  containerClassName?: string;
}

export const Table: React.FC<TableProps> = ({
  className,
  containerClassName,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'w-full overflow-x-auto rounded-2xl border border-border bg-surface',
        containerClassName
      )}
    >
      <table className={cn('w-full text-left text-xs border-collapse', className)} {...props}>
        {children}
      </table>
    </div>
  );
};

export const TableHeader: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  className,
  children,
  ...props
}) => (
  <thead
    className={cn('bg-surface-muted/60 text-primary uppercase font-heading font-bold text-[11px] tracking-wider border-b border-border', className)}
    {...props}
  >
    {children}
  </thead>
);

export const TableBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  className,
  children,
  ...props
}) => <tbody className={cn('divide-y divide-border/60 text-text', className)} {...props}>{children}</tbody>;

export const TableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({
  className,
  children,
  ...props
}) => (
  <tr className={cn('hover:bg-surface-muted/30 transition-colors', className)} {...props}>
    {children}
  </tr>
);

export const TableHead: React.FC<React.ThHTMLAttributes<HTMLTableCellElement>> = ({
  className,
  children,
  ...props
}) => (
  <th className={cn('px-4 py-3.5 font-semibold text-primary select-none', className)} {...props}>
    {children}
  </th>
);

export const TableCell: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({
  className,
  children,
  ...props
}) => (
  <td className={cn('px-4 py-3.5 align-middle', className)} {...props}>
    {children}
  </td>
);

