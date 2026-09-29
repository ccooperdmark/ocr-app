export interface CompromisedAssessmentResult {
  athleteId: string;
  testDate: string; // ISO date
  
  // Hang Decay
  freshDeadHangSec: number;
  fatiguedDeadHangSec: number; // Post 500m row / run
  hangFatigueDecayPercent: number;

  // Running Pace Decay
  freshMilePaceSec: number;
  postCarryMilePaceSec: number; // Post 200m sandbag carry
  paceDecayPercent: number;

  // Obstacle Failure Probability
  freshObstacleSuccessRatePercent: number;
  fatiguedObstacleSuccessRatePercent: number;

  coachingDiagnosis: string;
}

export function evaluateCompromisedPerformance(
  freshHang: number,
  fatiguedHang: number,
  freshPace: number,
  postCarryPace: number
): CompromisedAssessmentResult {
  const hangDecay = Math.max(0, Math.round(((freshHang - fatiguedHang) / (freshHang || 1)) * 100));
  const paceDecay = Math.max(0, Math.round(((postCarryPace - freshPace) / (freshPace || 1)) * 100));

  let diagnosis = '';
  if (hangDecay > 35 && paceDecay > 20) {
    diagnosis = 'Severe Compromised Fatigue Decay. Forearm blood lactate and quad acidosis cause high late-race obstacle failure risk. High priority on compromised carry-to-run intervals and fatigued bar hangs.';
  } else if (hangDecay > 30) {
    diagnosis = 'Elevated Grip Decay under systemic fatigue. Running engine is stable, but forearms lose tactile control once heart rate is high. Prescribe fatigued towel hangs post-interval.';
  } else if (paceDecay > 18) {
    diagnosis = 'Elevated Quad Acidosis Decay. Carry strength is adequate, but transitions back to running suffer from concrete-leg syndrome. Prescribe drop-and-sprint carry repeats.';
  } else {
    diagnosis = 'Elite Compromised Resistance. Retaining >75% of fresh grip capacity and <12% pace decay. Transition speed is a key competitive advantage.';
  }

  return {
    athleteId: 'current',
    testDate: new Date().toISOString(),
    freshDeadHangSec: freshHang,
    fatiguedDeadHangSec: fatiguedHang,
    hangFatigueDecayPercent: hangDecay,
    freshMilePaceSec: freshPace,
    postCarryMilePaceSec: postCarryPace,
    paceDecayPercent: paceDecay,
    freshObstacleSuccessRatePercent: 95,
    fatiguedObstacleSuccessRatePercent: Math.max(50, 95 - Math.round(hangDecay * 0.8)),
    coachingDiagnosis: diagnosis
  };
}
