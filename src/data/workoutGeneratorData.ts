export type FitnessLevel = 'rookie' | 'open' | 'age-group' | 'elite';
export type RaceDistance = 'sprint' | 'super' | 'beast' | 'ultra';
export type EquipmentType = 'full-gym' | 'home-gym' | 'minimal';
export type TrainingPhase = 'base' | 'strength-endurance' | 'peak' | 'taper';

export interface ExerciseItem {
  name: string;
  sets: string;
  repsOrTime: string;
  rest: string;
  component: 'Grip' | 'Engine' | 'Carries' | 'Obstacle Tech' | 'Strength' | 'Mobility';
  cues: string;
}

export interface DayWorkout {
  dayNumber: number;
  dayName: string; // e.g. "Monday"
  title: string;
  focusComponent: 'Grip & Pull' | 'Trail & Aerobic Engine' | 'Heavy Carries & Strength' | 'Compromised Race Simulation' | 'Active Recovery & Mobility' | 'Obstacle Skills & Power';
  estimatedDuration: string;
  intensity: 'Low' | 'Moderate' | 'High' | 'Max Effort';
  warmup: string[];
  mainExercises: ExerciseItem[];
  compromisedFinisher?: {
    title: string;
    protocol: string;
    targetHeartRate: string;
    timerMode?: string;
  };
  cooldown: string[];
}

export interface GeneratedPlan {
  levelTitle: string;
  distanceTitle: string;
  phaseTitle: string;
  equipmentTitle: string;
  weeklyMileage: string;
  weeklyElevationTarget: string;
  macrocycleFocus: string;
  schedule: DayWorkout[];
}

export function generateOCRWorkoutPlan(
  level: FitnessLevel,
  distance: RaceDistance,
  equipment: EquipmentType,
  phase: TrainingPhase
): GeneratedPlan {
  // Config mappings
  const levelLabels: Record<FitnessLevel, string> = {
    'rookie': 'Rookie / First-Time Racer',
    'open': 'Open Heat Weekend Warrior',
    'age-group': 'Age Group Competitive Contender',
    'elite': 'Elite / Podium Division'
  };

  const distanceLabels: Record<RaceDistance, string> = {
    'sprint': 'Spartan Sprint (5K / 20 Obstacles)',
    'super': 'Spartan Super (10K / 25 Obstacles)',
    'beast': 'Spartan Beast (21K / 30 Obstacles)',
    'ultra': 'Spartan Ultra (50K / 60 Obstacles)'
  };

  const phaseLabels: Record<TrainingPhase, string> = {
    'base': 'Phase 1: Aerobic Base & Structural Tissue Prep (Weeks 1-4)',
    'strength-endurance': 'Phase 2: Strength-Endurance & Mountain Climbing (Weeks 5-8)',
    'peak': 'Phase 3: Race Simulation & Obstacle Specifics (Weeks 9-10)',
    'taper': 'Phase 4: Supercompensation & Race Week Taper (Weeks 11-12)'
  };

  const equipLabels: Record<EquipmentType, string> = {
    'full-gym': 'Full Gym (Barbells, Racks, Rigs, Sandbags)',
    'home-gym': 'Home Setup (Dumbbells, Pull-Up Bar, Heavy Pack)',
    'minimal': 'Minimalist (Bodyweight, Trail & Improvised Carries)'
  };

  // Dynamic Volume Adjustments
  let mileage = '12-16 Miles';
  let elevation = '800-1,200 ft';

  if (distance === 'sprint') {
    mileage = level === 'rookie' ? '8-12 Miles' : level === 'open' ? '12-16 Miles' : '16-22 Miles';
    elevation = '600-1,200 ft';
  } else if (distance === 'super') {
    mileage = level === 'rookie' ? '12-16 Miles' : level === 'open' ? '16-22 Miles' : '22-30 Miles';
    elevation = '1,200-2,500 ft';
  } else if (distance === 'beast') {
    mileage = level === 'rookie' ? '16-20 Miles' : level === 'open' ? '22-28 Miles' : '30-42 Miles';
    elevation = '2,500-5,000 ft';
  } else if (distance === 'ultra') {
    mileage = level === 'open' ? '28-36 Miles' : '40-60 Miles';
    elevation = '4,500-8,000 ft';
  }

  // Generate 7-day schedule customized for choices
  const schedule: DayWorkout[] = [
    // Day 1: Grip & Upper Body Rig Dominance
    {
      dayNumber: 1,
      dayName: 'Monday',
      title: 'Upper Body Pull & Forearm Grip Fortress',
      focusComponent: 'Grip & Pull',
      estimatedDuration: level === 'rookie' ? '45 mins' : '60-70 mins',
      intensity: 'High',
      warmup: [
        '5 min dynamic joint circles (wrists, elbows, shoulders)',
        '3 rounds: 10 Scapular Pull-ups + 20 Banded Pull-aparts + 30s Dead Bug'
      ],
      mainExercises: [
        {
          name: equipment === 'full-gym' ? 'Active Scapular Dead Hang' : 'Pull-Up Bar Active Hang',
          sets: '4 sets',
          repsOrTime: level === 'rookie' ? '30-45s' : level === 'open' ? '60-80s' : '90-120s',
          rest: '90s',
          component: 'Grip',
          cues: 'Pull shoulder blades down away from ears. Squeeze bar tight. Zero swinging.'
        },
        {
          name: equipment === 'full-gym' ? 'Towel-Grip Strict Pull-Ups' : equipment === 'home-gym' ? 'Offset Grip Pull-Ups' : 'Towel Door Inverted Rows',
          sets: '4 sets',
          repsOrTime: level === 'rookie' ? '4-6 reps' : '8-12 reps',
          rest: '75s',
          component: 'Grip',
          cues: 'Grip towel tightly to replicate vertical rope and canvas rig holds.'
        },
        {
          name: equipment === 'full-gym' ? 'Heavy Farmer Carries' : 'Dumbbell / Heavy Pack Farmer Walk',
          sets: '5 rounds',
          repsOrTime: '60 meters unbroken',
          rest: '90s',
          component: 'Carries',
          cues: 'Tall posture, ribs down. Short, rapid steps without letting weights hit hips.'
        },
        {
          name: 'Finger Extensor Band Extensions',
          sets: '3 sets',
          repsOrTime: '25-30 reps per hand',
          rest: '45s',
          component: 'Mobility',
          cues: 'Wrap rubber band around fingertips and open hand wide. Prevents golfer’s elbow.'
        }
      ],
      compromisedFinisher: {
        title: 'Rig Pump Finisher: EMOM 6 Minutes',
        protocol: 'Minute 1: 30s max hang | Minute 2: 15 Push-ups | Minute 3: 30s Plank hold | Repeat 2x',
        targetHeartRate: '150-165 BPM',
        timerMode: 'EMOM'
      },
      cooldown: [
        'Forearm flexor/extensor kneeling stretches (2 mins)',
        'Doorway chest & lat stretch (2 mins)'
      ]
    },

    // Day 2: Aerobic Base Engine & Mountain Cadence
    {
      dayNumber: 2,
      dayName: 'Tuesday',
      title: 'Zone 2 Aerobic Foundation & Cadence Drills',
      focusComponent: 'Trail & Aerobic Engine',
      estimatedDuration: distance === 'sprint' ? '40 mins' : distance === 'super' ? '55 mins' : '75-90 mins',
      intensity: 'Moderate',
      warmup: [
        '5 min walking lunges + ankle dorsiflexion rocks',
        'High knees & butt kicks (2 x 30s)',
        'Easy 5-min progressive jog'
      ],
      mainExercises: [
        {
          name: 'Zone 2 Conversational Trail / Incline Run',
          sets: 'Continuous',
          repsOrTime: distance === 'sprint' ? '30-40 mins' : distance === 'super' ? '50 mins' : '65-80 mins',
          rest: 'None',
          component: 'Engine',
          cues: 'Strict nasal breathing or conversational pace. Heart rate must remain strictly below 75% of max.'
        },
        {
          name: 'Strides on Trail or Flat Turf',
          sets: '5 rounds',
          repsOrTime: '80 meters @ 90% effort',
          rest: '60s easy walk',
          component: 'Engine',
          cues: 'Focus on high 180+ cadence and midfoot spring landing.'
        }
      ],
      cooldown: [
        'Couch stretch for hip flexors (90s per leg)',
        'Calf stretch against wall (60s per leg)'
      ]
    },

    // Day 3: Heavy Loaded Carries & Posterior Chain Power
    {
      dayNumber: 3,
      dayName: 'Wednesday',
      title: 'Heavy Carry Armor & Structural Lower Body Power',
      focusComponent: 'Heavy Carries & Strength',
      estimatedDuration: '55-65 mins',
      intensity: 'High',
      warmup: [
        'Glute bridges + bird-dogs (2 x 15 reps)',
        'Bodyweight air squats with 3s pause at bottom (2 x 10 reps)',
        'Inchworms to push-up (5 reps)'
      ],
      mainExercises: [
        {
          name: equipment === 'full-gym' ? 'Trap Bar Deadlift or Romanian Deadlift' : 'Heavy Sandbag / Pack Romanian Deadlift',
          sets: '4 sets',
          repsOrTime: level === 'rookie' ? '8-10 reps' : '5-8 reps (heavy)',
          rest: '90s',
          component: 'Strength',
          cues: 'Hinge at hips, brace core 360 degrees. Posterior chain power powers hill climbing.'
        },
        {
          name: 'Bear-Hug Sandbag / 50lb Bucket Carry',
          sets: '5 rounds',
          repsOrTime: '80-100 meters unbroken',
          rest: '90s',
          component: 'Carries',
          cues: 'Hug sandbag high against sternum. Do not rest weight on thigh tops.'
        },
        {
          name: equipment === 'full-gym' ? 'Walking Goblet Lunges' : 'Weighted Vest / Pack Walking Lunges',
          sets: '3 sets',
          repsOrTime: '20 total steps (10 per leg)',
          rest: '60s',
          component: 'Strength',
          cues: 'Knee taps deck gently. Drive through front heel to engage glute.'
        },
        {
          name: 'Suitcase Single-Arm Unilateral Carry',
          sets: '3 sets',
          repsOrTime: '50 meters per side',
          rest: '60s',
          component: 'Carries',
          cues: 'Resist lateral spinal bending. Core stays rigid like an iron pillar.'
        }
      ],
      cooldown: [
        'Pigeon pose glute stretch (2 mins per side)',
        'Cat-cow spinal mobilizations (10 slow cycles)'
      ]
    },

    // Day 4: Active Recovery & Obstacle Biomechanics
    {
      dayNumber: 4,
      dayName: 'Thursday',
      title: 'Obstacle Technique Drills & Joint Mobility Flush',
      focusComponent: 'Obstacle Skills & Power',
      estimatedDuration: '40-45 mins',
      intensity: 'Low',
      warmup: [
        'Light 15-min walk or spinning bike flush',
        'Shoulder dislocates with PVC pipe or broomstick (20 reps)'
      ],
      mainExercises: [
        {
          name: 'Wall Climb / Muscle-Up Transition Drill (or Box Heel-Hook)',
          sets: '4 sets',
          repsOrTime: '5 clean transitions',
          rest: '60s',
          component: 'Obstacle Tech',
          cues: 'Drive high knee, hook heel over ledge, roll hip over wall. Lower down under control.'
        },
        {
          name: 'Spear Throw Dry Mechanics (or Towel Javelin)',
          sets: '4 sets',
          repsOrTime: '8-10 simulated throws',
          rest: '45s',
          component: 'Obstacle Tech',
          cues: 'Find balance point. 3-point stance, high elbow, throw like a laser dart.'
        },
        {
          name: 'Thoracic Spine & Ankle Mobility Complex',
          sets: '3 rounds',
          repsOrTime: '10 reps per side',
          rest: '30s',
          component: 'Mobility',
          cues: 'Crucial for maintaining agility on steep downhill terrain.'
        }
      ],
      cooldown: [
        'Full body foam rolling (quads, IT bands, calves, lats) (10 mins)'
      ]
    },

    // Day 5: The Compromised Race Simulation (The Core OCR Day!)
    {
      dayNumber: 5,
      dayName: 'Friday',
      title: 'The Compromised Simulation WOD (Carries + Burpees + Running)',
      focusComponent: 'Compromised Race Simulation',
      estimatedDuration: level === 'rookie' ? '45 mins' : '65-80 mins',
      intensity: 'Max Effort',
      warmup: [
        '800m progressive jog (Zone 1 to Zone 3)',
        '2 rounds: 5 Burpees + 10 Air Squats + 20s Bar Hang'
      ],
      mainExercises: [
        {
          name: 'Compromised Threshold Mile Run',
          sets: '3 rounds',
          repsOrTime: '800m Run @ 10K Race Pace',
          rest: 'Directly into carry',
          component: 'Engine',
          cues: 'Run at strong tempo pace immediately off the carry.'
        },
        {
          name: 'Heavy Sandbag / Bucket Carry Transition',
          sets: '3 rounds',
          repsOrTime: '75 meters',
          rest: 'Directly into burpees',
          component: 'Carries',
          cues: 'Zero pause between running and picking up the weight.'
        },
        {
          name: 'Chest-To-Ground Burpee Penalty Simulation',
          sets: '3 rounds',
          repsOrTime: '15-20 Burpees',
          rest: '2 mins between full rounds',
          component: 'Obstacle Tech',
          cues: 'Jump feet back, chest touches ground, snap hips up, jump & clap overhead.'
        }
      ],
      compromisedFinisher: {
        title: 'Spartan Beast Penalty Simulation',
        protocol: '30 unbroken burpees for time immediately following the 3rd round',
        targetHeartRate: '175+ BPM',
        timerMode: 'INTERVAL'
      },
      cooldown: [
        '10-min slow walk to flush blood lactate',
        'Elevate legs on wall (5 mins)'
      ]
    },

    // Day 6: Long Mountain Elevation & Trail Simulation
    {
      dayNumber: 6,
      dayName: 'Saturday',
      title: 'Long Mountain Trail / Incline Power-Hiking',
      focusComponent: 'Trail & Aerobic Engine',
      estimatedDuration: distance === 'sprint' ? '60 mins' : distance === 'super' ? '90 mins' : '2 - 3.5 Hours',
      intensity: 'Moderate',
      warmup: [
        'Dynamic lower body warm-up + hydration electrolyte sip'
      ],
      mainExercises: [
        {
          name: 'Long Continuous Trail Run / Power-Hike Combo',
          sets: '1 long effort',
          repsOrTime: distance === 'sprint' ? '4-5 Miles' : distance === 'super' ? '7-9 Miles' : '10-15 Miles',
          rest: 'None',
          component: 'Engine',
          cues: 'Hands on thighs on steep climbs. Run all flats and downhills. Practice race-day gel fueling every 35 mins.'
        },
        {
          name: 'Mid-Run Trail Hanging / Carry Station (Simulated Obstacle)',
          sets: '3 stops',
          repsOrTime: '45s branch hang or rock carry every 2 miles',
          rest: 'Resume run',
          component: 'Grip',
          cues: 'Simulates hitting a rig when already 8 miles deep.'
        }
      ],
      cooldown: [
        'Cold water soak or lake plunge for legs if trail has water',
        'Hamstring and calf foam rolling'
      ]
    },

    // Day 7: Full Rest & CNS Recovery
    {
      dayNumber: 7,
      dayName: 'Sunday',
      title: 'Supercompensation & Nervous System Reset',
      focusComponent: 'Active Recovery & Mobility',
      estimatedDuration: '20-30 mins optional',
      intensity: 'Low',
      warmup: [],
      mainExercises: [
        {
          name: 'Gentle Walk or Easy Flat Bike Spin',
          sets: 'Optional',
          repsOrTime: '20-30 mins',
          rest: 'None',
          component: 'Mobility',
          cues: 'Zero heart rate elevation. Pure blood flow to accelerate muscular recovery.'
        },
        {
          name: 'Deep Diaphragmatic Box Breathing',
          sets: '1 session',
          repsOrTime: '10 minutes (4s in, 4s hold, 4s out, 4s hold)',
          rest: 'None',
          component: 'Mobility',
          cues: 'Down-regulates sympathetic nervous system into parasympathetic recovery.'
        }
      ],
      cooldown: [
        'Hydrate with 1,000mg sodium + full night 8.5+ hours of sleep.'
      ]
    }
  ];

  return {
    levelTitle: levelLabels[level],
    distanceTitle: distanceLabels[distance],
    phaseTitle: phaseLabels[phase],
    equipmentTitle: equipLabels[equipment],
    weeklyMileage: mileage,
    weeklyElevationTarget: elevation,
    macrocycleFocus: phase === 'base'
      ? 'Aerobic volume accumulation, structural tendon durability, and baseline grip capacity.'
      : phase === 'strength-endurance'
      ? 'Raising lactate threshold under heavy load, steep power-hiking, and multi-rig transitions.'
      : phase === 'peak'
      ? 'High-intensity race simulation runs matching target course profile with minimal penalty margin.'
      : 'Glycogen saturation, 50% volume reduction, and neuromuscular sharpness for race day.',
    schedule
  };
}
