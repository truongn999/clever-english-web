
import React from 'react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="text-center py-12">
      <h3 className="text-xl font-medium text-gray-700 mb-2">{title}</h3>
      <p className="text-gray-500">{description}</p>
      <Button 
        variant="outline" 
        className="mt-4"
        onClick={onAction}
      >
        {actionLabel}
      </Button>
    </div>
  );
};

export default EmptyState;
