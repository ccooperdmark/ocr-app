import { AthleteProfile } from './athlete';
import { RaceProfile } from './race';
import { FullPerformanceProfile } from './domains';
import { TrainingPlan, Session } from './plan';

export type ClientTriageStatus =
  | 'on_track'
  | 'declining_performance'
  | 'low_adherence'
  | 'upcoming_race'
  | 'low_readiness'
  | 'assessment_due'
  | 'coach_review_required'
  | 'injury_flagged';

export interface CoachClientSummary {
  athlete: AthleteProfile;
  targetRace: RaceProfile;
  currentPlan: TrainingPlan;
  performanceProfile: FullPerformanceProfile;
  
  // Monitoring Metrics
  triageStatus: ClientTriageStatus[];
  weeklyAdherenceRatePercent: number; // e.g. 85%
  fourWeekTrend: 'improving' | 'stable' | 'regressing';
  raceReadinessScore: number; // 0 to 100
  nextAssessmentDueDays: number;
  flaggedNotes: string[];
}

export interface CoachOverrideAction {
  id: string;
  athleteId: string;
  sessionId: string;
  actionType: 'lock_session' | 'substitute_exercise' | 'change_volume' | 'adjust_priority' | 'insert_custom_note';
  originalValue: string;
  overrideValue: string;
  coachComment: string;
  appliedAt: string;
}
