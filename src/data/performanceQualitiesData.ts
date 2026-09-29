export interface SubQualityItem {
  id: string;
  name: string;
  whyItMatters: string;
  typicalRaceDemands: string;
  testProtocol: string;
  proDrill: string;
  defaultScore: number; // 0-100
}

export interface DomainSection {
  id: string;
  domainNumber: number;
  title: string;
  tagline: string;
  categorySlug: string;
  whyItMattersSynopsis: string;
  qualities: SubQualityItem[];
}

export interface PerformanceQuality extends SubQualityItem {
  domainId: string;
  domainNumber: number;
  domainTitle: string;
}

export const MAJOR_OCR_DOMAINS: DomainSection[] = [
  // 1. Aerobic Endurance & Cardiovascular Fitness
  {
    id: 'aerobic-endurance',
    domainNumber: 1,
    title: 'Aerobic Endurance & Cardiovascular Fitness',
    tagline: 'The physiological foundation that dictates sustained pace and recovery kinetics between high-heart-rate obstacles.',
    categorySlug: 'aerobic',
    whyItMattersSynopsis: "Aerobic fitness provides the primary engine that powers continuous movement between obstacles and accelerates recovery after intense efforts. Because running covers the vast majority of any OCR course, a well-conditioned cardiovascular system lets you maintain a steady pace across miles of challenging terrain. Weak aerobic capacity causes early exhaustion, forcing you to walk runnable sections and tackle technical obstacles with elevated heart rates and diminished focus.",
    qualities: [
      {
        id: 'vo2max',
        name: 'Aerobic capacity / VO₂max',
        whyItMatters: 'Sets the ceiling for sustained endurance work and recovery between hard efforts',
        typicalRaceDemands: 'Running, hills, repeated obstacles, long races',
        testProtocol: '12-Minute Cooper Run Test (>2,800m is competitive, >3,200m is elite) or Lab VO₂max (>55 ml/kg/min)',
        proDrill: '4 x 4-minute intervals @ 92-95% Max HR with 3-minute active recovery jogs',
        defaultScore: 82
      },
      {
        id: 'aerobic-endurance-base',
        name: 'Aerobic endurance',
        whyItMatters: 'Lets you maintain work for 30 minutes to many hours',
        typicalRaceDemands: 'Sprint through Ultra-distance OCR',
        testProtocol: '90-minute continuous trail run at conversational Zone 2 nasal pace with cardiac drift < 5%',
        proDrill: 'Weekly long trail run: 90-180 mins strictly in Zone 2 (65-75% max HR)',
        defaultScore: 80
      },
      {
        id: 'lactate-threshold',
        name: 'Lactate threshold',
        whyItMatters: 'Determines how fast you can run without accumulating unsustainable fatigue',
        typicalRaceDemands: 'Fast trail running, hills, sustained race pace',
        testProtocol: '30-minute functional threshold test (average heart rate and pace across final 20 minutes)',
        proDrill: '3 x 10 minutes @ Lactate Threshold (Zone 4) with 2 minutes rest on rolling trail terrain',
        defaultScore: 76
      },
      {
        id: 'running-economy',
        name: 'Running economy',
        whyItMatters: 'Reduces oxygen/energy cost at a given speed',
        typicalRaceDemands: 'Entire running portion of the race',
        testProtocol: 'Submaximal oxygen uptake check at 7:30 min/mile pace or 180+ SPM cadence audit',
        proDrill: 'Hill bounding + plyometric ankle hops (3 x 20) + 6 x 100m barefoot grass strides @ 185 SPM',
        defaultScore: 74
      },
      {
        id: 'recovery-kinetics',
        name: 'Recovery kinetics',
        whyItMatters: 'Faster recovery lets you resume pace after hard efforts',
        typicalRaceDemands: 'After carries, climbs and obstacles',
        testProtocol: 'Heart rate recovery (HRR) drop in 60 seconds post-obstacle effort (> 30 BPM drop is elite)',
        proDrill: 'High-intensity interval spikes followed by active nasal-breathing recovery walk',
        defaultScore: 75
      },
      {
        id: 'respiratory-muscle-endurance',
        name: 'Respiratory muscle endurance',
        whyItMatters: 'Helps maintain ventilation during prolonged high effort',
        typicalRaceDemands: 'Running and climbing under severe cardiovascular strain',
        testProtocol: 'Max voluntary ventilation spirometry or sustained high-ventilation rowing test',
        proDrill: 'Inspiratory muscle training (Powerbreathe) 30 breaths twice daily + nasal running drills',
        defaultScore: 70
      },
      {
        id: 'prolonged-fatigue-resistance',
        name: 'Fatigue resistance during prolonged exercise',
        whyItMatters: 'Maintains running and climbing speed deep into multi-hour mountain events',
        typicalRaceDemands: 'Beast and Ultra distances (Miles 8 to 30)',
        testProtocol: 'Time-to-exhaustion test at 80% threshold pace after 90 minutes of baseline running',
        proDrill: 'Back-to-back weekend long efforts: 2 hours trail run Saturday + 90 mins heavy rucking Sunday',
        defaultScore: 72
      }
    ]
  },

  // 2. Running, Trail & Terrain Performance
  {
    id: 'running-trail-terrain',
    domainNumber: 2,
    title: 'Running, Trail & Terrain Performance',
    tagline: 'Translating raw aerobic power into rapid, surefooted displacement over mud, roots, scree, and technical vert.',
    categorySlug: 'trail',
    whyItMattersSynopsis: "Trail and terrain running efficiency allows you to navigate mud, uneven rocks, slick roots, and steep elevation changes without wasting energy. OCR courses rarely follow smooth pavement, demanding agility and confident footwork on ascents and descents. Developing terrain adaptability preserves leg strength and prevents tripping, whereas poor trail competence forces hesitation, slows your overall pace, and drastically increases ankle roll and fall risks.",
    qualities: [
      {
        id: 'road-running-ability',
        name: 'Road running ability',
        whyItMatters: 'Provides foundational leg turnover and flat-speed benchmark capacity',
        typicalRaceDemands: 'Stadium sprints, flat course connectors, fire roads',
        testProtocol: 'Flat 5K / 10K time trial on track or asphalt',
        proDrill: 'Track tempo repeats: 5 x 1,000m @ 5K pace with 90s jog recovery',
        defaultScore: 84
      },
      {
        id: 'trail-running-ability',
        name: 'Trail-running ability',
        whyItMatters: 'Road speed does not fully transfer to irregular terrain',
        typicalRaceDemands: 'Rocks, roots, mud, grass, uneven surfaces',
        testProtocol: '5K technical trail time compared to flat road 5K (target: trail within 15% of road)',
        proDrill: 'Off-camber single-track intervals: 6 x 800m alternating uneven ascents and root descents',
        defaultScore: 79
      },
      {
        id: 'uphill-running-capacity',
        name: 'Uphill running capacity',
        whyItMatters: 'OCR races frequently include steep climbs',
        typicalRaceDemands: 'Mountain courses, repeated hills',
        testProtocol: 'Vertical kilometer time trial or 1-mile 10% grade hill run for time',
        proDrill: 'Hill repeats: 8 x 60-second climbs @ 12-15% grade with jog-down recoveries',
        defaultScore: 75
      },
      {
        id: 'power-hiking-ability',
        name: 'Power hiking',
        whyItMatters: 'Efficient hiking can outperform slow running on very steep grades',
        typicalRaceDemands: 'Beast/Ultra and mountain races',
        testProtocol: 'Treadmill 20-25% grade hike at 3.5 mph for 20 minutes',
        proDrill: 'Hands-on-thighs power hike repeats on 20%+ ski slopes or incline treadmill with 20lb vest',
        defaultScore: 78
      },
      {
        id: 'downhill-running-ability',
        name: 'Downhill running ability',
        whyItMatters: 'Strong downhill runners gain massive time with lower cardiovascular strain',
        typicalRaceDemands: 'Steep descents, ski slopes',
        testProtocol: '1-mile technical descent trial with quad fatigue assessment',
        proDrill: 'Controlled technical descents focusing on forward lean, high cadence (190 SPM), and soft midfoot landings',
        defaultScore: 71
      },
      {
        id: 'technical-terrain-ability',
        name: 'Technical-terrain ability',
        whyItMatters: 'Irregular foot placement, mud, and wet rocks demand rapid balance and micro-adjustments',
        typicalRaceDemands: 'Mountain races, creek beds, wet clay courses',
        testProtocol: 'Technical rock garden / boulder hop agility course for time',
        proDrill: 'Blind-corner single-track bounding and rapid foot-strike obstacle runs',
        defaultScore: 73
      },
      {
        id: 'vertical-speed',
        name: 'Vertical speed',
        whyItMatters: 'Rate of elevation gain (VAM) determines mountain race standing',
        typicalRaceDemands: 'Mountain championship venues (Killington, Tahoe, Palmerton)',
        testProtocol: 'VAM test: Vertical ascent meters per hour on sustained 15%+ climb (>800 VAM is elite)',
        proDrill: 'Incline stair climber or ski mountain intervals: 4 x 500ft vertical climb for time',
        defaultScore: 74
      },
      {
        id: 'foot-ankle-stiffness',
        name: 'Foot/ankle stiffness',
        whyItMatters: 'Elastic recoil efficiency over rocks, roots, and uneven trails',
        typicalRaceDemands: 'Mud runs, creek crossings, unstable single-track',
        testProtocol: 'Reactive Strength Index (RSI) drop jump test (>2.0 is elite)',
        proDrill: 'Barefoot grass pogo hops (4 x 30 reps) + single-leg eccentric calf drops on step',
        defaultScore: 77
      },
      {
        id: 'terrain-adaptability',
        name: 'Terrain adaptability',
        whyItMatters: 'Fluid gait transitions when shifting from dry rock to deep thick mud, grass, or loose scree',
        typicalRaceDemands: 'Unpredictable venue transitions and deep mud pits',
        testProtocol: 'Mixed surface shuttle: 100m asphalt to 100m deep mud to 100m steep grass',
        proDrill: 'Multi-surface continuous tempo run alternating road, sand pit, and wet turf',
        defaultScore: 75
      }
    ]
  },

  // 3. Anaerobic Capacity & High-Intensity Performance
  {
    id: 'anaerobic-capacity',
    domainNumber: 3,
    title: 'Anaerobic Capacity & High-Intensity Performance',
    tagline: 'Surge tolerance, rapid glycolytic power, and buffering high acidosis when charging hills and obstacles.',
    categorySlug: 'anaerobic',
    whyItMattersSynopsis: "Anaerobic power enables you to surge up short, punishing hills, sprint past competitors, and conquer explosive obstacles without grinding to a complete halt. OCR frequently demands sudden spikes in effort that exceed your aerobic comfort zone. Expanding this capacity trains your body to clear metabolic waste faster, preventing the sudden 'brick wall' feeling that leaves your legs leaden and your lungs gasping for air.",
    qualities: [
      {
        id: 'anaerobic-capacity-glycolytic',
        name: 'Anaerobic capacity',
        whyItMatters: 'Allows short-term efforts above threshold without immediate exhaustion',
        typicalRaceDemands: 'Steep climbs, heavy carries, sprint finishes',
        testProtocol: '30-second Wingate test or 300m shuttle run test for time',
        proDrill: '6 x 45-second all-out hill sprints with 2-minute active walking recoveries',
        defaultScore: 79
      },
      {
        id: 'anaerobic-power',
        name: 'Anaerobic power',
        whyItMatters: 'High peak wattage production for obstacle clearance and rapid accelerations',
        typicalRaceDemands: 'Wall vaults, short punchy climbs, starting sprint',
        testProtocol: 'Peak 5-second sprint power on air bike (Assault/Echo Bike > 800W)',
        proDrill: '10-second max effort air bike sprints x 8 with 50s rest',
        defaultScore: 81
      },
      {
        id: 'atp-pcr-power',
        name: 'ATP-PCr/phosphagen power',
        whyItMatters: 'Instant maximal energy without lactate generation for 3-10 second explosive bursts',
        typicalRaceDemands: 'Spear throw run-up, 8ft wall dyno, slip wall top grab',
        testProtocol: 'Standing broad jump + 3-rep max explosive box jump',
        proDrill: 'Contrast jump squats: 3 heavy back squats followed immediately by 3 maximal hurdle jumps',
        defaultScore: 84
      },
      {
        id: 'repeated-sprint-ability',
        name: 'Repeated high-intensity ability',
        whyItMatters: 'OCR requires repeated surges, not just one isolated effort',
        typicalRaceDemands: 'Short steep hills, obstacle transitions, penalty loops',
        testProtocol: 'Repeated Sprint Ability (RSA) test: 6 x 30m sprints every 30 seconds with decay calculation',
        proDrill: '10 x 100m sprint repeats @ 95% speed with 30-second standing rest',
        defaultScore: 77
      },
      {
        id: 'high-intensity-recovery',
        name: 'High-intensity recovery',
        whyItMatters: 'Clears metabolic byproducts quickly during brief downhill or flat running segments',
        typicalRaceDemands: 'Transitioning immediately from a heavy sandbag carry back into running',
        testProtocol: 'Lactate clearance rate: Blood lactate delta 3 minutes post-Wingate test',
        proDrill: 'Over-Under running intervals: 2 mins @ 105% LT pace followed by 2 mins @ 85% LT pace x 5 rounds',
        defaultScore: 75
      },
      {
        id: 'short-surge-tolerance',
        name: 'Ability to tolerate short surges above race pace',
        whyItMatters: 'Pass competitors on single-track bottlenecks without blowing up your heart rate',
        typicalRaceDemands: 'Passing zones before single-track trails and obstacle queues',
        testProtocol: '15-second surge every 3 minutes during a 30-minute threshold run without pace degradation',
        proDrill: 'Trail Fartlek: 45-minute trail run with 15 surges of 20 seconds at 95% effort',
        defaultScore: 78
      }
    ]
  },

  // 4. Maximal Strength & Relative Strength
  {
    id: 'maximal-relative-strength',
    domainNumber: 4,
    title: 'Maximal Strength & Relative Strength',
    tagline: 'High relative strength (strength-to-weight ratio) to hoist, haul, and manipulate your own bodyweight with zero penalty.',
    categorySlug: 'strength',
    whyItMattersSynopsis: "Relative and maximal strength provide the foundation for hoisting your bodyweight over eight-foot walls, scaling inverted obstacles, and hauling heavy objects. High strength levels make obstacles feel lighter relative to your total capacity, conserving critical energy across the race. When strength is inadequate, pulling yourself up a ledge or lifting a heavy atlas stone requires near-maximal strain, quickly inducing muscular failure and costly penalties.",
    qualities: [
      {
        id: 'lower-body-max-strength',
        name: 'Lower-body maximal strength',
        whyItMatters: 'Supports uphill running, jumping, carries and durability',
        typicalRaceDemands: 'Carries, climbs, jumps, injury prevention',
        testProtocol: '1RM Barbell Back Squat or Trap Bar Deadlift (>1.75x bodyweight is elite)',
        proDrill: 'Heavy 5x5 Barbell Back Squats @ 80-85% 1RM with 2.5-minute rest intervals',
        defaultScore: 80
      },
      {
        id: 'upper-body-pull-strength',
        name: 'Upper-body pull strength',
        whyItMatters: 'Essential for pulling yourself up and over obstacles',
        typicalRaceDemands: 'Walls, ropes, rigs, traverse',
        testProtocol: '1RM Weighted Pull-up (>35% bodyweight added for men, >20% for women)',
        proDrill: 'Weighted strict pull-ups: 5 sets of 3-5 reps with progressive overload',
        defaultScore: 83
      },
      {
        id: 'upper-body-push-strength',
        name: 'Upper-body push strength',
        whyItMatters: 'Helps topping walls, pressing out of obstacles, and crawls',
        typicalRaceDemands: 'Wall top-outs, burpees, crawling',
        testProtocol: '1RM Weighted Dip (>40% bodyweight added) or Max unbroken strict dips',
        proDrill: 'Barbell Overhead Press (4 x 6) + Ring Dips with slow eccentric control (4 x 8)',
        defaultScore: 78
      },
      {
        id: 'grip-strength-maximal',
        name: 'Grip strength',
        whyItMatters: 'High absolute grip strength prevents early forearm fatigue on heavy carries and rigs',
        typicalRaceDemands: 'Farmer carry, Hercules hoist, thick ropes',
        testProtocol: 'Handheld dynamometer max squeeze (>65kg for men, >42kg for women)',
        proDrill: 'Heavy dead hangs with weight belt + Captain of Crush gripper holds',
        defaultScore: 84
      },
      {
        id: 'relative-strength-ratio',
        name: 'Relative strength / strength-to-weight ratio',
        whyItMatters: 'Higher strength-to-weight ratio makes obstacle navigation effortless',
        typicalRaceDemands: 'All hanging and bodyweight-dependent obstacles',
        testProtocol: 'Combined Score: (1RM Squat + 1RM Deadlift + Weighted Pullup) divided by bodyweight',
        proDrill: 'Gymnastic lever progressions + calisthenic muscle-ups and weighted dips',
        defaultScore: 85
      },
      {
        id: 'posterior-chain-strength',
        name: 'Posterior-chain strength',
        whyItMatters: 'Generates uphill drive, protects lower back under heavy carry loads, and stabilizes knees',
        typicalRaceDemands: 'Steep hill climbs, deadlifting sandbags, dragging sleds',
        testProtocol: '1RM Romanian Deadlift or Barbell Hip Thrust (>2.0x bodyweight)',
        proDrill: 'Romanian Deadlifts (4 x 8) + Heavy Kettlebell Swings (5 x 20 reps @ 32kg)',
        defaultScore: 81
      },
      {
        id: 'unilateral-strength',
        name: 'Unilateral strength',
        whyItMatters: 'Running and obstacle bounding occur one leg at a time on uneven mountain grades',
        typicalRaceDemands: 'Single-leg step-ups, rock jumping, uneven loaded carries',
        testProtocol: 'Pistol squat (single-leg full squat) 5 unbroken reps per side',
        proDrill: 'Bulgarian split squats with dumbbells (4 x 8 per leg) + single-leg Romanian deadlifts',
        defaultScore: 79
      }
    ]
  },

  // 5. Grip, Hanging & Forearm Performance
  {
    id: 'grip-hanging-forearm',
    domainNumber: 5,
    title: 'Grip, Hanging & Forearm Performance',
    tagline: 'Crush, support, and pinch strength that remains infallible even when wet, muddy, or deeply exhausted.',
    categorySlug: 'grip',
    whyItMattersSynopsis: "Strong, fatigue-resistant grip helps you stay attached to ropes, rigs, monkey bars, carries, and other obstacles without your forearms becoming the limiting factor. OCR athletes often encounter several grip-intensive obstacles throughout a race, so grip must not only be strong but also recover quickly between obstacles. Better grip endurance can improve obstacle completion and reduce time lost from failed attempts.",
    qualities: [
      {
        id: 'support-grip-iso',
        name: 'Support grip',
        whyItMatters: 'Sustained isometric hanging from bars and horizontal rungs',
        typicalRaceDemands: 'Twister, monkey bars, horizontal multi-rig pipes',
        testProtocol: 'Max duration active dead hang with thumb-around grip (>90s is competitive, >120s elite)',
        proDrill: 'Fat-Grip bar dead hangs: 4 sets of 45-60 seconds with 60s rest',
        defaultScore: 83
      },
      {
        id: 'crush-grip-dynamic',
        name: 'Crush grip',
        whyItMatters: 'Squeezing handles, sandbag fabric, and heavy implement grips',
        typicalRaceDemands: 'Farmer handles, Hercules hoist rope, sandbag necks',
        testProtocol: 'Captain of Crush gripper rating test (CoC #1.5 or #2 close)',
        proDrill: 'Heavy dumbbell hex holds and gripper squeeze sets (4 x 10 reps per hand)',
        defaultScore: 80
      },
      {
        id: 'pinch-grip-blocks',
        name: 'Pinch grip',
        whyItMatters: 'Holding flat boards, canvas straps, and climbing block holds',
        typicalRaceDemands: 'Olympus wall blocks, canvas rig straps, wooden ledges',
        testProtocol: 'Two-handed 25lb dual smooth-side plate pinch hold for time (>30s)',
        proDrill: 'Pinch block farmer walks and finger-tip rim carries with Olympic plates',
        defaultScore: 77
      },
      {
        id: 'fatigue-resistance-grip',
        name: 'Fatigue resistance of grip',
        whyItMatters: 'Maintaining hanging strength when forearms are full of lactate from prior running and carries',
        typicalRaceDemands: 'Multi-rig late in the race after heavy sandbag carry',
        testProtocol: 'Hang time test immediately after 500m row sprint (target: retain 75%+ of fresh time)',
        proDrill: 'Compromised hang drill: 400m hard run + 45s bar hang x 4 rounds unbroken',
        defaultScore: 74
      },
      {
        id: 'cold-weather-grip',
        name: 'Cold-weather grip resilience',
        whyItMatters: 'Numb fingers lose tactile feedback and neural recruitment on freezing metal rungs',
        typicalRaceDemands: 'Early season mountain races and cold water submersions',
        testProtocol: 'Bar hang duration immediately after 2-minute ice water bucket hand immersion',
        proDrill: 'Ice water bucket immersion (60s) followed immediately by pull-ups and finger dexterity drills',
        defaultScore: 71
      },
      {
        id: 'wet-muddy-grip',
        name: 'Wet/muddy grip resilience',
        whyItMatters: 'Coefficients of friction drop dramatically when bars and hands are covered in wet silt',
        typicalRaceDemands: 'Rigs following mud pits, slip walls, rainy race days',
        testProtocol: 'Traverse 30ft rig with water and clay applied to hands and monkey bars',
        proDrill: 'Muddy rig training: Submerge hands in wet dirt and complete 5 pull-ups + 30s hang',
        defaultScore: 73
      },
      {
        id: 'hanging-endurance',
        name: 'Hanging endurance',
        whyItMatters: 'Fundamental prerequisite for waiting, re-gripping, and traversing complex obstacles',
        typicalRaceDemands: 'Long monkey bars, multi-rig transitions, rope resting positions',
        testProtocol: 'Cumulative 5 minutes of hanging accumulated in 7 minutes total clock time',
        proDrill: 'Daily greasing-the-groove: 60s hang 5 times spread throughout the training day',
        defaultScore: 86
      },
      {
        id: 'single-arm-hang',
        name: 'Single-arm hang ability',
        whyItMatters: 'Essential for reaching to the next hold, swinging, and shaking out the resting arm',
        typicalRaceDemands: 'Twister, monkey bars, gymnastic rings',
        testProtocol: 'Single-arm dead hang for max time (>30s per arm is elite)',
        proDrill: 'Single-arm bar hangs with active scapular engagement: 4 x 15-20s per side',
        defaultScore: 76
      },
      {
        id: 'lock-off-endurance',
        name: 'Lock-off endurance',
        whyItMatters: 'Holding 90-degree arm bend with one arm while reaching forward with the other',
        typicalRaceDemands: 'Rope climb ascents, ring transfers, Olympus wall',
        testProtocol: 'Single-arm 90-degree chin-up lock-off hold duration (>10s per arm)',
        proDrill: 'Frenchies: Pull-up with 5-second lock at top, 5-second lock at 90°, and 5-second lock at bottom',
        defaultScore: 77
      },
      {
        id: 'transition-grip-endurance',
        name: 'Transition grip endurance',
        whyItMatters: 'Switching dynamically between different hold geometries (bar to ball, ring to rope)',
        typicalRaceDemands: 'Spartan Multi-Rig, Tough Mudder Funky Monkey',
        testProtocol: 'Rig transition course: Ring to fat bar to baseball grip without dropping',
        proDrill: 'Mixed-implement rig traversal: Alternating ring, pipe, nunchuck, and cannonball holds',
        defaultScore: 79
      }
    ]
  },

  // 6. Loaded Carry Performance
  {
    id: 'loaded-carry-performance',
    domainNumber: 6,
    title: 'Loaded Carry Performance',
    tagline: 'Holding and transporting awkward external masses across steep mountain inclines without gait breakdown.',
    categorySlug: 'carries',
    whyItMattersSynopsis: "Loaded carry strength enables you to transport awkward sandbags, logs, and filled buckets across rugged, uphill loops without stopping. Carries test your whole body under sustained load, demanding brutal postural integrity and breathing control. Building carry stamina allows you to maintain momentum and transition back into running immediately, whereas weak carry endurance leads to repeated drops, lost minutes, and severe lower-back fatigue.",
    qualities: [
      {
        id: 'horizontal-carry-ability',
        name: 'Horizontal carry ability',
        whyItMatters: 'Moving at high speed on flat surfaces while supporting external ballast',
        typicalRaceDemands: 'Flat sandbag, bucket, and double farmer carries',
        testProtocol: '400m unbroken 60lb sandbag carry on flat track for time (<2:45)',
        proDrill: 'Tempo carry repeats: 4 x 200m sandbag carry @ 85% sprint pace with 90s rest',
        defaultScore: 82
      },
      {
        id: 'incline-mountain-carry',
        name: 'Incline/mountain carry ability',
        whyItMatters: 'Severe quad, glute, and lower back burn when carrying heavy loads up steep ski slopes',
        typicalRaceDemands: 'Killington or Palmerton steep mountain sandbag carry',
        testProtocol: '100m climb on 20% incline with 60lb sandbag without stopping',
        proDrill: 'Steep hill carries: 5 x 100m uphill sandbag carry + slow walk-down recovery',
        defaultScore: 75
      },
      {
        id: 'asymmetric-carry-tolerance',
        name: 'Asymmetric carry tolerance',
        whyItMatters: 'Unequal loads force unilateral spinal and oblique stabilization',
        typicalRaceDemands: 'Carrying a sandbag on one shoulder, single kettlebell suitcase carry',
        testProtocol: '50m suitcase carry with 50% bodyweight in one hand without lateral torso lean',
        proDrill: 'Suitcase carries (3 x 50m per side) + offset racked kettlebell walks',
        defaultScore: 78
      },
      {
        id: 'chest-carry-endurance',
        name: 'Chest carry endurance',
        whyItMatters: 'Compresses ribcage and restricts diaphragmatic breathing while working legs',
        typicalRaceDemands: 'Bear-hug sandbag carry, bucket brigade',
        testProtocol: '400m bear-hug carry with 75lb sandbag without dropping to knees',
        proDrill: 'Bear-hug Zercher marches: 4 sets of 90 seconds with heavy medicine ball or d-ball',
        defaultScore: 76
      },
      {
        id: 'shoulder-carry-endurance',
        name: 'Shoulder carry endurance',
        whyItMatters: 'Requires clavicle tolerance and unilateral balance over long distances',
        typicalRaceDemands: 'Log carries, heavy Spartan pancake carries',
        testProtocol: '800m continuous shoulder carry with 60lb pancake switching sides every 200m',
        proDrill: 'Heavy sandbag shoulder walk: 1,000m with alternating shoulder switches every 2 minutes',
        defaultScore: 80
      },
      {
        id: 'forearm-endurance-under-load',
        name: 'Forearm endurance under load',
        whyItMatters: 'Grip flexors cramp when holding farmer bars or bucket rims for minutes',
        typicalRaceDemands: 'Farmer carry, bucket brigade rim grip',
        testProtocol: 'Bucket hold with 60lb gravel for max duration (>90s unbroken)',
        proDrill: 'Bucket rim pinch holds + heavy farmer walks: 4 x 60m @ 80% bodyweight total',
        defaultScore: 74
      },
      {
        id: 'breathing-under-load',
        name: 'Breathing under load',
        whyItMatters: 'Maintaining tidal volume ventilation while thoracic cavity is heavily compressed',
        typicalRaceDemands: 'Bear-hug carries and heavy sandbags on chest',
        testProtocol: 'Nasal-only breathing during a 200m heavy sandbag carry',
        proDrill: 'Rhythm breathing carries: Inhale for 3 steps, exhale for 3 steps under 60lb bear-hug load',
        defaultScore: 72
      },
      {
        id: 'core-bracing-under-load',
        name: 'Core bracing under load',
        whyItMatters: 'Prevents lumbar hyperextension and spine shear forces during fatigue',
        typicalRaceDemands: 'Uneven footing on rocky descents during carry loops',
        testProtocol: 'Standing Pallof hold under heavy band tension + 60s sandbag Zercher squat hold',
        proDrill: 'Heavy Zercher carries (4 x 40m) focusing on 360-degree abdominal brace',
        defaultScore: 77
      },
      {
        id: 'gait-efficiency-under-load',
        name: 'Gait efficiency under load',
        whyItMatters: 'Smooth hip-hinge and short quick stride prevents wasteful bobbing and energy leakage',
        typicalRaceDemands: 'Long carry loops in competitive heats',
        testProtocol: 'Stride cadence audit during carry (target: maintain 160+ steps/min)',
        proDrill: 'Quick-cadence loaded marches: 4 x 100m focusing on minimal vertical center-of-mass oscillation',
        defaultScore: 79
      },
      {
        id: 'pickup-and-setdown-mechanics',
        name: 'Pickup and set-down mechanics',
        whyItMatters: 'Safe hip-hinge mechanics prevent debilitating acute back tweaks when hoisting 100lb bags',
        typicalRaceDemands: 'Deadlifting heavy sandbags or logs off wet ground',
        testProtocol: '10 ground-to-shoulder sandbag cleans with flawless spinal posture',
        proDrill: 'Heavy sandbag clean-and-press from floor (5 x 5 reps @ 75-100lbs)',
        defaultScore: 83
      }
    ]
  },

  // 7. Muscular Endurance & Fatigue Resistance
  {
    id: 'muscular-endurance-fatigue',
    domainNumber: 7,
    title: 'Muscular Endurance & Fatigue Resistance',
    tagline: 'High rep capacity and resistance to local peripheral exhaustion when muscles burn with metabolic waste.',
    categorySlug: 'endurance',
    whyItMattersSynopsis: "Muscular endurance allows your legs, shoulders, and back to perform thousands of contractions over repeated hills, crawls, and obstacles without locking up. In longer races, localized muscle fatigue often hits before total cardiovascular exhaustion. High fatigue resistance keeps your movement mechanics clean and running stride efficient, while poor muscular endurance causes heavy, burning muscles that break down your form and force prolonged walking.",
    qualities: [
      {
        id: 'leg-muscular-endurance',
        name: 'Leg muscular endurance',
        whyItMatters: 'Prevents quad tremoring and calf seizing on long climbs and descent braking',
        typicalRaceDemands: 'Sustained mountain ascents and repeated squatting under walls',
        testProtocol: '2-minute max unbroken bodyweight squats or 3-minute wall sit hold',
        proDrill: '100 continuous walking lunges with 20lb vest + 50 jump squats',
        defaultScore: 79
      },
      {
        id: 'calf-achilles-endurance',
        name: 'Calf/Achilles endurance',
        whyItMatters: 'Endures thousands of uphill steps on forefoot without cramping or tendonitis',
        typicalRaceDemands: 'Steep hill climbs and rocky scree running',
        testProtocol: 'Single-leg calf raises to fatigue (>35 unbroken reps per leg)',
        proDrill: 'Stair climbs on tiptoes with 30lb ruck + eccentric heel drop sets (3 x 25)',
        defaultScore: 76
      },
      {
        id: 'upper-body-pull-endurance',
        name: 'Upper-body pull endurance',
        whyItMatters: 'Repeated pulling across multiple obstacles without blowing out lats and biceps',
        typicalRaceDemands: 'Multiple consecutive rigs, rope climbs, and wall hoists',
        testProtocol: 'Max unbroken strict pull-ups (>20 reps is elite, >12 competitive)',
        proDrill: 'Pull-up density ladder: 1-2-3-4-5 reps every minute on the minute for 15 minutes',
        defaultScore: 81
      },
      {
        id: 'upper-body-push-endurance',
        name: 'Upper-body push endurance',
        whyItMatters: 'Surviving dozens of penalty burpees and wall press-outs without tricep failure',
        typicalRaceDemands: 'Burpee penalty loops and obstacle top-outs',
        testProtocol: '2-minute max push-up test (>60 reps for men, >40 for women)',
        proDrill: 'Push-up / Dip supersets: 20 push-ups + 10 dips every 90 seconds for 5 rounds',
        defaultScore: 80
      },
      {
        id: 'grip-endurance-lactate',
        name: 'Grip endurance under lactate accumulation',
        whyItMatters: 'Holding obstacles when systemic blood lactate is 8-12 mmol/L',
        typicalRaceDemands: 'Rig placed right after an 800m uphill sprint',
        testProtocol: 'Sprint 400m all-out then immediately hang on pull-up bar (>60s hang is elite)',
        proDrill: 'Compromised hang ladders: 300m hard run + 30s hang + 5 pull-ups x 4 sets',
        defaultScore: 73
      },
      {
        id: 'core-endurance',
        name: 'Core endurance',
        whyItMatters: 'Maintains spinal posture and prevents fatigue-induced lower back spasm',
        typicalRaceDemands: 'Continuous crawling, rucking, carrying, and running',
        testProtocol: 'McGill 3-test battery: Plank (>120s), Side Plank (>90s/side), Sorensen extension (>120s)',
        proDrill: 'Hollow body rock holds (4 x 45s) + RKC hardstyle planks with active glute drive',
        defaultScore: 82
      },
      {
        id: 'obstacle-fatigue-resistance',
        name: 'Obstacle fatigue resistance',
        whyItMatters: 'Clearing obstacle #25 with the same high success rate as obstacle #1',
        typicalRaceDemands: 'Late-race rigs in Beast and Ultra events',
        testProtocol: 'Obstacle proficiency test executed at end of a 2-hour trail run',
        proDrill: 'Fatigued obstacle simulation: 10 miles trail run followed immediately by 15 obstacle attempts',
        defaultScore: 75
      },
      {
        id: 'post-obstacle-running-endurance',
        name: 'Post-obstacle running endurance',
        whyItMatters: 'Resuming race pace immediately upon obstacle exit without walking or pausing',
        typicalRaceDemands: 'Exiting sandbag carry or multi-rig directly into a run',
        testProtocol: 'Speed check: Pace across the first 200m post-obstacle compared to baseline pace',
        proDrill: 'Transition runs: 50 burpees immediately followed by 1-mile tempo run at 10K pace',
        defaultScore: 74
      },
      {
        id: 'burpee-penalty-endurance',
        name: 'Burpee / penalty endurance',
        whyItMatters: 'Minimizing time lost and physiological cost if an obstacle is failed',
        typicalRaceDemands: 'Spartan 30-burpee penalty loops',
        testProtocol: '30 Spartan chest-to-ground burpees for time (<1:40 is elite)',
        proDrill: 'Burpee intervals: 3 rounds of 30 burpees for time with 2-minute active recovery walk',
        defaultScore: 83
      }
    ]
  },

  // 8. Power, Explosiveness & Speed
  {
    id: 'power-explosiveness-speed',
    domainNumber: 8,
    title: 'Power, Explosiveness & Speed',
    tagline: 'Instant kinetic impulse to jump, launch, dyno, cut, and sprint through passing zones.',
    categorySlug: 'power',
    whyItMattersSynopsis: "Explosive power and speed let you bound across ditches, vault over hurdles, jump high onto slick walls, and surge into obstacle transitions. Quick, forceful movements save precious seconds and reduce the upper-body pulling effort required at high barriers. Lacking explosive power turns simple hurdles into exhausting struggles, forcing you to slow down, search for footing, or repeatedly fail barrier leaps.",
    qualities: [
      {
        id: 'lower-body-explosive-power',
        name: 'Lower-body explosive power',
        whyItMatters: 'Propelling your hips high onto 8ft walls and jumping across creek beds',
        typicalRaceDemands: 'Wall vaults, inverted walls, ditch jumping',
        testProtocol: 'Vertical Jump Test (>24 inches is competitive, >28 inches elite)',
        proDrill: 'Depth jumps from 20" box into immediate vertical jump (4 x 5 reps)',
        defaultScore: 80
      },
      {
        id: 'upper-body-explosive-pulling',
        name: 'Upper-body explosive pulling power',
        whyItMatters: 'Dynamic chest-to-bar pull speed to reach next high hold or vault wall top',
        typicalRaceDemands: 'Dyno on rigs, high rope reaches, rapid wall top-outs',
        testProtocol: 'Power pull-up test: Pull chest to waist level on bar or explosive muscle-up reps',
        proDrill: 'Explosive clapping pull-ups and high band-assisted power pulls (5 x 3 reps)',
        defaultScore: 77
      },
      {
        id: 'obstacle-pop-jump',
        name: 'Obstacle pop / jump-to-grab ability',
        whyItMatters: 'Jumping from uneven, slippery ground to grab a high bar or first ring',
        typicalRaceDemands: 'High monkey bars, rig entry hold, slip wall top rope grab',
        testProtocol: 'Approach run jump-and-grab to bar positioned 36 inches above standing reach',
        proDrill: 'Approach run-and-dyno practice onto gymnastic rings and high ledges (4 x 6 reps)',
        defaultScore: 81
      },
      {
        id: 'sprint-speed',
        name: 'Sprint speed',
        whyItMatters: 'High top speed ensures optimal positioning into early single-track bottlenecks',
        typicalRaceDemands: 'Start line sprint, passing lanes, finishing chutes',
        testProtocol: '100m flat sprint time trial (<12.5s is elite)',
        proDrill: 'Flying 30m sprint repeats with full 3-minute walking recoveries (6 reps)',
        defaultScore: 78
      },
      {
        id: 'short-surge-ability',
        name: 'Short surge ability',
        whyItMatters: 'Rapid acceleration to bridge gaps between competitors on open trail stretches',
        typicalRaceDemands: 'Overtaking on downhill fire roads and obstacle entries',
        testProtocol: '10-second sprint wattage spike during 5K tempo pace',
        proDrill: 'Surge intervals: 3 miles tempo with 10-second max sprints every 400m',
        defaultScore: 76
      },
      {
        id: 'deceleration-ability',
        name: 'Deceleration ability',
        whyItMatters: 'Absorbing eccentric forces safely when dropping off 8ft walls or slowing before turns',
        typicalRaceDemands: 'Wall drops, steep downhill corners, obstacle landing pads',
        testProtocol: '10m sprint to immediate dead stop within 2 meters with stable knee alignment',
        proDrill: 'Sprint-and-stick deceleration drills: 20m sprint into single-leg landing hold (4 x 4 per side)',
        defaultScore: 75
      },
      {
        id: 'change-of-direction-agility',
        name: 'Change of direction / agility',
        whyItMatters: 'Navigating sharp switchbacks, trail obstacles, and crowded obstacle arenas',
        typicalRaceDemands: 'Twisting single-track, switchback climbs, obstacle zig-zags',
        testProtocol: '5-10-5 Pro Agility shuttle test (<4.5s is elite)',
        proDrill: 'Cone T-Drill agility runs (4 sets) + reactive partner mirror drills',
        defaultScore: 79
      },
      {
        id: 'plyometric-reactivity',
        name: 'Plyometric reactivity',
        whyItMatters: 'Fast ground contact time (<200ms) that converts elastic energy without muscle strain',
        typicalRaceDemands: 'Fast boulder hopping and downhill trail bounding',
        testProtocol: 'Drop jump contact time and Reactive Strength Index (RSI) screening',
        proDrill: 'Low-amplitude hurdle hops (4 x 10 continuous) focusing on minimal ground contact',
        defaultScore: 76
      }
    ]
  },

  // 9. Core, Stability & Force Transfer
  {
    id: 'core-stability-force-transfer',
    domainNumber: 9,
    title: 'Core, Stability & Force Transfer',
    tagline: 'The central kinetic nexus that prevents energy loss between limb drive, spinal protection, and grip force.',
    categorySlug: 'core',
    whyItMattersSynopsis: "A rock-solid trunk links your upper and lower body, transferring power seamlessly during heavy carries, wall climbs, balance beams, and barbed-wire crawls. Your core stabilizes your spine over uneven ground, preventing energy leaks with every stride. Weak stability leads to sloppy mechanics, excessive torso sway on trails, lost balance on narrow obstacles, and rapid lower-back breakdown under heavy loads.",
    qualities: [
      {
        id: 'anti-extension-core',
        name: 'Anti-extension core strength',
        whyItMatters: 'Prevents spinal hyperextension when hanging, crawling, or carrying front loads',
        typicalRaceDemands: 'Monkey bars, bear-hug sandbag carries, barbed-wire low crawls',
        testProtocol: 'Ab wheel rollout from toes with full extension hold (>5 clean reps)',
        proDrill: 'Standing ab wheel rollouts (3 x 5) + long-lever plank holds (4 x 45s)',
        defaultScore: 81
      },
      {
        id: 'anti-rotation-core',
        name: 'Anti-rotation core strength',
        whyItMatters: 'Resists torsional twisting when carrying asymmetric loads or swinging on rigs',
        typicalRaceDemands: 'Single-arm hangs, offset sandbag carries, Hercules hoist',
        testProtocol: 'Standing cable Pallof press hold with 35% bodyweight for 30s per side',
        proDrill: 'Half-kneeling cable chops and lifts (4 x 10 per side) + suitcase carries',
        defaultScore: 78
      },
      {
        id: 'lateral-core-stability',
        name: 'Lateral core stability',
        whyItMatters: 'Keeps pelvis level when running on side-slopes and carrying loads on one side',
        typicalRaceDemands: 'Off-camber mountain traverses and single-sided carries',
        testProtocol: 'Elevated feet side plank hold duration (>75s per side)',
        proDrill: 'Side plank with hip abduction (3 x 12 per side) + heavy kettlebell suitcase marches',
        defaultScore: 77
      },
      {
        id: 'hip-pelvis-lumbar-stability',
        name: 'Hip-pelvis-lumbar stability',
        whyItMatters: 'Locks pelvis in neutral to transfer leg drive directly into uphill propulsion',
        typicalRaceDemands: 'Steep hill climbs and uneven boulder hopping',
        testProtocol: 'Single-leg Trendelenburg test (standing on one leg for 30s without pelvic drop)',
        proDrill: 'Banded monster walks (3 x 20) + single-leg glute bridges with 3-second hold',
        defaultScore: 82
      },
      {
        id: 'force-transfer-torso',
        name: 'Force transfer through the torso',
        whyItMatters: 'Channels kinetic energy from foot plant through hips and core to upper-body pull',
        typicalRaceDemands: 'Spear throw, wall clears, rope climbs, sled drags',
        testProtocol: 'Rotational medicine ball scoop toss distance with 12lb ball (>35 feet)',
        proDrill: 'Rotational med ball wall slams (4 x 8 per side) + heavy sled pushes',
        defaultScore: 79
      },
      {
        id: 'scapular-stability',
        name: 'Scapular stability',
        whyItMatters: 'Protects rotator cuffs and anchors shoulder blades during rigorous hanging and swinging',
        typicalRaceDemands: 'Multi-rig, twister, monkey bars, rope climbs',
        testProtocol: 'Active scapular pull-up hold (chest up, ears away from shoulders) for 60s',
        proDrill: 'Scapular pull-ups (4 x 12) + Prone Y-T-W shoulder raise series with light plates',
        defaultScore: 80
      },
      {
        id: 'shoulder-girdle-integrity',
        name: 'Shoulder girdle integrity',
        whyItMatters: 'Prevents shoulder subluxations or labrum tears under dynamic swinging loads',
        typicalRaceDemands: 'Twister, swinging rings, catching bar drops',
        testProtocol: 'Bottom-up kettlebell press stability test with 16kg bell',
        proDrill: 'Bottom-up kettlebell carries (3 x 40m per arm) + Indian club / macebell mobility swings',
        defaultScore: 78
      },
      {
        id: 'foot-ankle-complex-stability',
        name: 'Foot-ankle complex stability',
        whyItMatters: 'Resists lateral ankle roll on rocks and hidden roots beneath the mud',
        typicalRaceDemands: 'Rocky descents, mud trenches, off-trail mountain routes',
        testProtocol: 'Single-leg balance on balance pad with eyes closed (>30s without foot touchdown)',
        proDrill: 'Barefoot balance board drills + single-leg multi-directional cone taps (3 x 10)',
        defaultScore: 75
      },
      {
        id: 'knee-joint-durability',
        name: 'Knee joint durability under load',
        whyItMatters: 'Absorbs eccentric shear forces without patellar tendonitis or meniscus wear',
        typicalRaceDemands: 'Downhill mountain running and jumping off tall walls',
        testProtocol: 'Single-leg decline slant-board squat test (pain-free full depth)',
        proDrill: 'Poliquin step-ups on slant board (3 x 20 reps per leg) + Spanish squats with heavy band',
        defaultScore: 76
      }
    ]
  },

  // 10. Movement Skill, Coordination & Obstacle Ability
  {
    id: 'movement-skill-coordination',
    domainNumber: 10,
    title: 'Movement Skill, Coordination & Obstacle Ability',
    tagline: 'Flawless biomechanical execution, obstacle geometry mastery, and zero wasted motion across 20+ obstacles.',
    categorySlug: 'skills',
    whyItMattersSynopsis: "Obstacle skill and coordination turn brute physical effort into smooth, effortless movement across multi-rigs, high ropes, and balance structures. Mastering specific techniques—like foot hooks on ropes and momentum swinging on monkey bars—drastically cuts energy expenditure. Poor technique wastes massive amounts of physical stamina, turning straightforward obstacles into high-risk bottlenecks that frequently result in failed attempts, penalty loops, and disqualifications.",
    qualities: [
      {
        id: 'obstacle-navigation-efficiency',
        name: 'Obstacle navigation efficiency',
        whyItMatters: 'Saves hundreds of calories by choosing optimal geometric paths over obstacles',
        typicalRaceDemands: 'All 20-30 obstacles in standard Spartan and Tough Mudder races',
        testProtocol: 'Standardized 5-obstacle obstacle course time trial compared to fresh baseline',
        proDrill: 'Obstacle transition circuits: Moving between 4 obstacles with continuous flow and zero pauses',
        defaultScore: 84
      },
      {
        id: 'foot-placement-precision',
        name: 'Foot placement precision',
        whyItMatters: 'Landing squarely on stable surfaces prevents slips, rolled ankles, and falls',
        typicalRaceDemands: 'Technical scree, wet roots, Olympus wall pegs, balance beams',
        testProtocol: 'High-speed rock hopping agility course with zero misplaced foot strikes',
        proDrill: 'Technical trail sprint with deliberate micro-target foot strikes on painted markers',
        defaultScore: 80
      },
      {
        id: 'momentum-generation-swinging',
        name: 'Momentum generation / swinging efficiency',
        whyItMatters: 'Using hip kip and beat swings to glide effortlessly between holds without bicep burn',
        typicalRaceDemands: 'Gymnastic rings, multi-rig, monkey bars',
        testProtocol: 'Beat swing rhythm test: 10 continuous dynamic beat swings with smooth pendulum amplitude',
        proDrill: 'Hollow-to-arch gymnastics beat swings on bar (4 x 10 reps) + ring glide swings',
        defaultScore: 79
      },
      {
        id: 'wall-clearing-technique',
        name: 'Wall clearing technique',
        whyItMatters: 'Using foot hook, heel hook, or muscle-up technique to clear 6ft-8ft walls in 3 seconds',
        typicalRaceDemands: '6ft, 7ft, and 8ft wooden walls, slip walls, inverted walls',
        testProtocol: '8ft wall clear speed from approach run (<4 seconds without assistance)',
        proDrill: 'Wall vault repetitions: 5 sets of 3 rapid clears focusing on foot wall kick and hip snap',
        defaultScore: 83
      },
      {
        id: 'inverted-traverse-skill',
        name: 'Inverted/traverse obstacle skill',
        whyItMatters: 'Navigating obstacles angled back toward you without falling off holds',
        typicalRaceDemands: 'Inverted walls, Z-wall, Olympus wall',
        testProtocol: 'Z-wall traverse speed and completion rate across 5 consecutive attempts (target: 100%)',
        proDrill: 'Climbing wall traversing drills: 15 minutes of continuous low-foot traverse on angled gym walls',
        defaultScore: 78
      },
      {
        id: 'rope-climb-technique',
        name: 'Rope climb technique',
        whyItMatters: 'Using J-hook or S-hook clamp to bear 90% of weight through feet rather than arms',
        typicalRaceDemands: '16ft muddy rope climb before bell ring',
        testProtocol: 'Rope climb speed: Ground to 16ft bell ring in under 8 seconds using J-hook',
        proDrill: 'J-Hook clamp drills from standing: 10 rapid lock-outs + 3 full climbs focusing on high foot pinch',
        defaultScore: 86
      },
      {
        id: 'balance-beams-slacks',
        name: 'Balance on beams/slacks',
        whyItMatters: 'High completion rate on narrow beams prevents automatic penalty loops',
        typicalRaceDemands: 'Spartan balance beam, logs, muddy timber crossings',
        testProtocol: 'Walk across 30ft of 2-inch wide beam or slackline without touching ground (3/3 pass)',
        proDrill: 'Slackline walking 10 mins daily + single-leg balance reach drills on 2x4 wooden studs',
        defaultScore: 77
      },
      {
        id: 'crawl-mechanics',
        name: 'Crawl mechanics',
        whyItMatters: 'Low, rapid bear crawl or army crawl that avoids barbed wire without blowing out lower back',
        typicalRaceDemands: '100m barbed-wire crawls over mud and rocky dirt',
        testProtocol: '50m low bear crawl under 30" obstacle netting for time (<45 seconds)',
        proDrill: 'Bear crawl 50m forward + 50m backward + army crawl belly slide drills (3 sets)',
        defaultScore: 81
      },
      {
        id: 'vaulting-hurdle-efficiency',
        name: 'Vaulting / hurdle efficiency',
        whyItMatters: 'Clearing 3ft-4ft hurdles, logs, and hay bales without breaking running stride',
        typicalRaceDemands: 'Trail hurdles, fallen timber, hay bales, mud hurdles',
        testProtocol: '3 consecutive 40" hurdle clears in continuous run without stutter-stepping',
        proDrill: 'Parkour step vault and speed vault drills over gymnastics boxes (4 x 6 reps)',
        defaultScore: 82
      },
      {
        id: 'transition-efficiency-skill',
        name: 'Transition efficiency',
        whyItMatters: 'Losing zero seconds between running, mounting an obstacle, and running again',
        typicalRaceDemands: 'Every single obstacle approach and landing zone',
        testProtocol: 'Time delta between feet touching ground off obstacle and resuming baseline race pace (<3s)',
        proDrill: 'Drop-and-Go drill: Drop from bar hang directly into full stride running within 2 seconds',
        defaultScore: 78
      },
      {
        id: 'visual-scanning-trail',
        name: 'Visual scanning of trail/obstacles',
        whyItMatters: 'Scanning 15-20 feet ahead allows anticipatory line selection rather than reactive braking',
        typicalRaceDemands: 'High-speed technical descents and approaching crowded obstacles',
        testProtocol: 'Eye-tracking / obstacle cue recognition test during simulated fast trail running',
        proDrill: 'High-speed trail intervals with focus on focal point 5-7 strides ahead at all times',
        defaultScore: 80
      },
      {
        id: 'pacing-control-race-phases',
        name: 'Pacing control across race phases',
        whyItMatters: 'Preventing the fatal early surge that leads to blown grip and severe cramping in late miles',
        typicalRaceDemands: 'Pacing early miles of Super, Beast, and Ultra races',
        testProtocol: 'Split variance analysis: Second half of race pace within 5% of first half pace',
        proDrill: 'Negative-split trail simulation: 10 miles where miles 6-10 are 15 seconds/mile faster than 1-5',
        defaultScore: 75
      }
    ]
  },

  // 11. Mobility, Durability & Tissue Resilience
  {
    id: 'mobility-durability-tissue',
    domainNumber: 11,
    title: 'Mobility, Durability & Tissue Resilience',
    tagline: 'Armor plating for connective tissues, joints, and dermal skin against repetitive impact and abrasive shear.',
    categorySlug: 'durability',
    whyItMattersSynopsis: "Joint mobility and tissue resilience protect your tendons, ligaments, and joints from the high-impact pounding of steep downhill descents, deep crawls, and awkward landings. Healthy range of motion lets you slip under low obstacles and reach high footholds easily. Without adequate durability and mobility, repetitive course stress causes joint stiffness, connective tissue strain, acute injuries, and long-term breakdowns that derail your season.",
    qualities: [
      {
        id: 'ankle-dorsiflexion-mobility',
        name: 'Ankle dorsiflexion mobility',
        whyItMatters: 'Allows deep squatting over obstacles and steep uphill climbing without heel lift',
        typicalRaceDemands: 'Steep hill climbs, deep landings, crawling',
        testProtocol: 'Knee-to-wall test (>4.5 inches from wall with heel down)',
        proDrill: 'Banded ankle joint mobilizations (2 mins/side) + slant board calf stretches',
        defaultScore: 74
      },
      {
        id: 'hip-mobility-specific',
        name: 'Hip mobility',
        whyItMatters: 'High knee drive over walls and effortless hurdle clearance',
        typicalRaceDemands: 'High walls, crawling, stepping over fallen logs',
        testProtocol: 'Hip 90/90 active internal and external rotation clearance test',
        proDrill: '90/90 hip transitions with upright torso (3 x 10 per side) + frog stretch holds',
        defaultScore: 75
      },
      {
        id: 'thoracic-spine-mobility',
        name: 'Thoracic spine mobility',
        whyItMatters: 'Allows full overhead reach on rigs and prevents compensatory lower back arching',
        typicalRaceDemands: 'Overhead hanging obstacles, climbing, breathing expansion',
        testProtocol: 'Seated thoracic rotation test (>45 degrees bilaterally)',
        proDrill: 'Open book stretches + foam roller thoracic extensions with bench t-spine stretch (3 x 10)',
        defaultScore: 73
      },
      {
        id: 'shoulder-mobility-specific',
        name: 'Shoulder mobility',
        whyItMatters: 'Puts arms directly overhead with zero impingement or rotator cuff strain',
        typicalRaceDemands: 'Monkey bars, rings, ropes, wall climbs',
        testProtocol: 'Back-to-wall shoulder flexion test (wrists touch wall without lower back lifting)',
        proDrill: 'Butcher’s block triceps/lat stretch (2 mins) + banded shoulder dislocates (3 x 15)',
        defaultScore: 77
      },
      {
        id: 'tendon-durability-multi',
        name: 'Tendon durability (Achilles, patellar, bicep, wrist)',
        whyItMatters: 'Prevents acute rupture or chronic tendinopathy from repetitive tensile stress',
        typicalRaceDemands: 'Thousands of running foot strikes, heavy dead hangs, heavy carries',
        testProtocol: 'Isometric tendon tolerance screening (pain-free 45s holds under 100% bodyweight)',
        proDrill: 'Heavy slow resistance (HSR) training: 4 x 6 reps with 3-second concentric and 3-second eccentric',
        defaultScore: 76
      },
      {
        id: 'connective-tissue-resilience',
        name: 'Connective tissue resilience',
        whyItMatters: 'Fascial stiffness and collagen integrity across plantar fascia, IT band, and thoracolumbar fascia',
        typicalRaceDemands: 'Multi-hour jarring on downhill rocky mountain courses',
        testProtocol: 'Post-event connective tissue assessment (zero fascial inflammation after 20K run)',
        proDrill: 'Progressive jumping rope (1,000 skips barefoot on grass) + collagen supplementation protocol',
        defaultScore: 78
      },
      {
        id: 'joint-impact-tolerance',
        name: 'Joint impact tolerance',
        whyItMatters: 'Absorbing multi-G ground reaction forces when landing off tall obstacle walls',
        typicalRaceDemands: 'Dropping off 8ft walls, jump landings into rocky creek beds',
        testProtocol: 'Drop-landing from 36" box onto one leg with silent shock absorption and zero knee valgus',
        proDrill: 'Depth drops from 24" box focusing on immediate silent absorption (4 x 6 reps)',
        defaultScore: 76
      },
      {
        id: 'shin-splint-resistance',
        name: 'Shin splint resistance',
        whyItMatters: 'Tibialis anterior and posterior resilience prevents crippling medial tibial stress syndrome',
        typicalRaceDemands: 'Fast downhill pavement or hard-packed trail running',
        testProtocol: 'Tibialis raises against wall (>30 unbroken reps without burn)',
        proDrill: 'Weighted tibialis raises using tib bar (3 x 20 reps) + toe-walking drills',
        defaultScore: 80
      },
      {
        id: 'lower-back-resilience',
        name: 'Lower back resilience',
        whyItMatters: 'Prevents acute spasms and lumbar fatigue when carrying 80lb sandbags uphill',
        typicalRaceDemands: 'Loaded carries, heavy hoist pulling, sustained forward lean climbing',
        testProtocol: 'Biering-Sørensen back endurance test (>120s static hold on glute-ham developer)',
        proDrill: 'Jefferson curls with light kettlebell + 45-degree back extension holds with isometric squeeze',
        defaultScore: 75
      },
      {
        id: 'hamstring-durability',
        name: 'Hamstring durability',
        whyItMatters: 'Prevents acute muscle strain when sprinting through finish line or braking on steep trails',
        typicalRaceDemands: 'Maximal sprint finishes, high hurdle clearing, downhill braking',
        testProtocol: 'Single-leg bridge endurance test (>25 reps) + Nordic curl eccentric strength',
        proDrill: 'Nordic hamstring curls: 4 sets of 5 reps with controlled 4-second eccentric descent',
        defaultScore: 74
      },
      {
        id: 'skin-callus-resilience',
        name: 'Skin/callus resilience',
        whyItMatters: 'Torn hand calluses or soaked foot blisters instantly destroy obstacle completion',
        typicalRaceDemands: 'Rigs, ropes, walls, soaked socks and muddy shoes',
        testProtocol: '100 pull-ups in single session without callus tearing or blister blistering',
        proDrill: 'Pumice stone callus maintenance 48h pre-race + chalkless outdoor pull-up bar conditioning',
        defaultScore: 82
      },
      {
        id: 'thermal-durability',
        name: 'Thermal durability',
        whyItMatters: 'Enduring cold mud baths without peripheral vasoconstrictor shivering or muscle locking',
        typicalRaceDemands: 'Cold water submersions (Arctic Enema, Dunk Wall) in 40°F weather',
        testProtocol: '3-minute cold water immersion (48°F) followed by immediate push-ups without shivering',
        proDrill: 'Cold water plunges 2-3x weekly + immediate box jump transitions for thermal re-warming',
        defaultScore: 72
      }
    ]
  },

  // 12. Race Physiology, Fueling & Environmental Tolerance
  {
    id: 'race-physiology-fueling',
    domainNumber: 12,
    title: 'Race Physiology, Fueling & Environmental Tolerance',
    tagline: 'Metabolic fueling, gastric emptying under stress, and thermoregulatory homeostatic control.',
    categorySlug: 'fueling',
    whyItMattersSynopsis: "Race-day fueling, hydration, and environmental adaptation sustain your body through freezing water immersions, blistering heat, altitude, and hours on the course. A dialed nutritional strategy keeps glycogen stores topped off and prevents debilitating muscle cramps during extended efforts. Neglecting environmental prep and fueling leads to mid-race bonking, uncontrollable shivering, severe cramping, and mental fog, forcing even the strongest athletes to drop out.",
    qualities: [
      {
        id: 'gi-tolerance-stress',
        name: 'GI tolerance under race stress',
        whyItMatters: 'You must absorb carbs and fluids without vomiting, cramping, or gastrointestinal distress',
        typicalRaceDemands: 'Consuming gels and chews while running at 165+ BPM heart rate',
        testProtocol: 'Consuming 60-90g carbs/hr during a 90-minute threshold trail run with zero gastric upset',
        proDrill: 'Gut training protocol: Gradually increase carbohydrate intake from 30g/hr to 75g/hr on long training runs',
        defaultScore: 78
      },
      {
        id: 'hydration-management',
        name: 'Hydration management',
        whyItMatters: 'Maintains blood plasma volume and prevents cardiac drift and premature heat stroke',
        typicalRaceDemands: 'Hot and long events (Super, Beast, Ultra)',
        testProtocol: 'Sweat rate test: Weigh in before and after 1-hour run in race conditions (target loss < 2% body mass)',
        proDrill: 'Hydration scheduling: Practicing 500-750ml fluid per hour intake with handheld flask on long runs',
        defaultScore: 76
      },
      {
        id: 'electrolyte-management',
        name: 'Electrolyte management',
        whyItMatters: 'Prevents debilitating neuromuscular cramping and exercise-associated hyponatremia',
        typicalRaceDemands: 'Warm and humid mountain races with heavy sweat rates',
        testProtocol: 'Sodium sweat concentration assessment (target: replace 500-1,000mg sodium/hr in heavy sweaters)',
        proDrill: 'Taking salt chewable tablets every 45 minutes during 2+ hour simulated race workouts',
        defaultScore: 77
      },
      {
        id: 'thermoregulation',
        name: 'Thermoregulation',
        whyItMatters: 'Dissipating metabolic heat effectively in extreme ambient conditions',
        typicalRaceDemands: 'Hot/humid summer races and sudden cold mountain downpours',
        testProtocol: 'Core temperature response monitoring during 60-minute threshold run in heat',
        proDrill: 'Sauna acclimation: 20-30 minutes at 180°F post-workout 3-4 times per week',
        defaultScore: 71
      },
      {
        id: 'heat-tolerance',
        name: 'Heat tolerance',
        whyItMatters: 'Expands blood plasma volume and reduces heart rate elevation in 85°F+ temperatures',
        typicalRaceDemands: 'Summer races in Florida, Texas, or desert venues',
        testProtocol: '10-day heat acclimation protocol monitoring heart rate at fixed submaximal power output',
        proDrill: 'Running in light layers or mid-afternoon heat training sessions over a 10-day block',
        defaultScore: 69
      },
      {
        id: 'cold-tolerance',
        name: 'Cold tolerance',
        whyItMatters: 'Surviving Arctic Enema, mountain cold plunges, and wet wind without hypothermia',
        typicalRaceDemands: 'Tough Mudder, early spring/late autumn mountain races',
        testProtocol: '3-minute cold immersion (45°F) with calm diaphragmatic nasal breathing',
        proDrill: 'Cold water plunge: 3 minutes @ 48°F twice weekly to build vasoconstrictor control',
        defaultScore: 73
      },
      {
        id: 'altitude-tolerance',
        name: 'Altitude tolerance',
        whyItMatters: 'Managing oxygen deficit at high-elevation courses (6,000ft to 9,000ft)',
        typicalRaceDemands: 'Lake Tahoe, Colorado, Big Bear mountain championships',
        testProtocol: 'Pulse oximeter saturation test under exertion at elevation (>90% SpO₂ maintenance)',
        proDrill: 'Intermittent hypoxic training or pre-race arrival 5-7 days prior to venue',
        defaultScore: 66
      },
      {
        id: 'body-composition-efficiency',
        name: 'Body-composition efficiency',
        whyItMatters: 'Excess nonfunctional mass dramatically increases the energetic cost of running and hanging',
        typicalRaceDemands: 'Every single running mile, wall climb, and rig hold',
        testProtocol: 'DEXA scan or caliper body fat % (Target: 8-14% males, 16-22% females for competitive racers)',
        proDrill: 'High-protein diet (1.8-2.2g/kg) combined with progressive resistance training and endurance deficit periodization',
        defaultScore: 82
      }
    ]
  }
];

// Flat export of all 107 performance qualities with domain metadata
export const ALL_PERFORMANCE_QUALITIES: PerformanceQuality[] = MAJOR_OCR_DOMAINS.flatMap((domain) =>
  domain.qualities.map((q) => ({
    ...q,
    domainId: domain.id,
    domainNumber: domain.domainNumber,
    domainTitle: domain.title
  }))
);

// Backward-compatible alias
export const PERFORMANCE_QUALITIES = ALL_PERFORMANCE_QUALITIES;

export type PerformanceCategory =
  | 'All'
  | 'Aerobic Endurance & Cardiovascular Fitness'
  | 'Running, Trail & Terrain Performance'
  | 'Anaerobic Capacity & High-Intensity Performance'
  | 'Maximal Strength & Relative Strength'
  | 'Grip, Hanging & Forearm Performance'
  | 'Loaded Carry Performance'
  | 'Muscular Endurance & Fatigue Resistance'
  | 'Power, Explosiveness & Speed'
  | 'Core, Stability & Force Transfer'
  | 'Movement Skill, Coordination & Obstacle Ability'
  | 'Mobility, Durability & Tissue Resilience'
  | 'Race Physiology, Fueling & Environmental Tolerance';
