import { cn } from "cn";

type Props = React.ComponentProps<"div">;

export const Skeleton = ({ className, ...props }: Props) => (
  <div
    aria-hidden="true"
    className={cn(
      "relative overflow-hidden rounded-md bg-neutral-200/70 before:absolute before:inset-0 before:animate-[shimmer_1.6s_linear_infinite] before:bg-linear-to-r before:from-transparent before:via-white/70 before:to-transparent before:content-[''] motion-reduce:before:animate-none",
      className,
    )}
    {...props}
  />
);
