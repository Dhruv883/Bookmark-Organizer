import React from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { LucideIcon } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href: string;
  icon?: LucideIcon;
}

interface PageLayoutProps {
  children: React.ReactNode;
  breadcrumbItems?: BreadcrumbItem[];
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  breadcrumbItems = [],
}) => {
  return (
    <div className="flex flex-col h-full bg-bgColor text-textColor">
      <div className="px-5 pt-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {children}
    </div>
  );
};
