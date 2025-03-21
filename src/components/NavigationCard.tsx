import React from "react";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface NavigationCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  to?: string;
  onClick?: () => void;
  isDisabled?: boolean;
  comingSoon?: boolean;
}

export function NavigationCard({
  icon: Icon,
  title,
  description,
  to,
  onClick,
  isDisabled,
  comingSoon,
}: NavigationCardProps) {
  const content = (
    <div
      className={`bg-cardColor rounded-xl py-4 px-3 transition-colors  ${
        isDisabled ? "cursor-default" : ""
      }`}
    >
      <div className="flex items-center gap-3 text-textColor">
        <div className="w-5 h-5 flex items-center justify-center">
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 space-y-1">
          <div className="font-medium text-sm flex items-center gap-2">
            {title}
            {comingSoon && (
              <Badge
                variant="outline"
                className="bg-badgeColor text-badgeTextColor rounded-full text-xs border-none"
              >
                Coming Soon
              </Badge>
            )}
          </div>
          <div className="text-sm text-secondaryTextColor">{description}</div>
        </div>
      </div>
    </div>
  );

  if (onClick) {
    return (
      <div className="cursor-pointer" onClick={onClick}>
        {content}
      </div>
    );
  }

  if (to && !isDisabled) {
    return <Link to={to}>{content}</Link>;
  }

  return content;
}
