export interface RaceBrand {
  id: string;
  name: string;
  tagline: string;
  vibe: 'Fun & Party' | 'Team Adventure' | 'Sport & Competition' | 'Technical Ninja';
  difficulty: 'Beginner-Friendly' | 'Moderate' | 'Demanding' | 'Extreme';
  timingStyle: 'Untimed / Pure Challenge' | 'Optional Chip Timing' | 'Mandatory Chip Timing';
  penaltySystem: string;
  teamworkRequired: 'Optional / Solo-friendly' | 'Heavily Encouraged' | 'Strictly Individual';
  signatureObstacles: string[];
  bestFor: {
    beginner: string;
    intermediate: string;
    experienced: string;
    athlete: string;
  };
  overview: string;
  pros: string[];
  cons: string[];
  trainingRoadmap: {
    beginner: {
      focus: string;
      weeklyRhythm: string;
      keyDrill: string;
      mistakeToAvoid: string;
    };
    intermediate: {
      focus: string;
      weeklyRhythm: string;
      keyDrill: string;
      mistakeToAvoid: string;
    };
    experienced: {
      focus: string;
      weeklyRhythm: string;
      keyDrill: string;
      mistakeToAvoid: string;
    };
    athlete: {
      focus: string;
      weeklyRhythm: string;
      keyDrill: string;
      mistakeToAvoid: string;
    };
  };
}

export const RACE_BRANDS: RaceBrand[] = [
  {
    id: 'rugged-maniac',
    name: 'Rugged Maniac',
    tagline: 'The Ultimate Entry-Level Mud Run & 5K Festival',
    vibe: 'Fun & Party',
    difficulty: 'Beginner-Friendly',
    timingStyle: 'Optional Chip Timing',
    penaltySystem: 'Zero Penalties (Skip any obstacle with zero shame)',
    teamworkRequired: 'Optional / Solo-friendly',
    signatureObstacles: [
      'Mount Maniac (3-story shipping container slide)',
      'The Gauntlet (Massive swinging foam wrecking balls)',
      'Tipping Point (Teeter-totter balance beams)',
      'Water Drop (50ft water slide into deep pool)'
    ],
    bestFor: {
      beginner: 'The #1 best starting point. Non-intimidating, accessible, and fun.',
      intermediate: 'A high-speed sprint test where you can run fast and play on obstacles.',
      experienced: 'Fun social run with friends or a speed-time-trial workout.',
      athlete: 'Off-season fun run or active recovery speed day.'
    },
    overview: 'Rugged Maniac focuses on a compact 5K (3.1-mile) course packed with 25 accessible, fun-oriented obstacles. There are no heavy sandbag grinds or brutal mountain climbs. It features a day-long party with music, food trucks, and craft beer at the finish.',
    pros: [
      'Short 5K distance makes it achievable for anyone who can jog or walk.',
      'Obstacles feel like an adult playground (slides, trampolines, bounce pads).',
      'No burpees, no penalty loops, zero guilt if you skip an obstacle.',
      'Lower ticket price and festival atmosphere.'
    ],
    cons: [
      'Not a serious athletic test for seasoned racers.',
      'Course lines can back up during crowded mid-day waves.',
      'Only offers 5K distance (no long endurance options).'
    ],
    trainingRoadmap: {
      beginner: {
        focus: 'Couch-to-5K run/walk endurance + bodyweight squats and push-ups.',
        weeklyRhythm: '3 days/week (Two 20-30 min easy jogs + One bodyweight strength circuit).',
        keyDrill: 'Run 3 minutes / Walk 1 minute intervals for 30 continuous minutes.',
        mistakeToAvoid: 'Buying expensive trail shoes. Regular running sneakers with decent tread work fine.'
      },
      intermediate: {
        focus: 'Tempo running speed and short agility transitions.',
        weeklyRhythm: '3-4 days/week (One tempo 5K run, one sprint interval day, two strength sessions).',
        keyDrill: '5 x 400m fast track intervals + 15 jump squats between sets.',
        mistakeToAvoid: 'Running in heavy cotton clothes that soak up water on the slide.'
      },
      experienced: {
        focus: 'Anaerobic threshold sprint speed and zero-hesitation obstacle navigation.',
        weeklyRhythm: '4-5 days/week (Fast trail pacing and explosive box jumps).',
        keyDrill: 'Continuous 5K tempo run stopping every 500m for 10 burpees.',
        mistakeToAvoid: 'Getting stuck in late waves behind walking groups. Book the earliest wave.'
      },
      athlete: {
        focus: 'Full-throttle sub-19 minute 5K course time.',
        weeklyRhythm: '5-6 days/week (Pure VO2 max and rapid bounding agility).',
        keyDrill: 'Track intervals: 8 x 400m @ 5:15 pace with 45s rest.',
        mistakeToAvoid: 'Overthinking technical skills—this race is 90% foot speed.'
      }
    }
  },
  {
    id: 'tough-mudder',
    name: 'Tough Mudder',
    tagline: 'Teamwork, Mud, and Overcoming Mental Fears',
    vibe: 'Team Adventure',
    difficulty: 'Moderate',
    timingStyle: 'Untimed / Pure Challenge',
    penaltySystem: 'No Individual Penalties (Team helps you clear or you bypass)',
    teamworkRequired: 'Heavily Encouraged',
    signatureObstacles: [
      'Everest (15-ft slick curved quarter-pipe requiring human chains)',
      'Block Ness Monster (Rotating 1,000lb floating blocks in deep water)',
      'Arctic Enema (Submersion in 34°F ice water under a wooden barrier)',
      'Electroshock Therapy (Sprint through dangling 10,000-volt live wires)'
    ],
    bestFor: {
      beginner: 'Awesome for corporate teams and friend groups who want to finish together.',
      intermediate: 'Tests your mental grit against ice, heights, and mud without timing pressure.',
      experienced: 'Great for building functional teamwork and upper-body assistance skills.',
      athlete: 'Tough Mudder Infinity / Toughest Mudder (8h / 12h / 24h) for ultra endurance.'
    },
    overview: 'Tough Mudder is not a race—it is a team challenge. Classic waves have no timing chips and no winners. Several signature obstacles are physically impossible to clear solo, forcing competitors to pull and lift one another. It features cold water, heights, and electrical shocks that challenge your mind more than your speed.',
    pros: [
      'Unmatched camaraderie—strangers will physically boost and pull you over walls.',
      'Conquers genuine fears (cold water, enclosed tubes, heights).',
      'No stress of a ticking clock or penalty burpees.',
      'Ultra formats (Infinity, Toughest, WTM) provide world-class extreme endurance tests.'
    ],
    cons: [
      'Not a competitive race in standard waves (no official leaderboard).',
      'Electrical shock and ice plunge obstacles are polarizing (some racers hate them).',
      'Heavy mud slogs can ruin gear and shoes.'
    ],
    trainingRoadmap: {
      beginner: {
        focus: 'Building 6 to 8-mile walking/jogging endurance + basic pushing strength.',
        weeklyRhythm: '3-4 days/week (One long weekend run/walk of 5-6 miles + two functional push/pull days).',
        keyDrill: 'Cold shower deep breathing (90s) to prep for Arctic Enema reflex.',
        mistakeToAvoid: 'Wearing loose shoes. Double-knot or duct-tape shoe laces so mud doesn’t steal them.'
      },
      intermediate: {
        focus: 'Upper body pulling (for Everest/Mudderhorn) + aerobic endurance.',
        weeklyRhythm: '4 days/week (One 8-mile trail run, two strength days with pull-ups, one core circuit).',
        keyDrill: 'Box pull-ups and teammate buddy carries / fireman carries.',
        mistakeToAvoid: 'Neglecting thermal clothing on cold autumn race days.'
      },
      experienced: {
        focus: 'Continuous time-on-feet stamina and fast mud wading mechanics.',
        weeklyRhythm: '5 days/week (High volume trail runs + functional sandbag carries).',
        keyDrill: '90-minute ruck march with 30lb pack followed immediately by 20 pull-ups.',
        mistakeToAvoid: 'Skipping hydration on the 10+ mile course.'
      },
      athlete: {
        focus: 'Multi-hour lap pace (Infinity / World’s Toughest Mudder 24-Hour prep).',
        weeklyRhythm: '6 days/week (Wetsuit training, cold water immersion, 30+ weekly trail miles).',
        keyDrill: 'Night trail running: 3 hours in 40°F weather with wet shoes.',
        mistakeToAvoid: 'Poor drop-bag organization during 8 to 24-hour ultra formats.'
      }
    }
  },
  {
    id: 'spartan-race',
    name: 'Spartan Race',
    tagline: 'The Gold Standard of Competitive Obstacle Sport',
    vibe: 'Sport & Competition',
    difficulty: 'Demanding',
    timingStyle: 'Mandatory Chip Timing',
    penaltySystem: 'Strict Penalties: 30 Burpees or 200m Penalty Loop per failure',
    teamworkRequired: 'Strictly Individual',
    signatureObstacles: [
      'The Spear Throw (Hay bale target from 25 feet)',
      'Multi-Rig (Rings, ropes, baseballs, and pipes over mud)',
      '8-Foot Wall (Unassisted wooden wall climb)',
      'Bucket Carry & Sandbag Carry (50-70lb steep uphill grind)'
    ],
    bestFor: {
      beginner: 'Spartan Sprint (5K) is the ultimate rite of passage for dedicated new racers.',
      intermediate: 'Spartan Super (10K) and Trifecta (Sprint + Super + Beast in one year).',
      experienced: 'Age Group heats (competing for regional rankings and championship qualification).',
      athlete: 'Pro Elite division and Spartan World Championships.'
    },
    overview: 'Spartan Race is a legitimate athletic sport. Every heat is chip-timed, rankings are posted publicly, and missing an obstacle carries strict penalties (either 30 chest-to-ground burpees or a heavy penalty carry loop). There is no helping allowed in competitive heats.',
    pros: [
      'The most respected global OCR brand with clear standards and age-group rankings.',
      'Trifecta Medal system provides clear year-long goal progression (Sprint + Super + Beast).',
      'Demands total-body athletic development (grip, endurance, heavy strength).',
      'Exceptional mountain venues (Killington VT, Lake Tahoe, Big Bear).'
    ],
    cons: [
      'High penalty consequence: 3-4 missed obstacles adds 90-120 burpees to your legs.',
      'Intimidating for first-timers who dislike strict competition.',
      'Heavy elevation and mountain ski slopes can be brutal on joints.'
    ],
    trainingRoadmap: {
      beginner: {
        focus: 'Grip endurance (60s dead hang) + 5K continuous trail jogging + 30 burpees pacing.',
        weeklyRhythm: '3-4 days/week (2 trail runs, 2 grip/pull-up & burpee workouts).',
        keyDrill: 'Active bar dead hangs (4 sets of max hold) + 30 burpees for time test once weekly.',
        mistakeToAvoid: 'Death-gripping the multi-rig bars. Learn to relax between transitions.'
      },
      intermediate: {
        focus: 'Zone 2 mountain hiking + 8-foot wall heel-hook technique + compromised carries.',
        weeklyRhythm: '4-5 days/week (One 6-8 mile long run, two strength/carry days, one compromised WOD).',
        keyDrill: 'Sandbag carry 100m + 400m run + 15 pull-ups (repeat 4 rounds).',
        mistakeToAvoid: 'Rushing the Spear Throw. Clear the cord, find the balance point, throw like a dart.'
      },
      experienced: {
        focus: 'High lactate threshold running + unbroken multi-rig transitions + 2,500ft weekly vert.',
        weeklyRhythm: '5-6 days/week (Split: 20-30 miles running + 3 dedicated grip & heavy carry sessions).',
        keyDrill: 'Compromised mile repeats: 800m fast run + 60lb bucket carry + 20 burpees.',
        mistakeToAvoid: 'Neglecting sodium and electrolyte timing on races longer than 90 minutes.'
      },
      athlete: {
        focus: 'Podium pacing: sub-6:00 trail pace, zero penalties, elite mountain power-hiking.',
        weeklyRhythm: '6-7 days/week (Periodized macrocycles, double sessions, altitude training).',
        keyDrill: 'Ski slope repeats @ 15% incline + heavy carry simulation at 175 BPM.',
        mistakeToAvoid: 'Overtraining during the 14 days before race day. Follow a strict 50% taper.'
      }
    }
  },
  {
    id: 'savage-race',
    name: 'Savage Race',
    tagline: 'The King of Technical Upper-Body Rigs & Obstacle Innovation',
    vibe: 'Technical Ninja',
    difficulty: 'Demanding',
    timingStyle: 'Optional Chip Timing',
    penaltySystem: 'SavagePRO: Fail 1 obstacle = Lose your medal band',
    teamworkRequired: 'Optional / Solo-friendly',
    signatureObstacles: [
      'Colossus (43-ft tall slide and mega curved wall with ropes)',
      'Twirly Bird & Savage Rig (Complex rotating ninja pipe grips and rings)',
      'Battering Ram (Heavy log chest-to-shoulder carry)',
      'Davy Jones Locker (15-ft high platform dive into water)'
    ],
    bestFor: {
      beginner: 'Savage Blitz (3 Miles) in Open waves (helping allowed and fun).',
      intermediate: 'Great for athletes who love ninja obstacles and want to test their grip.',
      experienced: 'SavagePRO division (must complete 100% of obstacles to keep the PRO band).',
      athlete: 'Elite ninja OCR specialists and grip champions.'
    },
    overview: 'Savage Race is celebrated for having the best obstacle engineering in the industry. Rather than grinding you down with 20 miles of trail running, Savage focuses on 5 to 7 miles packed with innovative, technical upper-body obstacles that look straight out of American Ninja Warrior.',
    pros: [
      'Most innovative and well-built obstacles in the sport (Colossus, Twirly Bird).',
      'The SavagePRO "Keep Your Band" format is pure, honest competition.',
      'Shorter 3-mile Blitz option makes technical obstacles accessible to newer athletes.',
      'Excellent balance of fun festival vibes and intense obstacle difficulty.'
    ],
    cons: [
      'Very high upper-body grip requirement (high failure rate for athletes without pull-ups).',
      'Fewer international venues compared to Spartan.',
      'Cold water jumps can be intimidating for weak swimmers.'
    ],
    trainingRoadmap: {
      beginner: {
        focus: 'Bodyweight hanging endurance + overcoming heights and water.',
        weeklyRhythm: '3 days/week (Two 3-mile easy runs + one calisthenics pull/push session).',
        keyDrill: 'Bar hangs, box jumps, and assisted pull-up machine.',
        mistakeToAvoid: 'Wearing cotton socks or loose shoes for the muddy water pit crossings.'
      },
      intermediate: {
        focus: 'Ninja transitions (moving from ring to bar to ball) + lock-off endurance.',
        weeklyRhythm: '4 days/week (Two 4-5 mile runs + two ninja gym or rock climbing sessions).',
        keyDrill: 'Frenchies: Pull-up with 5-second isometric hold at top, 90 degrees, and bottom.',
        mistakeToAvoid: 'Letting your body swing uncontrollably on rotating rig obstacles.'
      },
      experienced: {
        focus: 'Unbroken grip retention under wet conditions (PRO band defense).',
        weeklyRhythm: '5 days/week (Bouldering/climbing + high-cadence trail running).',
        keyDrill: 'Offset grip transitions: Fat bar to ring to rope without touching the deck.',
        mistakeToAvoid: 'Attempting SavagePRO without testing your bent-arm lock-off on slick metal.'
      },
      athlete: {
        focus: '100% first-attempt completion rate at top threshold speed.',
        weeklyRhythm: '5-6 days/week (Ninja gym rig mastery + 5K speed engine).',
        keyDrill: 'Simulated Colossus sprint + 2-minute dead hang with 25lb weight vest.',
        mistakeToAvoid: 'Over-gripping early obstacles and accumulating forearm pump before the main rig.'
      }
    }
  }
];

export const RACE_COMPARISON_MATRIX = [
  {
    feature: 'Primary Event Vibe',
    rugged: 'Casual 5K Fun Run & Party',
    mudder: 'Teamwork & Mental Resilience',
    spartan: 'Competitive Athletic Sport',
    savage: 'Technical Ninja & High Agility'
  },
  {
    feature: 'Distances Offered',
    rugged: '5K (3.1 Miles)',
    mudder: '5K, 10K+, Infinity, 24-Hour WTM',
    spartan: 'Sprint (5K), Super (10K), Beast (21K), Ultra (50K)',
    savage: 'Blitz (3 Miles), Standard (6 Miles)'
  },
  {
    feature: 'Penalty for Missing Obstacle',
    rugged: 'None (Walk around freely)',
    mudder: 'None (Team helps you or bypass)',
    spartan: '30 Burpees or 200m Penalty Lap',
    savage: 'SavagePRO: Cut/Lose Wristband'
  },
  {
    feature: 'Official Chip Timing',
    rugged: 'Optional in early waves',
    mudder: 'Untimed in Classic; Timed in Ultra',
    spartan: 'Mandatory across all waves',
    savage: 'Timed in PRO; Optional in Open'
  },
  {
    feature: 'Upper Body Grip Demand',
    rugged: 'Low (Accessible monkey bars/cargo)',
    mudder: 'Moderate (Everest, Funky Monkey)',
    spartan: 'Very High (Multi-Rig, Twister, Beater)',
    savage: 'Extreme (Ninja wheels, pipes, ropes)'
  },
  {
    feature: 'Teamwork Needed',
    rugged: 'Not required (Easy solo)',
    mudder: 'Crucial (Impossible solo on Everest)',
    spartan: 'Forbidden in Competitive Heats',
    savage: 'Optional in Open; Solo in PRO'
  },
  {
    feature: 'Best Starting Division',
    rugged: 'Any Wave (Very welcoming)',
    mudder: 'Open Waves with friends',
    spartan: 'Morning Open Wave (Sprint)',
    savage: 'Afternoon Blitz Open Wave'
  }
];
