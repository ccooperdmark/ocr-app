import { DomainId } from './domains';
import { DayOfWeek } from './athlete';
import { ExerciseDefinition } from './exercise';

export type TrainingPhaseType =
  | 'preparation_introductory'
  | 'general_base'
  | 'specific_base'
  | 'build'
  | 'race_specific_development'
  | 'peak'
  | 'taper'
  | 'competition'
  | 'post_race_recovery'
  | 'transition_off_season';

export type SessionType =
  | 'aerobic_run_engine'
  | 'trail_mountain_vert'
  | 'anaerobic_lactate_intervals'
  | 'maximal_strength'
  | 'muscular_endurance'
  | 'grip_and_hanging_armor'
  | 'loaded_carry_complex'
  | 'obstacle_skill_and_agility'
  | 'hybrid_compromised_ocr'
  | 'mobility_and_durability'
  | 'race_simulation'
  | 'active_recovery'
  | 'complete_rest';

export interface WarmupCooldownItem {
  name: string;
  durationOrReps: string;
  coachingCue: string;
}

export interface ExercisePrescription {
  exerciseId: string;
  exerciseName: string;
  exercise: ExerciseDefinition;
  sets: number;
  repsOrDistanceOrDuration: string; // e.g. "5 reps", "400m", "45 seconds"
  loadDescription: string; // e.g. "75% 1RM", "60lb sandbag", "Bodyweight"
  targetRpe: number; // 1-10
  targetRir?: number; // Reps In Reserve (0 to 4)
  restSeconds: number;
  intensityZone?: string; // e.g. "Zone 2 (135-145 BPM)" or "Zone 4 LT"
  coachingCues: string[];
  activeRegressionAlternative?: string;
  activeProgressionAlternative?: string;
}

export interface WorkoutLogEntry {
  loggedAt: string; // ISO date
  completed: boolean;
  actualDurationMinutes: number;
  overallRpe: number; // 1 to 10
  perceivedDifficulty: 'too_easy' | 'just_right' | 'hard_manageable' | 'excessive_burnout';
  sorenessLevel: number; // 1 to 5
  painFlagDetected: boolean;
  painLocationAndNotes?: string;
  completedPrescriptions: {
    exerciseId: string;
    actualSetsCompleted: number;
    actualRepsOrDistance: string;
    actualLoadUsed: string;
  }[];
  athleteComments?: string;
}

export interface Session {
  id: string;
  name: string;
  dayOfWeek: DayOfWeek;
  sessionType: SessionType;
  primaryDomains: DomainId[];
  
  estimatedDurationMinutes: number;
  isHardSession: boolean; // Flag to enforce easy/hard 48h separation rule
  isOptional: boolean;
  isCompleted: boolean;

  // Exercise Structure
  warmup: WarmupCooldownItem[];
  mainExercises: ExercisePrescription[];
  cooldown: WarmupCooldownItem[];

  // Transparent Educational Coaching
  whyThisSessionIsInYourProgram: string;
  
  // Execution Log
  userLog?: WorkoutLogEntry;
  coachOverrideNotes?: string;
  isLockedByCoach?: boolean;
}

export interface Microcycle {
  weekNumber: number; // 1 to N
  phase: TrainingPhaseType;
  isDeloadWeek: boolean;
  weeklyTargetRunningKm: number;
  weeklyTargetElevationMeters: number;
  weeklyGripVolumeScore: number;
  weeklyFocusSummary: string;
  sessions: Session[];
}

export interface Mesocycle {
  blockNumber: number;
  name: string;
  weeksCount: number;
  primaryAdaptationGoal: string;
  weeks: Microcycle[];
}

export interface TrainingPhaseInfo {
  phase: TrainingPhaseType;
  name: string;
  startWeek: number;
  endWeek: number;
  objective: string;
  volumeProfile: 'low' | 'moderate' | 'high' | 'peak' | 'taper_reduced';
  intensityProfile: 'low' | 'moderate' | 'high' | 'maximal';
}

export interface TrainingPlan {
  id: string;
  athleteId: string;
  raceId: string;
  createdAt: string;
  totalDurationWeeks: number;
  
  phases: TrainingPhaseInfo[];
  mesocycles: Mesocycle[];
  
  // High-Level Plan Strategy
  weeklyTemplateSummary: string;
  progressionRulesSummary: string;
  assessmentScheduleSummary: string;
  deloadStrategySummary: string;
  taperPlanSummary: string;
}
