
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

type WaterQualityLevel = "safe" | "warning" | "danger";

const levelStyles = cva("", {
  variants: {
    level: {
      safe: "text-green-500",
      warning: "text-amber-500",
      danger: "text-red-500",
    },
  },
});

const progressStyles = cva("h-2", {
  variants: {
    level: {
      safe: "bg-green-500",
      warning: "bg-amber-500",
      danger: "bg-red-500", 
    },
  },
});

interface WaterQualityCardProps {
  title: string;
  value: number;
  unit: string;
  minValue?: number;
  maxValue?: number;
  level: WaterQualityLevel;
  icon: React.ReactNode;
  className?: string;
}

export function WaterQualityCard({
  title,
  value,
  unit,
  minValue = 0,
  maxValue = 100, 
  level,
  icon,
  className,
}: WaterQualityCardProps) {
  const progressValue = ((value - minValue) / (maxValue - minValue)) * 100;
  
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          {title}
          <span className={cn(levelStyles({ level }))}>{icon}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-1">
          {value} <span className="text-muted-foreground text-sm font-normal">{unit}</span>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
          <span>{minValue} {unit}</span>
          <span>{maxValue} {unit}</span>
        </div>
        <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
          <div 
            className={cn("h-full", progressStyles({ level }))} 
            style={{ width: `${progressValue}%` }}
          />
        </div>
        <div className="mt-1 text-xs font-medium flex justify-end">
          <span className={cn(levelStyles({ level }))}>
            {level === "safe" && "Normal Range"}
            {level === "warning" && "Needs Attention"}
            {level === "danger" && "Critical Level"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
