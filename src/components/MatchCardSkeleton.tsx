import { Card, CardContent, Skeleton } from '@shadcn-ui';

export const MatchCardSkeleton = () => (
  <Card
    data-testid="match-score-skeleton"
    className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
  >
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="w-24 h-6" />
        </div>

        <div className="flex flex-col items-center mx-8">
          <Skeleton className="w-20 h-10 mb-2" />
        </div>

        <div className="flex items-center space-x-3 flex-1 justify-end">
          <Skeleton className="w-24 h-6" />
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
      </div>
    </CardContent>
  </Card>
);
