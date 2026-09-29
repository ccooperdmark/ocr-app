import { FullPerformanceProfile } from '@/types/trainingPlan/domains';
import { RaceDistanceCategory } from '@/types/trainingPlan/race';

export interface RaceReadinessEstimate {
  distanceCategory: RaceDistanceCategory;
  readinessPercent: number; // 0 to 100
  ratingLabel: 'Podium Ready' | 'Competitive' | 'Developing' | 'High Risk Limiter';
  contributingFactors: {
    domainTitle: string;
    weightPercent: number;
    score: number;
    status: 'strong' | 'moderate' | 'weak';
  }[];
  primaryLimiter: string;
  transparencyDisclaimer: string;
}

export function calculateDistanceReadiness(
  profile: FullPerformanceProfile,
  distance: RaceDistanceCategory
): RaceReadinessEstimate {
  const evals = profile.domainEvaluations;

  // Domain weights vary significantly per distance
  let weights: Record<string, number>;

  switch (distance) {
    case 'short': // Sprint: Speed, obstacle pop, anaerobic, grip
      weights = {
        anaerobic_capacity: 0.20,
        power_speed: 0.18,
        obstacle_skill: 0.20,
        grip_hanging: 0.18,
        aerobic_endurance: 0.14,
        running_terrain: 0.10
      };
      break;
    case 'medium': // Super: Balanced threshold, grip, carries
      weights = {
        aerobic_endurance: 0.22,
        running_terrain: 0.20,
        grip_hanging: 0.18,
        loaded_carries: 0.15,
        muscular_endurance: 0.15,
        obstacle_skill: 0.10
      };
      break;
    case 'long': // Beast: Mountain vert, carries, durability, fueling
      weights = {
        aerobic_endurance: 0.25,
        running_terrain: 0.22,
        loaded_carries: 0.18,
        mobility_durability: 0.15,
        race_physiology: 0.10,
        grip_hanging: 0.10
      };
      break;
    case 'ultra': // Ultra: Extreme base, vert, fueling, mental durability
    default:
      weights = {
        aerobic_endurance: 0.30,
        running_terrain: 0.25,
        race_physiology: 0.18,
        mobility_durability: 0.15,
        loaded_carries: 0.12
      };
      break;
  }

  let weightedSum = 0;
  let totalWeight = 0;
  const factors: RaceReadinessEstimate['contributingFactors'] = [];

  let lowestFactorScore = 100;
  let primaryLimiter = 'Overall Aerobic Base';

  for (const domainKey in weights) {
    const w = weights[domainKey];
    const evalData = evals[domainKey as keyof typeof evals];
    const score = evalData ? evalData.score : 70;
    
    weightedSum += score * w;
    totalWeight += w;

    const status = score >= 80 ? 'strong' : score >= 70 ? 'moderate' : 'weak';
    factors.push({
      domainTitle: evalData ? evalData.domainTitle : domainKey,
      weightPercent: Math.round(w * 100),
      score,
      status
    });

    if (score < lowestFactorScore) {
      lowestFactorScore = score;
      primaryLimiter = evalData ? evalData.domainTitle : domainKey;
    }
  }

  const finalReadiness = Math.round(weightedSum / (totalWeight || 1));

  let label: RaceReadinessEstimate['ratingLabel'] = 'Competitive';
  if (finalReadiness >= 85) label = 'Podium Ready';
  else if (finalReadiness >= 75) label = 'Competitive';
  else if (finalReadiness >= 65) label = 'Developing';
  else label = 'High Risk Limiter';

  return {
    distanceCategory: distance,
    readinessPercent: finalReadiness,
    ratingLabel: label,
    contributingFactors: factors,
    primaryLimiter,
    transparencyDisclaimer: 'Internal Performance Estimate: Calculated transparently from your current 12-domain assessment battery and target race physiological demands. Not a medical or laboratory clinical diagnostic.'
  };
}
