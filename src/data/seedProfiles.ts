import { AthleteProfile } from '@/types/trainingPlan/athlete';
import { RaceProfile } from '@/types/trainingPlan/race';
import { generateComprehensiveOcrPlan, PlanGenerationOutput } from '@/services/trainingEngine/planGeneratorService';
import { CoachClientSummary } from '@/types/trainingPlan/coach';

export const SEED_ATHLETES: AthleteProfile[] = [
  {
    id: 'athlete_sarah',
    name: 'Sarah Jenkins',
    age: 29,
    sex: 'female',
    heightCm: 167,
    weightKg: 61,
    bodyFatPercent: 21,
    trainingAgeYears: 1,
    ocrExperienceLevel: 'beginner',
    runningExperienceLevel: 'beginner',
    resistanceExperienceLevel: 'beginner',
    currentWeeklyRunningKm: 12,
    currentWeeklyStrengthHours: 2,
    availableDays: ['tuesday', 'thursday', 'saturday'],
    sessionDurationMinutes: 50,
    scheduleFlexibility: 'moderate',
    availableEquipment: ['running_shoes', 'dumbbells', 'pullup_bar', 'bodyweight_only'],
    hasAccessToTrails: false,
    hasAccessToHills: true,
    hasAccessToStairs: true,
    hasAccessToOcrObstacles: false,
    hasGymMembership: false,
    injuriesAndRestrictions: [],
    exercisePreferences: ['bodyweight', 'running'],
    exerciseDislikes: ['heavy_barbells'],
    requiresDoctorClearance: false,
    recoveryProfile: {
      typicalSleepHours: 7.8,
      sleepQualityRating: 4,
      occupationalActivity: 'sedentary',
      generalStressLevel: 'low',
      weeklyRecoveryCapacity: 'high'
    }
  },
  {
    id: 'athlete_david',
    name: 'David Thorne (Pro Contender)',
    age: 34,
    sex: 'male',
    heightCm: 180,
    weightKg: 76,
    bodyFatPercent: 11,
    trainingAgeYears: 5,
    ocrExperienceLevel: 'advanced',
    runningExperienceLevel: 'advanced',
    resistanceExperienceLevel: 'advanced',
    currentWeeklyRunningKm: 45,
    currentWeeklyStrengthHours: 4,
    availableDays: ['monday', 'tuesday', 'wednesday', 'friday', 'saturday'],
    sessionDurationMinutes: 85,
    scheduleFlexibility: 'flexible',
    availableEquipment: ['full_gym', 'barbell', 'sandbag_heavy_carries', 'ocr_rig_access', 'trail_shoes'],
    hasAccessToTrails: true,
    hasAccessToHills: true,
    hasAccessToStairs: true,
    hasAccessToOcrObstacles: true,
    hasGymMembership: true,
    injuriesAndRestrictions: [],
    exercisePreferences: ['trail_running', 'multi_rig', 'heavy_sandbag'],
    exerciseDislikes: [],
    requiresDoctorClearance: false,
    recoveryProfile: {
      typicalSleepHours: 8.0,
      sleepQualityRating: 5,
      occupationalActivity: 'moderately_active',
      generalStressLevel: 'low',
      weeklyRecoveryCapacity: 'high'
    }
  },
  {
    id: 'athlete_marcus',
    name: 'Marcus Vance (Strength Dominant)',
    age: 31,
    sex: 'male',
    heightCm: 185,
    weightKg: 89,
    bodyFatPercent: 14,
    trainingAgeYears: 6,
    ocrExperienceLevel: 'beginner',
    runningExperienceLevel: 'beginner',
    resistanceExperienceLevel: 'elite',
    currentWeeklyRunningKm: 6,
    currentWeeklyStrengthHours: 6,
    availableDays: ['monday', 'tuesday', 'thursday', 'friday', 'saturday'],
    sessionDurationMinutes: 75,
    scheduleFlexibility: 'moderate',
    availableEquipment: ['full_gym', 'barbell', 'dumbbells', 'kettlebells', 'treadmill'],
    hasAccessToTrails: false,
    hasAccessToHills: true,
    hasAccessToStairs: true,
    hasAccessToOcrObstacles: false,
    hasGymMembership: true,
    injuriesAndRestrictions: [],
    exercisePreferences: ['deadlifts', 'farmer_carries'],
    exerciseDislikes: ['long_runs'],
    requiresDoctorClearance: false,
    recoveryProfile: {
      typicalSleepHours: 7.2,
      sleepQualityRating: 3,
      occupationalActivity: 'sedentary',
      generalStressLevel: 'moderate',
      weeklyRecoveryCapacity: 'moderate'
    }
  },
  {
    id: 'athlete_elena',
    name: 'Elena Rostova (Trail Specialist)',
    age: 28,
    sex: 'female',
    heightCm: 170,
    weightKg: 58,
    bodyFatPercent: 16,
    trainingAgeYears: 4,
    ocrExperienceLevel: 'intermediate',
    runningExperienceLevel: 'elite',
    resistanceExperienceLevel: 'beginner',
    currentWeeklyRunningKm: 60,
    currentWeeklyStrengthHours: 1.5,
    availableDays: ['monday', 'wednesday', 'thursday', 'saturday', 'sunday'],
    sessionDurationMinutes: 70,
    scheduleFlexibility: 'strict',
    availableEquipment: ['trail_shoes', 'dumbbells', 'pullup_bar', 'bodyweight_only'],
    hasAccessToTrails: true,
    hasAccessToHills: true,
    hasAccessToStairs: true,
    hasAccessToOcrObstacles: false,
    hasGymMembership: false,
    injuriesAndRestrictions: [
      {
        id: 'inj_achilles',
        bodyPart: 'right_achilles',
        description: 'Mild Achilles tightness on fast technical descents',
        isCurrent: true,
        painLevelOutOf10: 2,
        restrictedMovements: ['heavy_plyometric_depth_jumps'],
        requiresMedicalClearance: false
      }
    ],
    exercisePreferences: ['mountain_running', 'trail_tempo'],
    exerciseDislikes: ['barbell_bench'],
    requiresDoctorClearance: false,
    recoveryProfile: {
      typicalSleepHours: 7.5,
      sleepQualityRating: 4,
      occupationalActivity: 'moderately_active',
      generalStressLevel: 'moderate',
      weeklyRecoveryCapacity: 'high'
    }
  }
];

export const SEED_RACES: Record<string, RaceProfile> = {
  sprint: {
    id: 'race_spartan_sprint',
    organization: 'spartan',
    name: 'Spartan Sprint 5K',
    date: '2026-11-20',
    weeksUntilRace: 8,
    distanceCategory: 'short',
    distanceKm: 5,
    expectedDurationMinutes: 50,
    numberOfObstacles: 20,
    featuredObstacleTypes: ['8ft_wall', 'spear_throw', 'barbed_wire', 'rope_climb', 'sandbag_carry'],
    elevationGainMeters: 140,
    terrain: 'rolling_trail_hills',
    technicalDifficultyRating: 2,
    carryRequirementLevel: 'standard',
    expectedTemperatureCelsius: 22,
    expectedHumidityPercent: 45,
    altitudeMeters: 150,
    isWaterSubmersionExpected: true,
    competitiveCategory: 'open_fun',
    athleteGoal: 'complete_first_ocr'
  },
  super: {
    id: 'race_spartan_super',
    organization: 'spartan',
    name: 'Spartan Super 10K',
    date: '2026-10-15',
    weeksUntilRace: 10,
    distanceCategory: 'medium',
    distanceKm: 10,
    expectedDurationMinutes: 90,
    numberOfObstacles: 25,
    featuredObstacleTypes: ['multi_rig', 'twister', 'bucket_brigade', 'olympus_wall', 'slip_wall'],
    elevationGainMeters: 450,
    terrain: 'mud_trenches_and_swamps',
    technicalDifficultyRating: 3,
    carryRequirementLevel: 'standard',
    expectedTemperatureCelsius: 26,
    expectedHumidityPercent: 70,
    altitudeMeters: 300,
    isWaterSubmersionExpected: true,
    competitiveCategory: 'age_group_competitive',
    athleteGoal: 'finish_comfortably'
  },
  beast: {
    id: 'race_spartan_beast',
    organization: 'spartan',
    name: 'Killington Mountain Beast 21K',
    date: '2026-10-04',
    weeksUntilRace: 12,
    distanceCategory: 'long',
    distanceKm: 21,
    expectedDurationMinutes: 240,
    numberOfObstacles: 32,
    featuredObstacleTypes: ['killington_double_sandbag', 'death_march_ski_slope', 'ape_hanger', 'tyrolean_traverse'],
    elevationGainMeters: 1950,
    terrain: 'steep_technical_mountain',
    technicalDifficultyRating: 5,
    carryRequirementLevel: 'extreme_mountain',
    expectedTemperatureCelsius: 14,
    expectedHumidityPercent: 65,
    altitudeMeters: 1300,
    isWaterSubmersionExpected: true,
    competitiveCategory: 'age_group_competitive',
    athleteGoal: 'competitive_age_group_top_10'
  }
};

export function getInitialSeedPlanOutput(): PlanGenerationOutput {
  return generateComprehensiveOcrPlan(SEED_ATHLETES[1], SEED_RACES.beast, {
    cooperRunMeters: 3150,
    deadHangDurationSeconds: 100,
    trapBarDeadliftRatio: 1.95,
    strictPullUpMaxReps: 15,
    sandbagCarryDistanceMeters: 380,
    completedObstaclesOutOf18: 16
  });
}

export function getCoachClientsSeed(): CoachClientSummary[] {
  const planSarah = generateComprehensiveOcrPlan(SEED_ATHLETES[0], SEED_RACES.sprint, {
    cooperRunMeters: 1900,
    deadHangDurationSeconds: 38,
    trapBarDeadliftRatio: 1.0,
    strictPullUpMaxReps: 1
  });

  const planDavid = generateComprehensiveOcrPlan(SEED_ATHLETES[1], SEED_RACES.beast, {
    cooperRunMeters: 3150,
    deadHangDurationSeconds: 100,
    trapBarDeadliftRatio: 1.95,
    strictPullUpMaxReps: 15
  });

  const planMarcus = generateComprehensiveOcrPlan(SEED_ATHLETES[2], SEED_RACES.super, {
    cooperRunMeters: 2050,
    deadHangDurationSeconds: 110,
    trapBarDeadliftRatio: 2.35,
    strictPullUpMaxReps: 16
  });

  const planElena = generateComprehensiveOcrPlan(SEED_ATHLETES[3], SEED_RACES.sprint, {
    cooperRunMeters: 3250,
    deadHangDurationSeconds: 42,
    trapBarDeadliftRatio: 1.1,
    strictPullUpMaxReps: 3
  });

  return [
    {
      athlete: SEED_ATHLETES[1],
      targetRace: SEED_RACES.beast,
      currentPlan: planDavid.trainingPlan,
      performanceProfile: planDavid.performanceProfile,
      triageStatus: ['on_track'],
      weeklyAdherenceRatePercent: 96,
      fourWeekTrend: 'improving',
      raceReadinessScore: 88,
      nextAssessmentDueDays: 14,
      flaggedNotes: ['Optimal adaptation across mountain vert blocks. On schedule for top-10 Age Group.']
    },
    {
      athlete: SEED_ATHLETES[0],
      targetRace: SEED_RACES.sprint,
      currentPlan: planSarah.trainingPlan,
      performanceProfile: planSarah.performanceProfile,
      triageStatus: ['low_adherence', 'coach_review_required'],
      weeklyAdherenceRatePercent: 62,
      fourWeekTrend: 'regressing',
      raceReadinessScore: 64,
      nextAssessmentDueDays: 3,
      flaggedNotes: ['Missed 2 consecutive sessions due to work schedule. Needs microcycle consolidation.']
    },
    {
      athlete: SEED_ATHLETES[2],
      targetRace: SEED_RACES.super,
      currentPlan: planMarcus.trainingPlan,
      performanceProfile: planMarcus.performanceProfile,
      triageStatus: ['assessment_due'],
      weeklyAdherenceRatePercent: 88,
      fourWeekTrend: 'improving',
      raceReadinessScore: 74,
      nextAssessmentDueDays: 1,
      flaggedNotes: ['Mid-cycle 5K threshold reassessment due. Aerobic capacity is current primary limiter.']
    },
    {
      athlete: SEED_ATHLETES[3],
      targetRace: SEED_RACES.sprint,
      currentPlan: planElena.trainingPlan,
      performanceProfile: planElena.performanceProfile,
      triageStatus: ['injury_flagged'],
      weeklyAdherenceRatePercent: 82,
      fourWeekTrend: 'stable',
      raceReadinessScore: 76,
      nextAssessmentDueDays: 10,
      flaggedNotes: ['Achilles tightness flagged on technical descent. Downhill impact volume temporarily paused.']
    }
  ];
}
