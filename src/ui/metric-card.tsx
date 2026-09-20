import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: number;
  suffix?: string;
  warning?: boolean;
}

export function MetricCard({ label, value, suffix = "%", warning = false }: MetricCardProps) {
  return (
    <article className="border border-border/80 bg-card/75 p-4 backdrop-blur-sm">
      <div className="mb-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
        <span>{label}</span>
        <span className={cn("h-2 w-2 rounded-full bg-primary", warning && "bg-destructive shadow-[0_0_14px_hsl(var(--destructive))]")} />
      </div>
      <div className={cn("font-display text-4xl font-bold", warning ? "text-destructive" : "text-foreground")}>
        {value}<span className="ml-1 text-base text-muted-foreground">{suffix}</span>
      </div>
    </article>
  );
}
