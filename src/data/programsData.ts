export interface ProgramTier {
  id: string;
  name: string;
  tagline: string;
  price: string;
  period: string;
  isPopular?: boolean;
  idealFor: string;
  badge: string;
  features: string[];
  deliverables: {
    icon: string;
    text: string;
  }[];
}

export const PROGRAM_TIERS: ProgramTier[] = [
  {
    id: 'sprint-super-blueprint',
    name: 'Sprint & Super Blueprint',
    tagline: 'Ideal for 5K to 10K races. Master mandatory obstacles and build a resilient 10K engine.',
    price: '$149',
    period: 'one-time / 8-week program',
    idealFor: 'First-time OCR racers or athletes seeking a clean, burpee-free finish.',
    badge: '8-WEEK PROTOCOL',
    features: [
      '8-Week Progressive Periodization (3 Phases)',
      'Grip Endurance & Dead Hang Mastery Drills',
      'The 5 Mandatory Obstacle Video Technique Library',
      'Zone 2 Aerobic Base & Incline Walking Protocols',
      'Race-Week Taper & Gear Checklist PDF',
      'Community Discord Access & Q&A'
    ],
    deliverables: [
      { icon: 'Zap', text: 'Instant Digital Access to Complete 8-Week Calendar' },
      { icon: 'Video', text: '18 Video Obstacle Breakdowns (Walls, Ropes, Spear, Rigs)' },
      { icon: 'CheckCircle2', text: 'Burpee Penalty Elimination Checklist' }
    ]
  },
  {
    id: 'beast-trifecta-protocol',
    name: 'Beast & Trifecta Protocol',
    tagline: 'Built for 21K Half Marathon, Mountain, and Multi-Race Trifecta campaigns.',
    price: '$249',
    period: 'one-time / 12-week program',
    isPopular: true,
    idealFor: 'Athletes tackling 10K+ to 21K+ mountain courses or completing their first Trifecta.',
    badge: 'MOST POPULAR',
    features: [
      '12-Week Advanced Periodized Macrocycle',
      'High-Elevation & Mountain Rucking Specialization',
      'Heavy Compromised Carry Simulation Workouts',
      'Advanced Multi-Rig & Twister Transition Drills',
      'Precision Carb & Sodium Fueling Calculator',
      'Pre-Race Course Map Strategy Analysis',
      'Direct Coach Messaging via Training App'
    ],
    deliverables: [
      { icon: 'Flame', text: 'Full 12-Week Mountain Engine & Grip Conditioning' },
      { icon: 'Shield', text: 'Anti-Cramp Sodium & Hydration Strategy Plan' },
      { icon: 'Award', text: 'Podium & Age-Group Performance Standards' }
    ]
  },
  {
    id: 'elite-custom-coaching',
    name: '1-on-1 Elite Athlete Coaching',
    tagline: 'Custom programming, weekly video check-ins, and direct 1-on-1 coach access.',
    price: '$349',
    period: 'per month / auto-renewing',
    idealFor: 'Age Group racers, podium contenders, and athletes wanting 100% bespoke preparation.',
    badge: 'ELITE TIER',
    features: [
      '100% Customized Training Plan (Adjusted Weekly)',
      'Bi-Weekly Video Form Analysis (Running & Obstacles)',
      'Direct WhatsApp / Coach Access (24h response)',
      'HRV, Sleep & Recovery Bio-Tracking Integration',
      'Full Nutrition & Race-Day Strategy Blueprint',
      'Tactical Pacing Guidance for Specific Venue Terrains',
      'Limited to 15 Active Athletes'
    ],
    deliverables: [
      { icon: 'Target', text: 'Weekly Adaptive Periodization Based on Your Data' },
      { icon: 'PhoneCall', text: '2x Monthly 30-Minute Video Strategy Calls' },
      { icon: 'Trophy', text: 'Age-Group Podium & World Championship Prep' }
    ]
  }
];

export const TESTIMONIALS = [
  {
    name: 'Marcus Vance',
    race: 'Spartan Beast Killington (VT)',
    result: '1st in Age Group (35-39)',
    quote: 'Before working with GRIT OCR, I would fail the multi-rig and twister on every race, spending 10 minutes doing burpees with gassed legs. We fixed my hip-swing rhythm and added the compromised carry drills. Finished Killington with ZERO penalties and took 1st place in my age group.',
    metric: '-18 min PR'
  },
  {
    name: 'Elena Rostova',
    race: 'Tough Mudder Infinity & Spartan Super',
    result: 'Podium Finisher',
    quote: 'The 8-foot wall used to terrify me because I am 5\'3". Learning the heel-hook pop technique changed everything. The customized grip progression and mountain power-hiking protocols gave me the confidence to push hard without cramping.',
    metric: '100% Obstacle Clearance'
  },
  {
    name: 'Derek Chen',
    race: 'Spartan Trifecta (Sprint, Super, Beast)',
    result: 'Triple Finisher',
    quote: 'The Race-Day Fueling protocol was the game-changer. Carrying mustard packets and following the exact sodium/gel schedule kept me moving through Mile 12 of the Beast while everyone around me was laying on the trail with locked calves.',
    metric: 'Zero Cramps Across 3 Races'
  }
];
