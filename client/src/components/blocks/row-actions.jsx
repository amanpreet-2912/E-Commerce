import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";

export function RowActions({ actions = [] }) {
  if (!actions.length) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8 hover:text-background">
          <MoreHorizontalIcon />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {actions.map((action, index) => (
          <div key={index}>
            {action.separator && <DropdownMenuSeparator />}

            <DropdownMenuItem
            
              onClick={action.onClick}
              disabled={action.disabled}
              className={`
    focus:bg-primary-foreground
    focus:text-white
   
    hover:text-white
    ${
      action.variant === "destructive"
        ? "text-destructive hover:bg-destructive focus:bg-destructive hover:text-background "
        : "text-muted-foreground"
    }
  `}
            >
              {action.label}
            </DropdownMenuItem>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
