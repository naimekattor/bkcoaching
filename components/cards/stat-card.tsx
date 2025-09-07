import type React from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
  valueColor?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  className,
  valueColor = "text-gray-900",
}: StatCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg border border-gray-200 p-6",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={cn("text-3xl font-bold", valueColor)}>{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        {icon && <div className="ml-4 flex-shrink-0">{icon}</div>}
      </div>
    </div>
  );
}
