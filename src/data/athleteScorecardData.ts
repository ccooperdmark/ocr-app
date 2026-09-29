export interface ScorecardMetric {
  key: string;
  label: string;
  score: number; // 0-100
  benchmark: string;
  category: 'Engine' | 'Upper Body' | 'Strength' | 'Skill';
  description: string;
}

export interface RaceReadinessResult {
  raceName: string;
  readinessPercentage: number;
  status: 'Ready to Podium' | 'Competitive' | 'Finisher Zone' | 'High Penalty Risk';
  statusColor: string;
  primaryLimiter: string;
  secondaryLimiter: string;
  recommendedFocus: string;
}

export interface AthleteScorecardState {
  running: number;
  aerobicEndurance: number;
  grip: number;
  pullingStrength: number;
  carryStrength: number;
  obstacleSkill: number;
  climbing: number;
  fatigueResistance: number;
}

export function calculateRaceReadiness(scores: AthleteScorecardState, targetRace: string): RaceReadinessResult {
  let readiness = 50;
  let primaryLimiter = 'Grip Endurance';
  let secondaryLimiter = 'Steep Incline Running';
  let recommendedFocus = 'Add 2 weekly dead hang and compromised carry circuits.';

  if (targetRace === 'sprint') {
    // Sprint weights: Running (30%), Grip (25%), Obstacle Skill (25%), Pulling (20%)
    readiness = Math.round(
      scores.running * 0.30 +
      scores.grip * 0.25 +
      scores.obstacleSkill * 0.25 +
      scores.pullingStrength * 0.20
    );
  } else if (targetRace === 'super') {
    // Super weights: Aerobic (25%), Grip (25%), Carry (20%), Obstacle Skill (15%), Fatigue Res (15%)
    readiness = Math.round(
      scores.aerobicEndurance * 0.25 +
      scores.grip * 0.25 +
      scores.carryStrength * 0.20 +
      scores.obstacleSkill * 0.15 +
      scores.fatigueResistance * 0.15
    );
  } else if (targetRace === 'beast') {
    // Beast weights: Aerobic (30%), Fatigue Resistance (25%), Climbing (15%), Carry (15%), Grip (15%)
    readiness = Math.round(
      scores.aerobicEndurance * 0.30 +
      scores.fatigueResistance * 0.25 +
      scores.climbing * 0.15 +
      scores.carryStrength * 0.15 +
      scores.grip * 0.15
    );
  } else {
    // Ultra weights: Aerobic (35%), Fatigue Resistance (30%), Climbing (20%), Carry (15%)
    readiness = Math.round(
      scores.aerobicEndurance * 0.35 +
      scores.fatigueResistance * 0.30 +
      scores.climbing * 0.20 +
      scores.carryStrength * 0.15
    );
  }

  // Find lowest scores for limiter detection
  const scorePairs: [string, number][] = [
    ['Running Speed', scores.running],
    ['Aerobic Engine (Zone 2)', scores.aerobicEndurance],
    ['Dynamic Grip Endurance', scores.grip],
    ['Upper-Body Pulling', scores.pullingStrength],
    ['Heavy Carry Power', scores.carryStrength],
    ['Obstacle Technique', scores.obstacleSkill],
    ['Mountain Climbing & Vert', scores.climbing],
    ['Lactate Fatigue Resistance', scores.fatigueResistance]
  ];

  scorePairs.sort((a, b) => a[1] - b[1]);
  primaryLimiter = scorePairs[0][0];
  secondaryLimiter = scorePairs[1][0];

  let status: RaceReadinessResult['status'] = 'Finisher Zone';
  let statusColor = '#ff5500';

  if (readiness >= 85) {
    status = 'Ready to Podium';
    statusColor = '#ccff00';
    recommendedFocus = 'Fine-tune transition seconds off obstacles and execute peak taper.';
  } else if (readiness >= 70) {
    status = 'Competitive';
    statusColor = '#ffaa00';
    recommendedFocus = `Prioritize ${primaryLimiter} to eliminate the final 1-2 race penalties.`;
  } else if (readiness >= 55) {
    status = 'Finisher Zone';
    statusColor = '#ff5500';
    recommendedFocus = `Focus on ${primaryLimiter} and ${secondaryLimiter} to avoid severe burpee fatigue.`;
  } else {
    status = 'High Penalty Risk';
    statusColor = '#ff3333';
    recommendedFocus = 'Build foundational pulling and aerobic base before attempting this distance.';
  }

  return {
    raceName: targetRace.toUpperCase(),
    readinessPercentage: Math.min(100, Math.max(10, readiness)),
    status,
    statusColor,
    primaryLimiter,
    secondaryLimiter,
    recommendedFocus
  };
}
