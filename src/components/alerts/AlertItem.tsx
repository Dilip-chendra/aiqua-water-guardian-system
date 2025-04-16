
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AlertCircleIcon, BellIcon, CheckCircleIcon, InfoIcon } from "lucide-react";

type AlertSeverity = "info" | "warning" | "critical" | "resolved";

const alertStyles = cva("", {
  variants: {
    severity: {
      info: "text-blue-500 bg-blue-50 border-blue-200",
      warning: "text-amber-500 bg-amber-50 border-amber-200",
      critical: "text-red-500 bg-red-50 border-red-200",
      resolved: "text-green-500 bg-green-50 border-green-200",
    },
  },
});

const iconMap = {
  info: <InfoIcon className="h-5 w-5" />,
  warning: <AlertCircleIcon className="h-5 w-5" />,
  critical: <BellIcon className="h-5 w-5" />,
  resolved: <CheckCircleIcon className="h-5 w-5" />,
};

interface AlertItemProps {
  title: string;
  description: string;
  timestamp: Date;
  severity: AlertSeverity;
  location: string;
  onDismiss?: () => void;
  onViewDetails?: () => void;
  className?: string;
}

export function AlertItem({
  title,
  description,
  timestamp,
  severity,
  location,
  onDismiss,
  onViewDetails,
  className,
}: AlertItemProps) {
  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric', 
    minute: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(timestamp);

  return (
    <Card className={cn("border", alertStyles({ severity }), className)}>
      <CardHeader className="pb-2 pt-4 px-4 flex flex-row gap-2 items-start">
        <div>{iconMap[severity]}</div>
        <div className="flex-1">
          <CardTitle className="text-sm font-semibold">{title}</CardTitle>
          <div className="text-xs mt-1 flex justify-between">
            <span>{location}</span>
            <span className="opacity-80">{formattedTime}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-4 py-2">
        <p className="text-sm">{description}</p>
      </CardContent>
      <CardFooter className="px-4 py-3 flex justify-end gap-2 border-t bg-background/50">
        {onDismiss && (
          <Button variant="ghost" size="sm" onClick={onDismiss}>
            Dismiss
          </Button>
        )}
        {onViewDetails && (
          <Button variant="outline" size="sm" onClick={onViewDetails}>
            View Details
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

function cva(arg0: string, arg1: { variants: { severity: { info: string; warning: string; critical: string; resolved: string; }; }; }) {
  return function({ severity }: { severity: AlertSeverity }) {
    return arg1.variants.severity[severity] || "";
  }
}
