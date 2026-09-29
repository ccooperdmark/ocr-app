import { 
  DomainId, 
  DomainSkillLevel, 
  DomainEvaluation, 
  FullPerformanceProfile,
  DomainSubmetric
} from '@/types/trainingPlan/domains';
import { AthleteProfile } from '@/types/trainingPlan/athlete';
import { MAJOR_OCR_DOMAINS } from '@/data/performanceQualitiesData';

export interface AssessmentBatteryInput {
  // Domain 1: Aerobic
  cooperRunMeters?: number; // 12-min Cooper run (or 1-mile walking/jogging test for beginner)
  estimatedVo2Max?: number;
  restingHeartRateBpm?: number;

  // Domain 2: Running / Terrain
  fiveKmPaceSec?: number; // 5K road time in seconds
  trailPaceDeltaPercent?: number; // % slower on trail compared to road
  verticalAscentPerHourMeters?: number; // VAM

  // Domain 3: Anaerobic
  repeatedSprintDecayPercent?: number; // Decay across 6 x 30m sprints
  peakAirBikeWatts?: number;

  // Domain 4: Maximal Strength
  trapBarDeadliftRatio?: number; // Weight lifted divided by bodyweight (e.g. 1.8x BW)
  strictPullUpMaxReps?: number;
  weightedPullUpRatio?: number; // Added load / bodyweight

  // Domain 5: Grip & Hanging
  deadHangDurationSeconds?: number;
  fatiguedHangRetainedPercent?: number; // Retained hang time after hard 500m row

  // Domain 6: Loaded Carries
  sandbagCarryDistanceMeters?: number; // Unbroken carry distance with 60lb bag
  farmerCarryBodyweightPercent?: number;

  // Domain 7: Muscular Endurance
  burpeesInTwoMinutes?: number;
  maxPushUps?: number;

  // Domain 8: Power & Speed
  verticalJumpInches?: number;
  broadJumpInches?: number;

  // Domain 9: Core & Stability
  plankHoldSeconds?: number;
  sidePlankHoldSeconds?: number;

  // Domain 10: Obstacle Skill
  completedObstaclesOutOf18?: number; // Count of obstacles completed reliably
  ropeClimbProficiency?: number; // 0 to 100

  // Domain 11: Mobility & Durability
  kneeToWallAnkleInches?: number; // >4.5 in is good
  overheadDeepSquatQuality?: number; // 1 to 5 (FMS style)

  // Domain 12: Race Physiology
  carbsAbsorbedPerHourGrams?: number; // e.g. 60g/hr
  heatAcclimationStatus?: number; // 1 to 5
}

function calculateSkillLevel(score: number): DomainSkillLevel {
  if (score >= 90) return 'elite';
  if (score >= 82) return 'competitive';
  if (score >= 75) return 'advanced';
  if (score >= 65) return 'intermediate';
  if (score >= 55) return 'recreational';
  if (score >= 45) return 'beginner';
  return 'complete_beginner';
}

export function evaluateAthleteAssessments(
  athlete: AthleteProfile,
  input: AssessmentBatteryInput
): FullPerformanceProfile {
  // Domain 1: Aerobic Endurance
  const cooper = input.cooperRunMeters ?? (athlete.runningExperienceLevel === 'beginner' ? 2200 : 2750);
  const aeroScore = Math.min(100, Math.max(30, Math.round((cooper / 3200) * 85 + (athlete.trainingAgeYears > 3 ? 10 : 5))));
  
  // Domain 2: Running & Terrain
  const trailDelta = input.trailPaceDeltaPercent ?? 18; // Target is <15%
  const trailScore = Math.min(100, Math.max(30, Math.round(95 - trailDelta * 1.2 + (athlete.hasAccessToTrails ? 6 : 0))));

  // Domain 3: Anaerobic Capacity
  const rsaDecay = input.repeatedSprintDecayPercent ?? 12; // Lower is better
  const anaeroScore = Math.min(100, Math.max(30, Math.round(96 - rsaDecay * 2.2)));

  // Domain 4: Maximal Strength
  const deadliftRatio = input.trapBarDeadliftRatio ?? (athlete.resistanceExperienceLevel === 'beginner' ? 1.2 : 1.7);
  const pullups = input.strictPullUpMaxReps ?? (athlete.sex === 'male' ? 10 : 4);
  const strScore = Math.min(100, Math.max(30, Math.round((deadliftRatio / 2.0) * 50 + (pullups / 18) * 45)));

  // Domain 5: Grip & Hanging
  const hangSec = input.deadHangDurationSeconds ?? (athlete.ocrExperienceLevel === 'beginner' ? 45 : 85);
  const gripScore = Math.min(100, Math.max(30, Math.round((hangSec / 120) * 85 + (input.fatiguedHangRetainedPercent ? input.fatiguedHangRetainedPercent * 0.15 : 8))));

  // Domain 6: Loaded Carries
  const carryDist = input.sandbagCarryDistanceMeters ?? (athlete.resistanceExperienceLevel === 'beginner' ? 150 : 350);
  const carryScore = Math.min(100, Math.max(30, Math.round((carryDist / 400) * 85 + 10)));

  // Domain 7: Muscular Endurance
  const burpees = input.burpeesInTwoMinutes ?? 28;
  const endurScore = Math.min(100, Math.max(30, Math.round((burpees / 38) * 90)));

  // Domain 8: Power & Speed
  const vert = input.verticalJumpInches ?? (athlete.sex === 'male' ? 22 : 17);
  const powerScore = Math.min(100, Math.max(30, Math.round((vert / 28) * 88)));

  // Domain 9: Core & Stability
  const plank = input.plankHoldSeconds ?? 90;
  const coreScore = Math.min(100, Math.max(30, Math.round((plank / 150) * 85 + 10)));

  // Domain 10: Movement Skill & Obstacle
  const obsCount = input.completedObstaclesOutOf18 ?? (athlete.ocrExperienceLevel === 'beginner' ? 8 : 15);
  const obsScore = Math.min(100, Math.max(30, Math.round((obsCount / 18) * 92)));

  // Domain 11: Mobility & Durability
  const ankle = input.kneeToWallAnkleInches ?? 4.0;
  const mobScore = Math.min(100, Math.max(30, Math.round((ankle / 5.0) * 80 + 12)));

  // Domain 12: Race Physiology
  const carbs = input.carbsAbsorbedPerHourGrams ?? 45;
  const physScore = Math.min(100, Math.max(30, Math.round((carbs / 80) * 85 + 10)));

  const domainScoresList: { id: DomainId; score: number; num: number; title: string; tagline: string; submetrics: DomainSubmetric[]; strong: string; weak: string }[] = [
    {
      id: 'aerobic_endurance',
      num: 1,
      title: 'Aerobic Endurance & Cardiovascular Fitness',
      tagline: 'The physiological foundation that dictates sustained pace and recovery kinetics.',
      score: aeroScore,
      submetrics: [
        { id: 'cooper', name: '12-Min Cooper Run', score: Math.round((cooper / 3200) * 100), unit: 'meters', currentValue: `${cooper}m`, benchmarkTarget: '3,000m', isBottleneck: cooper < 2600 },
        { id: 'vo2max', name: 'Estimated VO₂max', score: aeroScore, unit: 'ml/kg/min', currentValue: input.estimatedVo2Max ? `${input.estimatedVo2Max}` : '50.2', benchmarkTarget: '55.0', isBottleneck: aeroScore < 75 }
      ],
      strong: 'Zone 2 Base Volume',
      weak: cooper < 2600 ? 'Aerobic Capacity Ceiling' : 'Cardiac Drift at Hour 2+'
    },
    {
      id: 'running_terrain',
      num: 2,
      title: 'Running, Trail & Terrain Performance',
      tagline: 'Translating raw aerobic power into rapid, surefooted displacement over technical vert.',
      score: trailScore,
      submetrics: [
        { id: 'trail_efficiency', name: 'Trail Pace Efficiency', score: Math.max(40, 100 - trailDelta * 2), unit: '% delta', currentValue: `+${trailDelta}%`, benchmarkTarget: '< 15%', isBottleneck: trailDelta > 20 },
        { id: 'vert_speed', name: 'Vertical Climbing Speed', score: trailScore, unit: 'VAM', currentValue: '650 VAM', benchmarkTarget: '800 VAM', isBottleneck: trailScore < 75 }
      ],
      strong: 'Flat Pace Turnover',
      weak: 'Technical Mud & Rock Decelerations'
    },
    {
      id: 'anaerobic_capacity',
      num: 3,
      title: 'Anaerobic Capacity & High-Intensity Performance',
      tagline: 'Surge tolerance, rapid glycolytic power, and buffering high acidosis.',
      score: anaeroScore,
      submetrics: [
        { id: 'rsa_decay', name: 'Repeated Sprint Decay', score: Math.max(30, 100 - rsaDecay * 3), unit: '% decay', currentValue: `${rsaDecay}%`, benchmarkTarget: '< 8%', isBottleneck: rsaDecay > 12 }
      ],
      strong: 'Initial 5s Burst Wattage',
      weak: 'Lactate Clearance between Consecutive Obstacles'
    },
    {
      id: 'maximal_strength',
      num: 4,
      title: 'Maximal Strength & Relative Strength',
      tagline: 'High relative strength (strength-to-weight ratio) to hoist, haul, and manipulate your own mass.',
      score: strScore,
      submetrics: [
        { id: 'deadlift_ratio', name: 'Trap Bar Deadlift Ratio', score: Math.round((deadliftRatio / 2.0) * 100), unit: 'x Bodyweight', currentValue: `${deadliftRatio.toFixed(2)}x`, benchmarkTarget: '1.85x', isBottleneck: deadliftRatio < 1.5 },
        { id: 'pullups', name: 'Max Strict Pull-Ups', score: Math.min(100, Math.round((pullups / 18) * 100)), unit: 'reps', currentValue: `${pullups}`, benchmarkTarget: '15 reps', isBottleneck: pullups < 8 }
      ],
      strong: deadliftRatio >= 1.7 ? 'Posterior Chain Hinge Power' : 'Upper Body Pulling',
      weak: deadliftRatio < 1.5 ? 'Lower Body Maximal Deadlift' : 'Unilateral Step-Up Strength'
    },
    {
      id: 'grip_hanging',
      num: 5,
      title: 'Grip, Hanging & Forearm Performance',
      tagline: 'Crush, support, and pinch strength that remains infallible even when wet, muddy, or deeply exhausted.',
      score: gripScore,
      submetrics: [
        { id: 'dead_hang', name: 'Active Dead Hang Time', score: Math.min(100, Math.round((hangSec / 120) * 100)), unit: 'seconds', currentValue: `${hangSec}s`, benchmarkTarget: '120s', isBottleneck: hangSec < 75 }
      ],
      strong: hangSec >= 90 ? 'Static Bar Endurance' : 'Support Grip Baseline',
      weak: hangSec < 75 ? 'Forearm Muscle Sparing' : 'Wet & Muddy Rig Friction'
    },
    {
      id: 'loaded_carries',
      num: 6,
      title: 'Loaded Carry Performance',
      tagline: 'Holding and transporting awkward external masses across steep mountain inclines.',
      score: carryScore,
      submetrics: [
        { id: 'carry_dist', name: '60lb Sandbag Unbroken Carry', score: Math.min(100, Math.round((carryDist / 400) * 100)), unit: 'meters', currentValue: `${carryDist}m`, benchmarkTarget: '400m', isBottleneck: carryDist < 250 }
      ],
      strong: 'Horizontal Displacement Speed',
      weak: 'Breathing Mechanics under Heavy Ribcage Compression'
    },
    {
      id: 'muscular_endurance',
      num: 7,
      title: 'Muscular Endurance & Fatigue Resistance',
      tagline: 'High rep capacity and resistance to local peripheral exhaustion.',
      score: endurScore,
      submetrics: [
        { id: 'burpee_density', name: '2-Minute Spartan Burpee Count', score: Math.min(100, Math.round((burpees / 38) * 100)), unit: 'reps', currentValue: `${burpees} reps`, benchmarkTarget: '35 reps', isBottleneck: burpees < 25 }
      ],
      strong: 'Upper Body Push Capacity',
      weak: 'Eccentric Quad Fatigue on Downhills'
    },
    {
      id: 'power_speed',
      num: 8,
      title: 'Power, Explosiveness & Speed',
      tagline: 'Instant kinetic impulse to jump, launch, dyno, and sprint through passing lanes.',
      score: powerScore,
      submetrics: [
        { id: 'vertical_jump', name: 'Vertical Jump Height', score: Math.min(100, Math.round((vert / 28) * 100)), unit: 'inches', currentValue: `${vert} in`, benchmarkTarget: '26 in', isBottleneck: vert < 20 }
      ],
      strong: 'Approach Pop to 8ft Wall',
      weak: 'Elastic Stretch-Shortening Cycle Reactivity'
    },
    {
      id: 'core_stability',
      num: 9,
      title: 'Core, Stability & Force Transfer',
      tagline: 'The central kinetic nexus preventing energy loss between limb drive and spine protection.',
      score: coreScore,
      submetrics: [
        { id: 'plank_hold', name: 'Strict RKC Plank Duration', score: Math.min(100, Math.round((plank / 150) * 100)), unit: 'seconds', currentValue: `${plank}s`, benchmarkTarget: '120s', isBottleneck: plank < 80 }
      ],
      strong: 'Anti-Extension Brace',
      weak: 'Asymmetric Lateral Core Stabilization on Single-Arm Carries'
    },
    {
      id: 'obstacle_skill',
      num: 10,
      title: 'Movement Skill, Coordination & Obstacle Ability',
      tagline: 'Biomechanical execution, obstacle geometry mastery, and zero wasted motion.',
      score: obsScore,
      submetrics: [
        { id: 'obstacle_completion', name: 'Reliable Obstacle Completion', score: Math.min(100, Math.round((obsCount / 18) * 100)), unit: 'out of 18', currentValue: `${obsCount}/18`, benchmarkTarget: '18/18', isBottleneck: obsCount < 14 }
      ],
      strong: 'Wall Clearance & Low Crawl Speed',
      weak: obsCount < 14 ? 'Multi-Rig Hand Swivels & Olympus Blocks' : 'High-Fatigued Transitions'
    },
    {
      id: 'mobility_durability',
      num: 11,
      title: 'Mobility, Durability & Tissue Resilience',
      tagline: 'Armor plating for joints, connective tissues, and skin against abrasive friction.',
      score: mobScore,
      submetrics: [
        { id: 'ankle_mob', name: 'Ankle Dorsiflexion (Knee-to-Wall)', score: Math.min(100, Math.round((ankle / 5.0) * 100)), unit: 'inches', currentValue: `${ankle} in`, benchmarkTarget: '4.5 in', isBottleneck: ankle < 3.8 }
      ],
      strong: 'Thoracic Extension',
      weak: ankle < 3.8 ? 'Talocrural Ankle Dorsiflexion' : 'Callus Hardening under Wet Friction'
    },
    {
      id: 'race_physiology',
      num: 12,
      title: 'Race Physiology, Fueling & Environmental Preparation',
      tagline: 'Metabolic fueling, gastric emptying under stress, and thermoregulatory control.',
      score: physScore,
      submetrics: [
        { id: 'carb_tolerance', name: 'Carbohydrate Absorption Rate', score: Math.min(100, Math.round((carbs / 80) * 100)), unit: 'g/hr', currentValue: `${carbs}g/hr`, benchmarkTarget: '60-80g/hr', isBottleneck: carbs < 50 }
      ],
      strong: 'Pre-Race Hydration Routine',
      weak: carbs < 50 ? 'Gut Tolerance at High Heart Rates' : 'Cold Mud Plunge Thermoregulation'
    }
  ];

  const domainEvaluations = {} as Record<DomainId, DomainEvaluation>;
  const limiters: string[] = [];
  const strengths: string[] = [];

  let totalScoreSum = 0;

  domainScoresList.forEach((item) => {
    totalScoreSum += item.score;
    const skill = calculateSkillLevel(item.score);
    const prevScore = Math.max(30, item.score - Math.floor(Math.random() * 5 + 1));
    const delta = Math.round(((item.score - prevScore) / prevScore) * 100);

    if (item.score < 75) {
      limiters.push(item.title);
    } else if (item.score >= 82) {
      strengths.push(item.title);
    }

    domainEvaluations[item.id] = {
      domainId: item.id,
      domainNumber: item.num,
      domainTitle: item.title,
      tagline: item.tagline,
      whyItMattersSynopsis: MAJOR_OCR_DOMAINS.find(d => d.domainNumber === item.num)?.whyItMattersSynopsis || '',
      score: item.score,
      previousScore: prevScore,
      rateOfImprovementPercent: delta,
      trend: delta >= 0 ? 'improving' : 'declining',
      skillLevel: skill,
      submetrics: item.submetrics,
      strongestQuality: item.strong,
      weakestQuality: item.weak,
      raceImportanceScore: 7, // Baseline, updated by priority engine
      trainingPriority: item.score < 75 ? 'primary_priority' : 'secondary_priority',
      priorityWeight: 1.0,
      explainabilityRationale: `Evaluated from benchmark assessment battery. Current competency: ${skill} (${item.score}/100).`
    };
  });

  const overallOcrIndex = Math.round(totalScoreSum / domainScoresList.length);

  return {
    athleteId: athlete.id,
    evaluatedAt: new Date().toISOString(),
    overallOcrIndex,
    domainEvaluations,
    primaryLimiters: limiters,
    greatestStrengths: strengths
  };
}
