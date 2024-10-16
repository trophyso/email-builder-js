import React, { CSSProperties } from 'react';
import { z } from 'zod';

const COLOR_SCHEMA = z
  .string()
  .regex(/^#[0-9a-fA-F]{6}$/)
  .nullable()
  .optional();

const PADDING_SCHEMA = z
  .object({
    top: z.number(),
    bottom: z.number(),
    right: z.number(),
    left: z.number(),
  })
  .optional()
  .nullable();

const FIXED_WIDTHS_SCHEMA = z
  .array(z.union([z.number(), z.string()]).nullish())
  .optional()
  .nullable();

const getPadding = (padding: z.infer<typeof PADDING_SCHEMA>) =>
  padding ? `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px` : undefined;

export const ColumnsContainerPropsSchema = z.object({
  style: z
    .object({
      backgroundColor: COLOR_SCHEMA,
      padding: PADDING_SCHEMA,
    })
    .optional()
    .nullable(),
  props: z
    .object({
      fixedWidths: FIXED_WIDTHS_SCHEMA,
      columnsGap: z.number().optional().nullable(),
      contentAlignment: z.enum(['top', 'middle', 'bottom']).optional().nullable(),
    })
    .optional()
    .nullable(),
});

type TColumn = JSX.Element | JSX.Element[] | null;
export type ColumnsContainerProps = z.infer<typeof ColumnsContainerPropsSchema> & {
  columns?: TColumn[];
};

const ColumnsContainerPropsDefaults = {
  columnsGap: 0,
  contentAlignment: 'middle',
} as const;

export function ColumnsContainer({ style, columns, props }: ColumnsContainerProps) {
  const wStyle: CSSProperties = {
    backgroundColor: style?.backgroundColor ?? undefined,
    padding: getPadding(style?.padding),
  };

  const blockProps = {
    columnsGap: props?.columnsGap ?? ColumnsContainerPropsDefaults.columnsGap,
    contentAlignment: props?.contentAlignment ?? ColumnsContainerPropsDefaults.contentAlignment,
    fixedWidths: props?.fixedWidths,
  };

  return (
    <div style={wStyle}>
      <table
        align="center"
        width="100%"
        cellPadding="0"
        border={0}
        style={{ tableLayout: 'fixed', borderCollapse: 'collapse' }}
      >
        <tbody style={{ width: '100%' }}>
          <tr style={{ width: '100%' }}>
            {columns?.map((column, index) => (
              <TableCell key={index} index={index} props={blockProps} columns={columns} />
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

type Props = {
  props: {
    fixedWidths: z.infer<typeof FIXED_WIDTHS_SCHEMA>;
    columnsGap: number;
    contentAlignment: 'top' | 'middle' | 'bottom';
  };
  index: number;
  columns?: TColumn[];
};
function TableCell({ index, props, columns }: Props) {
  const contentAlignment = props?.contentAlignment ?? ColumnsContainerPropsDefaults.contentAlignment;

  const style: CSSProperties = {
    boxSizing: 'content-box',
    verticalAlign: contentAlignment,
    paddingLeft: getPaddingBefore(index, columns, props),
    paddingRight: getPaddingAfter(index, columns, props),
    width: props.fixedWidths?.[index] ?? undefined,
  };
  const children = (columns && columns[index]) ?? null;
  return <td style={style}>{children}</td>;
}

function getPaddingBefore(index: number, columns: Props['columns'], { columnsGap }: Props['props']) {
  if (index === 0) {
    return 0;
  }
  return columnsGap / 3;
}

function getPaddingAfter(index: number, columns: Props['columns'], { columnsGap }: Props['props']) {
  if (index === (columns?.length || 0) - 1) {
    return 0;
  }
  return columnsGap / 3;
}
