import clsx from "clsx";

export const Divider = ({ className }: { className?: string }) => (
  <div className={clsx("h-px w-full border-b border-neutral-300", className)} />
);
