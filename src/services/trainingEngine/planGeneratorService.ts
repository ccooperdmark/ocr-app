import { AthleteProfile } from '@/types/trainingPlan/athlete';
import { RaceProfile } from '@/types/trainingPlan/race';
import { FullPerformanceProfile } from '@/types/trainingPlan/domains';
import { TrainingPlan, Mesocycle, Microcycle } from '@/types/trainingPlan/plan';
import { evaluateAthleteAssessments, AssessmentBatteryInput } from './domainAssessmentService';
import { computeTrainingPriorities } from './priorityEngine';
import { calculatePhasesForTimeline, generateWeeklyMicrocycle } from './periodizationService';
import { verifyTrainingPlanQuality, QualityControlVerification } from './qualityControlService';

export interface PlanGenerationOutput {
  athleteProfile: AthleteProfile;
  targetRace: RaceProfile;
  timeUntilRaceWeeks: number;
  trainingAvailabilityDays: string[];
  primaryGoal: string;
  performanceProfile: FullPerformanceProfile;
  primaryLimiters: string[];
  trainingPriorities: {
    domainTitle: string;
    priority: string;
    weight: number;
    reason: string;
  }[];
  currentTrainingPhase: string;
  weeklyStructureSummary: string;
  domainAllocationBreakdown: Record<string, number>; // Domain -> weekly minutes
  trainingPlan: TrainingPlan;
  progressionRules: string[];
  assessmentSchedule: string[];
  deloadStrategy: string;
  raceSpecificPreparation: string;
  taperPlan: string;
  qualityControlResult: QualityControlVerification;
}

export function generateComprehensiveOcrPlan(
  athlete: AthleteProfile,
  race: RaceProfile,
  assessments?: AssessmentBatteryInput
): PlanGenerationOutput {
  // 1. Run Domain Assessment System
  const baselineProfile = evaluateAthleteAssessments(athlete, assessments || {});

  // 2. Run Priority Engine
  const prioritizedProfile = computeTrainingPriorities(athlete, race, baselineProfile);

  // 3. Calculate Periodized Phases
  const totalWeeks = Math.max(2, race.weeksUntilRace);
  const phases = calculatePhasesForTimeline(totalWeeks);

  // 4. Generate Mesocycles and Microcycles
  const mesocycles: Mesocycle[] = [];
  const weeksPerBlock = 4;
  const numBlocks = Math.ceil(totalWeeks / weeksPerBlock);

  let currentWeekNum = 1;
  for (let b = 0; b < numBlocks; b++) {
    const blockWeeks: Microcycle[] = [];
    const weeksInThisBlock = Math.min(weeksPerBlock, totalWeeks - (currentWeekNum - 1));

    for (let w = 0; w < weeksInThisBlock; w++) {
      // 3:1 Overload to Deload ratio (every 4th week is a deload, unless it's a taper week)
      const isDeload = (w === 3 && currentWeekNum < totalWeeks - 1) || (currentWeekNum === totalWeeks);
      
      // Determine active phase
      const currentPhaseInfo = phases.find(
        (p) => currentWeekNum >= p.startWeek && currentWeekNum <= p.endWeek
      ) || phases[0];

      const microcycle = generateWeeklyMicrocycle(
        currentWeekNum,
        currentPhaseInfo.phase,
        isDeload,
        athlete,
        race,
        prioritizedProfile
      );

      blockWeeks.push(microcycle);
      currentWeekNum++;
    }

    mesocycles.push({
      blockNumber: b + 1,
      name: `Mesocycle Block ${b + 1} (${phases[Math.min(b, phases.length - 1)].name})`,
      weeksCount: blockWeeks.length,
      primaryAdaptationGoal: phases[Math.min(b, phases.length - 1)].objective,
      weeks: blockWeeks
    });
  }

  // 5. Build Master Training Plan Object
  const trainingPlan: TrainingPlan = {
    id: `plan_${athlete.id}_${race.id}_${Date.now()}`,
    athleteId: athlete.id,
    raceId: race.id,
    createdAt: new Date().toISOString(),
    totalDurationWeeks: totalWeeks,
    phases,
    mesocycles,
    weeklyTemplateSummary: `${athlete.availableDays.length} training days per week (${athlete.availableDays.map(d => d.slice(0,3).toUpperCase()).join(', ')}). Balanced across chassis strength, threshold running, and grip/carry endurance.`,
    progressionRulesSummary: 'Volume progressions capped at +8% per week. Progress to higher-level regressions only upon clean execution with target RPE <= 8.',
    assessmentScheduleSummary: 'Reassess 12-domain battery every 4 weeks at the culmination of each recovery deload week.',
    deloadStrategySummary: 'Every 4th week drops volume by 35% while preserving race-pace neuromuscular sharpness.',
    taperPlanSummary: 'Final 10-14 days cuts volume by 50-60% while maintaining short explosive obstacle pickups to maximize glycogen supercompensation.'
  };

  // 6. Run Quality Control Verification
  const qualityControlResult = verifyTrainingPlanQuality(
    trainingPlan,
    athlete,
    race,
    prioritizedProfile
  );

  // 7. Calculate Domain Allocation Breakdown
  const domainAllocation: Record<string, number> = {};
  const firstWeekSessions = mesocycles[0]?.weeks[0]?.sessions || [];
  firstWeekSessions.forEach((s) => {
    s.primaryDomains.forEach((d) => {
      domainAllocation[d] = (domainAllocation[d] || 0) + s.estimatedDurationMinutes;
    });
  });

  // 8. Generate 32-Point Output
  return {
    athleteProfile: athlete,
    targetRace: race,
    timeUntilRaceWeeks: totalWeeks,
    trainingAvailabilityDays: athlete.availableDays,
    primaryGoal: race.athleteGoal.replace(/_/g, ' ').toUpperCase(),
    performanceProfile: prioritizedProfile,
    primaryLimiters: prioritizedProfile.primaryLimiters,
    trainingPriorities: Object.values(prioritizedProfile.domainEvaluations).map((d) => ({
      domainTitle: d.domainTitle,
      priority: d.trainingPriority.replace(/_/g, ' ').toUpperCase(),
      weight: d.priorityWeight,
      reason: d.explainabilityRationale
    })),
    currentTrainingPhase: phases[0]?.name || 'Preparation & Base Foundation',
    weeklyStructureSummary: trainingPlan.weeklyTemplateSummary,
    domainAllocationBreakdown: domainAllocation,
    trainingPlan,
    progressionRules: [
      'Overload variable 1: Repetition density and distance before adding external barbell/sandbag load.',
      'Overload variable 2: Introduce fatigue prior to obstacle attempts (e.g. 400m hard run into rig traverse).',
      'Overload variable 3: Unilateral and asymmetric carry loading over steep trail vert.'
    ],
    assessmentSchedule: [
      'Week 1: Baseline 12-Domain Assessment Battery.',
      'Week 4: Mid-Mesocycle Grip & Compromised Pace Decay Test.',
      'Week 8: Full 18-Obstacle Proficiency Reassessment.',
      'Week 11 (Taper entry): Final Peak Readiness Benchmark.'
    ],
    deloadStrategy: 'Scheduled 3:1 wave loading. Volume cut by 35%, intensity held at 85% to maintain motor unit recruitment while restoring endocrine balance.',
    raceSpecificPreparation: `${race.name} course profile requires high ${race.terrain.replace(/_/g, ' ')} tolerance, ${race.numberOfObstacles} obstacles, and ${race.elevationGainMeters}m of vert. Specific focus allocated to ${prioritizedProfile.primaryLimiters[0] || 'Grip & Carry Engine'}.`,
    taperPlan: `Final 14-day exponential taper: Week ${totalWeeks - 1} volume reduced by 30%; Week ${totalWeeks} volume reduced by 55%. High carbohydrate loading (8g/kg) initiated 48 hours before start line.`,
    qualityControlResult
  };
}
