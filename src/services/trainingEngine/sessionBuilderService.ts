import { 
  Session, 
  SessionType, 
  ExercisePrescription, 
  WarmupCooldownItem 
} from '@/types/trainingPlan/plan';
import { DayOfWeek, AthleteProfile } from '@/types/trainingPlan/athlete';
import { DomainId } from '@/types/trainingPlan/domains';
import { getExerciseById } from './exerciseLibraryService';

export function buildSession(
  type: SessionType,
  day: DayOfWeek,
  athlete: AthleteProfile,
  isHard: boolean,
  contextNote: string
): Session {
  const isBeginner = athlete.trainingAgeYears <= 1 || athlete.ocrExperienceLevel === 'beginner';

  let sessionName = '';
  let primaryDomains: DomainId[] = [];
  let warmup: WarmupCooldownItem[] = [];
  let mainExercises: ExercisePrescription[] = [];
  let cooldown: WarmupCooldownItem[] = [];
  let whyInProgram = '';
  let durationMinutes = athlete.sessionDurationMinutes || 60;

  switch (type) {
    case 'aerobic_run_engine':
      sessionName = isBeginner ? 'Aerobic Foundation & Nasal Run' : 'Continuous Zone 2 Trail Engine';
      primaryDomains = ['aerobic_endurance', 'running_terrain'];
      durationMinutes = isBeginner ? 40 : 65;
      warmup = [
        { name: 'Banded Ankle Mobilization', durationOrReps: '2 mins per ankle', coachingCue: 'Keep heel grounded to prep Achilles' },
        { name: 'Glute Bridge Activation', durationOrReps: '2 sets of 12 reps', coachingCue: 'Squeeze glutes at top for 2 seconds' },
        { name: 'Barefoot Grass Strides', durationOrReps: '4 x 50m easy', coachingCue: 'High cadence (180 SPM), light quiet landing' }
      ];
      mainExercises = [
        {
          exerciseId: isBeginner ? 'aero_walk_jog_interval' : 'aero_zone2_continuous_trail',
          exerciseName: isBeginner ? 'Walk-to-Jog Aerobic Intervals' : 'Continuous Zone 2 Trail Long Run',
          exercise: getExerciseById(isBeginner ? 'aero_walk_jog_interval' : 'aero_zone2_continuous_trail'),
          sets: 1,
          repsOrDistanceOrDuration: isBeginner ? '35 mins (2m walk / 1m jog)' : '8-12 km continuous',
          loadDescription: 'Bodyweight (Hydration handheld flask)',
          targetRpe: 5,
          targetRir: 4,
          restSeconds: 0,
          intensityZone: 'Zone 2 strictly (65-72% max HR)',
          coachingCues: ['Nasal breathing only', 'Drop to brisk hike if HR spikes on hill climbs', 'Short quick stride'],
          activeRegressionAlternative: 'aero_incline_treadmill_walk',
          activeProgressionAlternative: 'aero_threshold_tempo_blocks'
        }
      ];
      cooldown = [
        { name: 'Prying Goblet Squat & Thoracic Opener', durationOrReps: '3 mins', coachingCue: 'Deep diaphragmatic breathing' },
        { name: 'Elevated Hamstring & Calf Wall Stretch', durationOrReps: '2 mins per leg', coachingCue: 'Gentle traction, no bouncing' }
      ];
      whyInProgram = 'Builds baseline mitochondrial capillary density and fat oxidation capacity so you can run for miles without bonking before the obstacle gauntlet.';
      break;

    case 'maximal_strength':
      sessionName = 'Chassis Strength & Posterior Power';
      primaryDomains = ['maximal_strength', 'core_stability'];
      durationMinutes = 60;
      warmup = [
        { name: 'Cat-Cow & Thoracic Rotations', durationOrReps: '10 reps each', coachingCue: 'Mobilize upper back without lumbar twisting' },
        { name: 'Hip 90/90 Active Flow', durationOrReps: '8 reps per side', coachingCue: 'Smooth capsule rotation' },
        { name: 'Kettlebell Halos & Core Bracing', durationOrReps: '2 sets of 10 reps', coachingCue: 'Keep ribcage clamped down' }
      ];
      mainExercises = [
        {
          exerciseId: athlete.availableEquipment.includes('barbell') ? 'str_trap_bar_deadlift' : 'str_kettlebell_goblet_squat',
          exerciseName: athlete.availableEquipment.includes('barbell') ? 'Trap Bar Deadlift' : 'Heavy Goblet Squats',
          exercise: getExerciseById(athlete.availableEquipment.includes('barbell') ? 'str_trap_bar_deadlift' : 'str_kettlebell_goblet_squat'),
          sets: 4,
          repsOrDistanceOrDuration: '5 reps',
          loadDescription: '80% 1RM or Heavy Bell',
          targetRpe: 8,
          targetRir: 2,
          restSeconds: 150,
          intensityZone: 'High Neural Load (Zone 1-2 HR)',
          coachingCues: ['Push floor away with legs', 'Lats tight in back pockets', 'Crush handles'],
          activeRegressionAlternative: 'str_kettlebell_goblet_squat',
          activeProgressionAlternative: 'str_barbell_back_squat'
        },
        {
          exerciseId: isBeginner ? 'str_inverted_row_feet_elevated' : 'str_strict_bodyweight_pullup',
          exerciseName: isBeginner ? 'Inverted Bodyweight Row' : 'Strict Pull-Ups (Dead Hang to Bar)',
          exercise: getExerciseById(isBeginner ? 'str_inverted_row_feet_elevated' : 'str_strict_bodyweight_pullup'),
          sets: 4,
          repsOrDistanceOrDuration: isBeginner ? '10 reps' : '6-8 strict reps',
          loadDescription: 'Bodyweight',
          targetRpe: 8,
          targetRir: 2,
          restSeconds: 120,
          intensityZone: 'Upper Pulling Power',
          coachingCues: ['Chest to bar', 'Hollow core body', '2-second lower to dead hang'],
          activeRegressionAlternative: 'str_inverted_row_feet_elevated',
          activeProgressionAlternative: 'str_weighted_pullup'
        },
        {
          exerciseId: 'str_bulgarian_split_squat',
          exerciseName: 'Dumbbell Bulgarian Split Squats',
          exercise: getExerciseById('str_bulgarian_split_squat'),
          sets: 3,
          repsOrDistanceOrDuration: '8 reps per leg',
          loadDescription: 'Moderate Dumbbells (25-40lbs)',
          targetRpe: 8,
          targetRir: 2,
          restSeconds: 90,
          intensityZone: 'Unilateral Knee Armor',
          coachingCues: ['Knee tracks over middle toe', 'Controlled 3-second descent', 'Torso slight forward lean'],
          activeRegressionAlternative: 'str_kettlebell_goblet_squat',
          activeProgressionAlternative: 'str_barbell_back_squat'
        }
      ];
      cooldown = [
        { name: 'Couch Stretch (Quad & Hip Flexor)', durationOrReps: '2 mins per side', coachingCue: 'Squeeze glute of trailing leg' },
        { name: 'Lying Spinal Twist & Belly Breathing', durationOrReps: '2 mins', coachingCue: 'Downregulate CNS and lower cortisol' }
      ];
      whyInProgram = 'High relative strength (strength-to-bodyweight) makes manipulating your mass over 8ft walls, inverted climbs, and heavy sled drags effortless.';
      break;

    case 'grip_and_hanging_armor':
      sessionName = 'Forearm Armor & Grip Resilience';
      primaryDomains = ['grip_hanging', 'obstacle_skill'];
      durationMinutes = 45;
      warmup = [
        { name: 'Wrist Roller Extensors & Flexors', durationOrReps: '2 sets', coachingCue: 'Warm up finger flexor tendons' },
        { name: 'Active Scapular Shrugs on Bar', durationOrReps: '2 sets of 10 reps', coachingCue: 'Pull shoulders down, ears clear' }
      ];
      mainExercises = [
        {
          exerciseId: 'grip_active_dead_hang',
          exerciseName: 'Active Scapular Dead Hangs',
          exercise: getExerciseById('grip_active_dead_hang'),
          sets: 4,
          repsOrDistanceOrDuration: '45-60s hold',
          loadDescription: 'Bodyweight',
          targetRpe: 8,
          targetRir: 1,
          restSeconds: 90,
          intensityZone: 'Forearm Isometric Capacity',
          coachingCues: ['Crush bar with full thumb-around grip', 'Hollow core body', 'Nasal breathing'],
          activeRegressionAlternative: 'grip_active_dead_hang',
          activeProgressionAlternative: 'grip_fat_bar_dead_hang'
        },
        {
          exerciseId: 'grip_towel_pullups',
          exerciseName: 'Vertical Towel Hang & Pull Complex',
          exercise: getExerciseById('grip_towel_pullups'),
          sets: 3,
          repsOrDistanceOrDuration: '6-8 reps',
          loadDescription: 'Towel on Bar',
          targetRpe: 9,
          targetRir: 1,
          restSeconds: 120,
          intensityZone: 'Crush Grip Friction',
          coachingCues: ['Pinch cloth hard', 'Vertical fist orientation', 'Slow eccentric lowering'],
          activeRegressionAlternative: 'grip_active_dead_hang',
          activeProgressionAlternative: 'obs_rope_climb_technique'
        },
        {
          exerciseId: 'grip_towel_pinch_hold',
          exerciseName: 'Smooth Plate Pinch Grip Holds',
          exercise: getExerciseById('grip_towel_pinch_hold'),
          sets: 3,
          repsOrDistanceOrDuration: '30-40s hold',
          loadDescription: 'Dual 25lb Olympic Plates',
          targetRpe: 8,
          targetRir: 2,
          restSeconds: 90,
          intensityZone: 'Thumb Adductor Power',
          coachingCues: ['Clamp thumbs over rim', 'Tall upright spine', 'Do not rest on thighs'],
          activeRegressionAlternative: 'grip_active_dead_hang',
          activeProgressionAlternative: 'grip_single_arm_bar_hang'
        }
      ];
      cooldown = [
        { name: 'Forearm Flexor Deep Stretch on Floor', durationOrReps: '2 mins', coachingCue: 'Palms down, fingers pointing toward knees' },
        { name: 'Cold Water Hand Flush', durationOrReps: '2 mins', coachingCue: 'Soothe tendon inflammation and hasten recovery' }
      ];
      whyInProgram = 'Grip is the #1 point of failure in OCR. This builds the crush, support, and pinch endurance to navigate wet, muddy rigs without taking burpees.';
      break;

    case 'loaded_carry_complex':
      sessionName = 'Heavy Loaded Mountain Carries';
      primaryDomains = ['loaded_carries', 'muscular_endurance', 'core_stability'];
      durationMinutes = 55;
      warmup = [
        { name: 'Deadbugs with Core Wall Press', durationOrReps: '2 sets of 10 reps', coachingCue: 'Flatten lower back into floor' },
        { name: 'Sandbag Ground-to-Shoulder Cleans', durationOrReps: '2 sets of 5 reps', coachingCue: 'Hinge hips explosively to lap bag' }
      ];
      mainExercises = [
        {
          exerciseId: 'carries_bearhug_sandbag_carry',
          exerciseName: 'Bear-Hug Sandbag Carry',
          exercise: getExerciseById('carries_bearhug_sandbag_carry'),
          sets: 4,
          repsOrDistanceOrDuration: '100m continuous',
          loadDescription: '60-80lb Sandbag / Wreck Bag',
          targetRpe: 8,
          targetRir: 2,
          restSeconds: 120,
          intensityZone: 'Thoracic Compression Loading',
          coachingCues: ['Squeeze bag into sternum', 'Short rapid steps', 'Breathe through compressed ribcage'],
          activeRegressionAlternative: 'carries_heavy_farmer_walk',
          activeProgressionAlternative: 'carries_uphill_sandbag_march'
        },
        {
          exerciseId: 'carries_heavy_farmer_walk',
          exerciseName: 'Heavy Farmer Walk Shuttles',
          exercise: getExerciseById('carries_heavy_farmer_walk'),
          sets: 4,
          repsOrDistanceOrDuration: '50m unbroken',
          loadDescription: '60% Bodyweight Total in Hands',
          targetRpe: 8,
          targetRir: 1,
          restSeconds: 90,
          intensityZone: 'Trap & Grip Loaded March',
          coachingCues: ['Shoulders pinned back and down', 'No swinging weights', 'Rigid abdominal brace'],
          activeRegressionAlternative: 'grip_active_dead_hang',
          activeProgressionAlternative: 'carries_uphill_sandbag_march'
        }
      ];
      cooldown = [
        { name: 'Child Pose with Lat Stretch', durationOrReps: '3 mins', coachingCue: 'Breathe into lower back' },
        { name: 'Foam Roll Glutes and Thoracic Spine', durationOrReps: '3 mins', coachingCue: 'Gentle rolling, release tissue tone' }
      ];
      whyInProgram = 'Simulates the crushing metabolic demand of Spartan bucket and sandbag carry loops that cause amateur racers to walk and lose 10+ minutes.';
      break;

    case 'hybrid_compromised_ocr':
      sessionName = 'Compromised Running & Transition Lab';
      primaryDomains = ['running_terrain', 'loaded_carries', 'grip_hanging'];
      durationMinutes = 65;
      warmup = [
        { name: 'Dynamic Leg Swings & High Knees', durationOrReps: '2 mins', coachingCue: 'Open hip capsules' },
        { name: '300m Jog + 5 Burpees', durationOrReps: '2 rounds', coachingCue: 'Gradually elevate heart rate to Zone 3' }
      ];
      mainExercises = [
        {
          exerciseId: 'ocr_compromised_carry_to_run_intervals',
          exerciseName: 'Compromised Carry-to-Run Transitions',
          exercise: getExerciseById('ocr_compromised_carry_to_run_intervals'),
          sets: 4,
          repsOrDistanceOrDuration: '200m Carry + 800m Run',
          loadDescription: '60lb Sandbag + Trail Shoes',
          targetRpe: 9,
          targetRir: 1,
          restSeconds: 120,
          intensityZone: 'Zone 4-5 Compromised Decay',
          coachingCues: ['Drop bag and transition into full sprint stride within 2 seconds', 'Overcome concrete leg burn'],
          activeRegressionAlternative: 'carries_bearhug_sandbag_carry',
          activeProgressionAlternative: 'ocr_full_race_simulation_wod'
        },
        {
          exerciseId: 'endur_spartan_penalty_burpees',
          exerciseName: 'Spartan Chest-to-Ground Burpees for Time',
          exercise: getExerciseById('endur_spartan_penalty_burpees'),
          sets: 2,
          repsOrDistanceOrDuration: '30 burpees for time',
          loadDescription: 'Bodyweight',
          targetRpe: 9,
          targetRir: 0,
          restSeconds: 180,
          intensityZone: 'Maximal Acidosis Tolerance',
          coachingCues: ['Chest touches floor', 'Explosive hip snap', 'Clap overhead with jump'],
          activeRegressionAlternative: 'endur_bodyweight_squats_burnout',
          activeProgressionAlternative: 'ocr_full_race_simulation_wod'
        }
      ];
      cooldown = [
        { name: '400m Slow Walking Flush with Diaphragmatic Breaths', durationOrReps: '5 mins', coachingCue: 'Clear systemic lactate' },
        { name: 'Lying Hamstring Band Stretch', durationOrReps: '2 mins/side', coachingCue: 'Relax nervous system' }
      ];
      whyInProgram = 'Teaches the neuromuscular system to overcome "concrete legs"—the pace decay that occurs when transitioning from heavy carries back into running.';
      break;

    case 'active_recovery':
    case 'complete_rest':
    default:
      sessionName = 'Active Restoration, Tissue Flushing & Joint Hygiene';
      primaryDomains = ['mobility_durability'];
      durationMinutes = 30;
      warmup = [];
      mainExercises = [
        {
          exerciseId: 'mob_ankle_dorsiflexion_banded',
          exerciseName: 'Banded Ankle & Slant Board Mobilizations',
          exercise: getExerciseById('mob_ankle_dorsiflexion_banded'),
          sets: 2,
          repsOrDistanceOrDuration: '15 reps per side',
          loadDescription: 'Bodyweight / Band',
          targetRpe: 4,
          restSeconds: 30,
          intensityZone: 'Restorative Mobility',
          coachingCues: ['Gentle oscillatory pulses', 'Zero joint pinch pain'],
          activeRegressionAlternative: 'mob_deep_squat_prying'
        },
        {
          exerciseId: 'mob_hip_90_90_flow',
          exerciseName: 'Hip 90/90 Capsule Restorations',
          exercise: getExerciseById('mob_hip_90_90_flow'),
          sets: 2,
          repsOrDistanceOrDuration: '10 transitions',
          loadDescription: 'Bodyweight',
          targetRpe: 4,
          restSeconds: 30,
          intensityZone: 'Restorative Mobility',
          coachingCues: ['Slow controlled transitions', 'Keep pelvis grounded']
        }
      ];
      cooldown = [
        { name: 'Passive Inversion / Legs-Up-the-Wall', durationOrReps: '10 mins', coachingCue: 'Promotes lymphatic venous return and parasympathetic tone' }
      ];
      whyInProgram = 'Allows tissue healing, replenishes muscle glycogen, and reduces systemic central nervous system inflammation without losing mobility.';
      break;
  }

  return {
    id: `sess_${type}_${day}_${Math.random().toString(36).substring(2, 7)}`,
    name: sessionName,
    dayOfWeek: day,
    sessionType: type,
    primaryDomains,
    estimatedDurationMinutes: durationMinutes,
    isHardSession: isHard,
    isOptional: type === 'active_recovery' || type === 'complete_rest',
    isCompleted: false,
    warmup,
    mainExercises,
    cooldown,
    whyThisSessionIsInYourProgram: `${whyInProgram} ${contextNote}`
  };
}
