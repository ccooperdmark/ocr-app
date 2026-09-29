export interface CompromisedWODTemplate {
  id: string;
  name: string;
  targetRace: 'Sprint' | 'Super' | 'Beast' | 'Ultra';
  difficulty: 'Open' | 'Competitive' | 'Elite';
  description: string;
  totalDistance: string;
  estimatedTime: string;
  intervals: {
    order: number;
    activity: string;
    targetIntensity: string;
    transitionCues: string;
  }[];
}

export const COMPROMISED_WODS: CompromisedWODTemplate[] = [
  {
    id: 'spartan-beast-transition-sim',
    name: 'The Beast Transition Fatigue Gauntlet',
    targetRace: 'Beast',
    difficulty: 'Competitive',
    description: 'Simulates the brutal Mile 9-11 segment of a mountain Beast where legs are loaded with lactic acid from back-to-back carries and walls.',
    totalDistance: '3.2 Miles (5K) + Heavy Obstacles',
    estimatedTime: '45-55 mins',
    intervals: [
      { order: 1, activity: '800m Run @ 10K Race Pace (Zone 4)', targetIntensity: '165-170 BPM', transitionCues: 'Do not pause. Grab sandbag instantly upon crossing line.' },
      { order: 2, activity: '70lb Sandbag Carry 100m (Uphill Grade)', targetIntensity: '175+ BPM', transitionCues: 'Hug bag tight to chest. Keep ribs down.' },
      { order: 3, activity: '800m Compromised Run (Test Pace Recovery)', targetIntensity: 'Return to sub-8:00 pace', transitionCues: 'First 200m will feel like lead. Increase cadence to 185 SPM.' },
      { order: 4, activity: 'Active Bar Hang 60s + 15 Pull-Ups', targetIntensity: 'Forearm pump test', transitionCues: 'Shake arms 5 seconds before gripping bar.' },
      { order: 5, activity: '800m Compromised Run', targetIntensity: 'Maintain steady threshold', transitionCues: 'Breathe deep into belly to clear CO2.' },
      { order: 6, activity: '30 Burpees for Time (Penalty Simulation)', targetIntensity: 'Max Lactate Clearance', transitionCues: 'Snap hips, jump & clap overhead.' }
    ]
  },
  {
    id: 'sprint-high-velocity-sim',
    name: 'The Sprint Anaerobic Speed Flow',
    targetRace: 'Sprint',
    difficulty: 'Open',
    description: 'High-speed transitions focusing on minimal stoppage time between running and obstacles.',
    totalDistance: '2 Miles (3.2K)',
    estimatedTime: '25-32 mins',
    intervals: [
      { order: 1, activity: '400m Fast Run @ 5K Pace', targetIntensity: '170 BPM', transitionCues: 'Accelerate through the final 50 meters.' },
      { order: 2, activity: '10 Box Jumps (30") + 3 Wall Heel-Hooks', targetIntensity: 'Explosive vertical', transitionCues: 'Solo heel hook, roll over under control.' },
      { order: 3, activity: '400m Compromised Run', targetIntensity: 'Sub-7:30 pace', transitionCues: 'Immediate forward drive.' },
      { order: 4, activity: '50lb Farmer Carry 80m Unbroken', targetIntensity: 'Grip test', transitionCues: 'Short, rapid footsteps.' },
      { order: 5, activity: '400m Sprint Finish', targetIntensity: 'All-out anaerobic sprint', transitionCues: 'Empty the tank.' }
    ]
  }
];

export interface PaceDecayAnalysis {
  freshPaceSeconds: number;
  postPaceSeconds: number;
  decayPercentage: number;
  transitionScore: 'Elite Flow' | 'Moderate Transition Lag' | 'Severe Transition Fatigue';
  feedback: string;
}

export function calculatePaceDecay(freshPaceSec: number, postPaceSec: number): PaceDecayAnalysis {
  if (freshPaceSec <= 0 || postPaceSec <= 0) {
    return {
      freshPaceSeconds: 0,
      postPaceSeconds: 0,
      decayPercentage: 0,
      transitionScore: 'Moderate Transition Lag',
      feedback: 'Enter your pace values to analyze transition fatigue.'
    };
  }

  const decay = Math.round(((postPaceSec - freshPaceSec) / freshPaceSec) * 100);

  if (decay <= 8) {
    return {
      freshPaceSeconds: freshPaceSec,
      postPaceSeconds: postPaceSec,
      decayPercentage: decay,
      transitionScore: 'Elite Flow',
      feedback: `Outstanding! Your pace decayed only ${decay}%. Your aerobic engine flushes lactate rapidly and you are clearing carries without sacrificing run split velocity.`
    };
  } else if (decay <= 18) {
    return {
      freshPaceSeconds: freshPaceSec,
      postPaceSeconds: postPaceSec,
      decayPercentage: decay,
      transitionScore: 'Moderate Transition Lag',
      feedback: `Your pace decayed by ${decay}% after the obstacle. You are experiencing moderate transition lag. Add compromised carry-to-run intervals to teach your quads to clear venous pooling faster.`
    };
  } else {
    return {
      freshPaceSeconds: freshPaceSec,
      postPaceSeconds: postPaceSec,
      decayPercentage: decay,
      transitionScore: 'Severe Transition Fatigue',
      feedback: `Critical Bottleneck: Your pace decayed by ${decay}%! The heavy carry or rig is shutting down your running engine for 3-5 minutes post-obstacle. Carry endurance and compromised volume is a larger limiter right now than flat cardio speed.`
    };
  }
}
