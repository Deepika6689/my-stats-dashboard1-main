import { Star, GitFork, ExternalLink, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format, parseISO } from 'date-fns';

interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  html_url: string;
}

interface RepositoryListProps {
  repositories: Repository[];
}

const getLanguageColor = (language: string): string => {
  const colors: { [key: string]: string } = {
    JavaScript: 'github-orange',
    TypeScript: 'github-blue',
    Python: 'github-green',
    Java: 'github-red',
    'C++': 'github-purple',
    React: 'github-blue',
    Vue: 'github-green',
    Go: 'github-blue',
    Rust: 'github-red',
    Swift: 'github-orange',
  };
  return colors[language] || 'primary';
};

export const RepositoryList = ({ repositories }: RepositoryListProps) => {
  const sortedRepos = repositories
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 20); // Show top 20 repositories

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-card to-accent/20 border-border/50">
        <CardHeader>
          <CardTitle>Top Repositories ({sortedRepos.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {sortedRepos.map((repo) => (
            <Card key={repo.id} className="bg-gradient-to-r from-card to-accent/10 border-border/30 hover:border-primary/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-foreground truncate">
                        {repo.name}
                      </h3>
                      {repo.language && (
                        <Badge 
                          variant="secondary" 
                          className={`bg-github-${getLanguageColor(repo.language)}/20 text-github-${getLanguageColor(repo.language)} border-github-${getLanguageColor(repo.language)}/30`}
                        >
                          {repo.language}
                        </Badge>
                      )}
                    </div>
                    
                    {repo.description && (
                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                        {repo.description}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-github-orange" />
                        {repo.stargazers_count.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="h-4 w-4 text-github-blue" />
                        {repo.forks_count.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {format(parseISO(repo.updated_at), 'MMM dd, yyyy')}
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    size="sm"
                    variant="outline"  
                    asChild
                    className="shrink-0"
                  >
                    <a 
                      href={repo.html_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      <ExternalLink className="h-3 w-3" />
                      View
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {repositories.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No repositories found.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};