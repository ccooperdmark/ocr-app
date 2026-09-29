export interface GuideSection {
  title: string;
  content: string;
  subpoints?: string[];
  callout?: {
    type: 'pro' | 'warning' | 'tip';
    title: string;
    text: string;
  };
  drills?: {
    name: string;
    protocol: string;
    target: string;
    notes: string;
  }[];
}

export interface TrainingGuide {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Grip & Upper Body' | 'Endurance & Mountain' | 'Obstacle Technique' | 'Periodization' | 'Race-Day Fueling';
  readTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Elite';
  summary: string;
  badge: string;
  keyTakeaways: string[];
  sections: GuideSection[];
  interactiveChecklist: {
    title: string;
    items: string[];
  };
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const TRAINING_GUIDES: TrainingGuide[] = [
  {
    id: 'grip-and-rig',
    slug: 'grip-and-rig-dominance',
    title: 'Grip Strength & Rig Dominance: How to Never Fail an Obstacle',
    subtitle: 'From dead hangs to wet multi-rigs: Build bulletproof forearm endurance and master dynamic swing mechanics.',
    category: 'Grip & Upper Body',
    readTime: '8 min read',
    difficulty: 'Intermediate',
    badge: 'CORE PILLAR',
    summary: 'Over 70% of race penalties stem from grip fatigue on late-race rigs. Learn the exact 3-stage grip training progression used by podium athletes to glide through Twister, Beater, and Monkey Bars with zero pump.',
    keyTakeaways: [
      'Differentiate between crush grip (sandbags), support grip (dead hangs), and pinch grip (rope/nunchucks).',
      'The 90-degree bent-arm lock saves 40% of lat fatigue compared to passive straight-arm swinging on dynamic rigs.',
      'How chalk substitute, moisture management, and fingertip calluses dictate rig success in mud and rain.',
      'The 2-Minute Dead Hang standard: Why you must hit 120 seconds before attempting advanced rig obstacles.'
    ],
    sections: [
      {
        title: '1. The Anatomy of OCR Grip Failure',
        content: 'Obstacle Course Racing does not test absolute maximum crush grip (like a 500lb deadlift). It tests prolonged anaerobic endurance of the flexor digitorum muscles under fatigue, compounded by running heart rates exceeding 165 BPM. Most racers fail rigs not because the bar is heavy, but because lactic acid pools in the forearms, causing involuntary release.',
        callout: {
          type: 'warning',
          title: 'The Arm Pump Trap',
          text: 'Never death-grip an obstacle. Applying 100% squeeze when 60% suffices occludes blood vessels, choking oxygen to finger flexors within 12 seconds.'
        }
      },
      {
        title: '2. The 3-Tier Grip Training Protocol',
        content: 'Incorporate these specific grip drills twice weekly, ideally at the end of endurance or strength sessions when your nervous system is already partially taxed.',
        drills: [
          {
            name: 'Active Dead Hang (Scapular Retraction)',
            protocol: '4 sets to 85% failure, 90s rest',
            target: 'Male: 2:30 min | Female: 1:45 min',
            notes: 'Keep shoulders pulled down away from ears. Do not hang passively on ligaments.'
          },
          {
            name: 'Heavy Farmer Carries (Trap Bar or Dumbbells)',
            protocol: '5 rounds x 50 meters @ 75% bodyweight total',
            target: 'Unbroken walking pace',
            notes: 'Short, fast steps. Chest tall. Do not let bells swing into thighs.'
          },
          {
            name: 'Towel or Rope Pull-Ups',
            protocol: '4 sets of 6-10 controlled reps',
            target: 'Full lockout to chin above fists',
            notes: 'Trains the vertical pinch grip needed for ropes and canvas grips.'
          },
          {
            name: 'Offset Rig Transitions (Fat Bar to Ring to Nunchuck)',
            protocol: '3 sets of 10-15 hand switches without touching ground',
            target: 'Zero momentum loss',
            notes: 'Focus on breathing rhythm on every hand transfer.'
          }
        ]
      },
      {
        title: '3. Rig Mechanics: Straight Arms vs. Bent Arms',
        content: 'When traversing monkey bars or the Twister, common instinct is to hang fully slack on a straight arm. However, when swinging between varied elevations or irregular holds, keeping a slight 15-to-30 degree bend in the elbow engages the biceps and latissimus dorsi, acting as a shock absorber and preventing sudden jerks that snap your fingers open.',
        callout: {
          type: 'pro',
          title: 'Pro Tip: Hip Drive Rhythm',
          text: 'Initiate momentum from the hips, not the arms. Kick your feet in the direction of travel like a gymnast swinging on parallel bars to let kinetic energy carry your reaching hand.'
        }
      },
      {
        title: '4. Wet Conditions & Callus Management',
        content: 'On wet race days, smooth metal bars become ice. Shave thick calluses flat using a pumice stone or callus blade 48 hours prior to race day—raised calluses fold and rip under friction. In non-championship races where chalk is permitted, carry liquid chalk in your fuel belt.',
        subpoints: [
          'Sand down hand ridges weekly to prevent friction tearing.',
          'Wipe hands thoroughly on dry compression shorts before touching the first bar.',
          'Use hook-grip overhand thumbs when wet to prevent slipping backward.'
        ]
      }
    ],
    interactiveChecklist: {
      title: 'Grip Readiness Benchmark Checklist',
      items: [
        'Can hold a 90-second passive dead hang with clean form',
        'Can complete 8 strict bodyweight pull-ups with hollow body',
        'Can carry 50% of your bodyweight per hand for 100 continuous meters',
        'Can do 30 seconds of single-arm dead hang per side',
        'Hands properly sanded with no protruding edge calluses'
      ]
    },
    faqs: [
      {
        question: 'Should I wear gloves for OCR rigs?',
        answer: 'For 90% of athletes, NO. Gloves create a layer of fabric that rolls between your skin and the bar, reducing tactile feedback and increasing forearm fatigue. Wet gloves are significantly slipperier than bare skin. Only wear specialized silicone-grip neoprene gloves if temperatures are near freezing.'
      },
      {
        question: 'How often should I train grip without overtraining?',
        answer: 'Direct grip training should be limited to 2-3 sessions per week. Because finger flexors and tendons adapt slower than muscles, excessive daily hangboarding can trigger medial epicondylitis (golfer’s elbow).'
      }
    ]
  },
  {
    id: 'trail-running-and-hills',
    slug: 'trail-running-and-hills',
    title: 'Trail Running & Mountain Conditioning: Building the Unbreakable Engine',
    subtitle: 'Conquer elevation, mud slogs, and 20% mountain grades with hybrid aerobic conditioning.',
    category: 'Endurance & Mountain',
    readTime: '9 min read',
    difficulty: 'Intermediate',
    badge: 'CARDIO ARSENAL',
    summary: 'OCR is 80% running disguised as obstacle challenges. If your cardiovascular system redlines on a mountain climb, your brain cannot coordinate complex obstacles. Master Zone 2 base building, power-hiking, and steep descent mechanics.',
    keyTakeaways: [
      'Why 80% of your weekly mileage must be in strict Zone 2 (conversational pace).',
      'The "Hands-on-Thighs" power-hiking technique that outperforms running on gradients over 15%.',
      'Downhill speed: Leaning forward and quick 180+ SPM cadence to preserve quads.',
      'Simulation workouts: Transitioning to running with heart rate pinned at 175 BPM after 50lb carries.'
    ],
    sections: [
      {
        title: '1. The Aerobic Base: Why Fast Runners Fail on Obstacles',
        content: 'Many road marathoners enter OCR expecting easy podiums, only to walk by Mile 4. Road running is linear and constant-cadence. OCR is stochastic: your heart rate spikes to lactate threshold during a sandbag carry, stays elevated through burpees, and then demands you immediately resume a sub-7:30 mile pace. You need an oversized aerobic engine to flush lactate while still moving forward.',
        callout: {
          type: 'tip',
          title: 'The Zone 2 Rule',
          text: 'Spend 75-80% of your total weekly run volume at a pace where you can comfortably breathe exclusively through your nose or speak in complete sentences.'
        }
      },
      {
        title: '2. Mountain Gradients: Power-Hiking vs. Running',
        content: 'When mountain ski slope slopes hit 15% or steeper, running consumes 25% more metabolic energy for virtually identical forward speed compared to efficient power-hiking.',
        subpoints: [
          'Place hands firmly onto lower quads just above the kneecap on each step.',
          'Lock out the rear knee completely on every stride to transfer work to skeletal structure rather than burning quads.',
          'Keep your torso tilted at roughly the same angle as the slope, eyes 6 feet ahead.',
          'Take short, deliberate strides matching your breathing cadence (e.g., 2 steps per inhale, 2 steps per exhale).'
        ]
      },
      {
        title: '3. Downhill Running: Speed Without Destroying Knees',
        content: 'Most racers lean backward on steep descents out of fear, hammering their knees with massive eccentric braking forces. To fly down technical rocky descents without injury:',
        callout: {
          type: 'pro',
          title: 'Pro Mechanics: Forward Pitch',
          text: 'Perpendicular to the hill: Lean your chest slightly down the slope, keep your center of mass over your feet, and increase cadence to 185-195 steps per minute with light, spring-like forefoot ground strikes.'
        }
      },
      {
        title: '4. Compromised Running: Training the Carry-to-Run Transition',
        content: 'The most brutal physiological test in OCR is the first 400 meters following a heavy bucket carry or Atlas stone. Your blood is pooled in your spinal erectors and forearms, while your legs feel full of lead.',
        drills: [
          {
            name: 'The Compromised Mile',
            protocol: '4 rounds: 400m Hill Run + 70lb Sandbag Carry 100m + 20 Burpees',
            target: 'Sub-28 min total',
            notes: 'Do not pause between the carry and the run. Force yourself into an immediate jog.'
          },
          {
            name: 'Stair / Incline Treadmill Rucking',
            protocol: '30-45 minutes @ 12-15% incline carrying 25-35lb weight vest',
            target: 'Zone 2-3 heart rate',
            notes: 'Builds iron calves, ankles, and spinal endurance without joint impact.'
          }
        ]
      }
    ],
    interactiveChecklist: {
      title: 'Trail & Engine Readiness Checklist',
      items: [
        'Comfortable running 60+ minutes at conversational Zone 2 pace',
        'Have logged at least 1,000+ vertical feet in a single trail workout',
        'Can run at 180+ cadence on downhill terrain without braking',
        'Can resume a run within 5 seconds after setting down a 50lb carry',
        'Footwear has aggressive 5mm+ lugs suited for muddy off-camber trails'
      ]
    },
    faqs: [
      {
        question: 'How much elevation gain should I train each week for a Spartan Beast or Super?',
        answer: 'For a Beast (21K with mountain terrain like Killington or Tahoe), aim for at least 2,000 to 4,000 feet of vertical gain weekly during peak training. If you live in a flat area, use a stairmaster, 15% incline treadmill, or weighted box step-ups.'
      },
      {
        question: 'What shoe drop is best for OCR trails?',
        answer: 'A low to moderate heel-to-toe drop (4mm to 6mm) provides optimal ground feel and ankle stability on uneven roots and rocks without over-stretching the Achilles tendon.'
      }
    ]
  },
  {
    id: 'obstacle-mastery',
    slug: 'obstacle-mastery',
    title: 'Obstacle Technique Breakdown: Walls, Ropes, Spear Throw & Rigs',
    subtitle: 'Flawless execution blueprints for the 5 most feared race penalties.',
    category: 'Obstacle Technique',
    readTime: '11 min read',
    difficulty: 'Beginner',
    badge: 'ZERO BURPEES',
    summary: 'A failed obstacle costs 30 burpees or a 200m penalty loop—costing you 2 to 4 minutes per mistake. Master the biomechanics of the 8-Foot Wall, Spear Throw, J-Hook Rope Climb, Olympus, and Inverted Walls to guarantee 100% obstacle clearance.',
    keyTakeaways: [
      'The "Heel-Hook Pop" that lets athletes under 5\'4" climb an 8-foot wall solo without a boost.',
      'The Spear Throw 3-Point Check: Grip balance point, elbow carriage, and zero-rotation release.',
      'J-Hook vs. S-Hook: Why the J-Hook allows you to stand and rest on the rope with near-zero arm exertion.',
      'Olympus Wall: Keeping hips glued close to the plywood to convert grip to friction.'
    ],
    sections: [
      {
        title: '1. The 8-Foot & 7-Foot Wall: The Solo Technique',
        content: 'Running up to a tall slick wall often intimidates new racers into waiting for a boost. In open and age group competitive racing, you must clear it unassisted. The secret is horizontal-to-vertical force redirection.',
        subpoints: [
          'Approach at a controlled sprint, planting your dominant foot about 3 feet up the wall face.',
          'Drive upward—not into the wall—to grab the top ledge with both hands.',
          'Immediately kick one heel up over the top edge ("Heel Hook") rather than struggling to muscle-up with your chest.',
          'Roll your hip over the heel, straddle the wall, and lower yourself down under control.'
        ],
        callout: {
          type: 'pro',
          title: 'Don\'t Jump Down',
          text: 'Never jump straight off the top of an 8-foot wall. Lower your torso to full arm hang on the backside before dropping to absorb impact and save your ankles for the miles ahead.'
        }
      },
      {
        title: '2. The Spear Throw: The 90% Accuracy Protocol',
        content: 'The Spear Throw has the highest failure rate in Spartan racing (over 65% in open heats). It is not a test of strength; it is a test of calm breathing and alignment.',
        drills: [
          {
            name: 'Step 1: Cord Clearing',
            protocol: 'Fluff the lanyard cord and lay it cleanly outside the fence barricade',
            target: 'Zero tangled feet',
            notes: 'Never throw with the cord caught behind your foot or across your arm.'
          },
          {
            name: 'Step 2: Finding Center of Gravity',
            protocol: 'Balance the spear across two fingers to find exact center balance',
            target: 'Grip 1 inch behind the balance point',
            notes: 'Gripping too far back causes nose-dives; gripping too far forward causes tail drops.'
          },
          {
            name: 'Step 3: The 3-Point Release',
            protocol: 'Elbow high, sight target with non-throwing hand, throw like a dart',
            target: 'Bullseye Hay Bale',
            notes: 'Do not throw like a baseball. Drive straight along a laser line through your shoulder.'
          }
        ]
      },
      {
        title: '3. Rope Climb: The Effortless J-Hook Lock',
        content: 'Climbing a mud-slick rope with upper body alone will gas your lats for the rest of the race. Using the J-Hook technique, your legs bear 90% of your bodyweight.',
        subpoints: [
          'Jump up to grab the rope as high as possible with hands stacked.',
          'Allow the rope to hang along the outside of your dominant leg and under the arch of your foot.',
          'Scoop the tail of the rope from underneath using your non-dominant foot, pinning the rope across the top of your dominant shoe.',
          'Stand straight up on the foot clamp as if stepping on a ladder rung. Slide hands up, bring knees to chest, clamp again, and repeat.'
        ],
        callout: {
          type: 'tip',
          title: 'The Bell Strike',
          text: 'Touch the bell with your foot or hand, never dive for it. Slowly reverse the clamp on the descent—sliding will burn right through your skin or gloves.'
        }
      },
      {
        title: '4. Olympus & The Inverted Wall',
        content: 'The Olympus wall requires traversing along an angled plywood board using chains, holes, and rock grips without your feet touching the ground or the top lip.',
        callout: {
          type: 'warning',
          title: 'Center of Gravity Law',
          text: 'Keep your hips pressed as close to the wall as physically possible. If your hips sag away, your body weight hangs on your fingertips. Push hard with the soles of your shoes against the wood to create friction.'
        }
      }
    ],
    interactiveChecklist: {
      title: 'Obstacle Mastery Technique Checklist',
      items: [
        'Can execute a smooth J-Hook rope clamp within 2 seconds of jumping',
        'Can climb an 8-foot wall using heel-hook technique without a helper',
        'Practiced spear throw with balanced grip alignment (at least 20 throws)',
        'Can traverse 10ft of monkey bars using hip sway momentum',
        'Familiar with inverted wall pull-and-reach body mechanics'
      ]
    },
    faqs: [
      {
        question: 'What if it is raining on race day and the obstacles are caked in slick mud?',
        answer: 'Slow down by 15%. On ropes, kick excess mud off the rope with your shoe before clamping. On walls, grab the upright corner support beams where wood has more friction. On rigs, wrap thumbs securely and shorten your reach.'
      },
      {
        question: 'How do I train spear throw if I don’t own a spear?',
        answer: 'You can make an inexpensive DIY spear using a 5-foot closet dowel or rake handle, duct tape, and a 5-inch galvanized nail on the end. Throw at an archery target or hay bale.'
      }
    ]
  },
  {
    id: 'periodization-and-taper',
    slug: 'periodization-and-taper',
    title: '12-Week Periodization & Race-Week Taper: Peak on Race Day',
    subtitle: 'The scientific roadmap from raw baseline to peak cardiovascular and muscular readiness.',
    category: 'Periodization',
    readTime: '10 min read',
    difficulty: 'Intermediate',
    badge: 'RACE PEAKING',
    summary: 'Overtraining is the #1 reason athletes cramp or suffer tendonitis before ever reaching the start line. Learn how to structure a 12-week macrocycle (Base, Build, Peak, Taper) and execute the exact 7-day race week countdown.',
    keyTakeaways: [
      'The 4 macrocycle training blocks and their target adaptations.',
      'Managing Acute-to-Chronic Workload Ratio (ACWR) to prevent shin splints and shoulder impingement.',
      'The Race Week Taper: Cutting volume by 50% while maintaining intensity to keep the nervous system sharp.',
      'Post-race recovery protocols: Decreasing DOMS and returning to training within 5 days.'
    ],
    sections: [
      {
        title: '1. The 12-Week OCR Macrocycle Overview',
        content: 'Successful race prep divides 12 weeks into distinct 3-week building blocks followed by 1 recovery week. Attempting to train maximum endurance, maximum strength, and high-intensity intervals all at once leads directly to burnout.',
        drills: [
          {
            name: 'Weeks 1-4: Aerobic Base & Structural Tissue Prep',
            protocol: 'High volume, low intensity (Zone 2 running, high-rep pull-ups, carries)',
            target: 'Build mitochondrial density & tendon stiffness',
            notes: 'No race-pace efforts. Focus on mileage volume and grip work capacity.'
          },
          {
            name: 'Weeks 5-8: Strength Endurance & Hill Specificity',
            protocol: 'Introduce heavy sandbags, steep incline power-hiking, and rig intervals',
            target: 'Raise lactate threshold',
            notes: 'Incorporate compromised running simulations weekly.'
          },
          {
            name: 'Weeks 9-10: Peak Race Simulation & Speed',
            protocol: 'High-intensity race simulation workouts matching target course profile',
            target: 'Course-specific mental and physical resilience',
            notes: 'Longest continuous simulation session occurs at Week 10.'
          },
          {
            name: 'Weeks 11-12: Supercompensation & Tactical Taper',
            protocol: 'Sharp 40-50% drop in mileage; short, crisp 30-second explosive efforts',
            target: 'Glycogen restoral and nervous system recovery',
            notes: 'Do not test 1RM or attempt new obstacles during taper.'
          }
        ]
      },
      {
        title: '2. The 7-Day Race Week Countdown',
        content: 'What you do in the final 7 days before your race can make or break months of preparation. Follow this exact daily schedule:',
        subpoints: [
          'Monday (T-6): 45-min easy Zone 2 trail jog + 10 mins mobility. Foam roll lower legs.',
          'Tuesday (T-5): 3 x 400m at race pace with 2 mins walk rest. 3 easy pull-up sets. Rest.',
          'Wednesday (T-4): 30-min brisk walk or light bike flush. Zero heavy lifting. Sleep 8.5+ hours.',
          'Thursday (T-3): 20-min easy run with 4 x 50m light strides. Begin deliberate carb-loading.',
          'Friday (T-2): Complete rest day. Hydrate with electrolyte tablets. Organize race kit & bib.',
          'Saturday (T-1): 15-min shakeout jog + dynamic stretches + 2 practice spear throws if at venue.',
          'Sunday (RACE DAY): Eat breakfast 3 hours before heat. Warm up 25 mins prior. Dominate.'
        ],
        callout: {
          type: 'tip',
          title: 'The Sleep Rule',
          text: 'The sleep you get TWO nights before the race (Friday night for a Sunday race) is the most critical. Pre-race jitters often compromise Saturday sleep, which is physiologically fine if Friday was deep and long.'
        }
      },
      {
        title: '3. Deload Metrics & Readiness Tracking',
        content: 'Monitor your resting heart rate (RHR) and heart rate variability (HRV) each morning. If your morning RHR is 7+ BPM above your 30-day baseline for two consecutive days, immediately drop workout intensity and prioritize cold plunges, sleep, and nutrient-dense recovery meals.'
      }
    ],
    interactiveChecklist: {
      title: 'Race Week Countdown Checklist',
      items: [
        'Cut running mileage by 40-50% starting 7 days before race',
        'Maintained short explosive strides to keep neuromuscular firing sharp',
        'Increased carbohydrate intake to 7-9g per kg bodyweight 48h prior',
        'Packed backup race shoes, blister pads, and nutrition gels',
        'Reviewed course map and obstacle sequence'
      ]
    },
    faqs: [
      {
        question: 'I feel sluggish and stiff during my taper week. Is something wrong?',
        answer: 'No! This is known as the "taper tantrum." As muscle inflammation subsides and glycogen stores become fully saturated with water (each gram of glycogen binds ~3 grams of water), you might feel slightly heavy. By race morning, that stored energy will convert into explosive endurance.'
      },
      {
        question: 'Can I lift heavy weights during race week?',
        answer: 'Absolutely not. Avoid any eccentric movements that induce muscle microtrauma (e.g. heavy squats, lunges, or deadlifts). Limit resistance work to lightweight bodyweight activation.'
      }
    ]
  },
  {
    id: 'race-day-fueling-and-gear',
    slug: 'race-day-fueling-and-gear',
    title: 'Race-Day Nutrition, Hydration & Gear: Zero Cramps, Maximum Speed',
    subtitle: 'Science-backed fueling schedules, sodium protocols, and essential trail gear.',
    category: 'Race-Day Fueling',
    readTime: '7 min read',
    difficulty: 'Beginner',
    badge: 'ESSENTIAL GEAR',
    summary: 'A cramp on Mile 9 of a Beast is rarely a lack of fitness—it is an electrolyte and fuel deficit. Learn the exact gram-per-hour carbohydrate targets, anti-cramp sodium strategies, and the gear choices that keep you moving when other athletes tap out.',
    keyTakeaways: [
      'The 45-60g carbohydrate per hour rule for races exceeding 75 minutes.',
      'Why cramping is often neuromuscular and how mustard packets or pickle juice stop it in under 60 seconds.',
      'Trail shoe anatomy: Why 6mm-8mm aggressive rubber lugs are mandatory for obstacle courses.',
      'Compression socks: Protecting shins from rope burns, thorns, and gravel.'
    ],
    sections: [
      {
        title: '1. Fueling the Machine: Carbs & Sodium Math',
        content: 'Your body stores roughly 2,000 calories of glycogen in muscles and liver. In a Spartan Super (10K) or Beast (21K), you will burn through those reserves within 90 minutes. If you do not consume exogenous carbohydrates, you hit the dreaded "wall."',
        drills: [
          {
            name: 'Pre-Race Meal (3 Hours Prior)',
            protocol: '100-120g low-fiber carbs (oatmeal + banana + maple syrup + 20g whey)',
            target: 'Full liver glycogen without gastrointestinal distress',
            notes: 'Avoid high fats, bacon, or heavy dairy which slow gastric emptying.'
          },
          {
            name: 'During Race (Every 30-40 Minutes)',
            protocol: '30-45g rapidly digestible carbohydrate (gels, chews, or liquid mix)',
            target: 'Sustained blood glucose levels',
            notes: 'Always chase gels with 3-4 gulps of water from obstacle hydration stations.'
          },
          {
            name: 'Sodium & Electrolytes',
            protocol: '400-700mg sodium per hour in warm or humid conditions',
            target: 'Maintain plasma volume and prevent hyponatremia',
            notes: 'Use salt chew tabs or drink mix in your hydration pack.'
          }
        ]
      },
      {
        title: '2. The Emergency Anti-Cramp Toolkit',
        content: 'Severe cramping on steep climbs is triggered by hyperactive alpha-motor neurons firing under fatigue. Recent neuroscience shows that acidic, pungent substances trigger transient receptor potential (TRP) channels in the mouth and esophagus, sending an immediate inhibitory reflex to calm the cramped muscle.',
        callout: {
          type: 'pro',
          title: 'Carry These in Your Pocket',
          text: '2 yellow mustard packets or 1 pickle juice shot. The moment your calf or hamstring starts twitching, swallow it immediately. Relief occurs within 45 to 90 seconds.'
        }
      },
      {
        title: '3. Footwear: The #1 Gear Factor',
        content: 'Standard gym sneakers or road running shoes will make you slide uncontrollably down muddy slopes and slip off slick obstacle beams. Dedicated OCR shoes require:',
        subpoints: [
          'Deep Rubber Lugs (5mm to 8mm) with directional chevron tread for biting into clay and mud.',
          'Hydrophobic mesh upper with drainage ports that eject water immediately after crossing waist-deep mud pits.',
          'Low absorption materials—a shoe that retains 8oz of water per foot adds 1 pound of dead weight per stride.',
          'Built-in rock plate to protect metatarsals from jagged rocks and roots.'
        ]
      },
      {
        title: '4. Apparel & Protection: The Armor of OCR',
        content: 'Dress for when you are wet, not when you are standing dry at the starting gate. 100% synthetic fabrics only—cotton is strictly forbidden (it absorbs water, stretches, and causes extreme chafing).',
        callout: {
          type: 'warning',
          title: 'Cotton Is The Enemy',
          text: 'Never wear cotton socks or shirts. Use merino wool or polyester blend trail socks, seamless compression shorts, and anti-chafing balm on underarms, chest, and groin.'
        }
      }
    ],
    interactiveChecklist: {
      title: 'Ultimate Race-Day Bag Packing List',
      items: [
        'Aggressive lugged trail shoes (broken in with at least 30 trail miles)',
        'Knee-high compression socks (protects shins on ropes and walls)',
        'Form-fitting synthetic compression gear (no loose baggies that snag barbwire)',
        '3-6 energy gels with electrolyte formulation',
        '2 emergency yellow mustard packets',
        'Anti-chafe lubricant (Body Glide or Squirrel\'s Nut Butter)',
        'Hydration pack (for races over 10km) with bladder flushed and tested',
        'Clean dry clothes, towel, and recovery sandals for the post-race festival'
      ]
    },
    faqs: [
      {
        question: 'Should I bring a hydration pack for a 5K Spartan Sprint?',
        answer: 'For a 5K Sprint (under 60-75 minutes for most athletes), a hydration pack usually adds unnecessary weight and bulk. Rely on the 2-3 on-course water stations unless the weather is over 90°F (32°C).'
      },
      {
        question: 'How do I clean my trail shoes after a mud race?',
        answer: 'Hose them off immediately at the festival wash station. When home, remove insoles, soak in a bucket of warm water with mild detergent, scrub with a nylon brush, and stuff with newspaper to air-dry. Never put them in the clothes dryer, which melts the sole adhesive.'
      }
    ]
  }
];
