import { useState } from "react";
import { Search, Github, Star, GitFork, Users, Calendar, MapPin, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { LanguageChart } from "./LanguageChart";
import { ContributionChart } from "./ContributionChart";
import { RepositoryList } from "./RepositoryList";

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  company: string;
  location: string;
  blog: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

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

export const GitHubAnalyzer = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const { toast } = useToast();

  const analyzeUser = async () => {
    if (!username.trim()) {
      toast({
        title: "Username required",
        description: "Please enter a GitHub username to analyze.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Fetch user data
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      if (!userResponse.ok) {
        throw new Error("User not found");
      }
      const userData = await userResponse.json();
      setUser(userData);

      // Fetch user repositories
      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?sort=stars&per_page=100`
      );
      if (!reposResponse.ok) {
        throw new Error("Failed to fetch repositories");
      }
      const reposData = await reposResponse.json();
      setRepositories(reposData);

      toast({
        title: "Analysis complete!",
        description: `Successfully analyzed ${userData.name || username}'s GitHub profile.`,
      });
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getLanguageStats = () => {
    const languages: { [key: string]: number } = {};
    repositories.forEach((repo) => {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    });
    return Object.entries(languages)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  };

  const getTotalStats = () => {
    const totalStars = repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = repositories.reduce((sum, repo) => sum + repo.forks_count, 0);
    return { totalStars, totalForks };
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Github className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-github-blue bg-clip-text text-transparent">
              GitHub Analyzer
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Analyze GitHub profiles and get detailed insights into coding patterns and repository statistics.
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-8 bg-gradient-to-r from-card to-accent/50 border-border/50">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <Input
                placeholder="Enter GitHub username (e.g., octocat)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && analyzeUser()}
                className="flex-1"
              />
              <Button onClick={analyzeUser} disabled={loading} className="bg-primary hover:bg-primary/90">
                <Search className="mr-2 h-4 w-4" />
                {loading ? "Analyzing..." : "Analyze"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {user && (
          <div className="space-y-6">
            {/* User Profile */}
            <Card className="bg-gradient-to-br from-card to-accent/30 border-border/50">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <Avatar className="h-32 w-32 mx-auto md:mx-0">
                    <AvatarImage src={user.avatar_url} alt={user.name} />
                    <AvatarFallback>{user.name?.[0] || user.login[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-3xl font-bold mb-2">{user.name || user.login}</h2>
                    <p className="text-muted-foreground mb-4">@{user.login}</p>
                    {user.bio && <p className="text-foreground mb-4">{user.bio}</p>}
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-muted-foreground">
                      {user.company && (
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {user.company}
                        </div>
                      )}
                      {user.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {user.location}
                        </div>
                      )}
                      {user.blog && (
                        <div className="flex items-center gap-1">
                          <LinkIcon className="h-4 w-4" />
                          <a href={user.blog} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                            {user.blog}
                          </a>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Joined {new Date(user.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Repositories", value: user.public_repos, icon: Github, color: "github-blue" },
                { label: "Followers", value: user.followers, icon: Users, color: "github-green" },
                { label: "Total Stars", value: getTotalStats().totalStars, icon: Star, color: "github-orange" },
                { label: "Total Forks", value: getTotalStats().totalForks, icon: GitFork, color: "github-purple" },
              ].map((stat, index) => (
                <Card key={index} className="bg-gradient-to-br from-card to-accent/20 border-border/50">
                  <CardContent className="p-4 text-center">
                    <stat.icon className={`h-6 w-6 mx-auto mb-2 text-github-${stat.color}`} />
                    <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Analytics Tabs */}
            <Tabs defaultValue="languages" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="languages">Languages</TabsTrigger>
                <TabsTrigger value="repositories">Repositories</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="languages" className="space-y-4">
                <LanguageChart data={getLanguageStats()} />
              </TabsContent>

              <TabsContent value="repositories" className="space-y-4">
                <RepositoryList repositories={repositories} />
              </TabsContent>

              <TabsContent value="activity" className="space-y-4">
                <ContributionChart repositories={repositories} />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};