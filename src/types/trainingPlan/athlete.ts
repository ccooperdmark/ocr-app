export type Sex = 'male' | 'female' | 'other';

export type ExperienceTier = 'basic' | 'intermediate' | 'advanced';

export type TrainingExperienceLevel = 
  | 'none' 
  | 'beginner' // < 1 year
  | 'intermediate' // 1-3 years
  | 'advanced' // 3-6 years
  | 'elite'; // 6+ years

export type EquipmentAvailability =
  | 'full_gym'
  | 'barbell'
  | 'dumbbells'
  | 'kettlebells'
  | 'pullup_bar'
  | 'rings_or_suspension'
  | 'sandbag_heavy_carries'
  | 'box_or_bench'
  | 'running_shoes'
  | 'trail_shoes'
  | 'treadmill'
  | 'stairmaster'
  | 'rower_or_airbike'
  | 'ocr_rig_access'
  | 'bodyweight_only';

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export interface InjuryOrRestriction {
  id: string;
  bodyPart: string; // e.g. 'right_knee', 'lower_back', 'left_shoulder'
  description: string;
  isCurrent: boolean;
  painLevelOutOf10: number;
  restrictedMovements: string[]; // e.g. ['deep_squat', 'overhead_press', 'high_impact_descent']
  requiresMedicalClearance: boolean;
}

export interface RecoveryAndLifestyle {
  typicalSleepHours: number; // e.g. 7.5
  sleepQualityRating: number; // 1 to 5
  occupationalActivity: 'sedentary' | 'lightly_active' | 'moderately_active' | 'heavy_labor';
  generalStressLevel: 'low' | 'moderate' | 'high' | 'very_high';
  weeklyRecoveryCapacity: 'low' | 'moderate' | 'high';
}

export interface AthleteProfile {
  id: string;
  name: string;
  age: number;
  sex: Sex;
  heightCm: number;
  weightKg: number;
  bodyFatPercent?: number;

  // Background & Experience
  trainingAgeYears: number;
  experienceTier?: ExperienceTier;
  ocrExperienceLevel: TrainingExperienceLevel;
  runningExperienceLevel: TrainingExperienceLevel;
  resistanceExperienceLevel: TrainingExperienceLevel;
  currentWeeklyRunningKm: number;
  currentWeeklyStrengthHours: number;

  // Availability & Schedule
  availableDays: DayOfWeek[];
  sessionDurationMinutes: number; // e.g. 60 or 90
  scheduleFlexibility: 'strict' | 'moderate' | 'flexible';

  // Equipment & Environment Access
  availableEquipment: EquipmentAvailability[];
  hasAccessToTrails: boolean;
  hasAccessToHills: boolean;
  hasAccessToStairs: boolean;
  hasAccessToOcrObstacles: boolean;
  hasGymMembership: boolean;

  // Health & Movement Restrictions
  injuriesAndRestrictions: InjuryOrRestriction[];
  exercisePreferences: string[];
  exerciseDislikes: string[];
  requiresDoctorClearance: boolean;

  // Lifestyle & Recovery
  recoveryProfile: RecoveryAndLifestyle;
}
