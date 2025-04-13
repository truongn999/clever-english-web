import React from "react";

interface PageHeaderProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, icon }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-lg">{description}</p>
    </div>
  );
};

export default PageHeader;