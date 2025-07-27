import { FC } from 'react';
import { Card, CardContent } from '@shadcn-ui';

interface ErrorCardProps {
  message?: string;
}

export const ErrorCard: FC<ErrorCardProps> = ({
  message = 'Error loading data',
}) => (
  <Card className="bg-red-50 border-red-200 text-red-700 shadow-lg mx-auto w-1/2 mt-8">
    <CardContent className="p-6 flex items-center justify-center">
      <span className="text-lg font-semibold">{message}</span>
    </CardContent>
  </Card>
);
