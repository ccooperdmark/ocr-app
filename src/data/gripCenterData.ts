export interface GripAssessment {
  id: string;
  name: string;
  category: 'Support Grip' | 'Crush Grip' | 'Pinch Grip' | 'Lock-Off Endurance';
  standardUnit: string;
  description: string;
  eliteStandard: string;
  competitiveStandard: string;
  openStandard: string;
  coachingCue: string;
}

export const GRIP_ASSESSMENT_BATTERY: GripAssessment[] = [
  {
    id: 'active-dead-hang',
    name: 'Active Bar Dead Hang (Scapular Retraction)',
    category: 'Support Grip',
    standardUnit: 'Seconds',
    description: 'Hang from standard 1.25" pull-up bar with shoulders packed and feet clear of the ground.',
    eliteStandard: '180s+ (3:00 min)',
    competitiveStandard: '120s - 179s',
    openStandard: '60s - 119s',
    coachingCue: 'Engage lats; do not hang passively on shoulder joint capsules.'
  },
  {
    id: 'towel-dead-hang',
    name: 'Vertical Towel / Canvas Strap Hang',
    category: 'Pinch Grip',
    standardUnit: 'Seconds',
    description: 'Hang from two vertical towels draped over a pull-up bar, gripping only the fabric.',
    eliteStandard: '60s+ unbroken',
    competitiveStandard: '35s - 59s',
    openStandard: '15s - 34s',
    coachingCue: 'Simulates the vertical canvas strap grips on Spartan Multi-Rigs and Savage Rigs.'
  },
  {
    id: 'heavy-farmer-carry',
    name: 'Heavy Farmer Carry (% Bodyweight)',
    category: 'Crush Grip',
    standardUnit: 'Meters Unbroken',
    description: 'Carry 50% of your bodyweight in EACH hand (100% total bodyweight) for maximum continuous distance.',
    eliteStandard: '100m unbroken',
    competitiveStandard: '60m - 99m',
    openStandard: '30m - 59m',
    coachingCue: 'Short, fast steps. Do not let bells bounce off hips.'
  },
  {
    id: 'bent-arm-lockoff',
    name: '90-Degree Bent-Arm Lock-Off Hang',
    category: 'Lock-Off Endurance',
    standardUnit: 'Seconds',
    description: 'Hold chin at eye-level with bar with elbows at 90 degrees without chin resting on bar.',
    eliteStandard: '45s+ hold',
    competitiveStandard: '25s - 44s',
    openStandard: '10s - 24s',
    coachingCue: 'Essential for surviving multi-rigs when your swing timing stalls.'
  }
];

export interface GripFatigueAnalysis {
  freshHangSeconds: number;
  fatiguedHangSeconds: number;
  decayPercentage: number;
  diagnosis: 'Bulletproof Grip Endurance' | 'Normal Physiological Drop' | 'Severe Arm Pump Hazard';
  recommendation: string;
}

export function calculateGripFatigue(freshSec: number, fatiguedSec: number): GripFatigueAnalysis {
  if (freshSec <= 0 || fatiguedSec <= 0) {
    return {
      freshHangSeconds: 0,
      fatiguedHangSeconds: 0,
      decayPercentage: 0,
      diagnosis: 'Normal Physiological Drop',
      recommendation: 'Enter your fresh and post-cardio hang times to calculate forearm decay.'
    };
  }

  const decay = Math.round(((freshSec - fatiguedSec) / freshSec) * 100);

  if (decay <= 20) {
    return {
      freshHangSeconds: freshSec,
      fatiguedHangSeconds: fatiguedSec,
      decayPercentage: decay,
      diagnosis: 'Bulletproof Grip Endurance',
      recommendation: `Elite forearm capillary density! Only ${decay}% grip drop under cardiovascular distress. You are cleared for back-to-back late-course rigs.`
    };
  } else if (decay <= 38) {
    return {
      freshHangSeconds: freshSec,
      fatiguedHangSeconds: fatiguedSec,
      decayPercentage: decay,
      diagnosis: 'Normal Physiological Drop',
      recommendation: `Your grip decayed by ${decay}%. Typical drop for open heat racers. Train high-heart-rate hanging (e.g. 400m sprint into 30s hang) twice weekly to push decay below 25%.`
    };
  } else {
    return {
      freshHangSeconds: freshSec,
      fatiguedHangSeconds: fatiguedSec,
      decayPercentage: decay,
      diagnosis: 'Severe Arm Pump Hazard',
      recommendation: `Danger: ${decay}% grip drop! Your forearms are flooding with lactic acid when your heart rate exceeds 160 BPM. You will almost certainly fail rigs late in a race even though you can hang fresh. Prioritize compromised grip circuits immediately.`
    };
  }
}
