import React from "react";

import { Link } from "react-router-dom";
import { ChevronRight, Home, LucideIcon } from "lucide-react";

interface BreadcrumbProps {
  items: { label: string; href: string; icon?: LucideIcon }[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
      <Link to="/" className="flex items-center hover:text-gray-700">
        <Home className="w-4 h-4 mr-1" />
        Home
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <ChevronRight className="w-4 h-4 mx-1" />
          <Link
            to={item.href}
            className="flex items-center hover:text-gray-700"
          >
            {item.icon && <item.icon className="w-4 h-4 mr-1" />}
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}
