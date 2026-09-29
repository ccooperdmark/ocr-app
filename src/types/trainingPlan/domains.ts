export type DomainId =
  | 'aerobic_endurance'
  | 'running_terrain'
  | 'anaerobic_capacity'
  | 'maximal_strength'
  | 'grip_hanging'
  | 'loaded_carries'
  | 'muscular_endurance'
  | 'power_speed'
  | 'core_stability'
  | 'obstacle_skill'
  | 'mobility_durability'
  | 'race_physiology';

export type DomainSkillLevel =
  | 'complete_beginner'
  | 'beginner'
  | 'recreational'
  | 'intermediate'
  | 'advanced'
  | 'competitive'
  | 'elite';

export type TrainingPriorityLevel =
  | 'primary_priority'       // Heavy volume & frequency emphasis (lagging limiter)
  | 'secondary_priority'     // Standard progressive development
  | 'maintenance'            // Retain strength/capacity with minimal efficient dose
  | 'recovery_reduced';      // De-emphasized due to fatigue, injury flag, or high interference

export interface DomainSubmetric {
  id: string;
  name: string;
  score: number; // 0 to 100
  unit: string;
  currentValue: string | number;
  benchmarkTarget: string | number;
  isBottleneck: boolean;
}

export interface DomainEvaluation {
  domainId: DomainId;
  domainNumber: number; // 1 to 12
  domainTitle: string;
  tagline: string;
  whyItMattersSynopsis?: string;
  
  // Computed Performance Metrics
  score: number; // 0 to 100
  previousScore: number;
  rateOfImprovementPercent: number; // e.g. +4.2%
  trend: 'improving' | 'stable' | 'declining';
  skillLevel: DomainSkillLevel;
  
  // Submetrics
  submetrics: DomainSubmetric[];
  strongestQuality: string;
  weakestQuality: string;

  // Race Relevance & Programming Priority
  raceImportanceScore: number; // 1 to 10 based on target race requirements
  trainingPriority: TrainingPriorityLevel;
  priorityWeight: number; // Computed scalar from Priority Engine
  explainabilityRationale: string; // Transparent coaching justification
}

export interface FullPerformanceProfile {
  athleteId: string;
  evaluatedAt: string; // ISO date
  overallOcrIndex: number; // 0 to 100
  domainEvaluations: Record<DomainId, DomainEvaluation>;
  primaryLimiters: string[]; // List of domain titles requiring immediate priority
  greatestStrengths: string[];
}
