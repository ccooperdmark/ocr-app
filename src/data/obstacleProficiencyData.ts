// Master Obstacle Proficiency Database
// Contains ALL obstacles in OCR categorized by race brand and specific race course format

export interface ObstacleProgressionStep {
  level: number;
  name: string;
  description: string;
  targetBenchmark: string;
  equipment: string;
}

export type RaceBrandId = 'spartan-race' | 'tough-mudder' | 'savage-race' | 'rugged-maniac';

export type RaceFormatId = 
  | 'spartan-sprint'
  | 'spartan-stadion'
  | 'spartan-super'
  | 'spartan-beast'
  | 'spartan-ultra'
  | 'tough-mudder-5k'
  | 'tough-mudder-10k'
  | 'tough-mudder-classic'
  | 'tough-mudder-wtm'
  | 'savage-blitz'
  | 'savage-standard'
  | 'savage-pro'
  | 'rugged-maniac-5k';

export type ObstacleCategory = 
  | 'Climbing'
  | 'Swinging & Rig'
  | 'Heavy Carries'
  | 'Throwing'
  | 'Walls'
  | 'Crawls & Balance'
  | 'Water & Mud'
  | 'Agility & Mental';

export interface RaceCourseProfile {
  id: RaceFormatId;
  brandId: RaceBrandId;
  name: string;
  brandName: string;
  distance: string;
  obstacleCount: number;
  difficulty: 'Beginner-Friendly' | 'Moderate' | 'Demanding' | 'Extreme';
  penaltyRule: string;
  courseTerrain: string;
  obstacleIds: string[];
}

export interface ObstacleProfile {
  id: string;
  slug: string;
  name: string;
  category: ObstacleCategory;
  races: RaceBrandId[];
  raceFormats: RaceFormatId[];
  averageFailureRate: string;
  techniqueRating: number; // 0-100
  gripRating: number;      // 0-100
  pullingRating: number;   // 0-100
  fatigueResistance: number; // 0-100
  wetConditionRating: number; // 0-100
  penaltyType: string;
  description: string;
  whyPeopleFail: string[];
  progressionLadder: ObstacleProgressionStep[];
  diagnosticTest: {
    name: string;
    protocol: string;
    passCriteria: string;
  };
  recommendedWeeklyDrill: string;
}

export const RACE_COURSES: RaceCourseProfile[] = [
  {
    "id": "spartan-sprint",
    "brandId": "spartan-race",
    "name": "Spartan Sprint",
    "brandName": "Spartan Race",
    "distance": "5 km (3.1 miles)",
    "obstacleCount": 20,
    "difficulty": "Moderate",
    "penaltyRule": "30 Burpees or 200m Penalty Loop per failed obstacle",
    "courseTerrain": "Technical trail, dirt roads, creek crossings, mud pits",
    "obstacleIds": [
      "spartan-hurdle-walls",
      "spartan-out",
      "spartan-6ft-wall",
      "spartan-7ft-wall",
      "spartan-8ft-wall",
      "spartan-inverted-wall",
      "spartan-a-frame",
      "spartan-barbed-wire",
      "spartan-dunk-wall",
      "spartan-slip-wall",
      "spartan-balance-beam",
      "spartan-z-wall",
      "spartan-atlas-carry",
      "spartan-sandbag-carry",
      "spartan-bucket-carry",
      "spartan-hercules-hoist",
      "spartan-rope-climb",
      "spartan-monkey-bars",
      "spartan-multi-rig",
      "spartan-spear-throw",
      "spartan-fire-jump"
    ]
  },
  {
    "id": "spartan-stadion",
    "brandId": "spartan-race",
    "name": "Spartan Stadion",
    "brandName": "Spartan Race",
    "distance": "5 km (3.1 miles)",
    "obstacleCount": 20,
    "difficulty": "Moderate",
    "penaltyRule": "15 Burpees per failed obstacle (Speed-optimized)",
    "courseTerrain": "Major league baseball / football stadiums, concrete stairs, ramps, and turf (100% dry)",
    "obstacleIds": [
      "spartan-hurdle-walls",
      "spartan-out",
      "spartan-6ft-wall",
      "spartan-7ft-wall",
      "spartan-8ft-wall",
      "spartan-a-frame",
      "spartan-balance-beam",
      "spartan-z-wall",
      "spartan-sandbag-carry",
      "spartan-jerry-can",
      "spartan-hercules-hoist",
      "spartan-rope-climb",
      "spartan-monkey-bars",
      "spartan-multi-rig",
      "spartan-spear-throw"
    ]
  },
  {
    "id": "spartan-super",
    "brandId": "spartan-race",
    "name": "Spartan Super",
    "brandName": "Spartan Race",
    "distance": "10 km (6.2 miles)",
    "obstacleCount": 25,
    "difficulty": "Demanding",
    "penaltyRule": "30 Burpees or 200m Penalty Loop per failed obstacle",
    "courseTerrain": "Rugged wilderness, steep mountain ascents, technical singletrack, river beds",
    "obstacleIds": [
      "spartan-hurdle-walls",
      "spartan-out",
      "spartan-6ft-wall",
      "spartan-7ft-wall",
      "spartan-8ft-wall",
      "spartan-inverted-wall",
      "spartan-stairway-to-sparta",
      "spartan-a-frame",
      "spartan-vertical-cargo",
      "spartan-barbed-wire",
      "spartan-dunk-wall",
      "spartan-slip-wall",
      "spartan-balance-beam",
      "spartan-z-wall",
      "spartan-atlas-carry",
      "spartan-sandbag-carry",
      "spartan-bucket-carry",
      "spartan-jerry-can",
      "spartan-tire-flip",
      "spartan-hercules-hoist",
      "spartan-rope-climb",
      "spartan-monkey-bars",
      "spartan-twister",
      "spartan-olympus",
      "spartan-beater",
      "spartan-multi-rig",
      "spartan-spear-throw",
      "spartan-fire-jump"
    ]
  },
  {
    "id": "spartan-beast",
    "brandId": "spartan-race",
    "name": "Spartan Beast",
    "brandName": "Spartan Race",
    "distance": "21 km (13.1 miles)",
    "obstacleCount": 30,
    "difficulty": "Extreme",
    "penaltyRule": "30 Burpees or 200m Penalty Loop per failed obstacle",
    "courseTerrain": "Alpine mountain terrain, ski resort black diamonds, 3,000–5,000ft+ elevation gain",
    "obstacleIds": [
      "spartan-hurdle-walls",
      "spartan-out",
      "spartan-6ft-wall",
      "spartan-7ft-wall",
      "spartan-8ft-wall",
      "spartan-inverted-wall",
      "spartan-stairway-to-sparta",
      "spartan-the-box",
      "spartan-a-frame",
      "spartan-vertical-cargo",
      "spartan-barbed-wire",
      "spartan-dunk-wall",
      "spartan-lake-swim",
      "spartan-slip-wall",
      "spartan-balance-beam",
      "spartan-z-wall",
      "spartan-tyrolean",
      "spartan-atlas-carry",
      "spartan-sandbag-carry",
      "spartan-bucket-carry",
      "spartan-jerry-can",
      "spartan-tire-flip",
      "spartan-hercules-hoist",
      "spartan-rope-climb",
      "spartan-monkey-bars",
      "spartan-twister",
      "spartan-olympus",
      "spartan-beater",
      "spartan-helix",
      "spartan-ape-hanger",
      "spartan-multi-rig",
      "spartan-spear-throw",
      "spartan-memory-test",
      "spartan-fire-jump"
    ]
  },
  {
    "id": "spartan-ultra",
    "brandId": "spartan-race",
    "name": "Spartan Ultra",
    "brandName": "Spartan Race",
    "distance": "50 km (31 miles)",
    "obstacleCount": 60,
    "difficulty": "Extreme",
    "penaltyRule": "30 Burpees or Penalty Loop + Strict Station Cutoff Timers (DNF if missed)",
    "courseTerrain": "2 Full Beast Laps + Ultra Specific Loop, 6,000–10,000ft+ vert in sub-freezing/extreme conditions",
    "obstacleIds": [
      "spartan-hurdle-walls",
      "spartan-out",
      "spartan-6ft-wall",
      "spartan-7ft-wall",
      "spartan-8ft-wall",
      "spartan-inverted-wall",
      "spartan-stairway-to-sparta",
      "spartan-the-box",
      "spartan-a-frame",
      "spartan-vertical-cargo",
      "spartan-barbed-wire",
      "spartan-dunk-wall",
      "spartan-lake-swim",
      "spartan-slip-wall",
      "spartan-balance-beam",
      "spartan-z-wall",
      "spartan-tyrolean",
      "spartan-atlas-carry",
      "spartan-sandbag-carry",
      "spartan-bucket-carry",
      "spartan-jerry-can",
      "spartan-tire-flip",
      "spartan-hercules-hoist",
      "spartan-rope-climb",
      "spartan-monkey-bars",
      "spartan-twister",
      "spartan-olympus",
      "spartan-beater",
      "spartan-helix",
      "spartan-ape-hanger",
      "spartan-multi-rig",
      "spartan-spear-throw",
      "spartan-memory-test",
      "spartan-fire-jump"
    ]
  },
  {
    "id": "tough-mudder-5k",
    "brandId": "tough-mudder",
    "name": "Tough Mudder 5K",
    "brandName": "Tough Mudder",
    "distance": "5 km (3+ miles)",
    "obstacleCount": 13,
    "difficulty": "Beginner-Friendly",
    "penaltyRule": "Zero Penalties (Teammates help you clear or walk around freely)",
    "courseTerrain": "Mud trenches, forest singletrack, grass fields",
    "obstacleIds": [
      "tm-kiss-of-mud",
      "tm-mudderhorn",
      "tm-hero-carry",
      "tm-hold-your-wood",
      "tm-birth-canal",
      "tm-pitfall",
      "tm-trench-warfare",
      "tm-everest",
      "tm-electroshock"
    ]
  },
  {
    "id": "tough-mudder-10k",
    "brandId": "tough-mudder",
    "name": "Tough Mudder 10K+",
    "brandName": "Tough Mudder",
    "distance": "10 km (6+ miles)",
    "obstacleCount": 20,
    "difficulty": "Moderate",
    "penaltyRule": "Zero Penalties (Teamwork & mental challenge emphasis)",
    "courseTerrain": "Deep clay valleys, creek crossings, thick mud bogs",
    "obstacleIds": [
      "tm-kiss-of-mud",
      "tm-mudderhorn",
      "tm-hero-carry",
      "tm-hold-your-wood",
      "tm-birth-canal",
      "tm-pitfall",
      "tm-trench-warfare",
      "tm-boa-constrictor",
      "tm-cage-crawl",
      "tm-texas-holdem",
      "tm-skidmarked",
      "tm-berlin-walls",
      "tm-cry-baby",
      "tm-augustus-gloop",
      "tm-arctic-enema",
      "tm-block-ness",
      "tm-funky-monkey",
      "tm-everest",
      "tm-electroshock"
    ]
  },
  {
    "id": "tough-mudder-classic",
    "brandId": "tough-mudder",
    "name": "Tough Mudder 15K (Classic)",
    "brandName": "Tough Mudder",
    "distance": "15 km (10 miles)",
    "obstacleCount": 30,
    "difficulty": "Demanding",
    "penaltyRule": "Zero Penalties (Legitimate endurance and psychological trial)",
    "courseTerrain": "10-mile cross-country grind through woods, mud quagmires, and lakes",
    "obstacleIds": [
      "tm-kiss-of-mud",
      "tm-mudderhorn",
      "tm-hero-carry",
      "tm-hold-your-wood",
      "tm-birth-canal",
      "tm-pitfall",
      "tm-trench-warfare",
      "tm-boa-constrictor",
      "tm-cage-crawl",
      "tm-texas-holdem",
      "tm-skidmarked",
      "tm-berlin-walls",
      "tm-cry-baby",
      "tm-augustus-gloop",
      "tm-hydrophobia",
      "tm-arctic-enema",
      "tm-block-ness",
      "tm-funky-monkey",
      "tm-well-swung",
      "tm-everest",
      "tm-electroshock"
    ]
  },
  {
    "id": "tough-mudder-wtm",
    "brandId": "tough-mudder",
    "name": "World’s Toughest Mudder (24h)",
    "brandName": "Tough Mudder",
    "distance": "24-Hour Continuous Lap Format (50–100+ miles)",
    "obstacleCount": 25,
    "difficulty": "Extreme",
    "penaltyRule": "Mandatory obstacle clearance or harsh penalty loops; wetsuits mandatory",
    "courseTerrain": "Extreme sub-freezing nighttime endurance, desert/rock quarry circuit",
    "obstacleIds": [
      "tm-block-ness",
      "tm-everest",
      "tm-arctic-enema",
      "tm-funky-monkey",
      "tm-mudderhorn",
      "tm-cage-crawl",
      "tm-berlin-walls",
      "tm-hydrophobia",
      "tm-well-swung"
    ]
  },
  {
    "id": "savage-blitz",
    "brandId": "savage-race",
    "name": "Savage Blitz",
    "brandName": "Savage Race",
    "distance": "5 km (3 miles)",
    "obstacleCount": 18,
    "difficulty": "Moderate",
    "penaltyRule": "Open: Unlimited attempts or bypass | SavagePRO: Must clear on 1st/unbroken attempt",
    "courseTerrain": "Fast, flat-to-rolling dirt trails with heavy obstacle density",
    "obstacleIds": [
      "savage-colossus",
      "savage-rig",
      "savage-davy-jones",
      "savage-battering-ram",
      "savage-big-cheese",
      "savage-shit-creek",
      "savage-squeeze-play",
      "savage-great-wall",
      "savage-lumberjack",
      "savage-incline-wall"
    ]
  },
  {
    "id": "savage-standard",
    "brandId": "savage-race",
    "name": "Savage Race (Standard 6-Mile)",
    "brandName": "Savage Race",
    "distance": "10 km (6 miles)",
    "obstacleCount": 28,
    "difficulty": "Demanding",
    "penaltyRule": "Open: Multiple attempts | SavagePRO: Miss 1 obstacle = Cut wristband",
    "courseTerrain": "Dense woods, mud pits, water ponds, technical ninja complexes",
    "obstacleIds": [
      "savage-colossus",
      "savage-twirly-bird",
      "savage-rig",
      "savage-davy-jones",
      "savage-sawtooth",
      "savage-wheel-world",
      "savage-chop-sticks",
      "savage-battering-ram",
      "savage-big-cheese",
      "savage-shit-creek",
      "savage-pedal-metal",
      "savage-squeeze-play",
      "savage-great-wall",
      "savage-pipe-dream",
      "savage-kiss-my-walls",
      "savage-thors-lightning",
      "savage-barn-doors",
      "savage-lumberjack",
      "savage-incline-wall"
    ]
  },
  {
    "id": "savage-pro",
    "brandId": "savage-race",
    "name": "SavagePRO Championship",
    "brandName": "Savage Race",
    "distance": "10 km (6 miles)",
    "obstacleCount": 28,
    "difficulty": "Extreme",
    "penaltyRule": "Mandatory 100% completion. Miss 1 = Cut wristband, disqualified from awards/money",
    "courseTerrain": "Full race course with zero partner assists allowed and strict obstacle marshals",
    "obstacleIds": [
      "savage-colossus",
      "savage-twirly-bird",
      "savage-rig",
      "savage-sawtooth",
      "savage-wheel-world",
      "savage-chop-sticks",
      "savage-pipe-dream",
      "savage-kiss-my-walls",
      "savage-barn-doors"
    ]
  },
  {
    "id": "rugged-maniac-5k",
    "brandId": "rugged-maniac",
    "name": "Rugged Maniac 5K",
    "brandName": "Rugged Maniac",
    "distance": "5 km (3.1 miles)",
    "obstacleCount": 25,
    "difficulty": "Beginner-Friendly",
    "penaltyRule": "Zero Penalties (Skip any obstacle without penalty or shame)",
    "courseTerrain": "Adult playground layout with bounce pads, giant slides, foam pits, and dirt tracks",
    "obstacleIds": [
      "rugged-mount-maniac",
      "rugged-gauntlet",
      "rugged-tipping-point",
      "rugged-water-drop",
      "rugged-quad-sliders",
      "rugged-ant-gravity",
      "rugged-ring-toss",
      "rugged-head-scratcher",
      "rugged-accelerator",
      "rugged-warp-wall",
      "rugged-balance-bust",
      "rugged-commando-crawl",
      "rugged-shoe-catcher",
      "rugged-the-ringer",
      "rugged-leap-of-faith",
      "rugged-pyromaniac",
      "rugged-bunker-hurdles",
      "rugged-pipe-dream"
    ]
  }
];

export const OBSTACLE_LIBRARY: ObstacleProfile[] = [
  {
    "id": "spartan-rope-climb",
    "slug": "rope-climb",
    "name": "The Rope Climb (16ft Mud Slick)",
    "category": "Climbing",
    "races": [
      "spartan-race"
    ],
    "raceFormats": [
      "spartan-sprint",
      "spartan-stadion",
      "spartan-super",
      "spartan-beast",
      "spartan-ultra"
    ],
    "averageFailureRate": "35% in Open Heats",
    "techniqueRating": 90,
    "gripRating": 75,
    "pullingRating": 78,
    "fatigueResistance": 65,
    "wetConditionRating": 85,
    "penaltyType": "30 Burpees / Penalty Loop (15 in Stadion)",
    "description": "16-foot vertical hemp or synthetic rope suspended over a muddy water pit. Athletes must climb and strike the top bell with an open hand without kicking the crossbar.",
    "whyPeopleFail": [
      "Attempting to pull bodyweight using arms alone without clamping feet",
      "Mud and water on shoes causing feet to slip through the clamp",
      "Forearm blowout from gripping the rope while searching for footing",
      "Hand burns on descent caused by sliding down rather than stepping down"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Ground-Based Foot Clamp Mastery (J-Hook & S-Hook)",
        "description": "Sit on bench or box, practice clamping rope between boots in under 2 seconds.",
        "targetBenchmark": "5 clean clamps in under 2s each",
        "equipment": "Rope or vertical towel"
      },
      {
        "level": 2,
        "name": "Standing Foot-Lock Squats",
        "description": "Stand on clamped rope, lock knees, stand tall using 90% leg drive.",
        "targetBenchmark": "10 continuous standing leg extensions",
        "equipment": "Rope"
      },
      {
        "level": 3,
        "name": "Half-Climb with Controlled Stepping Descent",
        "description": "Climb 8 feet up, pause for 5s on locked feet, descend hand-under-hand.",
        "targetBenchmark": "3 unbroken half-climbs with zero hand burns",
        "equipment": "16ft rope"
      },
      {
        "level": 4,
        "name": "Full 16ft Climb Fresh Standard",
        "description": "Touch the bell, descend safely using alternating foot releases.",
        "targetBenchmark": "Clean climb in under 18 seconds",
        "equipment": "Full 16ft rope"
      },
      {
        "level": 5,
        "name": "Post-Run Compromised Climb (Fatigue)",
        "description": "Run 800m at threshold pace, immediately jump onto rope and complete climb.",
        "targetBenchmark": "Climb completed within 25 seconds at 170+ BPM",
        "equipment": "Rope + Running Track/Trail"
      },
      {
        "level": 6,
        "name": "Wet & Muddy Simulation",
        "description": "Soak rope and shoes with water/clay, execute deliberate J-Hook lock.",
        "targetBenchmark": "100% footing retention without slipping",
        "equipment": "Wet rope + mud"
      }
    ],
    "diagnosticTest": {
      "name": "Foot Clamp Lock-off Test",
      "protocol": "Jump to rope, lock feet, let go of one hand, hold for 15 seconds.",
      "passCriteria": "Legs support bodyweight with zero slippage."
    },
    "recommendedWeeklyDrill": "3 sets of: 200m Run + 1 Full Rope Climb + 10 Air Squats."
  },
  {
    "id": "spartan-multi-rig",
    "slug": "multi-rig",
    "name": "Multi-Rig (Rings, Pipes, Baseballs & Ropes)",
    "category": "Swinging & Rig",
    "races": [
      "spartan-race"
    ],
    "raceFormats": [
      "spartan-sprint",
      "spartan-stadion",
      "spartan-super",
      "spartan-beast",
      "spartan-ultra"
    ],
    "averageFailureRate": "58% (Highest penalty station in OCR)",
    "techniqueRating": 92,
    "gripRating": 95,
    "pullingRating": 88,
    "fatigueResistance": 82,
    "wetConditionRating": 94,
    "penaltyType": "30 Burpees / Penalty Loop (15 in Stadion)",
    "description": "30-foot suspended rig with alternating holds including gymnastic rings, horizontal pipes, dangling baseballs, nunchucks, and short ropes ending in a final bell ring.",
    "whyPeopleFail": [
      "Swinging on straight arms, creating massive shock load on fingers",
      "Lack of rhythmic hip sway and beat swing momentum",
      "Over-gripping early rings and locking out forearms before the final transition",
      "Slipping off cold or rain-soaked smooth steel pipes"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "90-Second Active Scapular Dead Hang",
        "description": "Develop the foundational tendon stiffness required to hang safely under dynamic load.",
        "targetBenchmark": "Continuous 90-second hang without shaking",
        "equipment": "Pull-up bar"
      },
      {
        "level": 2,
        "name": "90-Degree Bent-Arm Lock-Off Hangs",
        "description": "Hold chin halfway to bar with lats and biceps engaged to absorb swing impact.",
        "targetBenchmark": "20 seconds per side single-arm assisted hold",
        "equipment": "Pull-up bar or gymnastics rings"
      },
      {
        "level": 3,
        "name": "Gymnastic Hip-Sway & Beat Swings",
        "description": "Initiate momentum from core and hips, kicking feet forward and back.",
        "targetBenchmark": "15 smooth rhythmic beat swings",
        "equipment": "Rings or bar"
      },
      {
        "level": 4,
        "name": "Unbroken Monkey Bar & Ring Traverse (Fresh)",
        "description": "Cross 20 feet of alternating rings and bars with zero pauses.",
        "targetBenchmark": "Unbroken traversal under 15 seconds",
        "equipment": "Multi-rig or monkey bars"
      },
      {
        "level": 5,
        "name": "High Lactate Multi-Rig Gauntlet",
        "description": "Run 400m sprint, do 15 burpees, then immediately traverse the full rig.",
        "targetBenchmark": "100% completion rate across 3 consecutive rounds",
        "equipment": "Rig + Track"
      }
    ],
    "diagnosticTest": {
      "name": "Dynamic Hold Transfer Test",
      "protocol": "Hang from rings, transfer 10 times from left ring to right ring without feet touching.",
      "passCriteria": "Smooth transitions with zero grip slippage."
    },
    "recommendedWeeklyDrill": "EMOM 8 Mins: Minute 1: 30s Dead Hang | Minute 2: 8 Towel Pull-Ups."
  },
  {
    "id": "spartan-spear-throw",
    "slug": "spear-throw",
    "name": "The Spear Throw (25ft Hay Bale Target)",
    "category": "Throwing",
    "races": [
      "spartan-race"
    ],
    "raceFormats": [
      "spartan-sprint",
      "spartan-stadion",
      "spartan-super",
      "spartan-beast",
      "spartan-ultra"
    ],
    "averageFailureRate": "68% (Highest penalty rate in open heats)",
    "techniqueRating": 96,
    "gripRating": 30,
    "pullingRating": 25,
    "fatigueResistance": 40,
    "wetConditionRating": 50,
    "penaltyType": "30 Burpees / Penalty Loop (15 in Stadion)",
    "description": "Athletes get one attempt to throw a 5-foot wooden spear with steel tip across a 25-foot barricade into a hay bale target. The spear must remain stuck in the bale.",
    "whyPeopleFail": [
      "Tangled cord caught around athlete foot, jerking spear backward in flight",
      "Gripping too far behind or ahead of balance point, causing severe nose-dive",
      "Throwing like a baseball with side-arm rotation instead of linear javelin drive",
      "Rushing the shot with elevated heart rate before establishing composure"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Cord Fluff & Barricade Clear Protocol",
        "description": "Lift tether cord over barricade and lay flat on ground in loose coils.",
        "targetBenchmark": "10 out of 10 clean cord setups with zero tangled feet",
        "equipment": "Tethered spear or dowel"
      },
      {
        "level": 2,
        "name": "Center-of-Gravity Balance Check",
        "description": "Balance spear across index finger, grip exactly 1 inch behind balance pivot.",
        "targetBenchmark": "Instant balance identification within 3 seconds",
        "equipment": "OCR spear"
      },
      {
        "level": 3,
        "name": "3-Point Stance & Linear Laser Release",
        "description": "Sight target with non-dominant arm, keep throwing elbow high, drive along linear plane.",
        "targetBenchmark": "15 of 20 stuck throws at 25 feet",
        "equipment": "Spear + Hay bale"
      },
      {
        "level": 4,
        "name": "Post-Sprint High Heart Rate Throwing",
        "description": "Run 400m sprint, take 2 deep belly breaths, execute throw at 170 BPM.",
        "targetBenchmark": "80% stick rate under simulated race pressure",
        "equipment": "Spear + Track + Bale"
      }
    ],
    "diagnosticTest": {
      "name": "10-Throw Precision Test",
      "protocol": "Throw 10 spears at 25ft target with 15-second reset between throws.",
      "passCriteria": "8 or more clean sticks into the hay bale."
    },
    "recommendedWeeklyDrill": "10 practice throws twice weekly focusing on cord clearing and breathing."
  },
  {
    "id": "spartan-bucket-carry",
    "slug": "bucket-carry",
    "name": "Bucket Carry (50-70lb Gravel Uphill Slog)",
    "category": "Heavy Carries",
    "races": [
      "spartan-race"
    ],
    "raceFormats": [
      "spartan-sprint",
      "spartan-super",
      "spartan-beast",
      "spartan-ultra"
    ],
    "averageFailureRate": "28% drops / penalty retakes",
    "techniqueRating": 75,
    "gripRating": 88,
    "pullingRating": 80,
    "fatigueResistance": 95,
    "wetConditionRating": 70,
    "penaltyType": "Must restart loop if dumped / Retake station",
    "description": "Carry a heavy gravel-filled bucket (50-70lbs) around a 200m to 400m loop, frequently up steep mountain grades. Bucket must not rest on shoulders or head.",
    "whyPeopleFail": [
      "Resting bucket rim on top of thighs, cutting off quadriceps circulation",
      "Rounding thoracic spine and dumping forward, fatiguing spinal erectors",
      "Setting bucket down repeatedly and losing mental momentum"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Bear-Hug Isometric Hold",
        "description": "Clasp fingers together under bucket base, squeezing tight to upper chest.",
        "targetBenchmark": "90-second unbroken hold standing tall",
        "equipment": "50lb bucket or heavy medicine ball"
      },
      {
        "level": 2,
        "name": "100m Flat Continuous Carry",
        "description": "Take short, choppy steps at high cadence without pausing.",
        "targetBenchmark": "100m unbroken in under 55 seconds",
        "equipment": "Bucket"
      },
      {
        "level": 3,
        "name": "Incline Hill Carry Simulation",
        "description": "Carry 50-70lb bucket up a 15% incline slope or stairs.",
        "targetBenchmark": "200m unbroken uphill without resting bucket on thighs",
        "equipment": "Bucket + Hill / Stairmaster"
      }
    ],
    "diagnosticTest": {
      "name": "2-Minute Unbroken Carry Test",
      "protocol": "Pick up 50lb bucket and walk continuously for 2 minutes without setting it down.",
      "passCriteria": "Zero drops, chest stays upright."
    },
    "recommendedWeeklyDrill": "5 rounds of: 80m Bucket Carry + 200m Jog + 10 Air Squats."
  },
  {
    "id": "spartan-sandbag-carry",
    "slug": "sandbag-carry",
    "name": "Sandbag Carry (60lb Men / 40lb Women)",
    "category": "Heavy Carries",
    "races": [
      "spartan-race"
    ],
    "raceFormats": [
      "spartan-sprint",
      "spartan-stadion",
      "spartan-super",
      "spartan-beast",
      "spartan-ultra"
    ],
    "averageFailureRate": "15% drops / excessive fatigue",
    "techniqueRating": 65,
    "gripRating": 65,
    "pullingRating": 70,
    "fatigueResistance": 92,
    "wetConditionRating": 75,
    "penaltyType": "Must complete full carry loop (Double sandbags in Beast/Ultra)",
    "description": "Shoulder or bear-hug a heavy pancake or cylindrical sandbag (60lb male, 40lb female) up and down ski slopes or stadium staircases.",
    "whyPeopleFail": [
      "Poor clean technique causing premature bicep/lower back strain",
      "Unbalanced shoulder placement causing neck and trapezius cramping",
      "Inability to maintain steady breathing under thoracic compression"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Floor-to-Shoulder Sandbag Clean",
        "description": "Hinge at hips, explode with glutes, snap bag up onto shoulder trap.",
        "targetBenchmark": "10 clean reps in 60s with 60lb bag",
        "equipment": "Sandbag"
      },
      {
        "level": 2,
        "name": "200m Single-Shoulder Carry with Mid-Point Switch",
        "description": "Carry 100m right side, smoothly transition to left side.",
        "targetBenchmark": "200m unbroken under 2 minutes",
        "equipment": "Sandbag"
      },
      {
        "level": 3,
        "name": "Incline Mountain Slog",
        "description": "Walk 400m on 15% grade carrying 60lb sandbag.",
        "targetBenchmark": "400m uphill under 6 minutes",
        "equipment": "Sandbag + Incline"
      }
    ],
    "diagnosticTest": {
      "name": "Sandbag Squat & Carry Test",
      "protocol": "20 Sandbag squats followed by 100m carry without dropping bag.",
      "passCriteria": "Continuous work under 2:30."
    },
    "recommendedWeeklyDrill": "4 sets: 100m Sandbag Carry + 200m Run."
  },
  {
    "id": "spartan-atlas-carry",
    "slug": "atlas-carry",
    "name": "Atlas Carry (100lb / 75lb Concrete Sphere + 5 Burpees)",
    "category": "Heavy Carries",
    "races": [
      "spartan-race"
    ],
    "raceFormats": [
      "spartan-sprint",
      "spartan-super",
      "spartan-beast",
      "spartan-ultra"
    ],
    "averageFailureRate": "18% failure to lift / form collapse",
    "techniqueRating": 82,
    "gripRating": 80,
    "pullingRating": 88,
    "fatigueResistance": 85,
    "wetConditionRating": 88,
    "penaltyType": "30 Burpees / Penalty Loop",
    "description": "Pick up a spherical concrete Atlas stone (100lb men / 75lb women), carry it 10 meters around a flag, drop the stone, execute 5 strict chest-to-ground burpees, pick the stone back up, and carry it back.",
    "whyPeopleFail": [
      "Trying to bicep-curl the stone instead of rolling it onto lap and using hip extension",
      "Mud or water on stone causing palms to slip off the curvature",
      "Severe lower back fatigue during the 5 burpees leading to failed second lift"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Lap-and-Lock Stone Technique",
        "description": "Squat low, scoop forearms under equator, roll stone onto thighs, lock chest down.",
        "targetBenchmark": "Hold stone on lap for 30 seconds",
        "equipment": "Heavy med ball or stone"
      },
      {
        "level": 2,
        "name": "Hip Extension Stand & Walk",
        "description": "Drive hips forward, stand tall with stone pinched into sternum, walk 10m.",
        "targetBenchmark": "10m carry with 100lb stone",
        "equipment": "Atlas Stone"
      },
      {
        "level": 3,
        "name": "Full Competition Standard Simulation",
        "description": "Carry 10m + 5 Burpees + Carry 10m back in under 45 seconds.",
        "targetBenchmark": "Unbroken round under 40 seconds",
        "equipment": "Stone"
      }
    ],
    "diagnosticTest": {
      "name": "Atlas Stone Lap & Stand",
      "protocol": "Lift stone from ground to full standing hip lockout 3 times.",
      "passCriteria": "3 clean reps without rounded back failure."
    },
    "recommendedWeeklyDrill": "Heavy deadlifts 5x5 + 3 sets of 50m Heavy Sandbag/Stone Carries."
  },
  {
    "id": "spartan-hercules-hoist",
    "slug": "hercules-hoist",
    "name": "Hercules Hoist (90-110lb Pulley Sandbag)",
    "category": "Heavy Carries",
    "races": [
      "spartan-race"
    ],
    "raceFormats": [
      "spartan-sprint",
      "spartan-stadion",
      "spartan-super",
      "spartan-beast",
      "spartan-ultra"
    ],
    "averageFailureRate": "25% in Open Heats (Higher in wet conditions)",
    "techniqueRating": 85,
    "gripRating": 84,
    "pullingRating": 90,
    "fatigueResistance": 70,
    "wetConditionRating": 90,
    "penaltyType": "30 Burpees / Penalty Loop (15 in Stadion)",
    "description": "Using a single suspended pulley rope, haul a 90-110lb sandbag completely to the top bracket, then lower it under control to the ground without letting it free-fall slam.",
    "whyPeopleFail": [
      "Trying to arm-curl the rope without using bodyweight squat leverage",
      "Letting the rope slip through hands causing friction burns or disqualification drop",
      "Muddy wet rope slipping through fingers near the top"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Bodyweight Sit-Back Leverage Mechanics",
        "description": "Stand at fence, grip rope high, squat down and sit hips back to pull rope.",
        "targetBenchmark": "Move heavy load using leg drive",
        "equipment": "Lat pull or pulley"
      },
      {
        "level": 2,
        "name": "Foot-Pin / Rope Cleat Technique",
        "description": "Step on rope with lead foot to secure progress between hand pulls.",
        "targetBenchmark": "Secure rope under foot with zero slippage",
        "equipment": "Pulley rope"
      },
      {
        "level": 3,
        "name": "Controlled Hand-over-Hand Lowering",
        "description": "Lower load slowly with hand-over-hand control without letting bag slam.",
        "targetBenchmark": "Lower 100lb in 10 controlled seconds",
        "equipment": "Cable hoist"
      }
    ],
    "diagnosticTest": {
      "name": "Heavy Pulley Hoist Test",
      "protocol": "Hoist 100lb sandbag 25ft to top pulley within 20 seconds.",
      "passCriteria": "Clean lift and controlled descent."
    },
    "recommendedWeeklyDrill": "Heavy cable rows 4x8 + 4 sets of hand-over-hand sled drags."
  },
  {
    "id": "spartan-8ft-wall",
    "slug": "8ft-wall",
    "name": "The 8-Foot Vertical Wall",
    "category": "Walls",
    "races": [
      "spartan-race"
    ],
    "raceFormats": [
      "spartan-sprint",
      "spartan-super",
      "spartan-beast",
      "spartan-ultra"
    ],
    "averageFailureRate": "42% for athletes under 5'6\"",
    "techniqueRating": 88,
    "gripRating": 60,
    "pullingRating": 84,
    "fatigueResistance": 55,
    "wetConditionRating": 70,
    "penaltyType": "30 Burpees / Penalty Loop",
    "description": "Smooth vertical wooden wall with no foot rungs. Athletes must clear the wall completely unassisted in competitive heats.",
    "whyPeopleFail": [
      "Running horizontally into the wall instead of converting momentum upward",
      "Trying to muscle-up directly over without using a heel-hook or knee pop",
      "Dropping or jumping off the back side and injuring feet or ankles"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Wall-Run Foot Plant Mechanics",
        "description": "Approach at 80% sprint, plant dominant shoe 3.5ft high to launch vertically.",
        "targetBenchmark": "Touch 8.5ft marker with both palms",
        "equipment": "Wall or box"
      },
      {
        "level": 2,
        "name": "Scapular Wall Pull & Elbow Lockout",
        "description": "Hang from wall ledge, pull chest to top edge.",
        "targetBenchmark": "5 strict chest-to-ledge pulls",
        "equipment": "Wall ledge"
      },
      {
        "level": 3,
        "name": "The Solo Heel-Hook Pop",
        "description": "Kick one heel up over top ledge, roll hip over heel, pivot onto stomach.",
        "targetBenchmark": "Solo ascent in under 5 seconds",
        "equipment": "8ft wall"
      },
      {
        "level": 4,
        "name": "Backside Controlled Lowering",
        "description": "Hang by hands on backside to drop from only 3ft off ground.",
        "targetBenchmark": "Zero impact landing",
        "equipment": "Wall"
      }
    ],
    "diagnosticTest": {
      "name": "Strict Chest-to-Ledge Pull-Up",
      "protocol": "From dead hang on 2-inch wood ledge, pull until sternum touches top.",
      "passCriteria": "3 clean reps without kicking."
    },
    "recommendedWeeklyDrill": "4 sets of: 5 Box Jump Over 30\" + 3 Wall Heel-Hooks."
  },
  {
    "id": "spartan-7ft-wall",
    "slug": "7ft-wall",
    "name": "The 7-Foot Vertical Wall",
    "category": "Walls",
    "races": [
      "spartan-race"
    ],
    "raceFormats": [
      "spartan-sprint",
      "spartan-super",
      "spartan-beast",
      "spartan-ultra"
    ],
    "averageFailureRate": "25% in Open Heats",
    "techniqueRating": 75,
    "gripRating": 55,
    "pullingRating": 75,
    "fatigueResistance": 50,
    "wetConditionRating": 65,
    "penaltyType": "30 Burpees / Penalty Loop",
    "description": "Smooth vertical 7-foot timber wall. Athletes must scale over without using side kickboards or support braces.",
    "whyPeopleFail": [
      "Slipping off wet wood during foot pop",
      "Fatigued lats unable to press chest over the top board",
      "Fear of height at the top transition"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Wall Push & Palm Press",
        "description": "Jump to top ledge, press down to lock arms into dip position.",
        "targetBenchmark": "Hold lockout for 15 seconds",
        "equipment": "7ft wall"
      },
      {
        "level": 2,
        "name": "Leg Swing Rollover",
        "description": "Swing dominant leg over top rail, straddle wall, rotate torso.",
        "targetBenchmark": "Smooth rollover in under 6 seconds",
        "equipment": "7ft wall"
      }
    ],
    "diagnosticTest": {
      "name": "7ft Wall Solo Clearance",
      "protocol": "Clear 7ft wall fresh in under 8 seconds.",
      "passCriteria": "Fast unassisted climb and safe dismount."
    },
    "recommendedWeeklyDrill": "3 sets of 8 strict bar dips + 5 plyometric pull-ups."
  },
  {
    "id": "spartan-6ft-wall",
    "slug": "6ft-wall",
    "name": "The 6-Foot Vertical Wall",
    "category": "Walls",
    "races": [
      "spartan-race"
    ],
    "raceFormats": [
      "spartan-sprint",
      "spartan-stadion",
      "spartan-super",
      "spartan-beast",
      "spartan-ultra"
    ],
    "averageFailureRate": "12% in Open Heats",
    "techniqueRating": 60,
    "gripRating": 45,
    "pullingRating": 65,
    "fatigueResistance": 40,
    "wetConditionRating": 55,
    "penaltyType": "30 Burpees / Penalty Loop (15 in Stadion)",
    "description": "Standard 6-foot wooden wall positioned early or in clusters to test bounding agility and upper body press.",
    "whyPeopleFail": [
      "Hesitation on approach leading to stalled jump",
      "Scraping shins against top rail due to lack of clearance"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Bounding Jump & Chest Snap",
        "description": "Single-leg bound to grip top rail, kick feet high to belly-flop top board.",
        "targetBenchmark": "Clear wall in 1 fluid motion",
        "equipment": "6ft wall"
      }
    ],
    "diagnosticTest": {
      "name": "Fluid 6ft Wall Traverse",
      "protocol": "Approach at run, clear wall, land in stride.",
      "passCriteria": "Under 4 seconds total duration."
    },
    "recommendedWeeklyDrill": "Box jumps 3x10 at 30 inches."
  },
  {
    "id": "spartan-hurdle-walls",
    "slug": "hurdle-walls",
    "name": "4-Foot & 5-Foot Hurdle Walls",
    "category": "Walls",
    "races": [
      "spartan-race"
    ],
    "raceFormats": [
      "spartan-sprint",
      "spartan-stadion",
      "spartan-super",
      "spartan-beast",
      "spartan-ultra"
    ],
    "averageFailureRate": "3% (Pacing fatigue station)",
    "techniqueRating": 40,
    "gripRating": 20,
    "pullingRating": 40,
    "fatigueResistance": 60,
    "wetConditionRating": 45,
    "penaltyType": "30 Burpees / Penalty Loop (15 in Stadion)",
    "description": "Low 4-foot and 5-foot wooden timber hurdle barriers designed to break running rhythm and force rapid hip flexion.",
    "whyPeopleFail": [
      "Catching trailing foot on top rail and tripping",
      "Excessive leg fatigue causing heavy landings"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Vault & Roll Step",
        "description": "Plant one hand on rail, kick trailing leg over with minimal deceleration.",
        "targetBenchmark": "Clear 3 consecutive hurdles without stopping",
        "equipment": "Low wall / hurdle"
      }
    ],
    "diagnosticTest": {
      "name": "Triple Hurdle Speed Test",
      "protocol": "Clear three 4ft hurdles spaced 10 meters apart at full running speed.",
      "passCriteria": "Smooth clearance under 12 seconds."
    },
    "recommendedWeeklyDrill": "4 sets of 6 hurdle hops or bench vaults."
  },
  {
    "id": "spartan-inverted-wall",
    "slug": "inverted-wall",
    "name": "Inverted Wall (60° Reverse Overhang)",
    "category": "Walls",
    "races": [
      "spartan-race"
    ],
    "raceFormats": [
      "spartan-sprint",
      "spartan-super",
      "spartan-beast",
      "spartan-ultra"
    ],
    "averageFailureRate": "32% in Open Heats",
    "techniqueRating": 86,
    "gripRating": 70,
    "pullingRating": 82,
    "fatigueResistance": 60,
    "wetConditionRating": 75,
    "penaltyType": "30 Burpees / Penalty Loop",
    "description": "7-foot wooden wall leaning backward toward the athlete at an inverted 60-degree angle with a top lip overhang.",
    "whyPeopleFail": [
      "Gravity pulling body away from wall when feet leave the bottom slat",
      "Reaching blindly over the top lip without securing foot friction",
      "Panicking while inverted and peeling off backward"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Incline Hug Mechanics",
        "description": "Walk feet up lower slats while keeping chest pinned against the overhang.",
        "targetBenchmark": "Reach top ledge with both hands while keeping feet high",
        "equipment": "Inverted wall"
      },
      {
        "level": 2,
        "name": "Leg-Hook Overhang Roll",
        "description": "Swing dominant foot over the top lip to anchor before pulling chest up.",
        "targetBenchmark": "Solo clearance in under 10 seconds",
        "equipment": "Inverted wall"
      }
    ],
    "diagnosticTest": {
      "name": "Inverted Overhang Lock-off",
      "protocol": "Hang from inverted wall lip with feet braced on lower board for 20s.",
      "passCriteria": "Stable core engagement with zero slide."
    },
    "recommendedWeeklyDrill": "Pull-ups with knee tucks 4x8 + 3 sets of 30s inverted hangs."
  },
  {
    "id": "spartan-out",
    "slug": "out",
    "name": "Over-Under-Through (O-U-T Hurdles)",
    "category": "Walls",
    "races": [
      "spartan-race"
    ],
    "raceFormats": [
      "spartan-sprint",
      "spartan-stadion",
      "spartan-super",
      "spartan-beast",
      "spartan-ultra"
    ],
    "averageFailureRate": "4% (Cadence disruptor)",
    "techniqueRating": 50,
    "gripRating": 25,
    "pullingRating": 45,
    "fatigueResistance": 65,
    "wetConditionRating": 50,
    "penaltyType": "30 Burpees / Penalty Loop",
    "description": "Three consecutive barrier sections: climb Over a 4ft wall, crawl Under a low wall slat, and dive Through an enclosed square window cut-out.",
    "whyPeopleFail": [
      "Cramping during transition from low belly crawl to high hurdle",
      "Smacking knees or back against window frames"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Head-First Window Dive",
        "description": "Shoot hands and head through window first, slide hips smoothly through frame.",
        "targetBenchmark": "Traverse window under 3 seconds",
        "equipment": "Plyo box / window"
      }
    ],
    "diagnosticTest": {
      "name": "O-U-T Continuous Flow",
      "protocol": "Clear all three sections in unbroken sequence without stopping.",
      "passCriteria": "Completed in under 15 seconds."
    },
    "recommendedWeeklyDrill": "Bear crawl 50m + 10 box jumps + 10 burpees."
  },
  {
    "id": "spartan-stairway-to-sparta",
    "slug": "stairway-to-sparta",
    "name": "Stairway to Sparta (Ascending Beams to Inverted Lip)",
    "category": "Walls",
    "races": [
      "spartan-race"
    ],
    "raceFormats": [
      "spartan-super",
      "spartan-beast",
      "spartan-ultra"
    ],
    "averageFailureRate": "28% for athletes fearing heights",
    "techniqueRating": 80,
    "gripRating": 65,
    "pullingRating": 78,
    "fatigueResistance": 65,
    "wetConditionRating": 70,
    "penaltyType": "30 Burpees / Penalty Loop",
    "description": "A 15-foot high A-frame wooden tower featuring smooth vertical ladder timbers on the lower half leading to an inverted wall overhang at the summit.",
    "whyPeopleFail": [
      "First ladder rung is placed 5-6 feet high, requiring dynamic vertical jump",
      "Upper inverted section requires reaching backward while 12 feet off the ground",
      "Freezing at the apex due to vertigo"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "High-Reach Rung Catch",
        "description": "Jump vertically to grab the lowest rung and pull chin to bar.",
        "targetBenchmark": "Reach and hold 6ft high bar easily",
        "equipment": "High bar"
      },
      {
        "level": 2,
        "name": "Summit Apex Transition",
        "description": "Step feet onto upper beams, pull chest over inverted top rail, step down reverse side.",
        "targetBenchmark": "Smooth ascent and descent under 25s",
        "equipment": "Stairway obstacle"
      }
    ],
    "diagnosticTest": {
      "name": "High Beam Muscle-Up Pop",
      "protocol": "Jump to 7ft beam, muscle up over top without assistance.",
      "passCriteria": "Clean single attempt."
    },
    "recommendedWeeklyDrill": "Strict pull-ups 4x6 + box jump burpees."
  },
  {
    "id": "spartan-slip-wall",
    "slug": "slip-wall",
    "name": "Slip Wall (Steep Plywood with Haul Ropes)",
    "category": "Walls",
    "races": [
      "spartan-race"
    ],
    "raceFormats": [
      "spartan-sprint",
      "spartan-super",
      "spartan-beast",
      "spartan-ultra"
    ],
    "averageFailureRate": "22% in rain / mud",
    "techniqueRating": 75,
    "gripRating": 70,
    "pullingRating": 70,
    "fatigueResistance": 55,
    "wetConditionRating": 92,
    "penaltyType": "30 Burpees / Penalty Loop",
    "description": "A 45-degree angled slippery plywood wall (12-15ft tall) covered in mud, with knotted ropes dangling to the base.",
    "whyPeopleFail": [
      "Standing too close with body upright, reducing shoe friction against the wood",
      "Letting rope slide through hands when pulling body upward",
      "Letting go of rope before securing hands on the top platform"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Perpendicular Lean Friction Walk",
        "description": "Lean body backward so feet push at 90 degrees directly into the slope.",
        "targetBenchmark": "Walk up 10ft incline with zero foot slip",
        "equipment": "Angled ramp + rope"
      },
      {
        "level": 2,
        "name": "Hand-over-Hand Rapid Ascent",
        "description": "Keep steady cadence, pulling hand over hand without pausing.",
        "targetBenchmark": "Summit wall under 8 seconds",
        "equipment": "Slip wall"
      }
    ],
    "diagnosticTest": {
      "name": "Muddy Incline Friction Hold",
      "protocol": "Hold position on angled wet wall using single hand and both feet for 20 seconds.",
      "passCriteria": "Zero downward slide."
    },
    "recommendedWeeklyDrill": "Steep hill sprint repeats + inverted row holds."
  },
  {
    "id": "spartan-monkey-bars",
    "slug": "monkey-bars",
    "name": "Monkey Bars (25ft Horizontal Steel Rungs)",
    "category": "Swinging & Rig",
    "races": [
      "spartan-race"
    ],
    "raceFormats": [
      "spartan-sprint",
      "spartan-stadion",
      "spartan-super",
      "spartan-beast",
      "spartan-ultra"
    ],
    "averageFailureRate": "30% in Open Heats (50% if raining)",
    "techniqueRating": 80,
    "gripRating": 85,
    "pullingRating": 75,
    "fatigueResistance": 70,
    "wetConditionRating": 90,
    "penaltyType": "30 Burpees / Penalty Loop (15 in Stadion)",
    "description": "25 feet of smooth round horizontal steel bars suspended 8 feet above ground or water, requiring hand-to-hand traversal to strike the end bell.",
    "whyPeopleFail": [
      "Moving on straight elbows causing finger fatigue",
      "Trying to skip too many rungs without sufficient forward momentum",
      "Muddy or sweaty palms sliding off smooth steel"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Sideways Traverse Pattern",
        "description": "Face sideways, move hands together on same rung before advancing lead hand.",
        "targetBenchmark": "Cross 20ft unbroken sideways",
        "equipment": "Monkey bars"
      },
      {
        "level": 2,
        "name": "Forward Alternating Beat Swing",
        "description": "Use pendulum momentum: swing right, reach right; swing left, reach left.",
        "targetBenchmark": "Cross 25ft in under 12 seconds",
        "equipment": "Monkey bars"
      }
    ],
    "diagnosticTest": {
      "name": "Unbroken 30-Second Traverse",
      "protocol": "Cross 25ft monkey bars forward and back without touching ground.",
      "passCriteria": "Complete round trip unbroken."
    },
    "recommendedWeeklyDrill": "3 sets of 45-second bar hangs + 12 pull-ups."
  },
  {
    "id": "spartan-twister",
    "slug": "twister",
    "name": "The Twister (Rotating 3-Section Pipe Handles)",
    "category": "Swinging & Rig",
    "races": [
      "spartan-race"
    ],
    "raceFormats": [
      "spartan-super",
      "spartan-beast",
      "spartan-ultra"
    ],
    "averageFailureRate": "52% in Open Heats",
    "techniqueRating": 94,
    "gripRating": 92,
    "pullingRating": 86,
    "fatigueResistance": 80,
    "wetConditionRating": 88,
    "penaltyType": "30 Burpees / Penalty Loop",
    "description": "A 30-foot suspended rotating pipe with protruding peg handles divided into 3 independently spinning sections, ending in a bell.",
    "whyPeopleFail": [
      "Moving too slowly: each peg handle rotates under athlete weight until stopped by inner stop-bracket",
      "Shock load ripping fingers off handle when the section clicks into rotation",
      "Attempting forward traversal instead of backward / sideways momentum technique"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Rotating Pipe Grasp Resilience",
        "description": "Hang from offset handles and absorb rotational drop without letting go.",
        "targetBenchmark": "Hold rotating handle 20s per arm",
        "equipment": "Twister rig / rotating pull-up bar"
      },
      {
        "level": 2,
        "name": "Backward Traverse Cadence",
        "description": "Lead with hips facing backward, matching rotation of pipe to reduce shoulder torque.",
        "targetBenchmark": "Cross 2 sections unbroken",
        "equipment": "Twister"
      },
      {
        "level": 3,
        "name": "Full 3-Section Speed Traversal",
        "description": "Continuous rapid cadence with zero pause at intermediate section transitions.",
        "targetBenchmark": "Unbroken traversal under 16 seconds",
        "equipment": "Twister"
      }
    ],
    "diagnosticTest": {
      "name": "Offset Handle Lock-off Test",
      "protocol": "Hang from two offset pegs, execute 5 dynamic hand hops.",
      "passCriteria": "Secure grip with zero loss of contact."
    },
    "recommendedWeeklyDrill": "Frenchies pull-ups 4 sets + fat grip hangs."
  },
  {
    "id": "spartan-olympus",
    "slug": "olympus",
    "name": "The Olympus (Angled Wall Traverse with Chains & Rock Grips)",
    "category": "Swinging & Rig",
    "races": [
      "spartan-race"
    ],
    "raceFormats": [
      "spartan-super",
      "spartan-beast",
      "spartan-ultra"
    ],
    "averageFailureRate": "48% in Open Heats",
    "techniqueRating": 94,
    "gripRating": 90,
    "pullingRating": 85,
    "fatigueResistance": 78,
    "wetConditionRating": 92,
    "penaltyType": "30 Burpees / Penalty Loop",
    "description": "Traverse across a 30-foot 60-degree angled wooden wall using chains, cut-out finger holes, and rock grips without feet touching the ground or the top lip.",
    "whyPeopleFail": [
      "Hips dropping away from wall, transferring 100% of bodyweight to fingers",
      "Muddy shoes slipping off the slick plywood surface",
      "Grabbing chain links too low with straight arms instead of staying compact"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Friction & Center of Gravity Drill",
        "description": "Keep hips glued within 6 inches of the plywood to maximize foot friction.",
        "targetBenchmark": "Hold position for 30 seconds with minimal finger strain",
        "equipment": "Angled wall / wedge"
      },
      {
        "level": 2,
        "name": "Hand-over-Hand Chain Traversing",
        "description": "Keep elbows bent at 90 degrees while shuffling feet horizontally.",
        "targetBenchmark": "20ft continuous traverse without foot slipping",
        "equipment": "Chains or rock grips"
      }
    ],
    "diagnosticTest": {
      "name": "Angled Friction Traverse Test",
      "protocol": "Cross 25ft of Olympus wall within 30 seconds.",
      "passCriteria": "Clean traversal without feet sliding off."
    },
    "recommendedWeeklyDrill": "Bouldering traversing 15 mins + 3 sets of pinch block holds."
  },
  {
    "id": "spartan-beater",
    "slug": "beater",
    "name": "The Beater (Rotating Windmill Monkey Bar Spokes)",
    "category": "Swinging & Rig",
    "races": [
      "spartan-race"
    ],
    "raceFormats": [
      "spartan-super",
      "spartan-beast",
      "spartan-ultra"
    ],
    "averageFailureRate": "46% in Open Heats",
    "techniqueRating": 90,
    "gripRating": 88,
    "pullingRating": 84,
    "fatigueResistance": 75,
    "wetConditionRating": 86,
    "penaltyType": "30 Burpees / Penalty Loop",
    "description": "Suspended monkey bars that rotate in a circular windmill wheel pattern as you grip them, creating changing bar distances and momentum drops.",
    "whyPeopleFail": [
      "Timing errors on grabbing spinning spokes",
      "Allowing rotation to stall momentum in a dead hang",
      "Forearm burnout from sudden jarring drops"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Dynamic Trapeze Transfer",
        "description": "Swing from stationary bar to rotating bar with bent elbow.",
        "targetBenchmark": "5 clean transitions",
        "equipment": "Rig with rotating wheels"
      },
      {
        "level": 2,
        "name": "Rhythmic Flywheel Cadence",
        "description": "Use the wheel rotation to slingshot body forward to the next wheel.",
        "targetBenchmark": "Full traversal under 14 seconds",
        "equipment": "Beater obstacle"
      }
    ],
    "diagnosticTest": {
      "name": "Flywheel Catch Standard",
      "protocol": "Catch 4 spinning spokes in rhythm without losing momentum.",
      "passCriteria": "Smooth swing rhythm."
    },
    "recommendedWeeklyDrill": "Kipping pull-ups + alternating bar-to-ring transfers."
  },
  {
    "id": "spartan-helix",
    "slug": "helix",
    "name": "The Helix (Spinning Steel Polygon Traverse)",
    "category": "Swinging & Rig",
    "races": [
      "spartan-race"
    ],
    "raceFormats": [
      "spartan-beast",
      "spartan-ultra"
    ],
    "averageFailureRate": "50% in Beast / Ultra",
    "techniqueRating": 92,
    "gripRating": 90,
    "pullingRating": 82,
    "fatigueResistance": 84,
    "wetConditionRating": 85,
    "penaltyType": "30 Burpees / Penalty Loop",
    "description": "Large rotating multi-sided polygon metal framework suspended over water or mud. Athletes must climb and traverse along its rotating rungs without touching the ground.",
    "whyPeopleFail": [
      "Failure to anticipate structural rotation when bodyweight crosses top rungs",
      "Overextended grip reach causing finger peel-off",
      "High lactate levels at mile 10+ of Beast making grip recovery slow"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Polygon Transition Mechanics",
        "description": "Maintain three points of contact while frame rotates beneath feet.",
        "targetBenchmark": "Stable hold through 360 degree rotation",
        "equipment": "Rotating frame / climbing wall"
      },
      {
        "level": 2,
        "name": "Continuous Helix Traverse",
        "description": "Step feet along lower struts while moving hands along upper pipe.",
        "targetBenchmark": "Complete traverse in under 20s",
        "equipment": "Helix"
      }
    ],
    "diagnosticTest": {
      "name": "Dynamic Rotational Hold",
      "protocol": "Hang and shift weight across spinning axis for 30 seconds.",
      "passCriteria": "Zero loss of grip."
    },
    "recommendedWeeklyDrill": "Climbing wall lateral traversing 20 mins + dead hangs."
  },
  {
    "id": "spartan-ape-hanger",
    "slug": "ape-hanger",
    "name": "Ape Hanger (Rope Climb to Incline Monkey Bars over Water)",
    "category": "Swinging & Rig",
    "races": [
      "spartan-race"
    ],
    "raceFormats": [
      "spartan-beast",
      "spartan-ultra"
    ],
    "averageFailureRate": "52% in Open Heats",
    "techniqueRating": 95,
    "gripRating": 94,
    "pullingRating": 92,
    "fatigueResistance": 86,
    "wetConditionRating": 95,
    "penaltyType": "30 Burpees / Penalty Loop",
    "description": "Jump into a deep water pond, swim to a 10ft dangling rope, climb out of the water onto an ascending and descending inverted monkey bar ladder, and ring the bell.",
    "whyPeopleFail": [
      "Climbing out of water with soaked clothes creates maximum deadweight load",
      "Transition from vertical rope climb to ascending monkey bars requires massive pulling power",
      "Cold water induced forearm muscle cramping"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Submerged Rope Pull-Out",
        "description": "Tread water, grab rope, pull body completely clear of water into foot clamp.",
        "targetBenchmark": "Clean climb out of water in under 5 seconds",
        "equipment": "Rope over pool"
      },
      {
        "level": 2,
        "name": "Rope-to-Bar Incline Transition",
        "description": "From top of rope, lock feet, reach up to grab first ascending monkey rung.",
        "targetBenchmark": "Unbroken transfer without pause",
        "equipment": "Rig"
      },
      {
        "level": 3,
        "name": "Wet Monkey Bar Traverse",
        "description": "Traverse 15ft of ascending and descending rungs with soaking wet hands.",
        "targetBenchmark": "Touch bell under 18 seconds",
        "equipment": "Incline monkey bars"
      }
    ],
    "diagnosticTest": {
      "name": "Weighted Wet Pull-Up & Traverse",
      "protocol": "Wear wet clothes, execute 5 chest-to-bar pull-ups, immediately traverse 15ft monkey bars.",
      "passCriteria": "Complete unbroken sequence."
    },
    "recommendedWeeklyDrill": "Weighted pull-ups 5x5 + towel grip hangs."
  },
  {
    "id": "spartan-the-box",
    "slug": "the-box",
    "name": "The Box (Elevated Shipping Container with Free Rope Ascent)",
    "category": "Climbing",
    "races": [
      "spartan-race"
    ],
    "raceFormats": [
      "spartan-beast",
      "spartan-ultra"
    ],
    "averageFailureRate": "38% in Beast / Ultra",
    "techniqueRating": 88,
    "gripRating": 80,
    "pullingRating": 86,
    "fatigueResistance": 75,
    "wetConditionRating": 80,
    "penaltyType": "30 Burpees / Penalty Loop",
    "description": "A 15-foot high steel shipping container structure. Athletes must climb a free-hanging knotted or unknotted rope, hook legs onto top ledge, and mantle onto roof.",
    "whyPeopleFail": [
      "Hitting container wall with feet and losing rope clamp tension",
      "Exhausted upper body unable to execute the mantle onto the flat roof",
      "Cramping hamstrings during top leg-hook"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "High Rope Mantle Press",
        "description": "Climb to ledge height, place both elbows on top surface, push body onto chest.",
        "targetBenchmark": "Mantle onto 6ft platform cleanly",
        "equipment": "High platform / box"
      },
      {
        "level": 2,
        "name": "Full Container Solo Ascent",
        "description": "Rope climb + roof mantle + step down cargo net on back side.",
        "targetBenchmark": "Full ascent under 20 seconds",
        "equipment": "The Box obstacle"
      }
    ],
    "diagnosticTest": {
      "name": "Box Muscle-Up / Mantle Test",
      "protocol": "From hanging position on ledge, mantle body completely onto surface in 5s.",
      "passCriteria": "Unassisted smooth mantle."
    },
    "recommendedWeeklyDrill": "Dips 4x12 + rope climbs 4 sets."
  },
  {
    "id": "spartan-a-frame",
    "slug": "a-frame",
    "name": "A-Frame Cargo Net (30-Foot Timber Apex)",
    "category": "Climbing",
    "races": [
      "spartan-race"
    ],
    "raceFormats": [
      "spartan-sprint",
      "spartan-stadion",
      "spartan-super",
      "spartan-beast",
      "spartan-ultra"
    ],
    "averageFailureRate": "10% (Fear of heights bottleneck)",
    "techniqueRating": 50,
    "gripRating": 40,
    "pullingRating": 50,
    "fatigueResistance": 55,
    "wetConditionRating": 60,
    "penaltyType": "30 Burpees / Penalty Loop",
    "description": "A massive 30-foot high timber A-frame structure covered in loose heavy cargo netting. Athletes climb up one side, roll over apex, and descend the opposite side.",
    "whyPeopleFail": [
      "Climbing in the middle of net where sag and sway are extreme instead of near rigid timber edge",
      "Freezing with vertigo at the 30-foot apex",
      "Catching boots in rope squares on descent"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Lateral Timber Edge Ascent",
        "description": "Climb within 18 inches of the side wooden timber where the net has zero slack.",
        "targetBenchmark": "Climb 20ft in under 15 seconds",
        "equipment": "Cargo net"
      },
      {
        "level": 2,
        "name": "Apex Straddle & Flip",
        "description": "Swing one leg over the top beam, pivot on pelvis, step down facing the net.",
        "targetBenchmark": "Clean apex transition under 5 seconds",
        "equipment": "A-frame cargo"
      }
    ],
    "diagnosticTest": {
      "name": "Cargo Net Speed Climb",
      "protocol": "Ascend and descend 30ft A-frame in under 40 seconds.",
      "passCriteria": "Continuous fluid movement without hesitation."
    },
    "recommendedWeeklyDrill": "Mountain climbers 4x40s + high box step-ups."
  },
  {
    "id": "spartan-vertical-cargo",
    "slug": "vertical-cargo",
    "name": "Vertical Cargo Net (High Steel Truss Ascent)",
    "category": "Climbing",
    "races": [
      "spartan-race"
    ],
    "raceFormats": [
      "spartan-super",
      "spartan-beast",
      "spartan-ultra"
    ],
    "averageFailureRate": "15% in Open Heats",
    "techniqueRating": 65,
    "gripRating": 55,
    "pullingRating": 65,
    "fatigueResistance": 60,
    "wetConditionRating": 65,
    "penaltyType": "30 Burpees / Penalty Loop",
    "description": "A purely vertical 18-foot steel truss wall hung with tensioned cargo netting leading to a top bar roll.",
    "whyPeopleFail": [
      "Over-pulling with arms rather than stepping high with hip flexion",
      "Sticking toes straight into net rather than horizontal foot placement"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "High Step Net Technique",
        "description": "Place instep horizontally on rope rungs to maximize surface friction.",
        "targetBenchmark": "Smooth vertical climb under 15s",
        "equipment": "Vertical net"
      }
    ],
    "diagnosticTest": {
      "name": "Vertical 18ft Climb Test",
      "protocol": "Climb vertical cargo net, touch top truss, descend in under 25s.",
      "passCriteria": "Zero arm pump failure."
    },
    "recommendedWeeklyDrill": "Kettlebell swings 4x20 + pull-ups."
  },
  {
    "id": "spartan-barbed-wire",
    "slug": "barbed-wire",
    "name": "Barbed Wire Crawl (Mud, Sharp Rocks & Low Wire)",
    "category": "Crawls & Balance",
    "races": [
      "spartan-race"
    ],
    "raceFormats": [
      "spartan-sprint",
      "spartan-super",
      "spartan-beast",
      "spartan-ultra"
    ],
    "averageFailureRate": "8% (Severe fatigue station)",
    "techniqueRating": 70,
    "gripRating": 30,
    "pullingRating": 50,
    "fatigueResistance": 90,
    "wetConditionRating": 95,
    "penaltyType": "Must restart crawl if standing / Disqualification for wire touching",
    "description": "Crawl 50 to 150 meters through mud, sharp shale, and rocky terrain beneath strings of razor-sharp barbed wire strung only 18-24 inches off the ground.",
    "whyPeopleFail": [
      "Raising head or butt too high and catching hydration packs or jerseys in wire",
      "Dizziness and nausea from continuous barrel-rolling without changing directions",
      "Scraping knees and elbows on sharp rocks from lack of low bear crawl technique"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Low Bear Crawl (Hip Piston Drive)",
        "description": "Keep knees 1 inch off ground, drive through balls of feet with flat spine.",
        "targetBenchmark": "50m low bear crawl under 60 seconds",
        "equipment": "Grass / turf"
      },
      {
        "level": 2,
        "name": "Bilateral Barrel Roll with Direction Reset",
        "description": "Roll smoothly across torso, switching roll direction every 5 revolutions to avoid vertigo.",
        "targetBenchmark": "100m continuous roll under 90 seconds",
        "equipment": "Grass slope"
      }
    ],
    "diagnosticTest": {
      "name": "100m Mud Crawl Endurance",
      "protocol": "Complete 100m crawl staying below 20-inch ceiling height.",
      "passCriteria": "Finished in under 2 minutes without stopping."
    },
    "recommendedWeeklyDrill": "3 sets: 40m Bear Crawl + 20 Hollow Rocks + 40m Low Army Crawl."
  },
  {
    "id": "spartan-z-wall",
    "slug": "z-wall",
    "name": "Z-Wall (Traverse Wall with 2x4 Blocks)",
    "category": "Crawls & Balance",
    "races": [
      "spartan-race"
    ],
    "raceFormats": [
      "spartan-sprint",
      "spartan-stadion",
      "spartan-super",
      "spartan-beast",
      "spartan-ultra"
    ],
    "averageFailureRate": "34% in Open Heats",
    "techniqueRating": 92,
    "gripRating": 82,
    "pullingRating": 60,
    "fatigueResistance": 65,
    "wetConditionRating": 88,
    "penaltyType": "30 Burpees / Penalty Loop (15 in Stadion)",
    "description": "Traverse horizontally along a wooden zigzagging wall using small 2x4 wooden hand and foot blocks. Athletes must turn 90-degree corners and ring the bell without feet touching the ground or hands touching the top ledge.",
    "whyPeopleFail": [
      "Hips leaning back away from the wall, forcing bodyweight onto fingertips",
      "Muddy shoes slipping off the 2-inch foot blocks",
      "Hesitation and panic on blind corner transitions"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Wall-Glued Pelvis Mechanics",
        "description": "Turn hips sideways and push belt buckle directly into the wall to maximize downward foot pressure.",
        "targetBenchmark": "Traverse 10ft wall section with fingertips barely resting",
        "equipment": "Traverse wall"
      },
      {
        "level": 2,
        "name": "Blind Corner Reach Sequence",
        "description": "Secure feet on stable block, reach leading hand around 90-degree corner, visually locate next block.",
        "targetBenchmark": "Clean corner transition in under 3 seconds",
        "equipment": "Z-wall"
      }
    ],
    "diagnosticTest": {
      "name": "Z-Wall Full Traversal",
      "protocol": "Cross all 3 sections and 2 corners of Z-wall cleanly.",
      "passCriteria": "Touch bell without falling."
    },
    "recommendedWeeklyDrill": "Climbing traverse 10 mins + single-leg balance on edge board."
  },
  {
    "id": "spartan-balance-beam",
    "slug": "balance-beam",
    "name": "Balance Beam (Narrow Timber Crossing)",
    "category": "Crawls & Balance",
    "races": [
      "spartan-race"
    ],
    "raceFormats": [
      "spartan-sprint",
      "spartan-stadion",
      "spartan-super",
      "spartan-beast",
      "spartan-ultra"
    ],
    "averageFailureRate": "22% in Open Heats",
    "techniqueRating": 85,
    "gripRating": 20,
    "pullingRating": 15,
    "fatigueResistance": 40,
    "wetConditionRating": 80,
    "penaltyType": "30 Burpees / Penalty Loop (15 in Stadion)",
    "description": "Cross a 25-foot long, 3-inch wide telephone pole or square wooden beam suspended 3 feet above mud or water.",
    "whyPeopleFail": [
      "Looking directly down at feet rather than focusing eyes at the far end of the beam",
      "Walking flat-footed rather than maintaining dynamic soft ankles and slight knee bend",
      "Muddy shoe soles losing traction on slick wet wood"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Eye Horizon Fixation Protocol",
        "description": "Fix gaze on end flag, extend arms horizontally like airplane wings, step heel-to-toe.",
        "targetBenchmark": "Cross 20ft 2x4 timber with zero step-offs",
        "equipment": "2x4 board on floor"
      },
      {
        "level": 2,
        "name": "Speed Jog Traverse",
        "description": "Jog across beam in 4 rapid strides before rotational wobble begins.",
        "targetBenchmark": "Cross 25ft beam in under 4 seconds",
        "equipment": "Balance beam"
      }
    ],
    "diagnosticTest": {
      "name": "Dynamic Single-Leg Balance",
      "protocol": "Stand on 2-inch wide beam on single foot with eyes closed for 20s.",
      "passCriteria": "Zero loss of balance."
    },
    "recommendedWeeklyDrill": "Slackline walking 10 mins or 2x4 board walks."
  },
  {
    "id": "spartan-tyrolean",
    "slug": "tyrolean",
    "name": "Tyrolean Traverse (Horizontal Rope Cable over Water)",
    "category": "Crawls & Balance",
    "races": [
      "spartan-race"
    ],
    "raceFormats": [
      "spartan-beast",
      "spartan-ultra"
    ],
    "averageFailureRate": "36% in Beast / Ultra",
    "techniqueRating": 90,
    "gripRating": 80,
    "pullingRating": 85,
    "fatigueResistance": 88,
    "wetConditionRating": 82,
    "penaltyType": "30 Burpees / Penalty Loop",
    "description": "Traverse 60 to 100 feet across a heavy tensioned horizontal cable or rope suspended over a deep lake or canyon. Athletes hang upside down or crawl on top.",
    "whyPeopleFail": [
      "Hanging with arms alone without locking single ankle or heel over the cable",
      "Allowing body to spin upside down uncontrollably in mid-traverse",
      "Extreme bicep and shoulder exhaustion halfway across the span"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Heel-Hook Cable Locking",
        "description": "Hang below cable, throw dominant heel over rope to anchor 50% of weight, pull hand over hand.",
        "targetBenchmark": "Traverse 30ft along horizontal bar or rope",
        "equipment": "Suspended bar / rope"
      },
      {
        "level": 2,
        "name": "Top-Commando Slither",
        "description": "Lie directly on top of cable with legs straddling, pull chest forward.",
        "targetBenchmark": "Traverse 50ft without rolling off",
        "equipment": "Tension cable"
      }
    ],
    "diagnosticTest": {
      "name": "Inverted Horizontal Rope Crawl",
      "protocol": "Traverse 40ft suspended rope with one ankle hooked in under 30s.",
      "passCriteria": "Continuous progress without slipping."
    },
    "recommendedWeeklyDrill": "Towel pull-ups 4x8 + core hollow body holds 4x60s."
  },
  {
    "id": "spartan-dunk-wall",
    "slug": "dunk-wall",
    "name": "Rolling Mud & Dunk Wall (Submerged Timber Mud Pit)",
    "category": "Water & Mud",
    "races": [
      "spartan-race"
    ],
    "raceFormats": [
      "spartan-sprint",
      "spartan-super",
      "spartan-beast",
      "spartan-ultra"
    ],
    "averageFailureRate": "5% (Panic / claustrophobia)",
    "techniqueRating": 60,
    "gripRating": 20,
    "pullingRating": 30,
    "fatigueResistance": 70,
    "wetConditionRating": 100,
    "penaltyType": "Must submerge completely under wall or incur 30 burpees",
    "description": "Wade through deep waist-to-chest-high mud trenches, then fully submerge head and torso beneath a heavy wooden wall suspended in opaque mud water to reach the other side.",
    "whyPeopleFail": [
      "Panic reflex when submerging head in cold muddy water with zero visibility",
      "Losing contact lens, hats, or sunglasses in the bottom silt",
      "Inhaling muddy water on emergence"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Tactile Hand Sweep & Dunk",
        "description": "Place hand on bottom edge of timber, take deep breath, pull body under, surface immediately.",
        "targetBenchmark": "Smooth submergence under 3 seconds",
        "equipment": "Pool / water trench"
      }
    ],
    "diagnosticTest": {
      "name": "Cold Water Breath Control",
      "protocol": "Submerge completely in cold water for 10 seconds, surface with calm respiration.",
      "passCriteria": "Immediate return to controlled nasal breathing."
    },
    "recommendedWeeklyDrill": "Cold water exposure / cold showers + diaphragmatic box breathing."
  },
  {
    "id": "spartan-lake-swim",
    "slug": "lake-swim",
    "name": "Open Water Lake Swim (Safety Flotation Mandatory)",
    "category": "Water & Mud",
    "races": [
      "spartan-race"
    ],
    "raceFormats": [
      "spartan-beast",
      "spartan-ultra"
    ],
    "averageFailureRate": "12% (Hypothermia / fatigue rescues)",
    "techniqueRating": 75,
    "gripRating": 15,
    "pullingRating": 50,
    "fatigueResistance": 85,
    "wetConditionRating": 100,
    "penaltyType": "Must complete swim course wearing mandatory life vest",
    "description": "Swim 100 to 300 meters across open alpine lake water in wet race apparel and trail shoes.",
    "whyPeopleFail": [
      "Heavy trail running shoes acting as water anchors, dragging legs down",
      "Cold water shock triggering hyperventilation",
      "Calf cramping while kicking"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Shoe-On Open Water Stroke",
        "description": "Swim with high-cadence arm crawl, minimizing leg kick to conserve energy.",
        "targetBenchmark": "200m continuous swim wearing trail shoes",
        "equipment": "Open water / pool"
      }
    ],
    "diagnosticTest": {
      "name": "Wet Apparel 200m Swim",
      "protocol": "Swim 200m in shoes and race clothing in under 5 minutes.",
      "passCriteria": "Continuous stroke without panic."
    },
    "recommendedWeeklyDrill": "Weekly 500m swim session with pull buoy."
  },
  {
    "id": "spartan-fire-jump",
    "slug": "fire-jump",
    "name": "Fire Jump (Flaming Timber Hurdle to Finish)",
    "category": "Agility & Mental",
    "races": [
      "spartan-race"
    ],
    "raceFormats": [
      "spartan-sprint",
      "spartan-super",
      "spartan-beast",
      "spartan-ultra"
    ],
    "averageFailureRate": "1% (Finish line celebration)",
    "techniqueRating": 30,
    "gripRating": 10,
    "pullingRating": 10,
    "fatigueResistance": 40,
    "wetConditionRating": 30,
    "penaltyType": "Mandatory clearance to reach finish timing mat",
    "description": "Leap across a 2-foot row of burning timber logs 20 feet ahead of the finish line timing mat.",
    "whyPeopleFail": [
      "Cramping on launch after 13+ miles of racing",
      "Hesitation leading to stutter step"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Bounding Stride Launch",
        "description": "Time stride so single-leg launch clears 3 feet horizontally.",
        "targetBenchmark": "Clear 3ft hurdle in full stride",
        "equipment": "Low hurdle"
      }
    ],
    "diagnosticTest": {
      "name": "Post-Run Explosive Leap",
      "protocol": "After 5K hard run, jump 3ft distance cleanly.",
      "passCriteria": "Clean landing in stride."
    },
    "recommendedWeeklyDrill": "Broad jumps 3x5."
  },
  {
    "id": "spartan-memory-test",
    "slug": "memory-test",
    "name": "Spartan Memory Test (Alphanumeric Code Memorization)",
    "category": "Agility & Mental",
    "races": [
      "spartan-race"
    ],
    "raceFormats": [
      "spartan-beast",
      "spartan-ultra"
    ],
    "averageFailureRate": "24% in Beast / Ultra heats",
    "techniqueRating": 70,
    "gripRating": 0,
    "pullingRating": 0,
    "fatigueResistance": 80,
    "wetConditionRating": 40,
    "penaltyType": "30 Burpees / Penalty Loop if incorrect code recited",
    "description": "At mile 3, athletes must locate their bib last 2 digits on a board and memorize a 7-character phonetic code (e.g. Victor-842-9173). At mile 11, marshals demand the exact code.",
    "whyPeopleFail": [
      "Hypoglycemia and cognitive fog from severe physical exertion",
      "Rushing the station without repeating the code rhythmically"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Mnemonic Association Method",
        "description": "Convert numbers into visual stories or phonetics during heart rate spikes.",
        "targetBenchmark": "Recall 7 digits after 40-minute threshold run",
        "equipment": "Running watch"
      }
    ],
    "diagnosticTest": {
      "name": "High Lactate Memory Recall",
      "protocol": "Memorize code, run 5K @ 165 BPM, recite code perfectly.",
      "passCriteria": "100% accurate recall."
    },
    "recommendedWeeklyDrill": "Practice reciting 7-digit strings during track interval rest periods."
  },
  {
    "id": "spartan-jerry-can",
    "slug": "jerry-can",
    "name": "Jerry Can Carry (Two 45lb Fluid Cans)",
    "category": "Heavy Carries",
    "races": [
      "spartan-race"
    ],
    "raceFormats": [
      "spartan-stadion",
      "spartan-super",
      "spartan-beast",
      "spartan-ultra"
    ],
    "averageFailureRate": "16% in Open Heats",
    "techniqueRating": 60,
    "gripRating": 88,
    "pullingRating": 70,
    "fatigueResistance": 85,
    "wetConditionRating": 65,
    "penaltyType": "Must complete full carry course without dumping fluid",
    "description": "Pick up two full plastic Jerry Cans (45lbs each) and carry them farmer-walk style over 100 to 200 meters of stairs, ramps, or trails.",
    "whyPeopleFail": [
      "Severe grip pump opening fingers prematurely",
      "Allowing cans to bash into shins during walking stride"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "High Farmer Walk Cadence",
        "description": "Pin shoulders down and back, take short steps with zero lateral hip sway.",
        "targetBenchmark": "100m unbroken carry with 50lb dumbbells per hand",
        "equipment": "Dumbbells / kettlebells"
      }
    ],
    "diagnosticTest": {
      "name": "2-Minute Farmer Hold",
      "protocol": "Hold two 50lb dumbbells standing tall for 2 minutes.",
      "passCriteria": "Zero drop."
    },
    "recommendedWeeklyDrill": "Farmer walks 4x60m with heavy kettlebells."
  },
  {
    "id": "spartan-tire-flip",
    "slug": "tire-flip",
    "name": "Armer / 300lb Tractor Tire Flip",
    "category": "Heavy Carries",
    "races": [
      "spartan-race"
    ],
    "raceFormats": [
      "spartan-super",
      "spartan-beast",
      "spartan-ultra"
    ],
    "averageFailureRate": "20% in Open Heats",
    "techniqueRating": 85,
    "gripRating": 75,
    "pullingRating": 88,
    "fatigueResistance": 80,
    "wetConditionRating": 85,
    "penaltyType": "30 Burpees / Penalty Loop",
    "description": "Flip a massive 300-400lb industrial tractor tire 2 to 4 consecutive times, or complete heavy armer stone deadlift walks.",
    "whyPeopleFail": [
      "Bending at lumbar spine with straight legs instead of deep squat wedge",
      "Trying to curl tire with biceps causing tendon strains"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Knee-Drive Tire Wedge",
        "description": "Lift edge to 45 degrees, drive one knee under tire tread to pop it forward.",
        "targetBenchmark": "4 continuous flips in under 40 seconds",
        "equipment": "Heavy tire"
      }
    ],
    "diagnosticTest": {
      "name": "Heavy Tire Flip Repeat",
      "protocol": "4 unbroken flips of 350lb tire in under 45 seconds.",
      "passCriteria": "Clean hip drive on all reps."
    },
    "recommendedWeeklyDrill": "Trap bar deadlifts 5x5 + 20 plyometric broad jumps."
  },
  {
    "id": "tm-block-ness",
    "slug": "block-ness",
    "name": "Block Ness Monster (Rotating 1,000lb Blocks in Deep Water)",
    "category": "Water & Mud",
    "races": [
      "tough-mudder"
    ],
    "raceFormats": [
      "tough-mudder-10k",
      "tough-mudder-classic",
      "tough-mudder-wtm"
    ],
    "averageFailureRate": "25% solo / 2% with team",
    "techniqueRating": 85,
    "gripRating": 70,
    "pullingRating": 80,
    "fatigueResistance": 75,
    "wetConditionRating": 100,
    "penaltyType": "Team cooperation obstacle (Bypass if unable)",
    "description": "Athletes wade through chest-deep water and must scale over two massive, 1,000lb floating triangular/square steel blocks that spin continuously as people climb.",
    "whyPeopleFail": [
      "Trying to climb solo while opposing athletes rotate the block the wrong direction",
      "Losing grip on the wet slick plastic edge"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Team Rotation Counter-Weight",
        "description": "One group pulls top edge down while teammates on backside push upward.",
        "targetBenchmark": "Clear block in 15 seconds with 3 teammates",
        "equipment": "Deep water pool"
      }
    ],
    "diagnosticTest": {
      "name": "Deep Water Muscle-Up Pop",
      "protocol": "Tread water, press body onto pool deck from chest height.",
      "passCriteria": "3 clean presses without touching bottom."
    },
    "recommendedWeeklyDrill": "Pool muscle-up presses + treading water with hands overhead."
  },
  {
    "id": "tm-everest",
    "slug": "everest",
    "name": "Everest 2.0 (15ft Slick Curved Quarter-Pipe Ramp)",
    "category": "Walls",
    "races": [
      "tough-mudder"
    ],
    "raceFormats": [
      "tough-mudder-5k",
      "tough-mudder-10k",
      "tough-mudder-classic",
      "tough-mudder-wtm"
    ],
    "averageFailureRate": "45% on solo first attempts",
    "techniqueRating": 92,
    "gripRating": 75,
    "pullingRating": 85,
    "fatigueResistance": 60,
    "wetConditionRating": 85,
    "penaltyType": "Multiple attempts permitted / Team catch encouraged",
    "description": "A 15-foot high curved quarter-pipe ramp coated with mud, grease, and water. Athletes sprint up the ramp and leap to grab hands of teammates at the summit.",
    "whyPeopleFail": [
      "Decelerating or stutter-stepping before hitting the curve of the ramp",
      "Leaping horizontally instead of driving vertically at the curve apex",
      "Failing to reach both hands to secure teammate wrist-locks"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Full-Throttle Sprint Curve Drive",
        "description": "Sprint 20m at 100% velocity, take 3 aggressive uphill strides on ramp, jump vertically.",
        "targetBenchmark": "Touch 11ft marker on quarter pipe",
        "equipment": "Warped wall"
      },
      {
        "level": 2,
        "name": "Wrist-to-Wrist Teammate Catch",
        "description": "Lock wrists with top teammates, pull legs up onto top platform.",
        "targetBenchmark": "Summit wall cleanly in under 6 seconds",
        "equipment": "Everest wall"
      }
    ],
    "diagnosticTest": {
      "name": "High Vertical Leap Catch",
      "protocol": "Sprint and jump to grab rim 11.5ft high with both hands.",
      "passCriteria": "Firm double-wrist grab."
    },
    "recommendedWeeklyDrill": "Hill sprint accelerations 6x40m + explosive box jumps."
  },
  {
    "id": "tm-arctic-enema",
    "slug": "arctic-enema",
    "name": "Arctic Enema (Submersion in 34°F Ice Water under Wooden Barrier)",
    "category": "Water & Mud",
    "races": [
      "tough-mudder"
    ],
    "raceFormats": [
      "tough-mudder-10k",
      "tough-mudder-classic",
      "tough-mudder-wtm"
    ],
    "averageFailureRate": "20% hesitation / mental freeze",
    "techniqueRating": 70,
    "gripRating": 20,
    "pullingRating": 30,
    "fatigueResistance": 70,
    "wetConditionRating": 100,
    "penaltyType": "Bypass available if unable to handle cold plunge",
    "description": "Slide down a steep enclosed tube into a dumpster filled with 10,000 lbs of ice water (34°F), submerge head beneath a wooden baffle dividing the pool, and climb out.",
    "whyPeopleFail": [
      "Mammalian cold shock reflex causing instant gasping and hyperventilation",
      "Panicking in the sub-freezing slush and freezing before diving under the baffle",
      "Loss of limb motor coordination from extreme vasoconstriction"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Cold Water Vagus Nerve Regulation",
        "description": "Take 2 slow diaphragmatic nasal breaths, submerge smoothly under baffle without hesitation.",
        "targetBenchmark": "Exit ice bath within 15 seconds calmly",
        "equipment": "Cold plunge tub"
      }
    ],
    "diagnosticTest": {
      "name": "2-Minute Ice Bath Immersion",
      "protocol": "Sit in 40°F ice water for 2 minutes maintaining steady nasal breathing.",
      "passCriteria": "No hyperventilation panic."
    },
    "recommendedWeeklyDrill": "Cold showers 3 mins daily + physiological sigh breathwork."
  },
  {
    "id": "tm-electroshock",
    "slug": "electroshock",
    "name": "Electroshock Therapy (Sprint through 10,000-Volt Live Wires)",
    "category": "Agility & Mental",
    "races": [
      "tough-mudder"
    ],
    "raceFormats": [
      "tough-mudder-5k",
      "tough-mudder-10k",
      "tough-mudder-classic"
    ],
    "averageFailureRate": "15% face-plants in mud",
    "techniqueRating": 50,
    "gripRating": 0,
    "pullingRating": 0,
    "fatigueResistance": 50,
    "wetConditionRating": 90,
    "penaltyType": "Signature finish challenge / Bypass permitted in open waves",
    "description": "Sprint 20 meters across deep mud trenches and hay bales while dodging hundreds of dangling yellow wires carrying up to 10,000 volts of electric charge.",
    "whyPeopleFail": [
      "Slowing down: wires shock muscles, causing involuntary knee buckle and face-plant",
      "Running with head high and eyes open without covering temple/throat"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "High-Knee Mud Charging Mechanics",
        "description": "Tuck chin into chest, raise forearms over temples, sprint continuously without stopping.",
        "targetBenchmark": "Sprint 20m through mud trenches under 6s",
        "equipment": "Mud field"
      }
    ],
    "diagnosticTest": {
      "name": "20m Mud Sprint Cadence",
      "protocol": "Sprint through heavy mud without dropping cadence below 180 SPM.",
      "passCriteria": "Under 6 seconds."
    },
    "recommendedWeeklyDrill": "High-cadence sprint repeats 6x50m."
  },
  {
    "id": "tm-funky-monkey",
    "slug": "funky-monkey",
    "name": "Funky Monkey: The Revolution (Incline Bars to Rotating Wheels over Water)",
    "category": "Swinging & Rig",
    "races": [
      "tough-mudder"
    ],
    "raceFormats": [
      "tough-mudder-10k",
      "tough-mudder-classic",
      "tough-mudder-wtm"
    ],
    "averageFailureRate": "55% splashdown into water",
    "techniqueRating": 94,
    "gripRating": 94,
    "pullingRating": 88,
    "fatigueResistance": 80,
    "wetConditionRating": 92,
    "penaltyType": "Swim to ladder upon water splashdown",
    "description": "Ascending monkey bars that climb to a platform transition leading to 4 spinning revolving wheels suspended high above deep water.",
    "whyPeopleFail": [
      "Pausing too long on rotating wheels, causing arms to fatigue and peel off",
      "Failure to generate swinging momentum from hips across wheel gaps"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Wheel-to-Wheel Momentum Transfer",
        "description": "Swing body, catch rotating spoke with trailing arm, immediately launch forward.",
        "targetBenchmark": "Cross 3 wheels in under 10 seconds",
        "equipment": "Ninja rig wheels"
      }
    ],
    "diagnosticTest": {
      "name": "Dynamic Wheel Traverse Test",
      "protocol": "Cross 4 revolving wheels unbroken.",
      "passCriteria": "Zero drop into water."
    },
    "recommendedWeeklyDrill": "Pull-up lock-offs 4x15s + monkey bar traverses."
  },
  {
    "id": "tm-mudderhorn",
    "slug": "mudderhorn",
    "name": "Mudderhorn (3-Story 30ft Cargo Net A-Frame - Tallest in OCR)",
    "category": "Climbing",
    "races": [
      "tough-mudder"
    ],
    "raceFormats": [
      "tough-mudder-5k",
      "tough-mudder-10k",
      "tough-mudder-classic",
      "tough-mudder-wtm"
    ],
    "averageFailureRate": "15% fear of heights freeze",
    "techniqueRating": 60,
    "gripRating": 50,
    "pullingRating": 60,
    "fatigueResistance": 65,
    "wetConditionRating": 65,
    "penaltyType": "Take your time / Volunteer assistance available",
    "description": "A 30-foot tall cargo net structure built on steel shipping container scaffolding, representing the tallest obstacle in mainstream obstacle racing.",
    "whyPeopleFail": [
      "Vertigo at the 3-story apex causing athletes to freeze",
      "Net movement caused by dozens of athletes climbing simultaneously"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "3-Point Contact High Net Ascent",
        "description": "Maintain two hands and one foot locked into net rungs at all times.",
        "targetBenchmark": "Climb 30ft without pause",
        "equipment": "Cargo net"
      }
    ],
    "diagnosticTest": {
      "name": "High Altitude Cargo Clearance",
      "protocol": "Scale 30ft net and summit apex in under 45 seconds.",
      "passCriteria": "Steady rhythmic climbing."
    },
    "recommendedWeeklyDrill": "High box step-ups 3x20 + core planks."
  },
  {
    "id": "tm-cage-crawl",
    "slug": "cage-crawl",
    "name": "Cage Crawl (Face-Up Water Trench Crawl under Steel Mesh)",
    "category": "Water & Mud",
    "races": [
      "tough-mudder"
    ],
    "raceFormats": [
      "tough-mudder-10k",
      "tough-mudder-classic",
      "tough-mudder-wtm"
    ],
    "averageFailureRate": "10% claustrophobia panic",
    "techniqueRating": 70,
    "gripRating": 30,
    "pullingRating": 40,
    "fatigueResistance": 50,
    "wetConditionRating": 100,
    "penaltyType": "Safety marshals pull out panicking racers",
    "description": "Lie flat on back in a watery ditch with only 6 inches of breathing air between the water surface and a steel mesh fence ceiling, pulling forward by gripping the mesh.",
    "whyPeopleFail": [
      "Water splashing over nose and mouth causing instant choking sensation",
      "Claustrophobia from having head trapped beneath steel fence"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Supine Water Gliding Protocol",
        "description": "Keep chin up, mouth open only at top of breath cycle, pull mesh smoothly.",
        "targetBenchmark": "Traverse 20m trench in 30 seconds",
        "equipment": "Pool / mesh ceiling"
      }
    ],
    "diagnosticTest": {
      "name": "6-Inch Air Gap Glide",
      "protocol": "Traverse 15m in supine position with calm nasal breathing.",
      "passCriteria": "Zero panic or splashing."
    },
    "recommendedWeeklyDrill": "Diaphragmatic breathing drills + supine leg flutters."
  },
  {
    "id": "tm-kiss-of-mud",
    "slug": "kiss-of-mud",
    "name": "Kiss of Mud (Low Belly Crawl under Barbed Wire in Deep Clay)",
    "category": "Crawls & Balance",
    "races": [
      "tough-mudder"
    ],
    "raceFormats": [
      "tough-mudder-5k",
      "tough-mudder-10k",
      "tough-mudder-classic"
    ],
    "averageFailureRate": "5% (Pacing fatigue)",
    "techniqueRating": 65,
    "gripRating": 20,
    "pullingRating": 50,
    "fatigueResistance": 80,
    "wetConditionRating": 100,
    "penaltyType": "Bypass if cramping",
    "description": "Belly crawl 40 meters through thick, wet clay mud under barbed wire strung 18 inches off the ground on an uphill incline.",
    "whyPeopleFail": [
      "Attempting to crawl on hands and knees instead of flat alligator belly slide",
      "Mud filling mouth and eyes from lifting head"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Low Army Crawl Elbow Pull",
        "description": "Pull body forward using forearms while dragging inner thighs through mud.",
        "targetBenchmark": "40m belly crawl under 50 seconds",
        "equipment": "Turf / mud"
      }
    ],
    "diagnosticTest": {
      "name": "40m Army Crawl Standard",
      "protocol": "Complete 40m continuous crawl on belly.",
      "passCriteria": "Finished in under 60 seconds."
    },
    "recommendedWeeklyDrill": "Plank army crawls 4x30s."
  },
  {
    "id": "tm-berlin-walls",
    "slug": "berlin-walls",
    "name": "Berlin Walls (Two 9ft Smooth Vertical Timber Walls)",
    "category": "Walls",
    "races": [
      "tough-mudder"
    ],
    "raceFormats": [
      "tough-mudder-10k",
      "tough-mudder-classic",
      "tough-mudder-wtm"
    ],
    "averageFailureRate": "60% solo (Cleared via buddy boosts)",
    "techniqueRating": 88,
    "gripRating": 65,
    "pullingRating": 88,
    "fatigueResistance": 70,
    "wetConditionRating": 75,
    "penaltyType": "Teamwork heavily encouraged / Boost lines form at base",
    "description": "Two towering 9-foot wooden walls spaced 50 meters apart with zero foot rungs. Extremely difficult solo; almost always cleared via teammate knee/hand boosts.",
    "whyPeopleFail": [
      "Height exceeds standing reach by 2+ feet for most athletes",
      "Exhausted athletes unable to pull body over once hands reach top rail"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Interlocking Hand-Cup Teammate Boost",
        "description": "Interlace fingers, provide firm platform for runner foot, explode upward.",
        "targetBenchmark": "Boost teammate smoothly to top rail",
        "equipment": "9ft wall"
      },
      {
        "level": 2,
        "name": "Solo High Wall Mantle",
        "description": "Wall run, grab top rail, pull chin over, hook heel, swing body over.",
        "targetBenchmark": "Solo clearance in under 12 seconds",
        "equipment": "9ft wall"
      }
    ],
    "diagnosticTest": {
      "name": "Wall Hang & Pull Test",
      "protocol": "From dead hang on 9ft wall ledge, pull chest to top rail.",
      "passCriteria": "2 clean reps."
    },
    "recommendedWeeklyDrill": "Heavy weighted pull-ups 4x5 + dips."
  },
  {
    "id": "tm-hero-carry",
    "slug": "hero-carry",
    "name": "Hero Carry (Teammate Piggyback / Fireman's Carry 100m)",
    "category": "Heavy Carries",
    "races": [
      "tough-mudder"
    ],
    "raceFormats": [
      "tough-mudder-5k",
      "tough-mudder-10k",
      "tough-mudder-classic"
    ],
    "averageFailureRate": "8% drops / partner mismatch",
    "techniqueRating": 65,
    "gripRating": 50,
    "pullingRating": 60,
    "fatigueResistance": 88,
    "wetConditionRating": 65,
    "penaltyType": "Switch partner carrying at 50m turnaround flag",
    "description": "Carry a fellow teammate or friend on your back for 50 meters, then switch roles and be carried 50 meters back.",
    "whyPeopleFail": [
      "Poor weight distribution straining lower back",
      "Foot slipping in deep mud carrying 150-200lbs extra bodyweight"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "High Center-of-Gravity Piggyback",
        "description": "Wrap partner legs high around ribs, lean slightly forward, take short stable steps.",
        "targetBenchmark": "100m carry without stopping",
        "equipment": "Partner or heavy sandbag"
      }
    ],
    "diagnosticTest": {
      "name": "Bodyweight Partner Carry Test",
      "protocol": "Carry partner equal to your bodyweight 50m in under 45 seconds.",
      "passCriteria": "Zero drop."
    },
    "recommendedWeeklyDrill": "Heavy barbell back squats 4x8 + farmer walks."
  },
  {
    "id": "tm-trench-warfare",
    "slug": "trench-warfare",
    "name": "Trench Warfare (Dark Enclosed Underground Tunnel Maze)",
    "category": "Crawls & Balance",
    "races": [
      "tough-mudder"
    ],
    "raceFormats": [
      "tough-mudder-5k",
      "tough-mudder-10k",
      "tough-mudder-classic"
    ],
    "averageFailureRate": "8% claustrophobia hesitation",
    "techniqueRating": 50,
    "gripRating": 20,
    "pullingRating": 30,
    "fatigueResistance": 50,
    "wetConditionRating": 80,
    "penaltyType": "Walk around tunnel entrance if claustrophobic",
    "description": "Crawl through pitch-black subterranean corrugated drainage pipes buried underground with blind turns and muddy standing water.",
    "whyPeopleFail": [
      "Panic attacks in completely dark, confined subterranean spaces",
      "Bumping head on corrugated ridges"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Tactile Pipe Crawl Rhythm",
        "description": "Keep one palm in contact with tube wall, crawl with steady knee cadence.",
        "targetBenchmark": "Traverse 15m tube in under 20 seconds",
        "equipment": "Tunnel / tube"
      }
    ],
    "diagnosticTest": {
      "name": "Enclosed Tunnel Traversal",
      "protocol": "Crawl through 15m dark pipe with zero hesitation.",
      "passCriteria": "Completed under 30 seconds."
    },
    "recommendedWeeklyDrill": "Bear crawls + controlled breathing in enclosed spaces."
  },
  {
    "id": "tm-boa-constrictor",
    "slug": "boa-constrictor",
    "name": "Boa Constrictor (Crawl Down Steep Corrugated Pipe into Mud & Crawl Up)",
    "category": "Crawls & Balance",
    "races": [
      "tough-mudder"
    ],
    "raceFormats": [
      "tough-mudder-10k",
      "tough-mudder-classic"
    ],
    "averageFailureRate": "12% in Open Heats",
    "techniqueRating": 65,
    "gripRating": 30,
    "pullingRating": 50,
    "fatigueResistance": 70,
    "wetConditionRating": 90,
    "penaltyType": "Bypass available",
    "description": "Slide headfirst down a narrow plastic pipe into a mud pit, then crawl upward through a second ascending pipe out of the trench.",
    "whyPeopleFail": [
      "Feet slipping on ascending corrugated ridges",
      "Mud buildup in pipe preventing traction"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Incline Pipe Foot-Brace",
        "description": "Lock shoe edges into corrugated plastic grooves to push upward.",
        "targetBenchmark": "Ascend 10ft pipe in under 12 seconds",
        "equipment": "Pipe"
      }
    ],
    "diagnosticTest": {
      "name": "Incline Tunnel Ascent Test",
      "protocol": "Scale upward corrugated pipe in under 15 seconds.",
      "passCriteria": "Continuous upward drive."
    },
    "recommendedWeeklyDrill": "Incline bear crawls on grass hill."
  },
  {
    "id": "tm-hold-your-wood",
    "slug": "hold-your-wood",
    "name": "Hold Your Wood (Heavy Tree Trunk Trail Carry)",
    "category": "Heavy Carries",
    "races": [
      "tough-mudder"
    ],
    "raceFormats": [
      "tough-mudder-5k",
      "tough-mudder-10k",
      "tough-mudder-classic"
    ],
    "averageFailureRate": "10% drops",
    "techniqueRating": 55,
    "gripRating": 60,
    "pullingRating": 60,
    "fatigueResistance": 82,
    "wetConditionRating": 65,
    "penaltyType": "Carry loop must be finished before advancing",
    "description": "Pick up a heavy timber log (40-60lbs) from a woodpile and carry it around a 400m wooded trail loop before stacking it back.",
    "whyPeopleFail": [
      "Carrying log across chest instead of resting on shoulder trapezius",
      "Bark and splinters causing grip release"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Shoulder Log Balance",
        "description": "Rest log on shoulder meat, hold lead end with dominant hand, walk with upright torso.",
        "targetBenchmark": "400m continuous carry under 3 minutes",
        "equipment": "Log or heavy sandbag"
      }
    ],
    "diagnosticTest": {
      "name": "400m Timber Walk Standard",
      "protocol": "Carry 50lb log 400m without resting.",
      "passCriteria": "Continuous motion under 3:30."
    },
    "recommendedWeeklyDrill": "Sandbag shoulder carries 4x200m."
  },
  {
    "id": "tm-texas-holdem",
    "slug": "texas-holdem",
    "name": "Texas Hold'em (Teammate Angled V-Beam Balance Crossing)",
    "category": "Crawls & Balance",
    "races": [
      "tough-mudder"
    ],
    "raceFormats": [
      "tough-mudder-10k",
      "tough-mudder-classic"
    ],
    "averageFailureRate": "28% falls into mud",
    "techniqueRating": 86,
    "gripRating": 40,
    "pullingRating": 40,
    "fatigueResistance": 50,
    "wetConditionRating": 75,
    "penaltyType": "Retry or wade through mud pit below",
    "description": "Two teammates stand on diverging triangular balance beams, pressing palms together to create an A-frame counter-balance as the beams widen over mud.",
    "whyPeopleFail": [
      "One teammate pulling or pushing with uneven pressure, toppling both athletes",
      "Muddy shoes losing friction on angled beam"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Isometric Partner Palm Press",
        "description": "Lock eyes with teammate, maintain equal 50/50 leaning pressure while sidestepping.",
        "targetBenchmark": "Traverse 20ft widening span together",
        "equipment": "Balance beams"
      }
    ],
    "diagnosticTest": {
      "name": "Partner Counterbalance Walk",
      "protocol": "Cross diverging beams with partner with zero slips.",
      "passCriteria": "Complete crossing unbroken."
    },
    "recommendedWeeklyDrill": "Single-leg balance squats + partner push holds."
  },
  {
    "id": "tm-skidmarked",
    "slug": "skidmarked",
    "name": "Skidmarked (Inverted Angled Wall Climb with Negative Overhang)",
    "category": "Walls",
    "races": [
      "tough-mudder"
    ],
    "raceFormats": [
      "tough-mudder-10k",
      "tough-mudder-classic"
    ],
    "averageFailureRate": "35% in Open Heats",
    "techniqueRating": 84,
    "gripRating": 65,
    "pullingRating": 80,
    "fatigueResistance": 60,
    "wetConditionRating": 80,
    "penaltyType": "Teammates boost or pull from top ledge",
    "description": "An inverted wooden wall with an outward-leaning negative overhang, forcing athletes to scale up while hanging backward.",
    "whyPeopleFail": [
      "Upper body peeling away from wall under gravitational overhang",
      "Muddy footwear slipping off slick wood"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Negative Overhang Heel Hook",
        "description": "Grab top lip, kick heel high over overhang to lock body down.",
        "targetBenchmark": "Solo clearance in under 8 seconds",
        "equipment": "Inverted wall"
      }
    ],
    "diagnosticTest": {
      "name": "Overhang Lip Pull-Up",
      "protocol": "From overhang ledge, pull sternum to wood 3 times.",
      "passCriteria": "3 clean reps."
    },
    "recommendedWeeklyDrill": "Pull-ups with knees to elbows 4x8."
  },
  {
    "id": "tm-hydrophobia",
    "slug": "hydrophobia",
    "name": "Hydrophobia (Deep Water Swim Under Floating Wooden Baffles)",
    "category": "Water & Mud",
    "races": [
      "tough-mudder"
    ],
    "raceFormats": [
      "tough-mudder-classic",
      "tough-mudder-wtm"
    ],
    "averageFailureRate": "15% panic / cold fatigue",
    "techniqueRating": 75,
    "gripRating": 30,
    "pullingRating": 40,
    "fatigueResistance": 80,
    "wetConditionRating": 100,
    "penaltyType": "Life vests mandatory for weak swimmers",
    "description": "Swim across a deep open-water canal while navigating underneath submerged floating log baffles with only inches of clearance.",
    "whyPeopleFail": [
      "Heavy mud in clothes and shoes creating drag in water",
      "Cold water induced fatigue and disorientation"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Deep Water Baffle Duck",
        "description": "Submerge 2 feet under floating barrier, push off underwater timber, surface cleanly.",
        "targetBenchmark": "Cross 50m water section in under 90s",
        "equipment": "Deep pool"
      }
    ],
    "diagnosticTest": {
      "name": "Open Water Baffle Clearance",
      "protocol": "Swim 50m and clear 3 submerged barriers.",
      "passCriteria": "Continuous calm swimming."
    },
    "recommendedWeeklyDrill": "Pool swimming 10x50m intervals."
  },
  {
    "id": "tm-augustus-gloop",
    "slug": "augustus-gloop",
    "name": "Augustus Gloop (Vertical Pipe Climb against 500 GPM Water Cascade)",
    "category": "Climbing",
    "races": [
      "tough-mudder"
    ],
    "raceFormats": [
      "tough-mudder-10k",
      "tough-mudder-classic"
    ],
    "averageFailureRate": "22% in Open Heats",
    "techniqueRating": 78,
    "gripRating": 60,
    "pullingRating": 70,
    "fatigueResistance": 65,
    "wetConditionRating": 100,
    "penaltyType": "Bypass available if unable to breathe in waterfall",
    "description": "Wade into a water tank, enter an enclosed vertical pipe, and climb an internal vertical ladder while 500 gallons of water per minute dump directly on your head.",
    "whyPeopleFail": [
      "Looking upward into the falling water and swallowing water or choking",
      "Slipping off wet steel ladder rungs"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Chin-Tuck Waterfall Climbing",
        "description": "Keep chin tucked tight to chest, breathe through nose into armpit pocket, step ladder rungs.",
        "targetBenchmark": "Scale 15ft vertical ladder under cascade in 10s",
        "equipment": "Vertical ladder + water"
      }
    ],
    "diagnosticTest": {
      "name": "Waterfall Ladder Ascent Test",
      "protocol": "Scale vertical ladder under heavy water flow with chin tucked.",
      "passCriteria": "Calm ascent under 12 seconds."
    },
    "recommendedWeeklyDrill": "High box jumps + pull-ups with controlled breathing."
  },
  {
    "id": "tm-birth-canal",
    "slug": "birth-canal",
    "name": "Birth Canal (Crawl under Heavy Water-Filled 100lb Bladders)",
    "category": "Crawls & Balance",
    "races": [
      "tough-mudder"
    ],
    "raceFormats": [
      "tough-mudder-5k",
      "tough-mudder-10k",
      "tough-mudder-classic"
    ],
    "averageFailureRate": "12% exhaustion / panic",
    "techniqueRating": 72,
    "gripRating": 20,
    "pullingRating": 50,
    "fatigueResistance": 82,
    "wetConditionRating": 85,
    "penaltyType": "Teammates can lift bladders to relieve pressure",
    "description": "Crawl along a wooden tunnel floor beneath heavy, vinyl bladders filled with thousands of pounds of water that pin you flat to the boards.",
    "whyPeopleFail": [
      "Attempting to crawl on knees: the bladder pushes downward with immense weight",
      "Running out of oxygen under the heavy compression"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Slither Wedge Drive",
        "description": "Stay completely flat on belly, use toes and palms to wedge beneath bladder, pushing weight upward with back.",
        "targetBenchmark": "Traverse 10m bladder section in under 25s",
        "equipment": "Weighted mats"
      }
    ],
    "diagnosticTest": {
      "name": "Weighted Compression Crawl",
      "protocol": "Crawl 10m with 100lb sandbag on back.",
      "passCriteria": "Under 30 seconds without stopping."
    },
    "recommendedWeeklyDrill": "Bear crawl sled drags 4x20m."
  },
  {
    "id": "tm-well-swung",
    "slug": "well-swung",
    "name": "Well Swung (Trapeze Swing to Hanging Bell Ring over Water Pit)",
    "category": "Swinging & Rig",
    "races": [
      "tough-mudder"
    ],
    "raceFormats": [
      "tough-mudder-classic",
      "tough-mudder-wtm"
    ],
    "averageFailureRate": "48% missed bell catches",
    "techniqueRating": 90,
    "gripRating": 80,
    "pullingRating": 75,
    "fatigueResistance": 50,
    "wetConditionRating": 95,
    "penaltyType": "Splashdown into water pool",
    "description": "Sprint off a high platform, grab a swinging trapeze bar, swing high over a deep water pit, release hands in mid-air to hit a suspended bell before dropping into water.",
    "whyPeopleFail": [
      "Releasing trapeze bar too early or late at the dead-point of the swing arc",
      "Hesitation on the platform takeoff step"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Apex Swing Release Precision",
        "description": "Hold trapeze until body hits peak elevation of forward swing, release and strike target.",
        "targetBenchmark": "8 of 10 clean bell strikes",
        "equipment": "Trapeze swing over pit"
      }
    ],
    "diagnosticTest": {
      "name": "Dynamic Trapeze Bell Strike",
      "protocol": "Execute full swing and strike bell cleanly.",
      "passCriteria": "Direct hand contact on bell."
    },
    "recommendedWeeklyDrill": "Gymnastics beat swings + box jumps."
  },
  {
    "id": "tm-cry-baby",
    "slug": "cry-baby",
    "name": "Cry Baby (Smoke-Filled Claustrophobic Enclosed Mud Crawl)",
    "category": "Crawls & Balance",
    "races": [
      "tough-mudder"
    ],
    "raceFormats": [
      "tough-mudder-10k",
      "tough-mudder-classic"
    ],
    "averageFailureRate": "15% coughing / irritation",
    "techniqueRating": 50,
    "gripRating": 10,
    "pullingRating": 30,
    "fatigueResistance": 60,
    "wetConditionRating": 80,
    "penaltyType": "Bypass available for athletes with respiratory conditions",
    "description": "Crawl through an enclosed wooden bunker filled with dense tear-gas simulated vapor (peppermint/menthol fog) that creates temporary eye watering and sinus irritation.",
    "whyPeopleFail": [
      "Opening eyes wide in the fog causing stinging tears",
      "Breathing rapidly and coughing instead of steady mouth breathing"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Squint & Steady Respiration",
        "description": "Close eyes to narrow slit, pull shirt over nose, crawl with steady cadence.",
        "targetBenchmark": "Traverse 15m enclosure in under 18s",
        "equipment": "Enclosure"
      }
    ],
    "diagnosticTest": {
      "name": "Smoke Trench Traversal Test",
      "protocol": "Complete 15m enclosed crawl with calm breathing.",
      "passCriteria": "Zero panic or disorientation."
    },
    "recommendedWeeklyDrill": "Plank holds with eyes closed 3x60s."
  },
  {
    "id": "tm-pitfall",
    "slug": "pitfall",
    "name": "Pitfall (Hidden Drop-Off Mud Trench Wading)",
    "category": "Water & Mud",
    "races": [
      "tough-mudder"
    ],
    "raceFormats": [
      "tough-mudder-5k",
      "tough-mudder-10k",
      "tough-mudder-classic"
    ],
    "averageFailureRate": "10% lost shoes / stumbling",
    "techniqueRating": 60,
    "gripRating": 20,
    "pullingRating": 30,
    "fatigueResistance": 70,
    "wetConditionRating": 100,
    "penaltyType": "Teammates assist racers out of deep holes",
    "description": "Wade through a deceptive mud bog with hidden underwater trenches that suddenly drop from knee-deep to chest-deep without warning.",
    "whyPeopleFail": [
      "Running blindly and plunging headfirst into hidden deep holes",
      "Suction in mud pulling unlaced sneakers completely off feet"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Probe-and-Shuffle Mud Stride",
        "description": "Shuffle feet along bottom to feel depth changes before committing full bodyweight.",
        "targetBenchmark": "Traverse 50m mud pit without falling",
        "equipment": "Mud bog"
      }
    ],
    "diagnosticTest": {
      "name": "Heavy Mud Wading Endurance",
      "protocol": "Wade 50m through deep mud in under 2 minutes.",
      "passCriteria": "Continuous progress without losing footwear."
    },
    "recommendedWeeklyDrill": "Single-leg balance exercises + double-knot shoe locking."
  },
  {
    "id": "savage-colossus",
    "slug": "colossus",
    "name": "Colossus (43-Foot Mega Quarter-Pipe Ramp + Massive Drop Slide)",
    "category": "Walls",
    "races": [
      "savage-race"
    ],
    "raceFormats": [
      "savage-blitz",
      "savage-standard",
      "savage-pro"
    ],
    "averageFailureRate": "38% in Open Heats",
    "techniqueRating": 90,
    "gripRating": 75,
    "pullingRating": 85,
    "fatigueResistance": 70,
    "wetConditionRating": 80,
    "penaltyType": "SavagePRO: Must summit unassisted to keep wristband",
    "description": "The largest obstacle in OCR: a towering 43-foot tall structure featuring a massive curved quarter-pipe ramp with ropes leading to a scaffold platform, followed by a high-speed water drop slide.",
    "whyPeopleFail": [
      "Decelerating on the sprint approach before hitting the haul ropes",
      "Arms giving out while dangling 15 feet in the air on the slick nylon rope",
      "Fear of heights at the top platform summit"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Ramp Sprint to High Rope Snatch",
        "description": "Sprint at top speed up the ramp curvature, leap to grab the knotted rope at the highest possible point.",
        "targetBenchmark": "Snatch rope above 12-foot mark",
        "equipment": "Quarter-pipe ramp + rope"
      },
      {
        "level": 2,
        "name": "Upper Body Rope Haul & Platform Mantle",
        "description": "Walk feet up the slick plywood curve using hand-over-hand rope pull, mantle onto top deck.",
        "targetBenchmark": "Summit 43ft Colossus in under 18 seconds",
        "equipment": "Colossus structure"
      }
    ],
    "diagnosticTest": {
      "name": "High Incline Rope Walk Test",
      "protocol": "Scale 20ft 60-degree ramp using rope in under 10 seconds.",
      "passCriteria": "Clean ascent with zero foot slippage."
    },
    "recommendedWeeklyDrill": "Hill sprints 8x30m + heavy rope climbs."
  },
  {
    "id": "savage-twirly-bird",
    "slug": "twirly-bird",
    "name": "Twirly Bird (Spinning Horizontal Pipe Bars & Hanging Nunchucks)",
    "category": "Swinging & Rig",
    "races": [
      "savage-race"
    ],
    "raceFormats": [
      "savage-standard",
      "savage-pro"
    ],
    "averageFailureRate": "55% (Major SavagePRO wristband cutter)",
    "techniqueRating": 96,
    "gripRating": 96,
    "pullingRating": 90,
    "fatigueResistance": 85,
    "wetConditionRating": 90,
    "penaltyType": "SavagePRO: Miss 1 attempt = Cut wristband",
    "description": "A 30-foot suspended rig over water featuring freely rotating horizontal aluminum pipes followed by hanging nunchuck grips, ending in a bell.",
    "whyPeopleFail": [
      "Pipe rotates instantly when grabbed, peeling fingers if wrists are not cocked over the top",
      "Loss of rhythmic swinging momentum between pipe-to-nunchuck transition",
      "Forearm burnout from prolonged isometric hanging"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Rotating Pipe False Grip",
        "description": "Place wrists over the top of rotating cylinder to block free-wheel spinning.",
        "targetBenchmark": "Hold rotating pipe false grip for 30s",
        "equipment": "Rotating bar"
      },
      {
        "level": 2,
        "name": "Pipe-to-Nunchuck Traversal",
        "description": "Transfer momentum directly into the first vertical nunchuck pin.",
        "targetBenchmark": "Traverse full rig in under 15 seconds",
        "equipment": "Twirly Bird rig"
      }
    ],
    "diagnosticTest": {
      "name": "Nunchuck & Pipe Traverse Test",
      "protocol": "Cross 6 rotating pipes and 2 nunchucks unbroken.",
      "passCriteria": "Touch bell without falling into water."
    },
    "recommendedWeeklyDrill": "Nunchuck grip pull-ups 4x6 + fat grip hangs."
  },
  {
    "id": "savage-rig",
    "slug": "savage-rig",
    "name": "Savage Rig (Multi-Tier Ninja Rig: Rings, Pipes, Balls & Trapeze)",
    "category": "Swinging & Rig",
    "races": [
      "savage-race"
    ],
    "raceFormats": [
      "savage-blitz",
      "savage-standard",
      "savage-pro"
    ],
    "averageFailureRate": "52% in Open / 30% in PRO",
    "techniqueRating": 94,
    "gripRating": 95,
    "pullingRating": 90,
    "fatigueResistance": 85,
    "wetConditionRating": 90,
    "penaltyType": "SavagePRO: Must complete unbroken or lose band",
    "description": "A multi-section ninja rig with changing combinations of gymnastic rings, hanging baseballs, horizontal iron pipes, and flying trapeze handles over water.",
    "whyPeopleFail": [
      "Straight arm swinging creating massive shock loads on grip",
      "Over-gripping early obstacles and accumulating severe forearm lactate"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Rhythmic Beat Swing & Catch",
        "description": "Swing hips forward, release back hand, snatch next hold at peak of swing.",
        "targetBenchmark": "Cross 25ft rig in under 15 seconds",
        "equipment": "Ninja rig"
      }
    ],
    "diagnosticTest": {
      "name": "Mixed Grip Endurance Gauntlet",
      "protocol": "Hang from ball grip 20s, transfer to pipe 20s, transfer to ring 20s unbroken.",
      "passCriteria": "60 continuous seconds without touching deck."
    },
    "recommendedWeeklyDrill": "Towel pull-ups + ring beat swings 4 sets."
  },
  {
    "id": "savage-davy-jones",
    "slug": "davy-jones",
    "name": "Davy Jones Locker (15-Foot High Free Fall Dive into Deep Water)",
    "category": "Agility & Mental",
    "races": [
      "savage-race"
    ],
    "raceFormats": [
      "savage-blitz",
      "savage-standard"
    ],
    "averageFailureRate": "12% hesitation freeze",
    "techniqueRating": 50,
    "gripRating": 0,
    "pullingRating": 0,
    "fatigueResistance": 40,
    "wetConditionRating": 100,
    "penaltyType": "Bypass ladder available for non-swimmers",
    "description": "Climb a vertical scaffold tower and leap 15 feet down into a 12-foot deep pond, swimming to the exit ladder.",
    "whyPeopleFail": [
      "Fear of heights freezing athletes on the high diving platform edge",
      "Landing flat or belly flopping instead of pencil dive"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Pencil Dive Body Alignment",
        "description": "Step off platform, cross arms over chest, point toes, enter water vertically.",
        "targetBenchmark": "Clean vertical entry from 15ft",
        "equipment": "High dive platform"
      }
    ],
    "diagnosticTest": {
      "name": "High Platform Leap & Swim",
      "protocol": "Jump from 15ft platform, swim 25m to ladder in under 45 seconds.",
      "passCriteria": "Calm execution."
    },
    "recommendedWeeklyDrill": "Box jumps + pool swim laps."
  },
  {
    "id": "savage-sawtooth",
    "slug": "sawtooth",
    "name": "Sawtooth (35-Foot Ascending & Descending Tooth Monkey Bars over Water)",
    "category": "Swinging & Rig",
    "races": [
      "savage-race"
    ],
    "raceFormats": [
      "savage-standard",
      "savage-pro"
    ],
    "averageFailureRate": "45% in Open Heats",
    "techniqueRating": 90,
    "gripRating": 92,
    "pullingRating": 88,
    "fatigueResistance": 80,
    "wetConditionRating": 92,
    "penaltyType": "SavagePRO: Miss 1 rung = Wristband cut",
    "description": "A 35-foot long monkey bar setup that climbs steeply upward at a 45-degree angle for 12 rungs, drops vertically, and ascends again in a sawtooth zig-zag over water.",
    "whyPeopleFail": [
      "Incline bars require massive vertical pulling power on each reach",
      "Sweaty palms sliding down ascending slope of metal bars"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Incline Monkey Bar Step-Up",
        "description": "Pull chin to bar level before reaching to next higher rung to minimize reach distance.",
        "targetBenchmark": "Climb 15ft incline bars cleanly",
        "equipment": "Incline monkey bars"
      }
    ],
    "diagnosticTest": {
      "name": "Ascending Monkey Bar Test",
      "protocol": "Cross 35ft sawtooth bars unbroken.",
      "passCriteria": "Touch end bell cleanly."
    },
    "recommendedWeeklyDrill": "Pull-up ladders 1 to 5 to 1 + dead hangs."
  },
  {
    "id": "savage-wheel-world",
    "slug": "wheel-world",
    "name": "Wheel World (Continuous Rotating Hexagonal Wheels over Water)",
    "category": "Swinging & Rig",
    "races": [
      "savage-race"
    ],
    "raceFormats": [
      "savage-standard",
      "savage-pro"
    ],
    "averageFailureRate": "50% in Open Heats",
    "techniqueRating": 94,
    "gripRating": 94,
    "pullingRating": 88,
    "fatigueResistance": 82,
    "wetConditionRating": 90,
    "penaltyType": "SavagePRO: Single failure cuts band",
    "description": "A series of 5 freely spinning hexagonal wheels suspended over water. Each wheel turns 360 degrees as athletes hang from the outer perimeter spokes.",
    "whyPeopleFail": [
      "Allowing the wheel to free-spin uncontrollably, throwing athlete off into water",
      "Hesitation between wheel transfers"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Wheel Rim Momentum Control",
        "description": "Grab bottom spoke, use rotational momentum to swing hand directly to next wheel.",
        "targetBenchmark": "Cross 5 wheels in under 16 seconds",
        "equipment": "Rotating wheel rig"
      }
    ],
    "diagnosticTest": {
      "name": "Rotating Wheel Traversal",
      "protocol": "Traverse 5 continuous wheels unbroken.",
      "passCriteria": "Zero splashdown."
    },
    "recommendedWeeklyDrill": "Ring transitions + single-arm lock-off holds."
  },
  {
    "id": "savage-chop-sticks",
    "slug": "chop-sticks",
    "name": "Chop Sticks (Horizontal Beams Crossed by Sliding Moveable Hand Poles)",
    "category": "Crawls & Balance",
    "races": [
      "savage-race"
    ],
    "raceFormats": [
      "savage-standard",
      "savage-pro"
    ],
    "averageFailureRate": "42% in Open Heats",
    "techniqueRating": 92,
    "gripRating": 75,
    "pullingRating": 65,
    "fatigueResistance": 60,
    "wetConditionRating": 85,
    "penaltyType": "SavagePRO: Drop pole = Band cut",
    "description": "Athletes walk across a narrow beam while holding two wooden hand poles that slide along overhead guide pipes to provide balance.",
    "whyPeopleFail": [
      "Poles jamming on guide pipe due to uneven forward pressure",
      "Feet slipping off narrow balance beam below"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Linear Pole Slide Balance",
        "description": "Keep steady downward pressure, slide poles smoothly in tandem with foot strides.",
        "targetBenchmark": "Cross 25ft beam in under 12 seconds",
        "equipment": "Chop Sticks rig"
      }
    ],
    "diagnosticTest": {
      "name": "Sliding Pole Balance Test",
      "protocol": "Cross 25ft beam with sliding poles without falling.",
      "passCriteria": "Smooth traversal."
    },
    "recommendedWeeklyDrill": "Balance beam walks + single-leg kettlebell deadlifts."
  },
  {
    "id": "savage-battering-ram",
    "slug": "battering-ram",
    "name": "Battering Ram (Heavy Log Shoulder Carry through Mud)",
    "category": "Heavy Carries",
    "races": [
      "savage-race"
    ],
    "raceFormats": [
      "savage-blitz",
      "savage-standard"
    ],
    "averageFailureRate": "15% in Open Heats",
    "techniqueRating": 60,
    "gripRating": 70,
    "pullingRating": 70,
    "fatigueResistance": 88,
    "wetConditionRating": 75,
    "penaltyType": "Must finish 200m loop with log",
    "description": "Hoist a thick 50-70lb milled timber log onto one shoulder and carry it through a 200-meter winding mud trail before returning it to the rack.",
    "whyPeopleFail": [
      "Log slipping off wet jersey down arm",
      "Severe quadriceps cramping in deep clay mud"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Shoulder Log Clean & Carry",
        "description": "Squat, clean log onto shoulder, lock elbow around timber, maintain high step cadence.",
        "targetBenchmark": "200m unbroken carry in under 2 minutes",
        "equipment": "Heavy log / sandbag"
      }
    ],
    "diagnosticTest": {
      "name": "Heavy Log Carry Standard",
      "protocol": "Carry 60lb log 200m through mud without dropping.",
      "passCriteria": "Finished under 2:15."
    },
    "recommendedWeeklyDrill": "Sandbag shoulder walks 4x150m + front squats."
  },
  {
    "id": "savage-big-cheese",
    "slug": "big-cheese",
    "name": "Big Cheese (Vertical Wall Ascent with Circular Cutout Grips)",
    "category": "Walls",
    "races": [
      "savage-race"
    ],
    "raceFormats": [
      "savage-blitz",
      "savage-standard"
    ],
    "averageFailureRate": "22% in Open Heats",
    "techniqueRating": 80,
    "gripRating": 75,
    "pullingRating": 78,
    "fatigueResistance": 60,
    "wetConditionRating": 75,
    "penaltyType": "SavagePRO: Must scale solo to keep band",
    "description": "A 12-foot high vertical wooden climbing wall riddled with circular cut-out holes resembling swiss cheese. Athletes use the holes for finger and toe holds to summit.",
    "whyPeopleFail": [
      "Placing toes too deep into holes, jamming feet during top transition",
      "Finger slip on smooth wet plywood hole edges"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Hole-Hook Finger Lock",
        "description": "Insert four fingers into circular rim, pull down into crimp, step toes onto lower circle.",
        "targetBenchmark": "Scale 12ft wall under 10 seconds",
        "equipment": "Climbing wall / Big Cheese"
      }
    ],
    "diagnosticTest": {
      "name": "Cutout Wall Speed Climb",
      "protocol": "Scale 12ft Big Cheese wall and mantle top platform.",
      "passCriteria": "Under 12 seconds."
    },
    "recommendedWeeklyDrill": "Rock climbing fingerboard crimps + pull-ups."
  },
  {
    "id": "savage-shit-creek",
    "slug": "shit-creek",
    "name": "Shit Creek (Chest-High Mud Creek Wading Against Current)",
    "category": "Water & Mud",
    "races": [
      "savage-race"
    ],
    "raceFormats": [
      "savage-blitz",
      "savage-standard"
    ],
    "averageFailureRate": "8% exhaustion / shoe loss",
    "techniqueRating": 60,
    "gripRating": 15,
    "pullingRating": 30,
    "fatigueResistance": 90,
    "wetConditionRating": 100,
    "penaltyType": "Mandatory course route",
    "description": "Wade 200 to 400 meters through a natural muddy creek bed with water and silt reaching chest height, pushing against submerged logs and mud currents.",
    "whyPeopleFail": [
      "Mud suction tearing shoes off feet",
      "Hypothermia and quadriceps exhaustion in deep water drag"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "High-Knee Water Piston Step",
        "description": "Drive knees high to break water tension, lean torso forward into current.",
        "targetBenchmark": "200m creek wade under 4 minutes",
        "equipment": "Water / creek"
      }
    ],
    "diagnosticTest": {
      "name": "Heavy Water Wading Test",
      "protocol": "Wade 200m in chest-deep mud water in under 4 minutes.",
      "passCriteria": "Continuous motion without stopping."
    },
    "recommendedWeeklyDrill": "Walking lunges 4x40 reps + stair climbs."
  },
  {
    "id": "savage-pedal-metal",
    "slug": "pedal-metal",
    "name": "Pedal for the Medal (Heavy Pulley Hoist with Foot Stirrup Mechanism)",
    "category": "Heavy Carries",
    "races": [
      "savage-race"
    ],
    "raceFormats": [
      "savage-standard"
    ],
    "averageFailureRate": "25% in Open Heats",
    "techniqueRating": 82,
    "gripRating": 70,
    "pullingRating": 85,
    "fatigueResistance": 75,
    "wetConditionRating": 75,
    "penaltyType": "SavagePRO: Must hoist to top bracket",
    "description": "A heavy mechanical cable hoist where athletes use a combination of arm pulling and a foot stirrup pedal to lift a 100lb concrete block to the top pulley.",
    "whyPeopleFail": [
      "Neglecting to use the foot stirrup leg press drive",
      "Dropping the weight free-fall resulting in disqualification"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Leg-Press Pulley Synchronization",
        "description": "Step foot down into stirrup while pulling down with hands simultaneously.",
        "targetBenchmark": "Hoist 100lb block to top in under 15s",
        "equipment": "Pulley hoist"
      }
    ],
    "diagnosticTest": {
      "name": "Mechanical Hoist Speed Test",
      "protocol": "Hoist weight to top bracket and lower under control.",
      "passCriteria": "Clean hoist and lowering under 20s."
    },
    "recommendedWeeklyDrill": "Cable rows + single-leg step-downs."
  },
  {
    "id": "savage-squeeze-play",
    "slug": "squeeze-play",
    "name": "Squeeze Play (Crawl under Rows of Heavy Tractor Tires on Mud)",
    "category": "Crawls & Balance",
    "races": [
      "savage-race"
    ],
    "raceFormats": [
      "savage-blitz",
      "savage-standard"
    ],
    "averageFailureRate": "14% in Open Heats",
    "techniqueRating": 70,
    "gripRating": 25,
    "pullingRating": 60,
    "fatigueResistance": 75,
    "wetConditionRating": 90,
    "penaltyType": "Crawl through full row of tires",
    "description": "Crawl 20 meters beneath dozens of heavy industrial tractor tires suspended only 12 inches above thick, wet mud.",
    "whyPeopleFail": [
      "Heavy rubber tires pressing down on spine and back",
      "Claustrophobia and mud inhaling"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Flat Belly Alligator Propulsion",
        "description": "Keep chin in mud, push with toes, wedge head and shoulders under tire tread.",
        "targetBenchmark": "Traverse 20m tire crawl under 35s",
        "equipment": "Tractor tires / mats"
      }
    ],
    "diagnosticTest": {
      "name": "Heavy Compression Crawl Test",
      "protocol": "Clear 20m tire crawl in under 40 seconds.",
      "passCriteria": "Continuous forward drive."
    },
    "recommendedWeeklyDrill": "Army crawls + weighted planks."
  },
  {
    "id": "savage-great-wall",
    "slug": "great-wall",
    "name": "The Great Wall (10-Foot Vertical Timber Wall with Zero Rungs)",
    "category": "Walls",
    "races": [
      "savage-race"
    ],
    "raceFormats": [
      "savage-blitz",
      "savage-standard"
    ],
    "averageFailureRate": "58% solo in Open Heats",
    "techniqueRating": 92,
    "gripRating": 75,
    "pullingRating": 92,
    "fatigueResistance": 65,
    "wetConditionRating": 75,
    "penaltyType": "SavagePRO: Must scale 100% unassisted",
    "description": "A massive 10-foot tall smooth wooden vertical wall with no foot rungs or cheater blocks. Athletes must run, leap, grab the top edge, and muscle over.",
    "whyPeopleFail": [
      "Wall height exceeds maximum jump reach for most competitors",
      "Inability to press chest over wall once top ledge is caught"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "High Wall Pop & Foot Plant",
        "description": "Sprint, plant foot at 4.5ft on wall, drive vertically to grab top rail.",
        "targetBenchmark": "Catch top rail with both palms",
        "equipment": "10ft wall"
      },
      {
        "level": 2,
        "name": "Solo Heel Hook Roll",
        "description": "Kick heel over top, roll onto belly, slide legs over.",
        "targetBenchmark": "Solo clearance in under 10 seconds",
        "equipment": "10ft wall"
      }
    ],
    "diagnosticTest": {
      "name": "10-Foot Solo Wall Clearance",
      "protocol": "Clear 10ft wall unassisted in under 15 seconds.",
      "passCriteria": "Clean solo climb."
    },
    "recommendedWeeklyDrill": "Box jumps 36 inches + muscle-ups / chest-to-bar pull-ups."
  },
  {
    "id": "savage-pipe-dream",
    "slug": "pipe-dream",
    "name": "Pipe Dream (Horizontal Bar Shimmy with Hands & Interlocked Feet)",
    "category": "Swinging & Rig",
    "races": [
      "savage-race"
    ],
    "raceFormats": [
      "savage-standard",
      "savage-pro"
    ],
    "averageFailureRate": "38% in Open Heats",
    "techniqueRating": 88,
    "gripRating": 85,
    "pullingRating": 82,
    "fatigueResistance": 78,
    "wetConditionRating": 88,
    "penaltyType": "SavagePRO: Miss 1 attempt = Cut band",
    "description": "Shimmy 30 feet along a horizontal suspended metal pipe over water using only hands and crossed/interlocked ankles.",
    "whyPeopleFail": [
      "Feet slipping off wet pipe, leaving athlete dangling on arms alone",
      "Excessive forearm pump halfway across the span"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Cross-Ankle Pipe Clamp",
        "description": "Cross ankles tightly over pipe to clamp 50% of weight onto legs, shuffle hands forward.",
        "targetBenchmark": "Traverse 30ft pipe under 25 seconds",
        "equipment": "Horizontal pipe"
      }
    ],
    "diagnosticTest": {
      "name": "Pipe Shimmy Test",
      "protocol": "Cross 30ft suspended pipe with crossed feet.",
      "passCriteria": "Touch end bell cleanly."
    },
    "recommendedWeeklyDrill": "Pull-ups with legs crossed over bar + dead hangs."
  },
  {
    "id": "savage-kiss-my-walls",
    "slug": "kiss-my-walls",
    "name": "Kiss My Walls (Crimp Traverse along Plywood Wall with Finger Ridges)",
    "category": "Crawls & Balance",
    "races": [
      "savage-race"
    ],
    "raceFormats": [
      "savage-standard",
      "savage-pro"
    ],
    "averageFailureRate": "46% in Open Heats",
    "techniqueRating": 95,
    "gripRating": 92,
    "pullingRating": 70,
    "fatigueResistance": 72,
    "wetConditionRating": 92,
    "penaltyType": "SavagePRO: Fall cuts band",
    "description": "Traverse 25 feet across a vertical wooden wall using tiny 1-inch rock climbing finger crimp ledges and small foot strips without touching top edge.",
    "whyPeopleFail": [
      "Fingertip crimps slip when muddy",
      "Hips drift away from wall, increasing sheer force on finger tendons"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Wall-Glued Pelvis Crimp Shuffle",
        "description": "Keep hips glued against plywood, step on big toes, shuffle fingertips along crimp rail.",
        "targetBenchmark": "Traverse 25ft wall cleanly",
        "equipment": "Bouldering wall"
      }
    ],
    "diagnosticTest": {
      "name": "1-Inch Crimp Traverse",
      "protocol": "Cross 20ft of 1-inch ledges without peeling off.",
      "passCriteria": "Clean traversal."
    },
    "recommendedWeeklyDrill": "Rock climbing bouldering + hangboard 15mm edge hangs."
  },
  {
    "id": "savage-thors-lightning",
    "slug": "thors-lightning",
    "name": "Thor's Lightning (Electrified Muddy Wire Crawl)",
    "category": "Agility & Mental",
    "races": [
      "savage-race"
    ],
    "raceFormats": [
      "savage-standard"
    ],
    "averageFailureRate": "12% in Open Heats",
    "techniqueRating": 60,
    "gripRating": 10,
    "pullingRating": 20,
    "fatigueResistance": 50,
    "wetConditionRating": 95,
    "penaltyType": "Bypass permitted in open waves",
    "description": "Crawl through water and mud beneath hanging wires packed with high-voltage electric shocks.",
    "whyPeopleFail": [
      "Involuntary muscular spasm when wire strikes neck or shoulder",
      "Stopping moving in the hazard zone"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Low Mud Gliding",
        "description": "Stay completely flat in water trench, crawl forward without stopping.",
        "targetBenchmark": "Clear 15m electric zone under 8s",
        "equipment": "Mud trench"
      }
    ],
    "diagnosticTest": {
      "name": "Electric Hazard Sprint",
      "protocol": "Crawl 15m without stopping.",
      "passCriteria": "Continuous crawl."
    },
    "recommendedWeeklyDrill": "Low bear crawls + mental composure breathing."
  },
  {
    "id": "savage-barn-doors",
    "slug": "barn-doors",
    "name": "Barn Doors (Spinning Vertical Wooden Panels Suspended over Water)",
    "category": "Swinging & Rig",
    "races": [
      "savage-race"
    ],
    "raceFormats": [
      "savage-standard",
      "savage-pro"
    ],
    "averageFailureRate": "52% in Open Heats",
    "techniqueRating": 94,
    "gripRating": 90,
    "pullingRating": 85,
    "fatigueResistance": 78,
    "wetConditionRating": 90,
    "penaltyType": "SavagePRO: Miss 1 attempt = Band cut",
    "description": "Suspended vertical wooden door panels that rotate freely on a central vertical pivot axis as athletes grasp the side edges to traverse across water.",
    "whyPeopleFail": [
      "Door spins 180 degrees immediately when bodyweight is applied",
      "Loss of momentum jumping from spinning door to next panel"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Rotational Pivot Absorption",
        "description": "Catch door edge with two hands, ride rotation, leap immediately to next panel.",
        "targetBenchmark": "Traverse 4 spinning panels under 14s",
        "equipment": "Rotating door rig"
      }
    ],
    "diagnosticTest": {
      "name": "Spinning Panel Traverse Test",
      "protocol": "Cross 4 barn doors without dropping into water.",
      "passCriteria": "Touch exit platform."
    },
    "recommendedWeeklyDrill": "Pinch grip holds 4x30s + pull-ups."
  },
  {
    "id": "savage-lumberjack",
    "slug": "lumberjack",
    "name": "Lumberjack (Heavy Timber Log Flip & Carry)",
    "category": "Heavy Carries",
    "races": [
      "savage-race"
    ],
    "raceFormats": [
      "savage-blitz",
      "savage-standard"
    ],
    "averageFailureRate": "15% in Open Heats",
    "techniqueRating": 65,
    "gripRating": 75,
    "pullingRating": 78,
    "fatigueResistance": 82,
    "wetConditionRating": 70,
    "penaltyType": "Must complete required flips",
    "description": "Pick up and flip a heavy telephone pole log segment (100-150lbs) end-over-end 4 times across a grass lane.",
    "whyPeopleFail": [
      "Rounding lumbar spine during the initial end-lift",
      "Muddy log slipping out of hands"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Hip Drive Log Flip",
        "description": "Squat low, cup hands under log tip, explode through hips to send log upright and over.",
        "targetBenchmark": "4 continuous flips in under 30s",
        "equipment": "Heavy log"
      }
    ],
    "diagnosticTest": {
      "name": "Log Flip Endurance",
      "protocol": "Execute 4 clean log flips in under 30 seconds.",
      "passCriteria": "Zero back strain."
    },
    "recommendedWeeklyDrill": "Deadlifts + power cleans."
  },
  {
    "id": "savage-incline-wall",
    "slug": "incline-wall",
    "name": "Incline Wall (Reverse Angle Plywood Wall Climb)",
    "category": "Walls",
    "races": [
      "savage-race"
    ],
    "raceFormats": [
      "savage-blitz",
      "savage-standard"
    ],
    "averageFailureRate": "25% in Open Heats",
    "techniqueRating": 75,
    "gripRating": 65,
    "pullingRating": 75,
    "fatigueResistance": 60,
    "wetConditionRating": 80,
    "penaltyType": "SavagePRO: Unassisted clearance required",
    "description": "An 8-foot wooden wall leaning backward at an incline. Athletes scale up the slope and roll over the top beam.",
    "whyPeopleFail": [
      "Slipping down the reverse angle when feet lose friction",
      "Inability to reach over top rail"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Reverse Incline Slat Climb",
        "description": "Step high into lower slats, pull chest into wall, vault over top rail.",
        "targetBenchmark": "Scale wall under 8 seconds",
        "equipment": "Incline wall"
      }
    ],
    "diagnosticTest": {
      "name": "Incline Wall Speed Ascent",
      "protocol": "Clear wall in under 10 seconds solo.",
      "passCriteria": "Fast unassisted climb."
    },
    "recommendedWeeklyDrill": "Pull-ups + box jumps."
  },
  {
    "id": "rugged-mount-maniac",
    "slug": "mount-maniac",
    "name": "Mount Maniac (3-Story Shipping Container Tower, Cargo, & Mega Slide)",
    "category": "Climbing",
    "races": [
      "rugged-maniac"
    ],
    "raceFormats": [
      "rugged-maniac-5k"
    ],
    "averageFailureRate": "5% (Festival showpiece obstacle)",
    "techniqueRating": 60,
    "gripRating": 40,
    "pullingRating": 50,
    "fatigueResistance": 55,
    "wetConditionRating": 60,
    "penaltyType": "Zero Penalties (Festival fun obstacle)",
    "description": "A 3-story complex built of stacked shipping containers. Athletes climb cargo nets, cross suspended walkways, and descend via a giant 50-foot water slide into a splash pool.",
    "whyPeopleFail": [
      "Slowing down on the cargo net ascent behind large family groups",
      "Hesitation at top of steep slide"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "High Cargo Net Pace",
        "description": "Scale cargo net using alternating hand-over-hand cadence, step cleanly onto platform.",
        "targetBenchmark": "Climb 30ft net under 20 seconds",
        "equipment": "Cargo net"
      }
    ],
    "diagnosticTest": {
      "name": "Tower Net Clearance",
      "protocol": "Scale 3 stories in under 45 seconds.",
      "passCriteria": "Continuous climb."
    },
    "recommendedWeeklyDrill": "Stair climbing 15 mins + pull-ups."
  },
  {
    "id": "rugged-gauntlet",
    "slug": "gauntlet",
    "name": "The Gauntlet (Massive Swinging Foam Wrecking Balls over Balance Paths)",
    "category": "Agility & Mental",
    "races": [
      "rugged-maniac"
    ],
    "raceFormats": [
      "rugged-maniac-5k"
    ],
    "averageFailureRate": "35% knocked into water pool",
    "techniqueRating": 85,
    "gripRating": 10,
    "pullingRating": 10,
    "fatigueResistance": 40,
    "wetConditionRating": 80,
    "penaltyType": "Zero Penalties (Swim to ladder if knocked off)",
    "description": "Cross a series of narrow balance walkways over a deep water pit while volunteers swing giant foam wrecking balls across your path.",
    "whyPeopleFail": [
      "Timing errors dodging the swinging pendulum balls",
      "Slipping on the narrow wet wooden balance beam"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Pendulum Timing & Sprint Duck",
        "description": "Wait for ball to reach apex of swing, sprint beneath trajectory, duck under next ball.",
        "targetBenchmark": "Cross 30ft gauntlet without getting hit",
        "equipment": "Balance beam + pendulums"
      }
    ],
    "diagnosticTest": {
      "name": "Dynamic Balance Agility Test",
      "protocol": "Cross 30ft beam with lateral distractions in under 6s.",
      "passCriteria": "Zero falls."
    },
    "recommendedWeeklyDrill": "Agility ladder drills + cone shuttle sprints."
  },
  {
    "id": "rugged-tipping-point",
    "slug": "tipping-point",
    "name": "Tipping Point (Teeter-Totter Pivoting Balance Beams over Mud)",
    "category": "Crawls & Balance",
    "races": [
      "rugged-maniac"
    ],
    "raceFormats": [
      "rugged-maniac-5k"
    ],
    "averageFailureRate": "20% falls into mud",
    "techniqueRating": 80,
    "gripRating": 15,
    "pullingRating": 15,
    "fatigueResistance": 40,
    "wetConditionRating": 75,
    "penaltyType": "Zero Penalties (Wade through mud if fallen)",
    "description": "Walk across a series of large teeter-totter balance beams on pivot axles that tip downward as your weight crosses the center pivot point.",
    "whyPeopleFail": [
      "Stopping directly on the pivot point, causing unpredictable teetering",
      "Running too fast and jumping before the beam tips smoothly"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Pivot Cadence Transition",
        "description": "Walk smoothly to pivot, ride the tip downward as front edge touches ground, step to next beam.",
        "targetBenchmark": "Cross 3 tipping beams without pause",
        "equipment": "Teeter totter beam"
      }
    ],
    "diagnosticTest": {
      "name": "Pivoting Beam Clearance",
      "protocol": "Cross 3 tipping beams in under 12 seconds.",
      "passCriteria": "Zero step-offs."
    },
    "recommendedWeeklyDrill": "Single-leg balance drills + broad jumps."
  },
  {
    "id": "rugged-water-drop",
    "slug": "water-drop",
    "name": "Water Drop (50-Foot Incline High Speed Water Slide into Deep Pool)",
    "category": "Water & Mud",
    "races": [
      "rugged-maniac"
    ],
    "raceFormats": [
      "rugged-maniac-5k"
    ],
    "averageFailureRate": "2% (Pure celebration slide)",
    "techniqueRating": 30,
    "gripRating": 0,
    "pullingRating": 0,
    "fatigueResistance": 20,
    "wetConditionRating": 100,
    "penaltyType": "Zero Penalties",
    "description": "A 50-foot water slide with running water plunging racers into a 4-foot deep splash pool.",
    "whyPeopleFail": [
      "Hesitation at top of slide",
      "Landing poorly in water"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Slide Position Control",
        "description": "Cross arms over chest, lean back, slide into pool.",
        "targetBenchmark": "Fast entry into pool",
        "equipment": "Slide"
      }
    ],
    "diagnosticTest": {
      "name": "Slide Exit Agility",
      "protocol": "Exit splash pool in under 5 seconds.",
      "passCriteria": "Fast recovery."
    },
    "recommendedWeeklyDrill": "Sprint intervals + core work."
  },
  {
    "id": "rugged-quad-sliders",
    "slug": "quad-sliders",
    "name": "Quad Sliders / Trampolines (Trampoline Launch onto Angled Cargo Nets)",
    "category": "Climbing",
    "races": [
      "rugged-maniac"
    ],
    "raceFormats": [
      "rugged-maniac-5k"
    ],
    "averageFailureRate": "15% in Open Heats",
    "techniqueRating": 75,
    "gripRating": 50,
    "pullingRating": 60,
    "fatigueResistance": 50,
    "wetConditionRating": 60,
    "penaltyType": "Zero Penalties",
    "description": "Bounce off a mini trampoline, launch through the air, and grab onto an angled cargo net suspended over a mud pit, climbing to the top.",
    "whyPeopleFail": [
      "Missing the trampoline sweet spot, leading to insufficient height",
      "Failing to secure two hands into the cargo net upon impact"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Trampoline Jump & Catch",
        "description": "Plant both feet in center of trampoline, rebound upward, latch into net with both hands.",
        "targetBenchmark": "Clean net catch on 5 consecutive bounces",
        "equipment": "Trampoline + net"
      }
    ],
    "diagnosticTest": {
      "name": "Trampoline Launch Test",
      "protocol": "Launch and catch net at peak of jump.",
      "passCriteria": "Solid grip retention."
    },
    "recommendedWeeklyDrill": "Box jumps + pull-ups."
  },
  {
    "id": "rugged-ant-gravity",
    "slug": "ant-gravity",
    "name": "Ant-Gravity (Curved Skateboard Quarter-Pipe Ramp)",
    "category": "Walls",
    "races": [
      "rugged-maniac"
    ],
    "raceFormats": [
      "rugged-maniac-5k"
    ],
    "averageFailureRate": "25% in Open Heats",
    "techniqueRating": 80,
    "gripRating": 60,
    "pullingRating": 70,
    "fatigueResistance": 50,
    "wetConditionRating": 65,
    "penaltyType": "Zero Penalties",
    "description": "A 10-foot curved quarter-pipe ramp with top rope lines and top ledges.",
    "whyPeopleFail": [
      "Slowing down on the approach",
      "Slipping on the curved wood"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Ramp Sprint to Ledge",
        "description": "Sprint up curved ramp, grab top ledge or rope, mantle to platform.",
        "targetBenchmark": "Summit in under 6 seconds",
        "equipment": "Quarter pipe"
      }
    ],
    "diagnosticTest": {
      "name": "Quarter Pipe Clearance",
      "protocol": "Scale ramp solo in under 8 seconds.",
      "passCriteria": "Clean summit."
    },
    "recommendedWeeklyDrill": "Hill sprints + pull-ups."
  },
  {
    "id": "rugged-ring-toss",
    "slug": "ring-toss",
    "name": "Ring Toss (Moving Heavy Gymnastic Rings from Peg to Peg over Water)",
    "category": "Swinging & Rig",
    "races": [
      "rugged-maniac"
    ],
    "raceFormats": [
      "rugged-maniac-5k"
    ],
    "averageFailureRate": "45% splashdown in water",
    "techniqueRating": 92,
    "gripRating": 88,
    "pullingRating": 82,
    "fatigueResistance": 70,
    "wetConditionRating": 85,
    "penaltyType": "Zero Penalties (Splash pool below)",
    "description": "Hang from gymnastics rings and move the rings from peg to peg across a 20-foot horizontal span suspended over water.",
    "whyPeopleFail": [
      "Allowing ring to slip off peg",
      "Exhausting forearms on static hangs"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Ring Peg Transfer Cadence",
        "description": "Hang, unhook trailing ring, swing and place on forward peg.",
        "targetBenchmark": "Cross 15ft unbroken",
        "equipment": "Ring toss rig"
      }
    ],
    "diagnosticTest": {
      "name": "Ring Peg Traversal Test",
      "protocol": "Traverse 6 ring pegs without dropping.",
      "passCriteria": "Clean crossing."
    },
    "recommendedWeeklyDrill": "Frenchies pull-ups + ring beat swings."
  },
  {
    "id": "rugged-head-scratcher",
    "slug": "head-scratcher",
    "name": "Head Scratcher (Low Wire Water Crawl under Wooden Beams)",
    "category": "Crawls & Balance",
    "races": [
      "rugged-maniac"
    ],
    "raceFormats": [
      "rugged-maniac-5k"
    ],
    "averageFailureRate": "5% (Fun mud crawl)",
    "techniqueRating": 50,
    "gripRating": 20,
    "pullingRating": 30,
    "fatigueResistance": 50,
    "wetConditionRating": 100,
    "penaltyType": "Zero Penalties",
    "description": "Crawl through shallow mud water beneath low wooden crossbars and wire strung 20 inches above the water.",
    "whyPeopleFail": [
      "Catching back on crossbars",
      "Mud in eyes"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Low Water Crawl",
        "description": "Stay low, pull with elbows, slide through trench.",
        "targetBenchmark": "20m crawl under 25s",
        "equipment": "Water trench"
      }
    ],
    "diagnosticTest": {
      "name": "Low Crawl Speed Test",
      "protocol": "Traverse 20m crawl in under 30 seconds.",
      "passCriteria": "Continuous progress."
    },
    "recommendedWeeklyDrill": "Bear crawls + core work."
  },
  {
    "id": "rugged-accelerator",
    "slug": "accelerator",
    "name": "Accelerator (Steep 30-Foot High-Velocity Water Slide)",
    "category": "Water & Mud",
    "races": [
      "rugged-maniac"
    ],
    "raceFormats": [
      "rugged-maniac-5k"
    ],
    "averageFailureRate": "2%",
    "techniqueRating": 30,
    "gripRating": 0,
    "pullingRating": 0,
    "fatigueResistance": 20,
    "wetConditionRating": 100,
    "penaltyType": "Zero Penalties",
    "description": "A steep 30-foot water slide launching athletes at high velocity into a deep mud pool.",
    "whyPeopleFail": [
      "Fear of steep slope"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Slide Launch",
        "description": "Sit, push off, slide down center line.",
        "targetBenchmark": "Fast clean slide",
        "equipment": "Slide"
      }
    ],
    "diagnosticTest": {
      "name": "Water Exit Speed",
      "protocol": "Clear splash pool in under 5 seconds.",
      "passCriteria": "Immediate sprint."
    },
    "recommendedWeeklyDrill": "Sprint repeats."
  },
  {
    "id": "rugged-warp-wall",
    "slug": "warp-wall",
    "name": "Warp Wall (12-Foot Curved Wall with Assist Haul Ropes)",
    "category": "Walls",
    "races": [
      "rugged-maniac"
    ],
    "raceFormats": [
      "rugged-maniac-5k"
    ],
    "averageFailureRate": "30% solo in Open Heats",
    "techniqueRating": 85,
    "gripRating": 65,
    "pullingRating": 75,
    "fatigueResistance": 55,
    "wetConditionRating": 70,
    "penaltyType": "Zero Penalties (Ropes provided for assistance)",
    "description": "A 12-foot curved quarter-pipe wall with haul ropes dangling to the 8-foot mark. Racers sprint up the curve and pull themselves to the top platform.",
    "whyPeopleFail": [
      "Stutter-stepping before hitting the curve",
      "Failing to grab rope firmly"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Curved Wall Sprint & Rope Grab",
        "description": "Sprint up curve, catch rope with two hands, walk feet to top platform.",
        "targetBenchmark": "Summit wall in under 8 seconds",
        "equipment": "Warp wall"
      }
    ],
    "diagnosticTest": {
      "name": "Warp Wall Clearance",
      "protocol": "Scale wall using rope in under 10 seconds.",
      "passCriteria": "Clean ascent."
    },
    "recommendedWeeklyDrill": "Hill sprints 6x30m + pull-ups."
  },
  {
    "id": "rugged-balance-bust",
    "slug": "balance-bust",
    "name": "Balance or Bust (Zig-Zag Floating / Suspended Balance Beams)",
    "category": "Crawls & Balance",
    "races": [
      "rugged-maniac"
    ],
    "raceFormats": [
      "rugged-maniac-5k"
    ],
    "averageFailureRate": "28% falls into water",
    "techniqueRating": 82,
    "gripRating": 15,
    "pullingRating": 15,
    "fatigueResistance": 40,
    "wetConditionRating": 80,
    "penaltyType": "Zero Penalties (Swim to ladder if fallen)",
    "description": "A series of zig-zagging narrow balance beams suspended over water requiring sharp directional turns.",
    "whyPeopleFail": [
      "Loss of balance on 90-degree corner pivots",
      "Muddy shoes losing friction on wet wood"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Corner Pivot Stride",
        "description": "Plant lead foot at corner intersection, rotate torso, step onto next beam.",
        "targetBenchmark": "Cross 3 zig-zag beams cleanly",
        "equipment": "Zig-zag balance beam"
      }
    ],
    "diagnosticTest": {
      "name": "Zig-Zag Balance Clearance",
      "protocol": "Cross 3 beams with corners without falling.",
      "passCriteria": "Under 10 seconds."
    },
    "recommendedWeeklyDrill": "Single-leg balance squats + agility ladder."
  },
  {
    "id": "rugged-commando-crawl",
    "slug": "commando-crawl",
    "name": "Commando Crawl (Underground Drainage Pipe Claustrophobic Crawl)",
    "category": "Crawls & Balance",
    "races": [
      "rugged-maniac"
    ],
    "raceFormats": [
      "rugged-maniac-5k"
    ],
    "averageFailureRate": "6% claustrophobia",
    "techniqueRating": 50,
    "gripRating": 15,
    "pullingRating": 30,
    "fatigueResistance": 50,
    "wetConditionRating": 75,
    "penaltyType": "Zero Penalties",
    "description": "Crawl through a 30-foot long corrugated plastic pipe buried underground.",
    "whyPeopleFail": [
      "Panic in narrow pipe",
      "Bumping knees on corrugated ridges"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Fast Pipe Crawl",
        "description": "Crawl with hands and knees rapidly through pipe.",
        "targetBenchmark": "Traverse 30ft in under 15s",
        "equipment": "Pipe"
      }
    ],
    "diagnosticTest": {
      "name": "Pipe Crawl Speed Test",
      "protocol": "Clear 30ft pipe under 20 seconds.",
      "passCriteria": "Continuous crawl."
    },
    "recommendedWeeklyDrill": "Bear crawl drills 3x30m."
  },
  {
    "id": "rugged-shoe-catcher",
    "slug": "shoe-catcher",
    "name": "Shoe Catcher (Deep Knee-High Shoe-Stealing Clay Bog)",
    "category": "Water & Mud",
    "races": [
      "rugged-maniac"
    ],
    "raceFormats": [
      "rugged-maniac-5k"
    ],
    "averageFailureRate": "15% lost shoes in mud",
    "techniqueRating": 60,
    "gripRating": 10,
    "pullingRating": 20,
    "fatigueResistance": 75,
    "wetConditionRating": 100,
    "penaltyType": "Zero Penalties (Find your shoe and continue)",
    "description": "Wade through 50 meters of thick, suction-heavy mud bog designed to pull loose shoes right off your feet.",
    "whyPeopleFail": [
      "Loose shoe laces pulled off by deep clay suction",
      "Stepping heel-first instead of peeling foot forward"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Toe-Peel Mud Walking Mechanics",
        "description": "Double knot laces, peel heel first, drive knee upward out of mud.",
        "targetBenchmark": "Wade 50m without losing shoes",
        "equipment": "Mud bog"
      }
    ],
    "diagnosticTest": {
      "name": "Mud Bog Speed Wade",
      "protocol": "Wade 50m mud bog in under 90 seconds.",
      "passCriteria": "100% footwear retention."
    },
    "recommendedWeeklyDrill": "Walking lunges + double knotting drills."
  },
  {
    "id": "rugged-the-ringer",
    "slug": "the-ringer",
    "name": "The Ringer (Ascending and Descending Monkey Rings over Water)",
    "category": "Swinging & Rig",
    "races": [
      "rugged-maniac"
    ],
    "raceFormats": [
      "rugged-maniac-5k"
    ],
    "averageFailureRate": "40% splashdown in water",
    "techniqueRating": 88,
    "gripRating": 85,
    "pullingRating": 80,
    "fatigueResistance": 70,
    "wetConditionRating": 85,
    "penaltyType": "Zero Penalties (Splashdown pool below)",
    "description": "Traverse 25 feet of gymnastic rings that ascend up to an apex and descend toward an exit platform over water.",
    "whyPeopleFail": [
      "Swinging out of rhythm",
      "Forearm fatigue causing release"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Ring Beat Swing Traverse",
        "description": "Swing hips forward, transfer hand to next ring at apex of swing.",
        "targetBenchmark": "Cross 25ft rings in under 15 seconds",
        "equipment": "Gymnastic rings"
      }
    ],
    "diagnosticTest": {
      "name": "Rings Traversal Test",
      "protocol": "Cross 25ft ascending/descending rings unbroken.",
      "passCriteria": "Touch exit platform."
    },
    "recommendedWeeklyDrill": "Ring dips + towel pull-ups."
  },
  {
    "id": "rugged-leap-of-faith",
    "slug": "leap-of-faith",
    "name": "Leap of Faith (Rope Swing over Water onto Floating Cargo Net)",
    "category": "Climbing",
    "races": [
      "rugged-maniac"
    ],
    "raceFormats": [
      "rugged-maniac-5k"
    ],
    "averageFailureRate": "30% splashdown in water",
    "techniqueRating": 85,
    "gripRating": 70,
    "pullingRating": 70,
    "fatigueResistance": 50,
    "wetConditionRating": 90,
    "penaltyType": "Zero Penalties (Swim to ladder if missed)",
    "description": "Grab a suspended pendulum rope, swing high over a water pit, and jump onto an angled cargo net suspended over the water, climbing up to the deck.",
    "whyPeopleFail": [
      "Releasing rope too early or late",
      "Failing to grab cargo net with hands and feet simultaneously"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Swing to Cargo Net Catch",
        "description": "Swing, time release at peak, wrap fingers into net mesh, step feet into rope rungs.",
        "targetBenchmark": "5 of 5 clean net catches",
        "equipment": "Rope swing + net"
      }
    ],
    "diagnosticTest": {
      "name": "Rope Swing & Net Catch Test",
      "protocol": "Swing and latch onto cargo net cleanly.",
      "passCriteria": "Secure grip on net."
    },
    "recommendedWeeklyDrill": "Pull-ups + box jump burpees."
  },
  {
    "id": "rugged-pyromaniac",
    "slug": "pyromaniac",
    "name": "Pyromaniac (Finish Line Flame Barrier Leap)",
    "category": "Agility & Mental",
    "races": [
      "rugged-maniac"
    ],
    "raceFormats": [
      "rugged-maniac-5k"
    ],
    "averageFailureRate": "1%",
    "techniqueRating": 30,
    "gripRating": 10,
    "pullingRating": 10,
    "fatigueResistance": 30,
    "wetConditionRating": 40,
    "penaltyType": "Finish line leap",
    "description": "Leap over real flaming wooden logs into the finish line chute.",
    "whyPeopleFail": [
      "Hesitation on approach"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Bounding Flame Leap",
        "description": "Leap cleanly over flames in stride.",
        "targetBenchmark": "Clean hurdle in stride",
        "equipment": "Low barrier"
      }
    ],
    "diagnosticTest": {
      "name": "Finish Line Leap",
      "protocol": "Jump 3ft distance in stride.",
      "passCriteria": "Clean landing."
    },
    "recommendedWeeklyDrill": "Broad jumps 3x5."
  },
  {
    "id": "rugged-bunker-hurdles",
    "slug": "bunker-hurdles",
    "name": "Bunker Hurdles (Series of 4-Foot Wooden Barrier Hurdles)",
    "category": "Walls",
    "races": [
      "rugged-maniac"
    ],
    "raceFormats": [
      "rugged-maniac-5k"
    ],
    "averageFailureRate": "5%",
    "techniqueRating": 50,
    "gripRating": 20,
    "pullingRating": 40,
    "fatigueResistance": 60,
    "wetConditionRating": 50,
    "penaltyType": "Zero Penalties",
    "description": "A series of 4 consecutive 4-foot wooden hurdles spaced throughout trails to break running momentum.",
    "whyPeopleFail": [
      "Fatigue causing trailing leg to clip top rail"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Continuous Hurdle Vault",
        "description": "Plant one hand, vault legs over, land in stride.",
        "targetBenchmark": "Clear 4 hurdles under 15 seconds",
        "equipment": "Low walls / hurdles"
      }
    ],
    "diagnosticTest": {
      "name": "Hurdle Vault Test",
      "protocol": "Clear 4 hurdles at speed.",
      "passCriteria": "Zero trip."
    },
    "recommendedWeeklyDrill": "Hurdle hops 4x6."
  },
  {
    "id": "rugged-pipe-dream",
    "slug": "pipe-dream",
    "name": "Pipe Dream (Enclosed Corrugated Mud Tubes)",
    "category": "Crawls & Balance",
    "races": [
      "rugged-maniac"
    ],
    "raceFormats": [
      "rugged-maniac-5k"
    ],
    "averageFailureRate": "5%",
    "techniqueRating": 50,
    "gripRating": 15,
    "pullingRating": 30,
    "fatigueResistance": 50,
    "wetConditionRating": 80,
    "penaltyType": "Zero Penalties",
    "description": "Slither through 20 feet of corrugated tubes partially filled with mud water.",
    "whyPeopleFail": [
      "Knee abrasions on corrugated plastic"
    ],
    "progressionLadder": [
      {
        "level": 1,
        "name": "Smooth Pipe Slither",
        "description": "Pull forward with forearms, slide hips through tube.",
        "targetBenchmark": "Traverse 20ft under 15s",
        "equipment": "Tubes"
      }
    ],
    "diagnosticTest": {
      "name": "Pipe Slither Test",
      "protocol": "Clear pipe in under 20 seconds.",
      "passCriteria": "Continuous crawl."
    },
    "recommendedWeeklyDrill": "Army crawls 3x30s."
  }
];

// Helper lookup functions
export function getObstaclesByRace(brandId: RaceBrandId): ObstacleProfile[] {
  return OBSTACLE_LIBRARY.filter(obs => obs.races.includes(brandId));
}

export function getObstaclesByFormat(formatId: RaceFormatId): ObstacleProfile[] {
  return OBSTACLE_LIBRARY.filter(obs => obs.raceFormats.includes(formatId));
}

export function getObstaclesByCategory(category: ObstacleCategory): ObstacleProfile[] {
  return OBSTACLE_LIBRARY.filter(obs => obs.category === category);
}

export function getCourseProfile(formatId: RaceFormatId): RaceCourseProfile | undefined {
  return RACE_COURSES.find(course => course.id === formatId);
}
