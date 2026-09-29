import { ExerciseDefinition } from '@/types/trainingPlan';

export const OCR_EXERCISE_DATABASE: ExerciseDefinition[] = [
  // ==========================================
  // DOMAIN 1: AEROBIC ENDURANCE & CARDIOVASCULAR
  // ==========================================
  {
    id: 'aero_walk_jog_interval',
    name: 'Walk-to-Jog Aerobic Intervals (Nasal Breathing)',
    primaryDomain: 'aerobic_endurance',
    secondaryDomains: ['mobility_durability'],
    movementPattern: 'aerobic_locomotion',
    equipmentRequired: ['running_shoes'],
    difficulty: 'beginner',
    targetMuscles: ['Cardiovascular System', 'Calves', 'Quadriceps'],
    instructions: [
      'Alternate 2 minutes of brisk walking with 1 minute of easy jogging.',
      'Maintain continuous nasal-only breathing to ensure strict Zone 2 intensity.',
      'Keep cadence high (175-180 steps/min) with light, quiet footfalls.'
    ],
    coachingCues: ['Breathe through nose only', 'Silent feet', 'Elbows drive back'],
    commonMistakes: ['Jogging too fast and mouth-breathing', 'Overstriding with heel strike'],
    regressionExerciseIds: ['aero_incline_treadmill_walk'],
    progressionExerciseIds: ['aero_zone2_continuous_trail'],
    substitutionExerciseIds: ['aero_incline_treadmill_walk', 'aero_airbike_zone2'],
    contraindications: [],
    defaultSets: 1,
    defaultRepsOrDuration: '30-40 mins',
    defaultRpe: 5,
    defaultRestSeconds: 0,
    ocrApplicationNote: 'Builds baseline capillary density and mitochondrial efficiency for multi-hour events.'
  },
  {
    id: 'aero_incline_treadmill_walk',
    name: 'Steep Incline Aerobic Walk',
    primaryDomain: 'aerobic_endurance',
    secondaryDomains: ['running_terrain'],
    movementPattern: 'aerobic_locomotion',
    equipmentRequired: ['treadmill'],
    difficulty: 'beginner',
    targetMuscles: ['Calves', 'Glutes', 'Hamstrings', 'Cardiovascular System'],
    instructions: [
      'Set treadmill to 12-15% incline at 2.8 to 3.4 mph.',
      'Do not hold onto handrails; pump arms naturally in sync with stride.',
      'Keep torso pitched slightly forward from ankles, driving through full foot.'
    ],
    coachingCues: ['Hands off rails', 'Drive through midfoot', 'Steady cadence'],
    commonMistakes: ['Holding rails and leaning backwards', 'Excessive speed causing knee pounding'],
    regressionExerciseIds: ['aero_walk_jog_interval'],
    progressionExerciseIds: ['aero_zone2_continuous_trail', 'run_power_hiking_slope'],
    substitutionExerciseIds: ['aero_airbike_zone2', 'run_stairmaster_climbs'],
    contraindications: [],
    defaultSets: 1,
    defaultRepsOrDuration: '40 mins',
    defaultRpe: 6,
    defaultRestSeconds: 0,
    ocrApplicationNote: 'Zero-impact climbing volume that prepares calves and heart for mountain courses.'
  },
  {
    id: 'aero_zone2_continuous_trail',
    name: 'Continuous Zone 2 Trail Long Run',
    primaryDomain: 'aerobic_endurance',
    secondaryDomains: ['running_terrain', 'mobility_durability'],
    movementPattern: 'aerobic_locomotion',
    equipmentRequired: ['trail_shoes'],
    difficulty: 'intermediate',
    targetMuscles: ['Heart', 'Slow-twitch leg fibers', 'Stabilizer tendons'],
    instructions: [
      'Run continuously on rolling dirt trails keeping heart rate strictly between 65-75% max HR.',
      'Drop to a brisk hike immediately if heart rate drifts above aerobic threshold on steep hills.',
      'Practice taking small sips of electrolyte fluid every 15-20 minutes.'
    ],
    coachingCues: ['Check HR monitor frequently', 'Conversational pace', 'Quick cadence over roots'],
    commonMistakes: ['Running the hills too hard and spiking into lactate accumulation'],
    regressionExerciseIds: ['aero_walk_jog_interval'],
    progressionExerciseIds: ['aero_threshold_tempo_blocks'],
    substitutionExerciseIds: ['aero_airbike_zone2'],
    contraindications: [],
    defaultSets: 1,
    defaultRepsOrDuration: '60-90 mins',
    defaultRpe: 6,
    defaultRestSeconds: 0,
    ocrApplicationNote: 'The aerobic backbone that keeps you moving without bonking from mile 3 to mile 20.'
  },
  {
    id: 'aero_threshold_tempo_blocks',
    name: 'Lactate Threshold Cruise Intervals (Zone 4)',
    primaryDomain: 'aerobic_endurance',
    secondaryDomains: ['anaerobic_capacity'],
    movementPattern: 'aerobic_locomotion',
    equipmentRequired: ['running_shoes'],
    difficulty: 'advanced',
    targetMuscles: ['Cardiovascular System', 'Lactate clearance shuttles'],
    instructions: [
      'Warm up 15 minutes easy.',
      'Execute 3 x 10 minutes at 1-hour race pace (88-92% max HR) with 2 minutes easy jog recovery.',
      'Focus on controlled, rhythmic breathing and smooth relaxed shoulders.'
    ],
    coachingCues: ['Comfortably hard', 'Relax jaw and shoulders', 'Hold steady split across all sets'],
    commonMistakes: ['Starting set 1 like a 5K sprint and fading by set 3'],
    regressionExerciseIds: ['aero_zone2_continuous_trail'],
    progressionExerciseIds: ['anaero_vo2max_hill_repeats'],
    substitutionExerciseIds: ['aero_airbike_zone2'],
    contraindications: [],
    defaultSets: 3,
    defaultRepsOrDuration: '10 mins',
    defaultRpe: 8,
    defaultRestSeconds: 120,
    ocrApplicationNote: 'Elevates sustained running speed between obstacle queues.'
  },
  {
    id: 'aero_airbike_zone2',
    name: 'AirBike Active Flush & Base Building',
    primaryDomain: 'aerobic_endurance',
    secondaryDomains: ['mobility_durability'],
    movementPattern: 'aerobic_locomotion',
    equipmentRequired: ['rower_or_airbike'],
    difficulty: 'beginner',
    targetMuscles: ['Whole Body', 'Cardiovascular System'],
    instructions: [
      'Maintain steady 55-60 RPM on Echo / Assault bike.',
      'Arms push and pull rhythmically without tensing neck.',
      'Used for zero-impact aerobic development or active recovery.'
    ],
    coachingCues: ['Equal push and pull with arms', 'Consistent RPM', 'Deep belly breaths'],
    commonMistakes: ['Sprinting intervals instead of steady state aerobic work'],
    regressionExerciseIds: ['aero_incline_treadmill_walk'],
    progressionExerciseIds: ['aero_zone2_continuous_trail'],
    substitutionExerciseIds: ['aero_walk_jog_interval'],
    contraindications: [],
    defaultSets: 1,
    defaultRepsOrDuration: '30-45 mins',
    defaultRpe: 5,
    defaultRestSeconds: 0,
    ocrApplicationNote: 'Builds cardiovascular engine when legs are sore from heavy carries or descents.'
  },

  // ==========================================
  // DOMAIN 2: RUNNING, TRAIL & TERRAIN
  // ==========================================
  {
    id: 'run_power_hiking_slope',
    name: 'Hands-on-Thighs Power Hiking Repeats',
    primaryDomain: 'running_terrain',
    secondaryDomains: ['aerobic_endurance', 'muscular_endurance'],
    movementPattern: 'aerobic_locomotion',
    equipmentRequired: ['trail_shoes'],
    difficulty: 'beginner',
    targetMuscles: ['Glutes', 'Quadriceps', 'Calves', 'Spinal Erectors'],
    instructions: [
      'Find a 15-25% grade hill or set treadmill to 15%.',
      'Lock hands onto lower thighs right above knees, locking arms on each step to transfer torso weight directly into femur.',
      'Take long, powerful strides driving hips forward into full extension.'
    ],
    coachingCues: ['Hands locked on quads', 'Drive with glutes', 'Keep chin up, chest open'],
    commonMistakes: ['Trying to run steep slopes and blowing up heart rate within 60 seconds'],
    regressionExerciseIds: ['aero_incline_treadmill_walk'],
    progressionExerciseIds: ['run_mountain_vert_repeats'],
    substitutionExerciseIds: ['run_stairmaster_climbs'],
    contraindications: [],
    defaultSets: 4,
    defaultRepsOrDuration: '4 mins @ 15%+ incline',
    defaultRpe: 7,
    defaultRestSeconds: 90,
    ocrApplicationNote: 'The #1 speed weapon on mountain ski-slope climbs (Killington, Tahoe, Palmerton).'
  },
  {
    id: 'run_mountain_vert_repeats',
    name: 'Technical Mountain Ascent Repeats',
    primaryDomain: 'running_terrain',
    secondaryDomains: ['aerobic_endurance', 'power_speed'],
    movementPattern: 'aerobic_locomotion',
    equipmentRequired: ['trail_shoes'],
    difficulty: 'advanced',
    targetMuscles: ['Quadriceps', 'Glutes', 'Calves', 'Ankle Stabilizers'],
    instructions: [
      'Select a rugged rocky ascent trail.',
      'Climb hard for 3 minutes alternating short running strides and power hiking.',
      'Jog or walk down with focus on light foot contact and quick ankle stiffness.'
    ],
    coachingCues: ['Stay over your center of mass', 'Scan 10 feet ahead', 'High knee punch'],
    commonMistakes: ['Looking down at toes instead of scanning the upcoming trail line'],
    regressionExerciseIds: ['run_power_hiking_slope'],
    progressionExerciseIds: ['ocr_hill_repeats_to_heavy_carry'],
    substitutionExerciseIds: ['run_stairmaster_climbs'],
    contraindications: [],
    defaultSets: 5,
    defaultRepsOrDuration: '3 mins climb',
    defaultRpe: 8,
    defaultRestSeconds: 150,
    ocrApplicationNote: 'Builds vertical velocity (VAM) needed to podium on mountain championship courses.'
  },
  {
    id: 'run_controlled_technical_descent',
    name: 'Controlled Technical Downhill Running',
    primaryDomain: 'running_terrain',
    secondaryDomains: ['mobility_durability'],
    movementPattern: 'aerobic_locomotion',
    equipmentRequired: ['trail_shoes'],
    difficulty: 'intermediate',
    targetMuscles: ['Quadriceps (Eccentric)', 'Tibialis Anterior', 'Ankles'],
    instructions: [
      'Descend a moderate 8-12% technical trail.',
      'Keep cadence fast (185-195 SPM), taking light glancing steps rather than hard heel-braking steps.',
      'Keep arms wide like a tightrope walker for balance, knees soft and bent.'
    ],
    coachingCues: ['Forward lean from ankles', 'Quiet butterfly feet', 'Arms out for balance'],
    commonMistakes: ['Leaning backward into heels and jamming brakes into knees and lumbar spine'],
    regressionExerciseIds: ['aero_zone2_continuous_trail'],
    progressionExerciseIds: ['run_mountain_vert_repeats'],
    substitutionExerciseIds: ['aero_zone2_continuous_trail'],
    contraindications: ['patellar_tendonitis', 'acute_knee_pain'],
    defaultSets: 4,
    defaultRepsOrDuration: '500m descent',
    defaultRpe: 7,
    defaultRestSeconds: 120,
    ocrApplicationNote: 'Elite racers gain 2-4 minutes on descents by flowing without quad-braking fatigue.'
  },
  {
    id: 'run_stairmaster_climbs',
    name: 'StairMaster Power Intervals',
    primaryDomain: 'running_terrain',
    secondaryDomains: ['aerobic_endurance', 'muscular_endurance'],
    movementPattern: 'aerobic_locomotion',
    equipmentRequired: ['stairmaster'],
    difficulty: 'intermediate',
    targetMuscles: ['Glutes', 'Calves', 'Hamstrings', 'Cardiovascular System'],
    instructions: [
      'Set StairMaster to Level 10-14.',
      'Climb with hands off rails, driving full foot onto each step.',
      'Alternate between single steps and taking stairs 2 at a time.'
    ],
    coachingCues: ['Chest tall', 'No slouching on handrails', 'Full hip extension'],
    commonMistakes: ['Leaning dead weight onto handles'],
    regressionExerciseIds: ['aero_incline_treadmill_walk'],
    progressionExerciseIds: ['run_mountain_vert_repeats'],
    substitutionExerciseIds: ['run_power_hiking_slope'],
    contraindications: [],
    defaultSets: 4,
    defaultRepsOrDuration: '5 mins',
    defaultRpe: 8,
    defaultRestSeconds: 90,
    ocrApplicationNote: 'Essential substitute when athletes lack direct mountain outdoor trail access.'
  },

  // ==========================================
  // DOMAIN 3: ANAEROBIC CAPACITY & HIGH-INTENSITY
  // ==========================================
  {
    id: 'anaero_vo2max_hill_repeats',
    name: '3-Minute VO2max Steep Hill Repeats',
    primaryDomain: 'anaerobic_capacity',
    secondaryDomains: ['aerobic_endurance', 'running_terrain'],
    movementPattern: 'aerobic_locomotion',
    equipmentRequired: ['running_shoes'],
    difficulty: 'advanced',
    targetMuscles: ['Cardiovascular System', 'Fast-twitch oxidative fibers'],
    instructions: [
      'Warm up 15 minutes with dynamic mobility and strides.',
      'Sprint up 8-10% grade for 3 minutes at 95% max HR.',
      'Jog down very slowly for 3 minutes full recovery before next repetition.'
    ],
    coachingCues: ['Aggressive knee drive', 'Drive elbows back', 'Empty the tank on final 30s'],
    commonMistakes: ['Pacing too cautiously in first minute or blowing up at 45 seconds'],
    regressionExerciseIds: ['aero_threshold_tempo_blocks'],
    progressionExerciseIds: ['anaero_repeated_sprint_shuttles'],
    substitutionExerciseIds: ['anaero_airbike_sprints'],
    contraindications: [],
    defaultSets: 4,
    defaultRepsOrDuration: '3 mins @ 95% effort',
    defaultRpe: 9,
    defaultRestSeconds: 180,
    ocrApplicationNote: 'Expands your aerobic ceiling and conditions your brain to tolerate high acidosis.'
  },
  {
    id: 'anaero_repeated_sprint_shuttles',
    name: 'Repeated Sprint Ability (RSA) Shuttles',
    primaryDomain: 'anaerobic_capacity',
    secondaryDomains: ['power_speed'],
    movementPattern: 'aerobic_locomotion',
    equipmentRequired: ['running_shoes'],
    difficulty: 'advanced',
    targetMuscles: ['Phosphagen System', 'Hamstrings', 'Glutes'],
    instructions: [
      'Sprint 30m all-out, decelerate sharply, turnaround, sprint 30m back.',
      'Rest 30 seconds standing. Repeat for 6 rounds.',
      'Track total time decay from sprint 1 to sprint 6 (target decay < 8%).'
    ],
    coachingCues: ['Max acceleration', 'Fast sharp deceleration plant', 'Deep diaphragmatic recovery breaths'],
    commonMistakes: ['Pacing sprint 1 instead of giving 100% maximal effort'],
    regressionExerciseIds: ['aero_threshold_tempo_blocks'],
    progressionExerciseIds: ['anaero_vo2max_hill_repeats'],
    substitutionExerciseIds: ['anaero_airbike_sprints'],
    contraindications: ['acute_hamstring_strain'],
    defaultSets: 2,
    defaultRepsOrDuration: '6 x 60m shuttles',
    defaultRpe: 9,
    defaultRestSeconds: 180,
    ocrApplicationNote: 'Enables repeated surges to pass competitors before narrow singletrack bottlenecks.'
  },
  {
    id: 'anaero_airbike_sprints',
    name: 'Tabata AirBike Wattage Bursts',
    primaryDomain: 'anaerobic_capacity',
    secondaryDomains: ['muscular_endurance'],
    movementPattern: 'aerobic_locomotion',
    equipmentRequired: ['rower_or_airbike'],
    difficulty: 'intermediate',
    targetMuscles: ['Glycolytic System', 'Legs', 'Upper Body'],
    instructions: [
      '20 seconds all-out maximal wattage sprint (>600W for men, >450W for women).',
      '10 seconds slow pedal rest. Complete 8 rounds (4 total minutes).'
    ],
    coachingCues: ['Explosive drive from first second', 'Pull back hard with arms', 'Breathe through mouth on recovery'],
    commonMistakes: ['Stopping completely during 10s rest instead of soft recovery pedaling'],
    regressionExerciseIds: ['aero_airbike_zone2'],
    progressionExerciseIds: ['anaero_vo2max_hill_repeats'],
    substitutionExerciseIds: ['anaero_repeated_sprint_shuttles'],
    contraindications: [],
    defaultSets: 2,
    defaultRepsOrDuration: '8 rounds (20s on / 10s off)',
    defaultRpe: 10,
    defaultRestSeconds: 240,
    ocrApplicationNote: 'Buffering intense lactic acidosis while maintaining high neuromuscular output.'
  },

  // ==========================================
  // DOMAIN 4: MAXIMAL STRENGTH & RELATIVE STRENGTH
  // ==========================================
  {
    id: 'str_trap_bar_deadlift',
    name: 'Trap Bar Deadlift (Low Handle)',
    primaryDomain: 'maximal_strength',
    secondaryDomains: ['loaded_carries', 'core_stability'],
    movementPattern: 'hinge',
    equipmentRequired: ['barbell'],
    difficulty: 'intermediate',
    targetMuscles: ['Glutes', 'Hamstrings', 'Spinal Erectors', 'Traps', 'Forearms'],
    instructions: [
      'Stand inside hex bar with shins centered. Hinge at hips and grip low handles.',
      'Pack lats tight, pull slack out of bar, brace abdomen 360 degrees.',
      'Push floor away with legs to stand tall; squeeze glutes without hyperextending lower back.'
    ],
    coachingCues: ['Push floor away', 'Lats in back pockets', 'Crush the handles'],
    commonMistakes: ['Rounding lumbar spine under heavy pull', 'Jerking bar off floor'],
    regressionExerciseIds: ['str_kettlebell_goblet_squat'],
    progressionExerciseIds: ['str_barbell_back_squat'],
    substitutionExerciseIds: ['str_heavy_sandbag_deadlift'],
    contraindications: ['acute_lumbar_disc_herniation'],
    defaultSets: 4,
    defaultRepsOrDuration: '5 reps @ 80-85% 1RM',
    defaultRpe: 8,
    defaultRestSeconds: 150,
    ocrApplicationNote: 'Builds the raw chassis strength to hoist 100lb sandbags and climb steep ski trails.'
  },
  {
    id: 'str_barbell_back_squat',
    name: 'Barbell Back Squat',
    primaryDomain: 'maximal_strength',
    secondaryDomains: ['muscular_endurance', 'core_stability'],
    movementPattern: 'squat',
    equipmentRequired: ['barbell'],
    difficulty: 'advanced',
    targetMuscles: ['Quadriceps', 'Glutes', 'Adductors', 'Core'],
    instructions: [
      'Rest barbell securely across upper traps. Unrack and take 3 steps back.',
      'Inhale deeply and brace core. Descend until hip crease is below top of knees.',
      'Drive out of the hole spreading the floor with feet, keeping chest proud.'
    ],
    coachingCues: ['Spread the floor', 'Chest proud', 'Knees track over toes'],
    commonMistakes: ['Knees caving inward (valgus collapse)', 'Chest collapsing forward'],
    regressionExerciseIds: ['str_kettlebell_goblet_squat'],
    progressionExerciseIds: ['str_bulgarian_split_squat'],
    substitutionExerciseIds: ['str_kettlebell_goblet_squat'],
    contraindications: ['patellar_tendonitis'],
    defaultSets: 4,
    defaultRepsOrDuration: '5 reps @ 80% 1RM',
    defaultRpe: 8,
    defaultRestSeconds: 180,
    ocrApplicationNote: 'Develops leg horsepower and eccentric joint durability to prevent quad blowouts.'
  },
  {
    id: 'str_kettlebell_goblet_squat',
    name: 'Kettlebell Goblet Squat (Pause at Bottom)',
    primaryDomain: 'maximal_strength',
    secondaryDomains: ['mobility_durability', 'core_stability'],
    movementPattern: 'squat',
    equipmentRequired: ['kettlebells'],
    difficulty: 'beginner',
    targetMuscles: ['Quadriceps', 'Glutes', 'Anterior Core'],
    instructions: [
      'Hold kettlebell at chest by horns. Stand with feet slightly wider than hip-width.',
      'Squat down between knees, keeping elbows inside thighs. Pause for 2 seconds at bottom.',
      'Drive through midfoot to stand tall.'
    ],
    coachingCues: ['2-second pause at bottom', 'Tall chest', 'Elbows track inside knees'],
    commonMistakes: ['Curling upper back forward', 'Lifting heels off floor'],
    regressionExerciseIds: ['mob_deep_squat_prying'],
    progressionExerciseIds: ['str_barbell_back_squat', 'str_bulgarian_split_squat'],
    substitutionExerciseIds: ['str_bulgarian_split_squat'],
    contraindications: [],
    defaultSets: 3,
    defaultRepsOrDuration: '10-12 reps',
    defaultRpe: 7,
    defaultRestSeconds: 90,
    ocrApplicationNote: 'Teaches pristine squat mechanics and develops ankle/hip mobility under load.'
  },
  {
    id: 'str_weighted_pullup',
    name: 'Strict Weighted Pull-Up',
    primaryDomain: 'maximal_strength',
    secondaryDomains: ['grip_hanging', 'obstacle_skill'],
    movementPattern: 'vertical_pull',
    equipmentRequired: ['pullup_bar'],
    difficulty: 'advanced',
    targetMuscles: ['Latissimus Dorsi', 'Biceps', 'Rhomboids', 'Forearms'],
    instructions: [
      'Attach dip belt with weight plates or wear weighted vest.',
      'Take overhand grip on bar outside shoulder-width. Start from dead hang with active scapulae.',
      'Pull elbows down to ribs until chin clears bar cleanly without kipping. Lower with 2s control.'
    ],
    coachingCues: ['Pull bar down to chest', 'No swinging or kipping', '2-second eccentric lower'],
    commonMistakes: ['Kicking legs or using momentum', 'Shorting range of motion at bottom'],
    regressionExerciseIds: ['str_strict_bodyweight_pullup'],
    progressionExerciseIds: ['obs_rope_climb_technique'],
    substitutionExerciseIds: ['str_inverted_row_feet_elevated'],
    contraindications: ['acute_rotator_cuff_pain'],
    defaultSets: 4,
    defaultRepsOrDuration: '3-5 reps',
    defaultRpe: 8,
    defaultRestSeconds: 150,
    ocrApplicationNote: 'High relative pulling strength makes 8ft walls and rope climbs feel effortless.'
  },
  {
    id: 'str_strict_bodyweight_pullup',
    name: 'Strict Bodyweight Pull-Up (Dead Hang to Chin Over Bar)',
    primaryDomain: 'maximal_strength',
    secondaryDomains: ['grip_hanging'],
    movementPattern: 'vertical_pull',
    equipmentRequired: ['pullup_bar'],
    difficulty: 'intermediate',
    targetMuscles: ['Lats', 'Biceps', 'Grip Flexors'],
    instructions: [
      'Grip bar slightly wider than shoulders. Engage scapulae.',
      'Pull chin cleanly over bar. Pause momentarily, then lower with control to dead hang.'
    ],
    coachingCues: ['Chest to bar', 'Hollow core body position', 'Full extension at bottom'],
    commonMistakes: ['Kipping or swinging legs', 'Never reaching full arm extension at bottom'],
    regressionExerciseIds: ['str_inverted_row_feet_elevated'],
    progressionExerciseIds: ['str_weighted_pullup'],
    substitutionExerciseIds: ['str_inverted_row_feet_elevated'],
    contraindications: [],
    defaultSets: 4,
    defaultRepsOrDuration: '6-10 reps',
    defaultRpe: 8,
    defaultRestSeconds: 120,
    ocrApplicationNote: 'The baseline prerequisite for every rig, wall, and rope in OCR.'
  },
  {
    id: 'str_inverted_row_feet_elevated',
    name: 'Inverted Row (Bar or Rings)',
    primaryDomain: 'maximal_strength',
    secondaryDomains: ['core_stability'],
    movementPattern: 'horizontal_pull',
    equipmentRequired: ['rings_or_suspension', 'pullup_bar'],
    difficulty: 'beginner',
    targetMuscles: ['Upper Back', 'Rhomboids', 'Rear Delts', 'Biceps'],
    instructions: [
      'Set rings or barbell at waist height. Hang underneath with heels on floor or elevated box.',
      'Keep body in rigid plank. Pull chest to rings/bar, squeezing shoulder blades together.'
    ],
    coachingCues: ['Rigid plank body', 'Drive elbows back', 'Squeeze shoulder blades'],
    commonMistakes: ['Sagging hips', 'Craning neck forward to touch bar'],
    regressionExerciseIds: ['mob_deep_squat_prying'],
    progressionExerciseIds: ['str_strict_bodyweight_pullup'],
    substitutionExerciseIds: ['str_strict_bodyweight_pullup'],
    contraindications: [],
    defaultSets: 3,
    defaultRepsOrDuration: '10-12 reps',
    defaultRpe: 7,
    defaultRestSeconds: 90,
    ocrApplicationNote: 'Essential horizontal pulling armor for athletes working up to their first strict pull-up.'
  },
  {
    id: 'str_bulgarian_split_squat',
    name: 'Dumbbell Bulgarian Split Squat',
    primaryDomain: 'maximal_strength',
    secondaryDomains: ['mobility_durability', 'core_stability'],
    movementPattern: 'lunge_unilateral',
    equipmentRequired: ['dumbbells', 'box_or_bench'],
    difficulty: 'intermediate',
    targetMuscles: ['Quadriceps', 'Glutes', 'Adductors', 'Foot Stabilizers'],
    instructions: [
      'Place top of rear foot on bench behind you. Hold dumbbells in each hand.',
      'Lower hips straight down until back knee hovers 1 inch above floor.',
      'Drive through front heel and midfoot to return to top.'
    ],
    coachingCues: ['Torso slight forward lean', 'Front knee stable over middle toe', 'Controlled 3s descent'],
    commonMistakes: ['Pushing front knee excessively forward off heel', 'Arching lower back'],
    regressionExerciseIds: ['str_kettlebell_goblet_squat'],
    progressionExerciseIds: ['str_barbell_back_squat'],
    substitutionExerciseIds: ['str_kettlebell_goblet_squat'],
    contraindications: [],
    defaultSets: 3,
    defaultRepsOrDuration: '8 reps per leg',
    defaultRpe: 8,
    defaultRestSeconds: 90,
    ocrApplicationNote: 'Eliminates side-to-side strength asymmetries and armors knees against single-leg rock landings.'
  },

  // ==========================================
  // DOMAIN 5: GRIP, HANGING & FOREARM
  // ==========================================
  {
    id: 'grip_active_dead_hang',
    name: 'Active Bar Dead Hang (Scapular Engagement)',
    primaryDomain: 'grip_hanging',
    secondaryDomains: ['core_stability', 'mobility_durability'],
    movementPattern: 'hanging_brachiation',
    equipmentRequired: ['pullup_bar'],
    difficulty: 'beginner',
    targetMuscles: ['Grip Flexors', 'Lower Trapezius', 'Lats'],
    instructions: [
      'Hang from bar with full thumb-around grip.',
      'Depress shoulder blades away from ears into active scapular hang (do not hang passive on ligaments).',
      'Brace core, keep legs glued together in hollow body posture, breathe steadily.'
    ],
    coachingCues: ['Ears away from shoulders', 'Crush the bar', 'Hollow core'],
    commonMistakes: ['Passive hanging with shoulders touching ears', 'Swinging legs'],
    regressionExerciseIds: ['grip_towel_pinch_hold'],
    progressionExerciseIds: ['grip_fat_bar_dead_hang', 'grip_single_arm_bar_hang'],
    substitutionExerciseIds: ['grip_farmer_carry_hold'],
    contraindications: ['acute_shoulder_impingement'],
    defaultSets: 4,
    defaultRepsOrDuration: '45-60s hold',
    defaultRpe: 8,
    defaultRestSeconds: 90,
    ocrApplicationNote: 'Fundamental prerequisite for waiting, re-gripping, and conquering multi-rigs.'
  },
  {
    id: 'grip_fat_bar_dead_hang',
    name: 'Fat-Grip / Thick Pipe Dead Hang',
    primaryDomain: 'grip_hanging',
    secondaryDomains: ['maximal_strength'],
    movementPattern: 'hanging_brachiation',
    equipmentRequired: ['pullup_bar'],
    difficulty: 'intermediate',
    targetMuscles: ['Deep Finger Flexors', 'Brachioradialis'],
    instructions: [
      'Attach thick grips (Fat Gripz) or hang from 2-inch scaffold pipe.',
      'Maintain active scapular tension, squeezing fingers aggressively into rubber/metal.',
      'Hold for max prescribed duration without opening finger grip.'
    ],
    coachingCues: ['Wrap thumbs around', 'Squeeze till knuckles turn white', 'Slow nasal exhale'],
    commonMistakes: ['Letting thumb open up and hanging on fingertips'],
    regressionExerciseIds: ['grip_active_dead_hang'],
    progressionExerciseIds: ['grip_single_arm_bar_hang'],
    substitutionExerciseIds: ['grip_towel_pullups'],
    contraindications: [],
    defaultSets: 4,
    defaultRepsOrDuration: '30-45s hold',
    defaultRpe: 9,
    defaultRestSeconds: 120,
    ocrApplicationNote: 'Prepares forearms for thick Spartan pipe traverses and muddy monkey bars.'
  },
  {
    id: 'grip_towel_pullups',
    name: 'Vertical Towel Grip Pull-Ups',
    primaryDomain: 'grip_hanging',
    secondaryDomains: ['maximal_strength', 'obstacle_skill'],
    movementPattern: 'vertical_pull',
    equipmentRequired: ['pullup_bar'],
    difficulty: 'advanced',
    targetMuscles: ['Crush Grip Flexors', 'Lats', 'Biceps'],
    instructions: [
      'Drape two thick gym towels over a pull-up bar.',
      'Grip cloth vertically with both hands. Pull chest up to bar level.',
      'Lower with 2-second eccentric control.'
    ],
    coachingCues: ['Squeeze cloth tight', 'Vertical fist alignment', 'Controlled descent'],
    commonMistakes: ['Letting towel slide through hands on ascent'],
    regressionExerciseIds: ['grip_active_dead_hang'],
    progressionExerciseIds: ['obs_rope_climb_technique'],
    substitutionExerciseIds: ['grip_fat_bar_dead_hang'],
    contraindications: [],
    defaultSets: 3,
    defaultRepsOrDuration: '6-8 reps',
    defaultRpe: 9,
    defaultRestSeconds: 120,
    ocrApplicationNote: 'Directly mimics holding slippery synthetic ropes on Spartan Slip Wall and Rope Climb.'
  },
  {
    id: 'grip_single_arm_bar_hang',
    name: 'Single-Arm Active Bar Hang',
    primaryDomain: 'grip_hanging',
    secondaryDomains: ['core_stability'],
    movementPattern: 'hanging_brachiation',
    equipmentRequired: ['pullup_bar'],
    difficulty: 'elite',
    targetMuscles: ['Unilateral Grip Flexors', 'Rotator Cuff', 'Lats'],
    instructions: [
      'Hang from bar with one hand. Engage shoulder blade and lat to prevent spinning.',
      'Place free hand behind back or across chest.',
      'Hold steady for time before switching arms.'
    ],
    coachingCues: ['Resist rotational spin', 'Active shoulder packed', 'Crush bar with fingers'],
    commonMistakes: ['Letting shoulder dislocate into ear', 'Violent spinning on bar'],
    regressionExerciseIds: ['grip_active_dead_hang'],
    progressionExerciseIds: ['obs_multi_rig_dynamic_traverse'],
    substitutionExerciseIds: ['grip_fat_bar_dead_hang'],
    contraindications: ['labrum_tear', 'shoulder_instability'],
    defaultSets: 3,
    defaultRepsOrDuration: '15-25s per arm',
    defaultRpe: 9,
    defaultRestSeconds: 90,
    ocrApplicationNote: 'Required to hang and shake out tired forearms in the middle of a 40ft Spartan Twister.'
  },
  {
    id: 'grip_towel_pinch_hold',
    name: 'Two-Handed Smooth Plate Pinch Hold',
    primaryDomain: 'grip_hanging',
    secondaryDomains: ['maximal_strength'],
    movementPattern: 'loaded_carry',
    equipmentRequired: ['barbell'],
    difficulty: 'intermediate',
    targetMuscles: ['Thumb Adductors', 'Pinch Grip Muscles'],
    instructions: [
      'Pinch two 25lb Olympic plates smooth-sides-out between thumb and four fingers.',
      'Stand upright with shoulders back and hold for max duration.'
    ],
    coachingCues: ['Lock thumb over rim', 'Tall posture', 'Keep plates clamped together'],
    commonMistakes: ['Resting plates against thighs'],
    regressionExerciseIds: ['grip_active_dead_hang'],
    progressionExerciseIds: ['grip_fat_bar_dead_hang'],
    substitutionExerciseIds: ['carries_heavy_farmer_walk'],
    contraindications: [],
    defaultSets: 3,
    defaultRepsOrDuration: '30-45s hold',
    defaultRpe: 8,
    defaultRestSeconds: 90,
    ocrApplicationNote: 'Direct transfer to Spartan Olympus Wall climbing blocks and Tough Mudder Funky Monkey rungs.'
  },

  // ==========================================
  // DOMAIN 6: LOADED CARRY PERFORMANCE
  // ==========================================
  {
    id: 'carries_heavy_farmer_walk',
    name: 'Heavy Dumbbell / Trap Bar Farmer Carry',
    primaryDomain: 'loaded_carries',
    secondaryDomains: ['grip_hanging', 'core_stability'],
    movementPattern: 'loaded_carry',
    equipmentRequired: ['dumbbells', 'barbell'],
    difficulty: 'intermediate',
    targetMuscles: ['Grip', 'Traps', 'Obliques', 'Glutes', 'Calves'],
    instructions: [
      'Deadlift heavy dumbbells (50-70% bodyweight total) or trap bar to sides.',
      'Walk with short, rhythmic, deliberate steps keeping torso vertical.',
      'Do not allow weights to swing or bounce off thighs.'
    ],
    coachingCues: ['Shoulders pinned back and down', 'Small rapid steps', 'Breathe into abdominal brace'],
    commonMistakes: ['Leaning forward and letting bells pull shoulders into slouch'],
    regressionExerciseIds: ['grip_active_dead_hang'],
    progressionExerciseIds: ['carries_uphill_sandbag_march'],
    substitutionExerciseIds: ['carries_bearhug_sandbag_carry'],
    contraindications: [],
    defaultSets: 4,
    defaultRepsOrDuration: '50m unbroken',
    defaultRpe: 8,
    defaultRestSeconds: 90,
    ocrApplicationNote: 'Crushes standard double-handle farmer carry obstacles without dropping weights.'
  },
  {
    id: 'carries_bearhug_sandbag_carry',
    name: 'Bear-Hug Sandbag Carry (Chest Carry)',
    primaryDomain: 'loaded_carries',
    secondaryDomains: ['aerobic_endurance', 'core_stability'],
    movementPattern: 'loaded_carry',
    equipmentRequired: ['sandbag_heavy_carries'],
    difficulty: 'intermediate',
    targetMuscles: ['Biceps', 'Rhomboids', 'Anterior Core', 'Erectors', 'Quads'],
    instructions: [
      'Lap 60-80lb sandbag from floor, wrap arms tightly around center in bear hug.',
      'Stand upright, pinning bag against sternum.',
      'Walk briskly with high step turnover, maintaining rhythmic breathing despite compressed ribcage.'
    ],
    coachingCues: ['Squeeze bag into ribcage', 'Elbows under bag', 'Rhythmic cadence'],
    commonMistakes: ['Allowing bag to slide down to belt level, causing severe lumbar hyperextension'],
    regressionExerciseIds: ['carries_heavy_farmer_walk'],
    progressionExerciseIds: ['carries_uphill_sandbag_march'],
    substitutionExerciseIds: ['carries_bucket_brigade_carry'],
    contraindications: ['acute_lumbar_disc_herniation'],
    defaultSets: 4,
    defaultRepsOrDuration: '100m continuous',
    defaultRpe: 8,
    defaultRestSeconds: 120,
    ocrApplicationNote: 'Direct simulation of Spartan Sandbag Carry and Tough Mudder Block Ness carries.'
  },
  {
    id: 'carries_uphill_sandbag_march',
    name: 'Mountain Incline Sandbag Carry Repeats',
    primaryDomain: 'loaded_carries',
    secondaryDomains: ['running_terrain', 'muscular_endurance'],
    movementPattern: 'loaded_carry',
    equipmentRequired: ['sandbag_heavy_carries'],
    difficulty: 'advanced',
    targetMuscles: ['Quadriceps', 'Glutes', 'Calves', 'Cardiovascular System'],
    instructions: [
      'Hoist 60-80lb sandbag onto one shoulder or in bear hug.',
      'Climb 15-20% grade hill for 100m unbroken without dropping bag to ground.',
      'Walk down slowly carrying bag or resting bag at top.'
    ],
    coachingCues: ['Maintain forward lean', 'Pinch bag tight', 'Steady nasal-oral breath exchange'],
    commonMistakes: ['Dropping bag multiple times due to starting at unsustainable sprint pace'],
    regressionExerciseIds: ['carries_bearhug_sandbag_carry'],
    progressionExerciseIds: ['ocr_compromised_carry_to_run_intervals'],
    substitutionExerciseIds: ['carries_bucket_brigade_carry'],
    contraindications: [],
    defaultSets: 4,
    defaultRepsOrDuration: '100m climb @ 15% grade',
    defaultRpe: 9,
    defaultRestSeconds: 150,
    ocrApplicationNote: 'Prepares for the infamous Killington Beast sandbag carry up the double-black-diamond ski slope.'
  },
  {
    id: 'carries_bucket_brigade_carry',
    name: 'Bucket Brigade Rim Carry (Gravel/Sand Bucket)',
    primaryDomain: 'loaded_carries',
    secondaryDomains: ['grip_hanging'],
    movementPattern: 'loaded_carry',
    equipmentRequired: ['sandbag_heavy_carries'],
    difficulty: 'advanced',
    targetMuscles: ['Finger Flexors', 'Forearms', 'Chest', 'Biceps', 'Core'],
    instructions: [
      'Fill 5-gallon bucket with 50-70lbs of sand/gravel.',
      'Clasp hands around bottom rim or lock fingers together beneath base. Keep elbows bent at 90°.',
      'Walk with short steps. Do not rest bucket on thighs or shoulders (Spartan disqualification rule).'
    ],
    coachingCues: ['Grip bottom rim with fingers', 'Elbows tight to ribs', 'Zero rest on thighs'],
    commonMistakes: ['Resting bucket on front of hip or thighs', 'Letting bucket bounce into groin'],
    regressionExerciseIds: ['carries_bearhug_sandbag_carry'],
    progressionExerciseIds: ['carries_uphill_sandbag_march'],
    substitutionExerciseIds: ['carries_bearhug_sandbag_carry'],
    contraindications: [],
    defaultSets: 3,
    defaultRepsOrDuration: '100m unbroken',
    defaultRpe: 9,
    defaultRestSeconds: 120,
    ocrApplicationNote: 'Replicates Spartan Bucket Brigade rules and develops ruthless forearm carrying endurance.'
  },

  // ==========================================
  // DOMAIN 7: MUSCULAR ENDURANCE & FATIGUE RESISTANCE
  // ==========================================
  {
    id: 'endur_spartan_penalty_burpees',
    name: 'Spartan Chest-to-Ground Burpee Intervals',
    primaryDomain: 'muscular_endurance',
    secondaryDomains: ['anaerobic_capacity'],
    movementPattern: 'aerobic_locomotion',
    equipmentRequired: ['bodyweight_only'],
    difficulty: 'intermediate',
    targetMuscles: ['Whole Body', 'Chest', 'Triceps', 'Hip Flexors', 'Lungs'],
    instructions: [
      'Drop chest and thighs completely flat onto floor.',
      'Press up explosively, snap feet forward under hips.',
      'Jump vertically with both feet clearing floor and hands clapping overhead.'
    ],
    coachingCues: ['Full chest contact', 'Spring feet under hips', 'Maintain steady pacing rhythm'],
    commonMistakes: ['Doing push-up half-way', 'Not jumping or clapping overhead (illegal in Spartan)'],
    regressionExerciseIds: ['endur_bodyweight_squats_burnout'],
    progressionExerciseIds: ['ocr_compromised_carry_to_run_intervals'],
    substitutionExerciseIds: ['endur_bodyweight_squats_burnout'],
    contraindications: [],
    defaultSets: 3,
    defaultRepsOrDuration: '30 burpees for time',
    defaultRpe: 9,
    defaultRestSeconds: 120,
    ocrApplicationNote: 'Conditions athlete to knock out standard 30-burpee penalty loops in under 100 seconds.'
  },
  {
    id: 'endur_bodyweight_squats_burnout',
    name: 'High-Density Walking Lunges & Squats',
    primaryDomain: 'muscular_endurance',
    secondaryDomains: ['running_terrain'],
    movementPattern: 'lunge_unilateral',
    equipmentRequired: ['bodyweight_only'],
    difficulty: 'intermediate',
    targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
    instructions: [
      'Perform 100 continuous walking lunges followed immediately by 50 air squats without rest.',
      'Keep torso upright and tap back knee gently to floor on each lunge step.'
    ],
    coachingCues: ['Continuous movement', 'Gentle knee tap', 'Full hip lock out at top of squat'],
    commonMistakes: ['Stopping to rest every 10 steps', 'Half-depth lunges'],
    regressionExerciseIds: ['str_kettlebell_goblet_squat'],
    progressionExerciseIds: ['endur_spartan_penalty_burpees'],
    substitutionExerciseIds: ['run_power_hiking_slope'],
    contraindications: [],
    defaultSets: 2,
    defaultRepsOrDuration: '100 lunges + 50 squats',
    defaultRpe: 8,
    defaultRestSeconds: 180,
    ocrApplicationNote: 'Builds quad fatigue tolerance for late-race miles after miles of climbing.'
  },

  // ==========================================
  // DOMAIN 8: POWER, EXPLOSIVENESS & SPEED
  // ==========================================
  {
    id: 'pwr_box_jump_rebound',
    name: 'Explosive Box Jumps (Step-Down)',
    primaryDomain: 'power_speed',
    secondaryDomains: ['maximal_strength'],
    movementPattern: 'jumping_plyometric',
    equipmentRequired: ['box_or_bench'],
    difficulty: 'intermediate',
    targetMuscles: ['Glutes', 'Quads', 'Calves', 'CNS'],
    instructions: [
      'Stand in athletic stance facing 24-30 inch plyo box.',
      'Hinge hips and swing arms back, then explode vertically extending hips, knees, and ankles.',
      'Land softly in partial squat on box. Step down one foot at a time to protect Achilles tendons.'
    ],
    coachingCues: ['Explosive hip snap', 'Silent landing like a cat', 'Step down, do not rebound jump off box'],
    commonMistakes: ['Landing stiff-legged', 'Rebounding backwards off box risking Achilles rupture'],
    regressionExerciseIds: ['pwr_broad_jump_stick'],
    progressionExerciseIds: ['obs_wall_vault_heel_hook'],
    substitutionExerciseIds: ['pwr_broad_jump_stick'],
    contraindications: ['acute_achilles_tendonitis'],
    defaultSets: 4,
    defaultRepsOrDuration: '5 reps',
    defaultRpe: 8,
    defaultRestSeconds: 90,
    ocrApplicationNote: 'Gives the explosive vertical pop needed to jump and grab top edges of 8-foot walls.'
  },
  {
    id: 'pwr_broad_jump_stick',
    name: 'Standing Broad Jump with Stick Landing',
    primaryDomain: 'power_speed',
    secondaryDomains: ['mobility_durability'],
    movementPattern: 'jumping_plyometric',
    equipmentRequired: ['bodyweight_only'],
    difficulty: 'beginner',
    targetMuscles: ['Glutes', 'Hamstrings', 'Knee Stabilizers'],
    instructions: [
      'Swing arms and load hips into athletic hinge.',
      'Launch forward horizontally as far as possible.',
      'Land on two feet absorbing impact into hips and knees, holding "stick" landing for 2 seconds.'
    ],
    coachingCues: ['Stick the landing for 2s', 'Knees tracking over toes', 'Full horizontal launch'],
    commonMistakes: ['Falling forward or backward on landing'],
    regressionExerciseIds: ['str_kettlebell_goblet_squat'],
    progressionExerciseIds: ['pwr_box_jump_rebound'],
    substitutionExerciseIds: ['pwr_box_jump_rebound'],
    contraindications: [],
    defaultSets: 4,
    defaultRepsOrDuration: '5 reps',
    defaultRpe: 7,
    defaultRestSeconds: 60,
    ocrApplicationNote: 'Clearing ditch crossings and mud pits without tumbling into the muck.'
  },

  // ==========================================
  // DOMAIN 9: CORE, STABILITY & FORCE TRANSFER
  // ==========================================
  {
    id: 'core_mcgill_big_three',
    name: 'McGill Core Protocol (Curl-up, Side Plank, Bird-Dog)',
    primaryDomain: 'core_stability',
    secondaryDomains: ['mobility_durability'],
    movementPattern: 'core_anti_extension',
    equipmentRequired: ['bodyweight_only'],
    difficulty: 'beginner',
    targetMuscles: ['Transverse Abdominis', 'Quadratus Lumborum', 'Multifidus', 'Glutes'],
    instructions: [
      'Execute McGill Curl-Up: 5 reps with 8-second isometric hold per side.',
      'Execute Elevated Side Plank: 3 reps of 10-second hold per side with pelvis locked in neutral.',
      'Execute Bird-Dog: 5 reps per side with 8-second hold extending opposite arm and heel.'
    ],
    coachingCues: ['360-degree brace', 'Zero lumbar flexion', 'Squeeze glute at full extension'],
    commonMistakes: ['Twisting spine during side plank or hyperextending lower back in bird-dog'],
    regressionExerciseIds: ['core_rkc_plank_hold'],
    progressionExerciseIds: ['core_ab_wheel_rollout'],
    substitutionExerciseIds: ['core_rkc_plank_hold'],
    contraindications: [],
    defaultSets: 3,
    defaultRepsOrDuration: 'Pyramid holds (10s-8s-6s)',
    defaultRpe: 6,
    defaultRestSeconds: 60,
    ocrApplicationNote: 'Locks spinal stiffness to transfer leg power directly into arm pulling on obstacles.'
  },
  {
    id: 'core_ab_wheel_rollout',
    name: 'Ab Wheel Rollout (From Knees to Toes)',
    primaryDomain: 'core_stability',
    secondaryDomains: ['maximal_strength'],
    movementPattern: 'core_anti_extension',
    equipmentRequired: ['box_or_bench'],
    difficulty: 'intermediate',
    targetMuscles: ['Rectus Abdominis', 'Lats', 'Serratus Anterior'],
    instructions: [
      'Kneel on mat with wheel directly beneath shoulders.',
      'Brace core in slight hollow body posture. Roll wheel forward until chest is 2 inches above floor.',
      'Contract lats and abs to pull wheel back to starting position without sagging lumbar spine.'
    ],
    coachingCues: ['Hollow body first', 'Do not let lower back arch', 'Pull with lats and abs'],
    commonMistakes: ['Hyperextending lower back at end range of extension'],
    regressionExerciseIds: ['core_mcgill_big_three'],
    progressionExerciseIds: ['core_ab_wheel_rollout'],
    substitutionExerciseIds: ['core_mcgill_big_three'],
    contraindications: ['acute_lumbar_pain'],
    defaultSets: 3,
    defaultRepsOrDuration: '8-10 reps',
    defaultRpe: 8,
    defaultRestSeconds: 90,
    ocrApplicationNote: 'Prevents spinal hyperextension during low barbed wire crawls and heavy sandbag carries.'
  },

  // ==========================================
  // DOMAIN 10: MOVEMENT SKILL & OBSTACLE ABILITY
  // ==========================================
  {
    id: 'obs_wall_vault_heel_hook',
    name: '8-Foot Wall Solo Clearance (Heel-Hook Technique)',
    primaryDomain: 'obstacle_skill',
    secondaryDomains: ['maximal_strength', 'power_speed'],
    movementPattern: 'obstacle_technique',
    equipmentRequired: ['ocr_rig_access'],
    difficulty: 'intermediate',
    targetMuscles: ['Lats', 'Triceps', 'Hamstrings', 'Core'],
    instructions: [
      'Approach wall with 3 aggressive strides. Plant lead foot high on wooden face.',
      'Jump up, hooking both hands over top rail with fingers flat.',
      'Swing leg up and hook heel over top edge of wall. Pull with hamstring while pressing with arms to roll over.'
    ],
    coachingCues: ['High foot kick on wall', 'Swing heel up and over', 'Roll hip onto top rail'],
    commonMistakes: ['Trying to do a pure muscle-up without using legs or foot traction on wall'],
    regressionExerciseIds: ['str_strict_bodyweight_pullup'],
    progressionExerciseIds: ['obs_multi_rig_dynamic_traverse'],
    substitutionExerciseIds: ['str_strict_bodyweight_pullup'],
    contraindications: [],
    defaultSets: 4,
    defaultRepsOrDuration: '3 wall clears with 60s rest',
    defaultRpe: 8,
    defaultRestSeconds: 90,
    ocrApplicationNote: 'Enables solo clearance of 7ft and 8ft walls in under 4 seconds without assistance.'
  },
  {
    id: 'obs_rope_climb_technique',
    name: '16ft Rope Climb with J-Hook Foot Lock',
    primaryDomain: 'obstacle_skill',
    secondaryDomains: ['grip_hanging', 'maximal_strength'],
    movementPattern: 'obstacle_technique',
    equipmentRequired: ['ocr_rig_access'],
    difficulty: 'intermediate',
    targetMuscles: ['Grip', 'Biceps', 'Adductors', 'Core'],
    instructions: [
      'Jump high onto rope. Let rope drop down outside of right shin, under right foot, and across top of left foot.',
      'Clamp left foot down onto right foot, locking rope in J-Hook clamp.',
      'Stand up tall on feet, extending legs completely before sliding hands up to next grip.'
    ],
    coachingCues: ['Feet take 90% of weight', 'High knees into chest', 'Clamp tight with opposite foot'],
    commonMistakes: ['Trying to pull entire bodyweight with arms without locking feet on rope'],
    regressionExerciseIds: ['str_strict_bodyweight_pullup'],
    progressionExerciseIds: ['obs_multi_rig_dynamic_traverse'],
    substitutionExerciseIds: ['grip_towel_pullups'],
    contraindications: [],
    defaultSets: 4,
    defaultRepsOrDuration: '2 full climbs',
    defaultRpe: 8,
    defaultRestSeconds: 120,
    ocrApplicationNote: 'Guarantees 100% completion on wet, muddy ropes with zero arm pump.'
  },
  {
    id: 'obs_multi_rig_dynamic_traverse',
    name: 'Multi-Rig Beat Swing & Transition Mastery',
    primaryDomain: 'obstacle_skill',
    secondaryDomains: ['grip_hanging', 'power_speed'],
    movementPattern: 'hanging_brachiation',
    equipmentRequired: ['ocr_rig_access'],
    difficulty: 'advanced',
    targetMuscles: ['Lats', 'Grip Flexors', 'Abdominals'],
    instructions: [
      'Mount first ring or bar with active scapular tension.',
      'Generate rhythmic hollow-to-arch beat swings driven from hips, not kicking legs.',
      'Release trailing hand at apex of forward swing, grabbing next hold (pipe/ball/nunchuck) smoothly.'
    ],
    coachingCues: ['Drive swing from hips', 'Reach at weightless apex', 'Keep eyes on next target hold'],
    commonMistakes: ['Stopping dead in dead hang with zero momentum between holds'],
    regressionExerciseIds: ['grip_active_dead_hang'],
    progressionExerciseIds: ['ocr_compromised_rig_simulation'],
    substitutionExerciseIds: ['grip_single_arm_bar_hang'],
    contraindications: [],
    defaultSets: 4,
    defaultRepsOrDuration: 'Full 30ft rig traverse',
    defaultRpe: 9,
    defaultRestSeconds: 120,
    ocrApplicationNote: 'Saves competitors from taking the 30-burpee penalty on the hardest obstacle of the race.'
  },

  // ==========================================
  // DOMAIN 11: MOBILITY, DURABILITY & TISSUE
  // ==========================================
  {
    id: 'mob_ankle_dorsiflexion_banded',
    name: 'Banded Ankle Mobilization & Slant Board Stretch',
    primaryDomain: 'mobility_durability',
    secondaryDomains: ['running_terrain'],
    movementPattern: 'aerobic_locomotion',
    equipmentRequired: ['bodyweight_only'],
    difficulty: 'beginner',
    targetMuscles: ['Talocrural Joint', 'Soleus', 'Gastrocnemius', 'Achilles'],
    instructions: [
      'Loop heavy resistance band low around front ankle crease.',
      'Drive knee forward over middle toe while keeping heel glued to floor.',
      'Hold end range for 2 seconds, pulsing for 15 reps per ankle.'
    ],
    coachingCues: ['Keep heel firmly on floor', 'Drive knee straight over middle toe', 'Band pulls talus backward'],
    commonMistakes: ['Heel lifting off floor'],
    regressionExerciseIds: ['mob_deep_squat_prying'],
    progressionExerciseIds: ['mob_hip_90_90_flow'],
    substitutionExerciseIds: ['mob_deep_squat_prying'],
    contraindications: [],
    defaultSets: 2,
    defaultRepsOrDuration: '15 pulses per side',
    defaultRpe: 5,
    defaultRestSeconds: 30,
    ocrApplicationNote: 'Prevents Achilles tendinopathy and allows deep ankle flexion on steep mountain ascents.'
  },
  {
    id: 'mob_hip_90_90_flow',
    name: 'Hip 90/90 Active Internal & External Rotations',
    primaryDomain: 'mobility_durability',
    secondaryDomains: ['maximal_strength'],
    movementPattern: 'squat',
    equipmentRequired: ['bodyweight_only'],
    difficulty: 'beginner',
    targetMuscles: ['Hip Capsule', 'Piriformis', 'Glute Medius', 'Adductors'],
    instructions: [
      'Sit on floor with both legs bent at 90-degree angles.',
      'Rotate hips up and over to opposite side without using hands for support.',
      'Keep torso proud and tall throughout the transition.'
    ],
    coachingCues: ['Hands off floor if possible', 'Rotate through both hip capsules', 'Stay tall'],
    commonMistakes: ['Slouching spine or bouncing into hips'],
    regressionExerciseIds: ['mob_ankle_dorsiflexion_banded'],
    progressionExerciseIds: ['mob_deep_squat_prying'],
    substitutionExerciseIds: ['mob_ankle_dorsiflexion_banded'],
    contraindications: [],
    defaultSets: 2,
    defaultRepsOrDuration: '10 transitions',
    defaultRpe: 5,
    defaultRestSeconds: 30,
    ocrApplicationNote: 'Restores hip mobility required to hurdle walls and crawl through mud trenches.'
  },
  {
    id: 'mob_deep_squat_prying',
    name: 'Prying Goblet Squat & Thoracic Opener',
    primaryDomain: 'mobility_durability',
    secondaryDomains: ['core_stability'],
    movementPattern: 'squat',
    equipmentRequired: ['kettlebells'],
    difficulty: 'beginner',
    targetMuscles: ['Thoracic Spine', 'Adductors', 'Ankles', 'Hips'],
    instructions: [
      'Sink into deepest comfortable squat holding light dumbbell or kettlebell.',
      'Use elbows to pry knees apart, opening chest and rotating one arm towards ceiling.',
      'Breathe deeply into pelvis for 60 seconds.'
    ],
    coachingCues: ['Long spine', 'Elbows wedge knees apart', 'Deep belly breaths'],
    commonMistakes: ['Rounding back like a turtle'],
    regressionExerciseIds: ['mob_ankle_dorsiflexion_banded'],
    progressionExerciseIds: ['str_kettlebell_goblet_squat'],
    substitutionExerciseIds: ['mob_hip_90_90_flow'],
    contraindications: [],
    defaultSets: 2,
    defaultRepsOrDuration: '60s hold',
    defaultRpe: 5,
    defaultRestSeconds: 30,
    ocrApplicationNote: 'Daily joint hygiene for hips, ankles, and spine.'
  },

  // ==========================================
  // DOMAIN 12: RACE PHYSIOLOGY, FUELING & ENVIRONMENT
  // ==========================================
  {
    id: 'phys_gut_training_simulation',
    name: 'High-Pace Gut Training (60-80g Carbs/Hour)',
    primaryDomain: 'race_physiology',
    secondaryDomains: ['aerobic_endurance'],
    movementPattern: 'aerobic_locomotion',
    equipmentRequired: ['running_shoes'],
    difficulty: 'intermediate',
    targetMuscles: ['Gastrointestinal System', 'Metabolic Pathways'],
    instructions: [
      'During a 90-minute tempo trail run, consume 1 energy gel or 25g carb liquid every 20 minutes.',
      'Sip 500-750ml of electrolyte water per hour.',
      'Condition stomach to empty fluid and carbohydrates while heart rate is elevated at 155-165 BPM.'
    ],
    coachingCues: ['Gel every 20 mins on timer', 'Small frequent sips', 'Monitor stomach tolerance'],
    commonMistakes: ['Waiting until feeling thirsty or bonking before consuming carbs'],
    regressionExerciseIds: ['aero_zone2_continuous_trail'],
    progressionExerciseIds: ['ocr_full_race_simulation_wod'],
    substitutionExerciseIds: ['aero_zone2_continuous_trail'],
    contraindications: [],
    defaultSets: 1,
    defaultRepsOrDuration: '90-min trail run with 60g carb/hr',
    defaultRpe: 7,
    defaultRestSeconds: 0,
    ocrApplicationNote: 'Eliminates mid-race nausea, bonking, and catastrophic cramping deep into Beast/Ultra courses.'
  },

  // ==========================================
  // HYBRID OCR INTEGRATION SESSIONS (CROSS-DOMAIN)
  // ==========================================
  {
    id: 'ocr_compromised_carry_to_run_intervals',
    name: 'Compromised Carry-to-Run Transitions',
    primaryDomain: 'loaded_carries',
    secondaryDomains: ['aerobic_endurance', 'running_terrain'],
    movementPattern: 'aerobic_locomotion',
    equipmentRequired: ['sandbag_heavy_carries', 'trail_shoes'],
    difficulty: 'advanced',
    targetMuscles: ['Whole Body', 'Quads', 'Grip', 'Lungs'],
    instructions: [
      'Carry 60lb sandbag for 200m as fast as possible.',
      'Drop sandbag and immediately sprint 800m at 5K race pace with zero pause.',
      'Rest 2 minutes. Complete 4 rounds. Track pace decay across the 800m run intervals.'
    ],
    coachingCues: ['Drop bag and sprint immediately', 'Open stride despite heavy quads', 'Find running rhythm in first 50m'],
    commonMistakes: ['Walking for 30 seconds after dropping bag before starting to run'],
    regressionExerciseIds: ['carries_bearhug_sandbag_carry'],
    progressionExerciseIds: ['ocr_full_race_simulation_wod'],
    substitutionExerciseIds: ['carries_uphill_sandbag_march'],
    contraindications: [],
    defaultSets: 4,
    defaultRepsOrDuration: '200m Carry + 800m Run',
    defaultRpe: 9,
    defaultRestSeconds: 120,
    ocrApplicationNote: 'Conditions legs to overcome the "concrete quad" phenomenon when exiting heavy sandbag loops.'
  },
  {
    id: 'ocr_compromised_rig_simulation',
    name: 'Fatigued Grip & Rig Gauntlet',
    primaryDomain: 'grip_hanging',
    secondaryDomains: ['anaerobic_capacity', 'obstacle_skill'],
    movementPattern: 'hanging_brachiation',
    equipmentRequired: ['rower_or_airbike', 'ocr_rig_access'],
    difficulty: 'advanced',
    targetMuscles: ['Grip Flexors', 'Lats', 'Lactate System'],
    instructions: [
      'Sprint 500m on rower or 20 cals on Echo Bike at max effort.',
      'Step off immediately and mount pull-up bar / multi-rig.',
      'Perform 5 strict pull-ups + 45-second dead hang without touching floor.'
    ],
    coachingCues: ['Jump to bar with lungs burning', 'Deep calm nasal breaths while hanging', 'Fight for every second'],
    commonMistakes: ['Resting chalking hands for 2 minutes between bike and rig'],
    regressionExerciseIds: ['grip_active_dead_hang'],
    progressionExerciseIds: ['ocr_full_race_simulation_wod'],
    substitutionExerciseIds: ['grip_fat_bar_dead_hang'],
    contraindications: [],
    defaultSets: 4,
    defaultRepsOrDuration: 'Row + Hang complex',
    defaultRpe: 9,
    defaultRestSeconds: 150,
    ocrApplicationNote: 'Replicates obstacle execution under severe cardiovascular and systemic blood lactate fatigue.'
  },
  {
    id: 'ocr_full_race_simulation_wod',
    name: 'Championship Race Simulation Circuit',
    primaryDomain: 'obstacle_skill',
    secondaryDomains: ['aerobic_endurance', 'loaded_carries', 'grip_hanging'],
    movementPattern: 'aerobic_locomotion',
    equipmentRequired: ['trail_shoes', 'sandbag_heavy_carries', 'ocr_rig_access'],
    difficulty: 'elite',
    targetMuscles: ['Full Body', 'Mental Toughness'],
    instructions: [
      '1-Mile Trail Run at Threshold Pace.',
      '100m Heavy Sandbag Carry (60/80lb).',
      'Rig Traverse (Rings to Bar to Rope).',
      '30 Spartan Penalty Burpees.',
      '1-Mile Trail Run return.',
      'Repeat for 2-3 full rounds.'
    ],
    coachingCues: ['Pace control early', 'Fast fluid transitions', 'Flawless obstacle execution under fatigue'],
    commonMistakes: ['Going out too fast on mile 1 and failing the rig on round 2'],
    regressionExerciseIds: ['ocr_compromised_carry_to_run_intervals'],
    progressionExerciseIds: ['ocr_full_race_simulation_wod'],
    substitutionExerciseIds: ['ocr_compromised_carry_to_run_intervals'],
    contraindications: [],
    defaultSets: 2,
    defaultRepsOrDuration: '2 rounds full simulation',
    defaultRpe: 10,
    defaultRestSeconds: 300,
    ocrApplicationNote: 'The ultimate final dress rehearsal 2-3 weeks before peak championship events.'
  }
];

export function getExerciseById(id: string): ExerciseDefinition {
  const found = OCR_EXERCISE_DATABASE.find((e) => e.id === id);
  if (!found) {
    return OCR_EXERCISE_DATABASE[0];
  }
  return found;
}

export function filterExercisesForAthlete(
  athleteEquipment: string[],
  athleteInjuries: string[]
): ExerciseDefinition[] {
  return OCR_EXERCISE_DATABASE.filter((ex) => {
    // Check if athlete has at least one required equipment, or if it is bodyweight
    const hasEquipment = ex.equipmentRequired.every((req) => 
      req === 'bodyweight_only' || athleteEquipment.includes(req)
    );
    
    if (!hasEquipment) return false;

    // Check if exercise is contraindicated for any active injury
    const isContraindicated = ex.contraindications.some((contra) =>
      athleteInjuries.includes(contra)
    );

    return !isContraindicated;
  });
}
