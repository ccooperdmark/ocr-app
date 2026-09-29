import { DomainId } from './domains';
import { EquipmentAvailability } from './athlete';

export type MovementPattern =
  | 'squat'
  | 'hinge'
  | 'lunge_unilateral'
  | 'horizontal_push'
  | 'vertical_push'
  | 'horizontal_pull'
  | 'vertical_pull'
  | 'loaded_carry'
  | 'crawl_ground_work'
  | 'core_anti_extension'
  | 'core_anti_rotation'
  | 'jumping_plyometric'
  | 'aerobic_locomotion'
  | 'hanging_brachiation'
  | 'obstacle_technique';

export type ExerciseDifficulty = 'beginner' | 'intermediate' | 'advanced' | 'elite';

export interface ExerciseDefinition {
  id: string;
  name: string;
  primaryDomain: DomainId;
  secondaryDomains: DomainId[];
  movementPattern: MovementPattern;
  equipmentRequired: EquipmentAvailability[];
  difficulty: ExerciseDifficulty;
  
  // Anatomical & Execution Details
  targetMuscles: string[];
  instructions: string[];
  coachingCues: string[];
  commonMistakes: string[];

  // Progression & Regression Links
  regressionExerciseIds: string[];
  progressionExerciseIds: string[];
  substitutionExerciseIds: string[];

  // Safety & Contraindications
  contraindications: string[]; // e.g. ['lower_back_pain', 'patellar_tendonitis', 'rotator_cuff_tear']
  cautionNotes?: string;

  // Media
  videoUrl?: string;
  thumbnailUrl?: string;

  // Prescriptive Template
  defaultSets: number;
  defaultRepsOrDuration: string; // e.g. "8-10 reps" or "45s hold" or "400m"
  defaultRpe: number; // 1 to 10
  defaultRestSeconds: number;
  ocrApplicationNote: string; // e.g. "Direct transfer to 8ft wall top-out and Twister transition"
}
