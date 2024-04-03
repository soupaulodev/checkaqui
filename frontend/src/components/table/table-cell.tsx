import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface TableCellProps extends ComponentProps<'td'> {}

export function TableCell(props: TableCellProps) {
  return(
    <td {...props} className={twMerge ("py-3 px-4 text-sm text-zinc-300", props.className)} />
  )
}
{/* O {...props} tem que vir antes do className, se não o props.className substitui o className */}