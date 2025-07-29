import { useNavigate } from '@tanstack/react-router';
import { Button, Card, CardContent } from '@shadcn-ui';

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="flex flex-col items-center gap-6 py-10">
          <h2 className="text-6xl font-bold text-red-500">404</h2>
          <h4 className="text-2xl font-semibold text-center">Page Not Found</h4>
          <p className="text-center text-gray-500">The page you are looking for does not exist.</p>
          <Button onClick={() => navigate({ to: '/' })} className="mt-4">
            Go to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
