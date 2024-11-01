import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface TooltipProps {
  content: string;
}

export function TooltipDemo({ content }: TooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild className="cursor-pointer">
          <Info width={18} />
        </TooltipTrigger>
        <TooltipContent >
          <p className="text-[12px] ">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
