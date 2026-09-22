import { Badge } from "@/components/ui/badge";

type Props = { available: boolean };

export const ProductStatus = ({ available }: Props) => {
  return (
    <Badge
      className={`shrink-0 rounded-full border-0 px-2 py-0.5 text-xs font-medium ${
        available ? "bg-green-600/10 text-green-600" : "bg-red-600/10 text-red-600"
      }`}
    >
      {available ? "Dostępny" : "Niedostępny"}
    </Badge>
  );
};
