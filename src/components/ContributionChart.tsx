import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format, parseISO, startOfMonth, eachMonthOfInterval, subMonths } from 'date-fns';

interface Repository {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  stargazers_count: number;
}

interface ContributionChartProps {
  repositories: Repository[];
}

export const ContributionChart = ({ repositories }: ContributionChartProps) => {
  // Generate repository creation timeline
  const getRepositoryTimeline = () => {
    const now = new Date();
    const twelveMonthsAgo = subMonths(now, 12);
    const months = eachMonthOfInterval({ start: twelveMonthsAgo, end: now });
    
    const timelineData = months.map(month => {
      const monthStart = startOfMonth(month);
      const monthEnd = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0);
      
      const reposCreated = repositories.filter(repo => {
        const createdDate = parseISO(repo.created_at);
        return createdDate >= monthStart && createdDate <= monthEnd;
      }).length;

      const reposUpdated = repositories.filter(repo => {
        const updatedDate = parseISO(repo.updated_at);
        return updatedDate >= monthStart && updatedDate <= monthEnd;
      }).length;

      return {
        month: format(month, 'MMM yyyy'),
        created: reposCreated,
        updated: reposUpdated,
      };
    });

    return timelineData;
  };

  const getStarGrowth = () => {
    return repositories
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
      .map((repo, index) => ({
        repository: repo.name,
        stars: repo.stargazers_count,
        cumulativeStars: repositories
          .slice(0, index + 1)
          .reduce((sum, r) => sum + r.stargazers_count, 0),
        date: format(parseISO(repo.created_at), 'MMM yyyy'),
      }))
      .slice(-10); // Show last 10 repositories
  };

  const timelineData = getRepositoryTimeline();
  const starData = getStarGrowth();

  return (
    <div className="space-y-6">
      {/* Repository Activity Timeline */}
      <Card className="bg-gradient-to-br from-card to-accent/20 border-border/50">
        <CardHeader>
          <CardTitle>Repository Activity (Last 12 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--popover-foreground))'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="created" 
                stackId="1"
                stroke="hsl(var(--github-green))" 
                fill="hsl(var(--github-green))"
                fillOpacity={0.6}
                name="Repositories Created"
              />
              <Area 
                type="monotone" 
                dataKey="updated" 
                stackId="1"
                stroke="hsl(var(--github-blue))" 
                fill="hsl(var(--github-blue))"
                fillOpacity={0.6}
                name="Repositories Updated"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Star Growth */}
      <Card className="bg-gradient-to-br from-card to-accent/20 border-border/50">
        <CardHeader>
          <CardTitle>Star Growth Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={starData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--popover-foreground))'
                }}
                labelFormatter={(label) => `Repository: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="cumulativeStars" 
                stroke="hsl(var(--github-orange))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--github-orange))', strokeWidth: 2, r: 4 }}
                name="Cumulative Stars"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};