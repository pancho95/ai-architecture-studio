export type CategoryType = 'frontend' | 'system-design' | 'audio-tech';
export type ComplexityLevel = 'beginner' | 'intermediate' | 'advanced';

export interface AnalysisRequest {
  topic: string;
  category: CategoryType;
  complexity: ComplexityLevel;
}

export interface MetricItem {
  label: string;
  value: string;
  status: 'optimal' | 'warning' | 'neutral';
}

export interface AnalysisResponse {
  title: string;
  summary: string;
  keyTakeaways: string[];
  metrics: MetricItem[];
  codeSnippet?: string;
  recommendedStack: string[];
}

export interface ApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}