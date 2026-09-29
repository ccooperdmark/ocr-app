import { 
  TrainingPhaseInfo, 
  TrainingPhaseType, 
  Mesocycle, 
  Microcycle, 
  Session 
} from '@/types/trainingPlan/plan';
import { AthleteProfile, DayOfWeek } from '@/types/trainingPlan/athlete';
import { RaceProfile } from '@/types/trainingPlan/race';
import { FullPerformanceProfile } from '@/types/trainingPlan/domains';
import { buildSession } from './sessionBuilderService';
import { validateMicrocycleInterference } from './interferenceService';

export function calculatePhasesForTimeline(totalWeeks: number): TrainingPhaseInfo[] {
  if (totalWeeks <= 4) {
    return [
      {
        phase: 'race_specific_development',
        name: 'Race-Specific Intensification',
        startWeek: 1,
        endWeek: Math.max(1, totalWeeks - 1),
        objective: 'Fine-tune obstacle pacing and compromised running thresholds.',
        volumeProfile: 'moderate',
        intensityProfile: 'high'
      },
      {
        phase: 'taper',
        name: 'Championship Taper & CNS Priming',
        startWeek: totalWeeks,
        endWeek: totalWeeks,
        objective: 'Cut volume by 50% while maintaining speed sharpness and glycogen replenishment.',
        volumeProfile: 'taper_reduced',
        intensityProfile: 'moderate'
      }
    ];
  }

  if (totalWeeks <= 8) {
    const buildWeeks = Math.floor((totalWeeks - 2) / 2);
    return [
      {
        phase: 'specific_base',
        name: 'Specific Aerobic Base & Strength Capacity',
        startWeek: 1,
        endWeek: buildWeeks,
        objective: 'Build aerobic volume and foundational pull/hinge strength.',
        volumeProfile: 'high',
        intensityProfile: 'moderate'
      },
      {
        phase: 'build',
        name: 'Threshold & Grip Hyper-Volume Build',
        startWeek: buildWeeks + 1,
        endWeek: totalWeeks - 2,
        objective: 'Elevate lactate threshold and expand loaded carry endurance.',
        volumeProfile: 'peak',
        intensityProfile: 'high'
      },
      {
        phase: 'race_specific_development',
        name: 'Race Simulation & Obstacle Fatigue Density',
        startWeek: totalWeeks - 1,
        endWeek: totalWeeks - 1,
        objective: 'Compromised carry-to-run pacing and multi-rig transitions.',
        volumeProfile: 'moderate',
        intensityProfile: 'maximal'
      },
      {
        phase: 'taper',
        name: 'Sharpening Taper & Glycogen Supercompensation',
        startWeek: totalWeeks,
        endWeek: totalWeeks,
        objective: 'Shed systemic fatigue and prime neuromuscular reactivity.',
        volumeProfile: 'taper_reduced',
        intensityProfile: 'moderate'
      }
    ];
  }

  // Standard 12-week macrocycle
  return [
    {
      phase: 'preparation_introductory',
      name: 'Anatomical Adaptation & Joint Armor',
      startWeek: 1,
      endWeek: 2,
      objective: 'Tissue durability, movement patterns, and tendon conditioning.',
      volumeProfile: 'low',
      intensityProfile: 'low'
    },
    {
      phase: 'general_base',
      name: 'Aerobic Engine & Relative Strength Base',
      startWeek: 3,
      endWeek: 5,
      objective: 'Zone 2 aerobic threshold expansion and structural deadlift/pull strength.',
      volumeProfile: 'high',
      intensityProfile: 'moderate'
    },
    {
      phase: 'build',
      name: 'Threshold Vert & Loaded Carry Overload',
      startWeek: 6,
      endWeek: 8,
      objective: 'Mountain vert hiking and heavy sandbag carry volume.',
      volumeProfile: 'peak',
      intensityProfile: 'high'
    },
    {
      phase: 'race_specific_development',
      name: 'Compromised Race Simulation & Grip Mastery',
      startWeek: 9,
      endWeek: 10,
      objective: 'Carry-to-run intervals and fatigued multi-rig obstacle gauntlets.',
      volumeProfile: 'high',
      intensityProfile: 'maximal'
    },
    {
      phase: 'peak',
      name: 'Course Simulation Peak',
      startWeek: 11,
      endWeek: 11,
      objective: 'Full race simulation at target race effort.',
      volumeProfile: 'moderate',
      intensityProfile: 'maximal'
    },
    {
      phase: 'taper',
      name: 'Peaking Taper & Recovery',
      startWeek: 12,
      endWeek: 12,
      objective: 'Cut volume 50%, maintain 2 short race-pace pickups, maximize freshness.',
      volumeProfile: 'taper_reduced',
      intensityProfile: 'moderate'
    }
  ];
}

export function generateWeeklyMicrocycle(
  weekNumber: number,
  phase: TrainingPhaseType,
  isDeload: boolean,
  athlete: AthleteProfile,
  race: RaceProfile,
  profile: FullPerformanceProfile
): Microcycle {
  const days = athlete.availableDays;
  const sessions: Session[] = [];

  // Determine weekly target mileage & vert according to race distance
  let baseMileage = 20;
  let baseVert = 300;

  if (race.distanceCategory === 'short') {
    baseMileage = 15;
    baseVert = 200;
  } else if (race.distanceCategory === 'medium') {
    baseMileage = 25;
    baseVert = 500;
  } else if (race.distanceCategory === 'long') {
    baseMileage = 35;
    baseVert = 900;
  } else if (race.distanceCategory === 'ultra') {
    baseMileage = 50;
    baseVert = 1800;
  }

  // Adjust for athlete current weekly volume
  const athleteBaseKm = athlete.currentWeeklyRunningKm || 15;
  const targetKm = Math.round(isDeload ? athleteBaseKm * 0.65 : Math.min(athleteBaseKm * 1.15, baseMileage));
  const targetVert = Math.round(isDeload ? baseVert * 0.6 : baseVert);

  // Distribute sessions across available days
  // Day prioritization strategy based on primary limiters
  const gripIsPrimary = profile.domainEvaluations.grip_hanging?.trainingPriority === 'primary_priority';
  const aeroIsPrimary = profile.domainEvaluations.aerobic_endurance?.trainingPriority === 'primary_priority';
  const carryIsPrimary = profile.domainEvaluations.loaded_carries?.trainingPriority === 'primary_priority';

  // Available day mapping
  days.forEach((day, idx) => {
    let session: Session;

    if (idx === 0) {
      // First day: Foundational strength or aero
      session = buildSession(
        'maximal_strength',
        day,
        athlete,
        true,
        'Heavy primary strength session scheduled fresh after weekend recovery.'
      );
    } else if (idx === 1) {
      // Second day: Aerobic base or grip
      session = buildSession(
        gripIsPrimary ? 'grip_and_hanging_armor' : 'aerobic_run_engine',
        day,
        athlete,
        false,
        gripIsPrimary 
          ? 'Specialized grip session to address identified forearm fatigue bottleneck.'
          : 'Strict Zone 2 aerobic volume to build mitochondrial density.'
      );
    } else if (idx === 2) {
      // Third day: Loaded carry or hill climbing
      session = buildSession(
        carryIsPrimary ? 'loaded_carry_complex' : 'trail_mountain_vert',
        day,
        athlete,
        true,
        'Loaded carry / vert session separated by 48 hours from maximal deadlifts to prevent spinal fatigue.'
      );
    } else if (idx === 3) {
      // Fourth day: Active restoration or hybrid compromised
      session = buildSession(
        phase === 'race_specific_development' || phase === 'build'
          ? 'hybrid_compromised_ocr'
          : 'aerobic_run_engine',
        day,
        athlete,
        phase === 'race_specific_development',
        'Race transition rehearsal combining carries and immediate running pace pickups.'
      );
    } else if (idx >= 4) {
      // Fifth+ day: Long run or recovery
      session = buildSession(
        idx === days.length - 1 ? 'aerobic_run_engine' : 'grip_and_hanging_armor',
        day,
        athlete,
        false,
        'Weekend long aerobic exposure to calibrate race nutrition and steady pacing.'
      );
    } else {
      session = buildSession('active_recovery', day, athlete, false, 'Scheduled rest and tissue regeneration.');
    }

    sessions.push(session);
  });

  // Verify interference rules
  const validation = validateMicrocycleInterference(sessions);
  if (!validation.isValid && sessions.length >= 2) {
    // Swap day 2 session to active recovery if consecutive hard clash detected
    if (sessions[0].isHardSession && sessions[1].isHardSession) {
      sessions[1] = buildSession('active_recovery', sessions[1].dayOfWeek, athlete, false, 'Auto-adjusted to resolve consecutive-day CNS fatigue clash.');
    }
  }

  return {
    weekNumber,
    phase,
    isDeloadWeek: isDeload,
    weeklyTargetRunningKm: targetKm,
    weeklyTargetElevationMeters: targetVert,
    weeklyGripVolumeScore: isDeload ? 45 : 85,
    weeklyFocusSummary: isDeload
      ? 'Deload & Regeneration: Volume cut by 35% to absorb fitness adaptations and heal connective tissues.'
      : `Week ${weekNumber} Focus: Progressive volume overload targeting ${profile.primaryLimiters[0] || 'Aerobic Engine'} with strict 48h recovery separation.`,
    sessions
  };
}
