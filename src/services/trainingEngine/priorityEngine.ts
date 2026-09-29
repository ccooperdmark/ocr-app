import { AthleteProfile } from '@/types/trainingPlan/athlete';
import { RaceProfile } from '@/types/trainingPlan/race';
import { 
  DomainId, 
  FullPerformanceProfile, 
  TrainingPriorityLevel 
} from '@/types/trainingPlan/domains';

// Base race demand multipliers (1 to 10 scale) per distance and terrain
export function calculateRaceDomainDemands(race: RaceProfile): Record<DomainId, number> {
  const demands: Record<DomainId, number> = {
    aerobic_endurance: 7,
    running_terrain: 7,
    anaerobic_capacity: 7,
    maximal_strength: 6,
    grip_hanging: 8,
    loaded_carries: 7,
    muscular_endurance: 7,
    power_speed: 6,
    core_stability: 7,
    obstacle_skill: 8,
    mobility_durability: 7,
    race_physiology: 6
  };

  // Adjust for distance category
  switch (race.distanceCategory) {
    case 'short': // Sprint (3K-5K)
      demands.power_speed += 2;
      demands.anaerobic_capacity += 2;
      demands.obstacle_skill += 1;
      demands.race_physiology -= 2;
      demands.aerobic_endurance -= 1;
      break;
    case 'medium': // Super (10K)
      demands.aerobic_endurance += 1;
      demands.muscular_endurance += 1;
      demands.grip_hanging += 1;
      demands.loaded_carries += 1;
      break;
    case 'long': // Beast (21K)
      demands.aerobic_endurance += 2;
      demands.running_terrain += 2;
      demands.loaded_carries += 2;
      demands.race_physiology += 2;
      demands.power_speed -= 1;
      demands.anaerobic_capacity -= 1;
      break;
    case 'ultra': // Ultra (50K)
      demands.aerobic_endurance += 3;
      demands.running_terrain += 3;
      demands.mobility_durability += 2;
      demands.race_physiology += 3;
      demands.power_speed -= 2;
      demands.anaerobic_capacity -= 2;
      break;
  }

  // Adjust for terrain & elevation
  if (race.elevationGainMeters > 800 || race.terrain === 'steep_technical_mountain') {
    demands.running_terrain += 2;
    demands.loaded_carries += 1;
    demands.mobility_durability += 1;
  }

  // Adjust for extreme carry courses (e.g. Palmerton / Killington)
  if (race.carryRequirementLevel === 'extreme_mountain') {
    demands.loaded_carries += 2;
    demands.grip_hanging += 1;
    demands.maximal_strength += 1;
  }

  // Normalize between 1 and 10
  for (const k in demands) {
    demands[k as DomainId] = Math.min(10, Math.max(1, demands[k as DomainId]));
  }

  return demands;
}

export function computeTrainingPriorities(
  athlete: AthleteProfile,
  race: RaceProfile,
  profile: FullPerformanceProfile
): FullPerformanceProfile {
  const raceDemands = calculateRaceDomainDemands(race);
  const updatedProfile = { ...profile };
  const updatedEvaluations = { ...profile.domainEvaluations };

  const timeFactor = race.weeksUntilRace <= 4 ? 1.3 : race.weeksUntilRace <= 8 ? 1.15 : 1.0;
  const availabilityFactor = athlete.availableDays.length >= 5 ? 1.2 : athlete.availableDays.length <= 3 ? 0.85 : 1.0;

  // Compute raw priority score for every domain
  const scoredDomains: { domainId: DomainId; rawPriority: number; reason: string }[] = [];

  for (const domainIdKey in updatedEvaluations) {
    const dId = domainIdKey as DomainId;
    const evalData = updatedEvaluations[dId];
    
    // Ability gap: Higher when score is low (e.g. 100 - score)
    const abilityGap = Math.max(5, 100 - evalData.score);
    const demand = raceDemands[dId] ?? 6;
    
    // Core formula: ATHLETE ABILITY GAP × RACE REQUIREMENTS × TIME FACTOR × AVAILABILITY
    const rawPriority = (abilityGap / 100) * demand * timeFactor * availabilityFactor;

    // Check active injury or medical restrictions
    const hasRestrictedInjury = athlete.injuriesAndRestrictions.some((inj) => inj.isCurrent && inj.painLevelOutOf10 >= 4);

    let reason = '';
    if (evalData.score < 70 && demand >= 7) {
      reason = `Designated PRIMARY PRIORITY because your current competency (${evalData.score}/100) presents a critical bottleneck for the high ${race.name} race demands (demand level ${demand}/10).`;
    } else if (evalData.score >= 82 && demand <= 7) {
      reason = `Designated MAINTENANCE: You possess strong mastery (${evalData.score}/100) which will be maintained with minimal efficient dose while resources shift to lagging limiters.`;
    } else if (hasRestrictedInjury && (dId === 'maximal_strength' || dId === 'running_terrain')) {
      reason = `Designated RECOVERY / REDUCED EXPOSURE due to active movement restriction flag (${athlete.injuriesAndRestrictions[0]?.description || 'Injury'}). Focus is placed on tissue tolerance and non-aggravating alternatives.`;
    } else {
      reason = `Designated SECONDARY PRIORITY: Steady progressive overload to align with race timeline over the next ${race.weeksUntilRace} weeks.`;
    }

    scoredDomains.push({ domainId: dId, rawPriority, reason });
  }

  // Sort domains by raw priority descending
  scoredDomains.sort((a, b) => b.rawPriority - a.rawPriority);

  // Classify top 3 as Primary Priority, bottom 2 as Maintenance or Recovery, rest as Secondary
  scoredDomains.forEach((item, index) => {
    let priorityLevel: TrainingPriorityLevel = 'secondary_priority';

    // Check for specific injury override first
    const hasSeverePain = athlete.injuriesAndRestrictions.some((inj) => inj.isCurrent && inj.painLevelOutOf10 >= 5);
    if (hasSeverePain && (item.domainId === 'maximal_strength' || item.domainId === 'power_speed')) {
      priorityLevel = 'recovery_reduced';
    } else if (index < 3) {
      priorityLevel = 'primary_priority';
    } else if (index >= 9 && updatedEvaluations[item.domainId].score >= 80) {
      priorityLevel = 'maintenance';
    } else {
      priorityLevel = 'secondary_priority';
    }

    updatedEvaluations[item.domainId] = {
      ...updatedEvaluations[item.domainId],
      raceImportanceScore: raceDemands[item.domainId],
      priorityWeight: parseFloat(item.rawPriority.toFixed(2)),
      trainingPriority: priorityLevel,
      explainabilityRationale: item.reason
    };
  });

  updatedProfile.domainEvaluations = updatedEvaluations;
  updatedProfile.primaryLimiters = scoredDomains.slice(0, 3).map((d) => updatedEvaluations[d.domainId].domainTitle);
  updatedProfile.greatestStrengths = scoredDomains.slice(-3).map((d) => updatedEvaluations[d.domainId].domainTitle);

  return updatedProfile;
}
