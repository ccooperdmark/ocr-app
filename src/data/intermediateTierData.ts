// Data and models supporting the INTERMEDIATE Tier experience
// Provides progressive disclosure: balanced insight between simple Basic and exhaustive Advanced.

export interface IntermediatePerformanceCategory {
  id: string;
  name: string;
  classification: 'Improving' | 'Stable' | 'Needs Development';
  currentMetric: string;
  targetStandard: string;
  trendPercentage: number; // e.g. +6%
  coachInsight: string;
  color: string;
}

export interface IntermediateRacePrep {
  raceName: string;
  raceOrg: string;
  countdownDays: number;
  distanceKm: number;
  elevationGainM: number;
  obstacleCount: number;
  currentPhase: string;
  phaseWeek: number;
  totalPhaseWeeks: number;
  phaseFocusAreas: string[];
  upcomingPhase: string;
  readinessScorePercent: number;
  recommendedRaceWorkouts: {
    title: string;
    description: string;
    targetDay: string;
  }[];
  simpleFuelingPlan: {
    timing: string;
    recommendation: string;
  }[];
  raceJourneyMilestones: {
    title: string;
    status: 'completed' | 'current' | 'upcoming';
    date: string;
  }[];
}

export interface IntermediateRecoveryInsight {
  readinessScore: number; // 0-100
  readinessStatus: 'High Readiness' | 'Optimal Adaptation' | 'Moderate Fatigue' | 'Rest Advised';
  sleepHours: number;
  sleepQualityRating: string; // "Good (8/10)"
  sorenessLevel: string; // "Mild (2/5)"
  fatigueLevel: string; // "Low-Moderate"
  weeklyTrainingLoad: 'Optimal' | 'High' | 'Deload Recommended';
  coachRecommendation: string;
}

export interface IntermediateGamificationData {
  totalXp: number;
  currentLevel: number;
  levelTitle: string;
  xpToNextLevel: number;
  weeklyMissions: {
    id: string;
    title: string;
    progress: number;
    target: number;
    unit: string;
    xpReward: number;
    isCompleted: boolean;
  }[];
  selectedSkills: {
    id: string;
    name: string;
    currentTier: 'Level 1' | 'Level 2' | 'Level 3' | 'Master';
    progressPercent: number;
    nextMilestone: string;
  }[];
  recentAchievements: {
    id: string;
    title: string;
    badgeIcon: string;
    earnedDate: string;
    category: string;
  }[];
}

export const INTERMEDIATE_PERFORMANCE_CATEGORIES: IntermediatePerformanceCategory[] = [
  {
    id: 'strength',
    name: 'Strength',
    classification: 'Improving',
    currentMetric: '18 Strict Pull-Ups / 225lb Trap Bar',
    targetStandard: '20 Strict Pull-Ups',
    trendPercentage: 8.5,
    coachInsight: 'Upper pulling capacity is advancing on schedule for heavy rig clearances.',
    color: '#00e5ff'
  },
  {
    id: 'endurance',
    name: 'Endurance',
    classification: 'Improving',
    currentMetric: '78 min Aerobic Base @ 142 BPM',
    targetStandard: '90 min Aerobic Base',
    trendPercentage: 6.2,
    coachInsight: 'Mitochondrial density and fat oxidation holding steady in Zone 2 blocks.',
    color: '#ccff00'
  },
  {
    id: 'running',
    name: 'Running',
    classification: 'Stable',
    currentMetric: '7:15 / mile Trail Pace',
    targetStandard: '7:00 / mile Trail Pace',
    trendPercentage: 2.1,
    coachInsight: 'Pace is solid on flats; focus transitions to steep vert and hill descents.',
    color: '#ff5500'
  },
  {
    id: 'grip',
    name: 'Grip',
    classification: 'Improving',
    currentMetric: '115s Bar Hang / 70lb Pinch Hold',
    targetStandard: '120s Active Bar Hang',
    trendPercentage: 12.0,
    coachInsight: 'Forearm isometric stamina has shown the fastest response to daily hangs.',
    color: '#00ff88'
  },
  {
    id: 'carries',
    name: 'Carries',
    classification: 'Stable',
    currentMetric: '70 lbs Per Hand (100m Carry)',
    targetStandard: '80 lbs Per Hand',
    trendPercentage: 3.5,
    coachInsight: 'Core brace under loaded gait is stable; ready for elevation carry tests.',
    color: '#ffaa00'
  },
  {
    id: 'work_capacity',
    name: 'Work Capacity',
    classification: 'Needs Development',
    currentMetric: 'Compromised Pace Decay: +23%',
    targetStandard: 'Compromised Decay < 15%',
    trendPercentage: -4.0,
    coachInsight: 'Running split slows after heavy sandbags; prioritized in upcoming sessions.',
    color: '#ff4444'
  },
  {
    id: 'power',
    name: 'Power',
    classification: 'Improving',
    currentMetric: '30-inch Box Sprawl / Wall Clear',
    targetStandard: '34-inch Box Sprawl',
    trendPercentage: 5.0,
    coachInsight: 'Hip drive and 8-foot wall clearance impulse are strong and explosive.',
    color: '#ff77aa'
  }
];

export const INTERMEDIATE_RACE_PREP_DATA: IntermediateRacePrep = {
  raceName: 'Spartan Beast (Killington Mountain)',
  raceOrg: 'Spartan Race',
  countdownDays: 57,
  distanceKm: 21,
  elevationGainM: 1450,
  obstacleCount: 30,
  currentPhase: 'Strength Endurance & Hill Durability',
  phaseWeek: 4,
  totalPhaseWeeks: 8,
  phaseFocusAreas: [
    'Pulling endurance for rigs & Tyrolean traverse',
    'Isometric grip under elevated cardiovascular fatigue',
    'Aerobic climb pacing and lactate clearance'
  ],
  upcomingPhase: 'Race Simulation & Obstacle Fatigue Calibration (Weeks 9–12)',
  readinessScorePercent: 84,
  recommendedRaceWorkouts: [
    {
      title: 'Compromised Trail Hill Repeats',
      description: '4 × 600m uphill strides immediately followed by 60s dead hang and 50m sandbag carry.',
      targetDay: 'Saturday Morning'
    },
    {
      title: 'Rig Transition & Grip Gauntlet',
      description: '3 Rounds of 5 pull-ups, 20m bear crawl, 40s rope hang, 800m Zone 2 run.',
      targetDay: 'Wednesday Afternoon'
    }
  ],
  simpleFuelingPlan: [
    { timing: '3 Hours Pre-Race', recommendation: '100g low-glycemic carbs + 20 oz water with pinch of sea salt.' },
    { timing: 'Every 45 Minutes on Course', recommendation: '30-40g fast-acting energy gel + 4-6 oz electrolyte fluid.' },
    { timing: 'Within 30 Mins Post-Race', recommendation: '25-35g whey/plant protein + 60g carbs for glycogen replenishment.' }
  ],
  raceJourneyMilestones: [
    { title: 'Baseline Assessment Completed', status: 'completed', date: 'Sep 01' },
    { title: 'Aerobic Base Volume Peak', status: 'completed', date: 'Sep 15' },
    { title: 'Mid-Cycle Strength & Grip Check', status: 'current', date: 'Oct 05' },
    { title: '15K Compromised Mountain Simulation', status: 'upcoming', date: 'Oct 24' },
    { title: 'Taper & Course Inspection Week', status: 'upcoming', date: 'Nov 07' },
    { title: 'RACE DAY: Beast Starting Coral', status: 'upcoming', date: 'Nov 14' }
  ]
};

export const INTERMEDIATE_RECOVERY_DATA: IntermediateRecoveryInsight = {
  readinessScore: 86,
  readinessStatus: 'Optimal Adaptation',
  sleepHours: 7.8,
  sleepQualityRating: '8/10 (High Rest)',
  sorenessLevel: 'Mild (2/5) in Lats & Forearms',
  fatigueLevel: 'Low-Moderate (Productive Training Stress)',
  weeklyTrainingLoad: 'Optimal',
  coachRecommendation: 'Your physiological markers are primed for today’s scheduled high-output session. Maintain scheduled weights and rest intervals.'
};

export const INTERMEDIATE_GAMIFICATION_DATA: IntermediateGamificationData = {
  totalXp: 4850,
  currentLevel: 7,
  levelTitle: 'Pace Breaker & Rig Specialist',
  xpToNextLevel: 1150,
  weeklyMissions: [
    { id: 'm1', title: 'Accumulate 10+ Mins Active Dead Hang', progress: 7.5, target: 10, unit: 'mins', xpReward: 250, isCompleted: false },
    { id: 'm2', title: 'Complete 3 Logged Sessions with RPE >= 7', progress: 3, target: 3, unit: 'sessions', xpReward: 300, isCompleted: true },
    { id: 'm3', title: 'Hit Daily Hydration Target 5 Days', progress: 4, target: 5, unit: 'days', xpReward: 200, isCompleted: false },
    { id: 'm4', title: 'Log 1 Compromised Run Simulation', progress: 1, target: 1, unit: 'simulation', xpReward: 350, isCompleted: true }
  ],
  selectedSkills: [
    { id: 'sk1', name: 'Grip & Active Bar Hangs', currentTier: 'Level 3', progressPercent: 82, nextMilestone: '120s Continuous Active Hang' },
    { id: 'sk2', name: '8-Foot Wall Clearances', currentTier: 'Level 2', progressPercent: 65, nextMilestone: 'Burpee-Free Wall Ascent with Wet Shoes' },
    { id: 'sk3', name: 'Heavy Sandbag Carries (70+ lbs)', currentTier: 'Level 3', progressPercent: 75, nextMilestone: '200m Unbroken Mountain Incline Carry' },
    { id: 'sk4', name: 'Monkey Bar & Rig Traverse', currentTier: 'Level 2', progressPercent: 58, nextMilestone: 'Single-Hand Catch Transitions' }
  ],
  recentAchievements: [
    { id: 'ach1', title: 'Burpee-Free Zone', badgeIcon: '🛡️', earnedDate: 'Sep 10', category: 'Obstacle Mastery' },
    { id: 'ach2', title: 'Sub-7:30 Trail Mile', badgeIcon: '⚡', earnedDate: 'Sep 12', category: 'Running' },
    { id: 'ach3', title: '70lb Farmer Carry Club', badgeIcon: '🎒', earnedDate: 'Sep 14', category: 'Heavy Carries' },
    { id: 'ach4', title: 'Perfect 5-Day Adherence', badgeIcon: '🔥', earnedDate: 'Sep 17', category: 'Consistency' }
  ]
};
