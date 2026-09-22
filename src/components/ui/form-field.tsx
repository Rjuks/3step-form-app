import type { ReactNode } from "react";

type FieldMeta = {
  isDirty: boolean;
  errors: ReadonlyArray<string | undefined>;
};

export const visibleFieldError = (showAllErrors: boolean, meta: FieldMeta) =>
  showAllErrors || meta.isDirty ? meta.errors[0] : undefined;

type Props = {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
};

export const FormField = ({ id, label, error, children }: Props) => {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
};
