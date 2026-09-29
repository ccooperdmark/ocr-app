export interface BenchmarkTest {
  id: string;
  name: string;
  category: 'Grip' | 'Strength' | 'Engine' | 'Agility';
  unit: string;
  description: string;
  whyItMatters: string;
  standards: {
    novice: string;
    open: string;
    ageGroup: string;
    elite: string;
  };
  numericStandards: {
    // higherIsBetter or lowerIsBetter
    direction: 'higher' | 'lower';
    noviceThreshold: number;
    openThreshold: number;
    ageGroupThreshold: number;
    eliteThreshold: number;
  };
}

export const BENCHMARK_TESTS: BenchmarkTest[] = [
  {
    id: 'dead-hang',
    name: 'Active Bar Dead Hang',
    category: 'Grip',
    unit: 'seconds',
    description: 'Continuous hang on a standard 1.25" pull-up bar with active scapular engagement and feet clear off floor.',
    whyItMatters: 'Direct predictor of multi-rig, twister, and monkey bar success under high heart rate conditions.',
    standards: {
      novice: '< 45s',
      open: '60s - 90s',
      ageGroup: '90s - 150s',
      elite: '180s+ (3 min)'
    },
    numericStandards: {
      direction: 'higher',
      noviceThreshold: 45,
      openThreshold: 75,
      ageGroupThreshold: 120,
      eliteThreshold: 180
    }
  },
  {
    id: 'pull-ups',
    name: 'Strict Bodyweight Pull-Ups',
    category: 'Strength',
    unit: 'reps',
    description: 'Dead hang to full chin clearance above bar. Zero kipping, full elbow lockout at the bottom.',
    whyItMatters: 'Essential for pulling yourself onto 7ft and 8ft walls and ascending ropes cleanly.',
    standards: {
      novice: '< 3 reps',
      open: '5 - 10 reps',
      ageGroup: '11 - 18 reps',
      elite: '20+ reps'
    },
    numericStandards: {
      direction: 'higher',
      noviceThreshold: 3,
      openThreshold: 6,
      ageGroupThreshold: 12,
      eliteThreshold: 20
    }
  },
  {
    id: 'mile-time',
    name: '1-Mile Flat Run Time',
    category: 'Engine',
    unit: 'minutes:seconds (enter total seconds, e.g. 7:00 = 420s)',
    description: 'All-out 1-mile effort on track or flat road.',
    whyItMatters: 'Measures raw VO2 max aerobic potential before adding hills and obstacles.',
    standards: {
      novice: '> 9:30 min (570s)',
      open: '8:00 - 9:30 min (480s)',
      ageGroup: '6:30 - 7:59 min (390s)',
      elite: '< 5:30 min (330s)'
    },
    numericStandards: {
      direction: 'lower',
      noviceThreshold: 570,
      openThreshold: 510,
      ageGroupThreshold: 420,
      eliteThreshold: 330
    }
  },
  {
    id: 'bucket-carry',
    name: '50lb Bucket Carry (100m Unbroken)',
    category: 'Strength',
    unit: 'seconds',
    description: 'Bear-hug carry of a 50lb gravel bucket or sandbag for 100 meters on flat terrain without resting on thighs.',
    whyItMatters: 'Simulates the iconic Spartan heavy carry that breaks thousands of competitors every weekend.',
    standards: {
      novice: '> 90s or broken',
      open: '60s - 90s unbroken',
      ageGroup: '45s - 59s unbroken',
      elite: '< 38s unbroken'
    },
    numericStandards: {
      direction: 'lower',
      noviceThreshold: 90,
      openThreshold: 75,
      ageGroupThreshold: 55,
      eliteThreshold: 38
    }
  },
  {
    id: 'burpee-speed',
    name: '30 Chest-to-Ground Burpees for Time',
    category: 'Agility',
    unit: 'seconds',
    description: 'Chest and thighs touch deck, jump with feet leaving ground and hands clapping overhead.',
    whyItMatters: 'The universal race penalty. A fast burpee pace saves 2-3 minutes if you miss an obstacle.',
    standards: {
      novice: '> 150s (2:30 min)',
      open: '100s - 149s',
      ageGroup: '75s - 99s',
      elite: '< 60s'
    },
    numericStandards: {
      direction: 'lower',
      noviceThreshold: 150,
      openThreshold: 120,
      ageGroupThreshold: 85,
      eliteThreshold: 60
    }
  }
];
