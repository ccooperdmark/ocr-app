// Commercial-Grade Sports Nutrition & Fueling Engine for OCR Athletes
// Evidence-informed formulations conforming to ISSN, ACSM, and Olympic endurance standards.

import { Session } from '@/types/trainingPlan/plan';

export type TrainingDemandLevel = 'low' | 'moderate' | 'high' | 'very_high' | 'race_day';

export interface PeriWorkoutProtocol {
  timing: string;
  carbsGrams: number;
  proteinGrams: number;
  guideline: string;
  sampleFood: string;
}

export interface IntraWorkoutProtocol {
  needed: boolean;
  carbsPerHour: string;
  fluidPerHour: string;
  sodiumPerHour: string;
  guideline: string;
}

export interface HandPortionGuide {
  proteinPalms: number;
  carbCuppedHands: number;
  veggieFists: number;
  fatThumbs: number;
  summary: string;
}

export interface DailyNutritionTargets {
  demandLevel: TrainingDemandLevel;
  demandBadge: string;
  demandColor: string;
  demandTitle: string;
  nutritionEmphasis: string;
  
  targetCaloriesMin: number;
  targetCaloriesMax: number;
  targetProteinGrams: number;
  targetProteinPerKg: number;
  targetProteinPerLb: number;
  targetCarbsGrams: number;
  targetCarbsPerKg: number;
  targetFatGrams: number;
  targetFatPerKg: number;
  targetHydrationLiters: number;
  targetHydrationOz: number;
  targetSodiumMg: number;

  preWorkout: PeriWorkoutProtocol;
  intraWorkout: IntraWorkoutProtocol;
  postWorkout: PeriWorkoutProtocol;
  handPortions: HandPortionGuide;
}

export interface SweatRateTestResult {
  weightLostLbs: number;
  netFluidDeficitOz: number;
  sweatRateLph: number; // Liters per hour
  sweatRateOzPerHour: number;
  dehydrationPercent: number;
  sweatCategory: 'Light Sweater' | 'Moderate Sweater' | 'Heavy Sweater' | 'Extreme Sweater';
  fluidHourlyTargetMl: number;
  fluidHourlyTargetOz: number;
  sodiumHourlyTargetMg: number;
  recommendation: string;
}

export interface RaceFuelingPlan {
  raceFormat: 'sprint' | 'super' | 'beast' | 'ultra';
  raceDistanceKm: number;
  estimatedDurationFormatted: string;
  carboLoadingTargetGramsPerKg: string;
  carboLoadingDailyCarbs: number;
  morningOfMeal: {
    timing: string;
    carbGrams: number;
    proteinGrams: number;
    fatGrams: string;
    guidance: string;
    examples: string[];
  };
  tMinus15Fuel: {
    timing: string;
    carbGrams: number;
    guidance: string;
  };
  inRaceHourlySchedule: {
    carbGramsPerHour: number;
    carbRatio: string;
    fluidMlPerHour: number;
    fluidOzPerHour: number;
    sodiumMgPerHour: number;
    frequencyMinutes: number;
    carryRecommendation: string;
  };
  giDistressPrevention: string[];
  crampTriage: string[];
}

export interface DietaryMealTemplate {
  preference: string;
  restDayPlate: string;
  trainingDayPlate: string;
  topProteinSources: string[];
  topCarbSources: string[];
  topPreWorkoutSnacks: string[];
}

export interface SupplementTier {
  tier: 'Tier A (Strong Evidence)' | 'Tier B (Contextual / Emerging)' | 'Tier C (Overhyped / Ineffective)';
  items: {
    name: string;
    evidenceRating: string;
    optimalDose: string;
    timing: string;
    ocrBenefit: string;
    cautions: string;
  }[];
}

// 1. EVALUATE DAILY TRAINING DEMAND LEVEL FROM SESSION
export function calculateSessionDemand(session?: Session | null): TrainingDemandLevel {
  if (!session) return 'low';

  const type = session.sessionType;
  const isHard = session.isHardSession;
  const duration = session.estimatedDurationMinutes || 60;

  if (type === 'race_simulation') return 'race_day';
  if (type === 'complete_rest' || type === 'active_recovery' || type === 'mobility_and_durability') return 'low';

  if (type === 'hybrid_compromised_ocr' || type === 'trail_mountain_vert') {
    return duration >= 75 || isHard ? 'very_high' : 'high';
  }

  if (type === 'maximal_strength' || type === 'grip_and_hanging_armor' || type === 'loaded_carry_complex') {
    return isHard ? 'high' : 'moderate';
  }

  if (type === 'anaerobic_lactate_intervals') {
    return 'high';
  }

  if (type === 'aerobic_run_engine' || type === 'muscular_endurance' || type === 'obstacle_skill_and_agility') {
    if (duration >= 90) return 'very_high';
    if (duration >= 60 || isHard) return 'high';
    return 'moderate';
  }

  return 'moderate';
}

// 2. COMPUTE DYNAMIC TARGETS ACCORDING TO SESSION DEMAND
export function calculateDailyNutritionTargets(
  weightLbs: number = 169,
  demandLevel: TrainingDemandLevel = 'high',
  goal: 'lean_muscle' | 'race_weight_fat_loss' | 'endurance_fueling' | 'general_recomp' = 'endurance_fueling',
  dietaryPreference: string = 'omnivore',
  customSweatRateLph?: number
): DailyNutritionTargets {
  const weightKg = weightLbs * 0.453592;
  
  // Baseline Mifflin-St Jeor resting metabolic expenditure (~1700 kcal for 76kg male)
  const bmr = 10 * weightKg + 6.25 * 178 - 5 * 29 + 5;

  let multiplier = 1.4;
  let proteinPerKg = 1.9;
  let carbsPerKg = 4.5;
  let fatPerKg = 0.9;
  let demandTitle = 'Moderate Training Day';
  let demandBadge = 'MODERATE';
  let demandColor = 'text-amber-400 border-amber-500/40 bg-amber-950/30';
  let nutritionEmphasis = 'Aerobic Glycogen Maintenance & Standard Muscle Repair';

  switch (demandLevel) {
    case 'low':
      multiplier = 1.35;
      proteinPerKg = 2.1; // Elevate protein during rest/recovery for tissue repair and satiety
      carbsPerKg = 3.0;   // Lower carbs on rest days
      fatPerKg = 0.95;
      demandTitle = 'Rest & Active Recovery Day';
      demandBadge = 'LOW DEMAND';
      demandColor = 'text-blue-400 border-blue-500/40 bg-blue-950/30';
      nutritionEmphasis = 'Tissue Regeneration, Anti-Inflammatory Fats & Protein Synthesis';
      break;

    case 'moderate':
      multiplier = 1.6;
      proteinPerKg = 1.9;
      carbsPerKg = 4.5;
      fatPerKg = 0.9;
      demandTitle = 'Moderate Aerobic & Obstacle Skill Day';
      demandBadge = 'MODERATE DEMAND';
      demandColor = 'text-emerald-400 border-emerald-500/40 bg-emerald-950/30';
      nutritionEmphasis = 'Steady Glycogen Support & Moderate Peri-Workout Hydration';
      break;

    case 'high':
      multiplier = 1.85;
      proteinPerKg = 2.2;
      carbsPerKg = 6.0;
      fatPerKg = 0.85;
      demandTitle = 'Heavy Strength, Grip Armor & Lactate Intervals';
      demandBadge = 'HIGH DEMAND';
      demandColor = 'text-[#ff5500] border-[#ff5500]/50 bg-[#ff5500]/10';
      nutritionEmphasis = 'High-Rate Glycogen Replenishment & Forearm Muscular Rebuilding';
      break;

    case 'very_high':
      multiplier = 2.1;
      proteinPerKg = 2.0;
      carbsPerKg = 7.5;
      fatPerKg = 0.8;
      demandTitle = 'Compromised Trail Engine & Long Simulation';
      demandBadge = 'VERY HIGH DEMAND';
      demandColor = 'text-purple-400 border-purple-500/40 bg-purple-950/30';
      nutritionEmphasis = 'Aggressive Intra-Session Carb Delivery & Elevated Electrolyte Flow';
      break;

    case 'race_day':
      multiplier = 2.3;
      proteinPerKg = 1.7; // Lower protein on race day to minimize GI burden
      carbsPerKg = 9.0;   // Maximum carb loading and immediate glycogen availability
      fatPerKg = 0.65;    // Low fat to prevent gastric emptying delays
      demandTitle = 'OCR Race Day / Full Simulation';
      demandBadge = 'RACE DAY DEMAND';
      demandColor = 'text-yellow-400 border-yellow-500/50 bg-yellow-950/40';
      nutritionEmphasis = 'Maximal Carbohydrate Availability, Rapid Absorption & Sodium Defense';
      break;
  }

  // Goal adjustments
  let goalCalorieModifier = 0;
  if (goal === 'race_weight_fat_loss') {
    goalCalorieModifier = -350;
    // Maintain high protein, trim non-training carbs/fats slightly
    proteinPerKg = Math.max(proteinPerKg, 2.2);
  } else if (goal === 'lean_muscle') {
    goalCalorieModifier = 250;
    proteinPerKg = Math.max(proteinPerKg, 2.2);
  } else if (goal === 'endurance_fueling') {
    goalCalorieModifier = 100;
    carbsPerKg += 0.5;
  }

  let baseCalories = Math.round(bmr * multiplier) + goalCalorieModifier;
  const targetCaloriesMin = Math.round(baseCalories - 100);
  const targetCaloriesMax = Math.round(baseCalories + 120);

  const targetProteinGrams = Math.round(weightKg * proteinPerKg);
  const targetCarbsGrams = Math.round(weightKg * carbsPerKg);
  const targetFatGrams = Math.round(weightKg * fatPerKg);

  // Hydration Calculation
  // Baseline: 35-40 ml/kg + workout sweat loss replacement
  let baselineLiters = (weightKg * 0.038);
  if (demandLevel === 'high') baselineLiters += 1.0;
  if (demandLevel === 'very_high') baselineLiters += 1.5;
  if (demandLevel === 'race_day') baselineLiters += 1.8;

  if (customSweatRateLph && customSweatRateLph > 1.2) {
    baselineLiters += (customSweatRateLph - 1.2) * 1.0;
  }

  const targetHydrationLiters = parseFloat(baselineLiters.toFixed(1));
  const targetHydrationOz = Math.round(targetHydrationLiters * 33.814);

  // Daily Sodium Guideline
  let targetSodiumMg = 2400;
  if (demandLevel === 'high') targetSodiumMg = 3200;
  if (demandLevel === 'very_high') targetSodiumMg = 3800;
  if (demandLevel === 'race_day') targetSodiumMg = 4500;

  // Peri-Workout Protocol Definitions
  const preWorkout: PeriWorkoutProtocol = {
    timing: demandLevel === 'low' ? 'No timing required' : '60 - 90 mins before training',
    carbsGrams: demandLevel === 'low' ? 20 : demandLevel === 'moderate' ? 45 : demandLevel === 'high' ? 65 : 85,
    proteinGrams: demandLevel === 'low' ? 20 : 25,
    guideline: demandLevel === 'low' 
      ? 'Balanced whole-food meal with fiber and moderate protein.' 
      : 'Low fat, low fiber, high glycemic complex carbohydrates + easily digestible protein with 500ml water.',
    sampleFood: dietaryPreference === 'vegan' 
      ? 'Rolled oats with maple syrup, sliced banana, and scoop of pea/rice protein isolate.'
      : 'Cream of rice or oatmeal with banana, honey, and 1 scoop whey isolate + pinch of pink salt.'
  };

  const intraWorkout: IntraWorkoutProtocol = {
    needed: demandLevel === 'very_high' || demandLevel === 'race_day' || (demandLevel === 'high' && true),
    carbsPerHour: demandLevel === 'very_high' || demandLevel === 'race_day' ? '60 - 80 g/hr' : demandLevel === 'high' ? '30 - 45 g/hr' : 'None needed (water only)',
    fluidPerHour: demandLevel === 'very_high' || demandLevel === 'race_day' ? '600 - 800 mL/hr' : '400 - 600 mL/hr',
    sodiumPerHour: demandLevel === 'very_high' || demandLevel === 'race_day' ? '600 - 900 mg/hr' : '300 - 500 mg/hr',
    guideline: demandLevel === 'low' || demandLevel === 'moderate'
      ? 'Plain water is sufficient for sessions under 60 minutes.'
      : 'Sip electrolyte carbohydrate beverage every 15-20 minutes. Use 2:1 maltodextrin/glucose to fructose ratio.'
  };

  const postWorkout: PeriWorkoutProtocol = {
    timing: 'Within 45 - 60 mins post-session',
    carbsGrams: demandLevel === 'low' ? 30 : demandLevel === 'moderate' ? 50 : demandLevel === 'high' ? 75 : 95,
    proteinGrams: 35,
    guideline: 'Rapid glycogen synthesis window: Consume fast-acting carbs and complete essential amino acids to stop muscle protein breakdown.',
    sampleFood: dietaryPreference === 'vegan'
      ? 'Tofu scramble or plant protein shake + large sweet potato or white jasmine rice with pineapple.'
      : 'Whey protein isolate shake + 1 large bagel or 1.5 cups jasmine rice with grilled chicken breast and fruit.'
  };

  // Hand-Portion Sizing
  const handPortions: HandPortionGuide = {
    proteinPalms: Math.round(targetProteinGrams / 26),
    carbCuppedHands: Math.round(targetCarbsGrams / 32),
    veggieFists: demandLevel === 'low' ? 5 : 4,
    fatThumbs: Math.round(targetFatGrams / 11),
    summary: `${Math.round(targetProteinGrams / 26)} Palms Protein • ${Math.round(targetCarbsGrams / 32)} Cupped Hands Carbs • 4 Fists Veggies • ${Math.round(targetFatGrams / 11)} Thumbs Fat across 3-4 meals.`
  };

  return {
    demandLevel,
    demandBadge,
    demandColor,
    demandTitle,
    nutritionEmphasis,
    targetCaloriesMin,
    targetCaloriesMax,
    targetProteinGrams,
    targetProteinPerKg: parseFloat(proteinPerKg.toFixed(1)),
    targetProteinPerLb: parseFloat((targetProteinGrams / weightLbs).toFixed(2)),
    targetCarbsGrams,
    targetCarbsPerKg: parseFloat(carbsPerKg.toFixed(1)),
    targetFatGrams,
    targetFatPerKg: parseFloat(fatPerKg.toFixed(1)),
    targetHydrationLiters,
    targetHydrationOz,
    targetSodiumMg,
    preWorkout,
    intraWorkout,
    postWorkout,
    handPortions
  };
}

// 3. SWEAT RATE TEST CALCULATOR
export function calculateSweatRate(
  preWeightLbs: number,
  postWeightLbs: number,
  fluidConsumedOz: number,
  durationMinutes: number,
  temperatureF: number = 75
): SweatRateTestResult {
  const weightLostLbs = Math.max(0, preWeightLbs - postWeightLbs);
  // 1 lb body mass loss = ~15.34 oz of fluid
  const sweatLostFromWeightOz = weightLostLbs * 16.0;
  const netFluidDeficitOz = sweatLostFromWeightOz + fluidConsumedOz;

  const durationHours = Math.max(0.25, durationMinutes / 60.0);
  const hourlySweatRateOz = Math.round(netFluidDeficitOz / durationHours);
  const sweatRateLph = parseFloat((hourlySweatRateOz * 0.0295735).toFixed(2)); // oz to liters

  const dehydrationPercent = parseFloat(((weightLostLbs / preWeightLbs) * 100).toFixed(2));

  let sweatCategory: SweatRateTestResult['sweatCategory'] = 'Moderate Sweater';
  if (sweatRateLph < 0.8) sweatCategory = 'Light Sweater';
  else if (sweatRateLph <= 1.4) sweatCategory = 'Moderate Sweater';
  else if (sweatRateLph <= 2.0) sweatCategory = 'Heavy Sweater';
  else sweatCategory = 'Extreme Sweater';

  // Athletes should replace 80-90% of sweat loss during prolonged activity without exceeding 100% (to prevent hyponatremia)
  const fluidHourlyTargetMl = Math.round(sweatRateLph * 1000 * 0.85);
  const fluidHourlyTargetOz = Math.round(hourlySweatRateOz * 0.85);

  // Typical sweat sodium concentration: 800 - 1200 mg Na+ per Liter of sweat
  const sodiumHourlyTargetMg = Math.round(sweatRateLph * 850);

  let recommendation = `Replace approximately ${fluidHourlyTargetOz} oz (${fluidHourlyTargetMl} mL) of fluid per hour with ${sodiumHourlyTargetMg} mg of sodium. `;
  if (dehydrationPercent > 2.0) {
    recommendation += `⚠️ Warning: You incurred ${dehydrationPercent}% body mass dehydration during testing. Pace and grip capacity decay rapidly past 2% deficit. Increase hourly drinking frequency.`;
  } else {
    recommendation += `✓ Excellent fluid balance: Dehydration stayed within the safe performance zone (< 2.0%).`;
  }

  return {
    weightLostLbs: parseFloat(weightLostLbs.toFixed(2)),
    netFluidDeficitOz: Math.round(netFluidDeficitOz),
    sweatRateLph,
    sweatRateOzPerHour: hourlySweatRateOz,
    dehydrationPercent,
    sweatCategory,
    fluidHourlyTargetMl,
    fluidHourlyTargetOz,
    sodiumHourlyTargetMg,
    recommendation
  };
}

// 4. OCR RACE DAY FUELING PLANNER
export function generateRaceDayFuelingTimeline(
  raceFormat: 'sprint' | 'super' | 'beast' | 'ultra',
  targetHours: number,
  targetMinutes: number,
  weather: 'cool' | 'moderate' | 'hot' = 'moderate',
  athleteWeightLbs: number = 169,
  sweatRateLph: number = 1.2
): RaceFuelingPlan {
  const weightKg = athleteWeightLbs * 0.453592;
  const totalMinutes = targetHours * 60 + targetMinutes;
  const totalHours = totalMinutes / 60;

  let distanceKm = 5;
  let carbGramsPerHour = 30;
  let carbRatio = '1:0 Glucose/Maltodextrin';
  let fluidMultiplier = weather === 'hot' ? 1.25 : weather === 'cool' ? 0.85 : 1.0;
  let fluidMlPerHour = Math.round(Math.min(900, Math.max(450, sweatRateLph * 750 * fluidMultiplier)));
  let sodiumMgPerHour = weather === 'hot' ? 850 : 600;
  let frequencyMinutes = 20;
  let carryRecommendation = 'Hydration vest (1.5L bladder) + front flask pockets.';

  switch (raceFormat) {
    case 'sprint':
      distanceKm = 5;
      carbGramsPerHour = 25; // 1 gel max if race is ~45-60m
      frequencyMinutes = 30;
      carryRecommendation = 'None or 1 handheld soft flask (250ml) with 1 gel clipped to shorts.';
      break;

    case 'super':
      distanceKm = 10;
      carbGramsPerHour = 45;
      carbRatio = '2:1 Maltodextrin to Fructose';
      frequencyMinutes = 25;
      carryRecommendation = '1 handheld flask (500ml) or minimal race belt with 2-3 endurance gels.';
      break;

    case 'beast':
      distanceKm = 21;
      carbGramsPerHour = 75;
      carbRatio = '2:1 Maltodextrin to Fructose (Dual-Source Transporters)';
      frequencyMinutes = 20;
      carryRecommendation = 'Mandatory lightweight race vest (1.5L bladder with electrolyte drink + 6-8 gels + electrolyte chews).';
      break;

    case 'ultra':
      distanceKm = 50;
      carbGramsPerHour = 85;
      carbRatio = '1:0.8 Maltodextrin to Fructose + solid savoury options in transition';
      frequencyMinutes = 20;
      carryRecommendation = 'High-capacity 2.0L hydration vest with drop bag transition strategy (gels, chewables, boiled salty potatoes, stroopwafels).';
      break;
  }

  // Carbo-Loading
  let carboLoadingGramsPerKg = '7 - 8 g/kg/day (24 hours prior)';
  if (raceFormat === 'beast' || raceFormat === 'ultra') {
    carboLoadingGramsPerKg = '8 - 10 g/kg/day (36 - 48 hours prior)';
  }
  const carboLoadingDailyCarbs = Math.round(weightKg * (raceFormat === 'beast' || raceFormat === 'ultra' ? 9 : 7.5));

  return {
    raceFormat,
    raceDistanceKm: distanceKm,
    estimatedDurationFormatted: `${targetHours}h ${targetMinutes > 0 ? `${targetMinutes}m` : '00m'}`,
    carboLoadingTargetGramsPerKg: carboLoadingGramsPerKg,
    carboLoadingDailyCarbs,
    morningOfMeal: {
      timing: '3 to 4 hours prior to wave start',
      carbGrams: Math.round(weightKg * 2.0),
      proteinGrams: 25,
      fatGrams: '< 10g (Minimize fat to accelerate stomach emptying)',
      guidance: 'Eat familiar, low-fiber, high-glycemic carbohydrates. Avoid heavy dairy, seeds, and high-fat spreads.',
      examples: [
        '2 toasted English muffins or bagels with 2 tbsp honey or fruit jam + 1 banana + black coffee.',
        '1.5 cups white rice or cream of rice cooked in almond milk with maple syrup + 1 scoop whey/rice protein.',
        'Sip 500-750 mL water with 400mg sodium electrolyte tab across the final 2 hours.'
      ]
    },
    tMinus15Fuel: {
      timing: '15 minutes before corral release',
      carbGrams: 25,
      guidance: '1 hydrogel or energy chew pack with 150-200 mL water. Tops off blood glucose right before sprint off the start line without triggering reactive hypoglycemia.'
    },
    inRaceHourlySchedule: {
      carbGramsPerHour,
      carbRatio,
      fluidMlPerHour,
      fluidOzPerHour: Math.round(fluidMlPerHour * 0.033814),
      sodiumMgPerHour,
      frequencyMinutes,
      carryRecommendation
    },
    giDistressPrevention: [
      'Practice your race fuel strategy in minimum 3 long weekend compromised sessions before race week (train your gut).',
      'Never try brand-new race nutrition provided at course aid stations; carry your tested brands.',
      'Always take energy gels with 100-150 mL of water, never with concentrated carbohydrate drink (prevents hyperosmotic stomach cramp).',
      'If nausea strikes, switch to cold plain water mouth rinses and chewable sodium tablets for 20 minutes before resuming gels.'
    ],
    crampTriage: [
      'OCR muscle cramps are primarily caused by neuromuscular fatigue under high eccentric loads (downhill running, bucket carries), compounded by electrolyte deficits.',
      'Immediate action: Stop and actively stretch the antagonist muscle (e.g. quad stretch for hamstring cramp, forearm extensor stretch for flexor finger locking).',
      'Take 250-500mg sodium chewable or pickle juice shooter; rapid oropharyngeal receptors inhibit spinal cramping motor neurons in 60-90 seconds.'
    ]
  };
}

// 5. DIETARY PREFERENCE TEMPLATES
export const DIETARY_TEMPLATES: Record<string, DietaryMealTemplate> = {
  omnivore: {
    preference: 'Omnivore / Flexible Sports Diet',
    restDayPlate: '50% Non-Starchy Vegetables (Greens, Broccoli, Peppers) • 30% Lean Animal Protein (Chicken, Salmon, Sirloin) • 20% Low-GI Carbs (Quinoa, Berries) • Healthy Fats (Olive Oil, Avocado).',
    trainingDayPlate: '45% Complex & Fast Carbs (Jasmine Rice, Potatoes, Oats) • 35% Lean Protein (Chicken Breast, Flank Steak, Whey, Eggs) • 20% Colorful Vegetables.',
    topProteinSources: ['Chicken Breast', '93/7 Lean Beef', 'Wild Salmon', 'Eggs & Egg Whites', 'Greek Yogurt (0%)', 'Whey Protein Isolate'],
    topCarbSources: ['Jasmine / Basmati Rice', 'Sweet Potatoes', 'Rolled Oats', 'Bananas & Berries', 'Sourdough Bread', 'Rice Cakes'],
    topPreWorkoutSnacks: ['Rice cakes with honey and sliced banana', 'Oatmeal with whey isolate & pinch of salt', 'Toasted bagel with jam']
  },
  vegan: {
    preference: 'Plant-Based / 100% Vegan Athlete',
    restDayPlate: '40% Fibrous Greens & Cruciferous Veggies • 35% Plant Protein Combos (Tofu, Tempeh, Seitan, Edamame) • 25% Complex Slow Carbs (Lentils, Quinoa, Pumpkin).',
    trainingDayPlate: '50% Clean Starch Carbs (Rice, Sweet Potatoes, Oats, Pasta) • 30% High-Leucine Plant Protein (Pea/Rice Protein Isolate, Seitan, Tofu) • 20% Steamed Veggies.',
    topProteinSources: ['Pea & Brown Rice Protein Blend', 'Tempeh (Fermented Soy)', 'Extra Firm High-Protein Tofu', 'Seitan (Wheat Gluten)', 'Edamame', 'Lentils & Chickpeas'],
    topCarbSources: ['Quinoa', 'Brown & Jasmine Rice', 'Oats', 'Dates & Dried Figs', 'Sweet Potatoes', 'Bananas'],
    topPreWorkoutSnacks: ['Medjool dates stuffed with salt & pinch of peanut butter', 'Cream of rice with pea protein & maple syrup', 'Bananas with pretzels']
  },
  vegetarian: {
    preference: 'Vegetarian (Lacto-Ovo)',
    restDayPlate: '45% Vegetables • 30% Protein (Egg Whites, Greek Yogurt, Cottage Cheese, Tofu) • 25% High-Fiber Carbs.',
    trainingDayPlate: '45% Carbohydrates (Rice, Potatoes, Oats) • 35% Protein (Whey, Eggs, Greek Yogurt, Tempeh) • 20% Vegetables.',
    topProteinSources: ['Egg Whites & Whole Eggs', '0% Greek Yogurt', 'Cottage Cheese', 'Whey Protein Isolate', 'Tofu & Tempeh', 'Hemp & Pumpkin Seeds'],
    topCarbSources: ['Jasmine Rice', 'Oats', 'Potatoes', 'Bananas', 'Whole Grain Toast', 'Honey'],
    topPreWorkoutSnacks: ['Greek yogurt with berries & honey', 'Rice cakes with cottage cheese & banana', 'Oatmeal with whey']
  },
  pescatarian: {
    preference: 'Pescatarian (Fish & Seafood)',
    restDayPlate: '45% Vegetables • 35% Wild Fish & Shellfish (Salmon, Cod, Tuna, Shrimp) • 20% Complex Carbs.',
    trainingDayPlate: '45% Carbs (Rice, Quinoa, Potatoes) • 35% Seafood & Plant Protein • 20% Steamed Greens.',
    topProteinSources: ['Wild Caught Salmon', 'Yellowfin Tuna', 'Shrimp', 'Cod & Halibut', 'Eggs', 'Whey / Plant Isolate'],
    topCarbSources: ['White & Jasmine Rice', 'Sweet Potatoes', 'Oats', 'Fruit', 'Quinoa'],
    topPreWorkoutSnacks: ['Tuna rice cakes (light)', 'Banana with whey protein', 'Toasted sourdough with jam']
  },
  low_carb: {
    preference: 'Targeted Low-Carb / Keto-Adapt (OCR Periodized)',
    restDayPlate: '50% Leafy Greens & Low-Carb Veggies • 30% Fatty Fish / Beef / Eggs • 20% Avocado, Nuts, Olive Oil.',
    trainingDayPlate: 'Targeted Carbohydrates (TKD) 45 mins before and immediately after heavy carry / speed workouts (30-50g fast glucose), with high fat/protein base throughout day.',
    topProteinSources: ['Grass-Fed Beef', 'Salmon', 'Whole Eggs', 'Chicken Thighs', 'Isolate Protein', 'Canned Sardines'],
    topCarbSources: ['Berries (Blueberries/Raspberries)', 'Targeted Dextrose/Glucose pre-workout', 'Sweet Potato (timed)', 'Zucchini & Cauliflower'],
    topPreWorkoutSnacks: ['Black coffee with 10g MCT oil + 25g cyclic dextrin or half banana 30m prior']
  },
  high_carb_endurance: {
    preference: 'High-Carb Endurance Specialist',
    restDayPlate: '40% Carbs • 35% Protein • 25% Veggies & Healthy Fats.',
    trainingDayPlate: '60% Carbohydrates (Continuous Glycogen Replenishment) • 25% Protein • 15% Veggies & Fats.',
    topProteinSources: ['Chicken Breast', 'Egg Whites', 'Whey Isolate', 'Lean White Fish', 'Greek Yogurt'],
    topCarbSources: ['Jasmine Rice', 'Bagels', 'Maltodextrin / Carb Powders', 'Bananas', 'Potatoes', 'Honey & Maple Syrup'],
    topPreWorkoutSnacks: ['Large plain bagel with strawberry jam', '2 bananas + electrolyte drink', 'Large bowl of rice cereal with honey']
  }
};

// 6. EVIDENCE-BASED SUPPLEMENT TIERS
export const SUPPLEMENT_TIERS: SupplementTier[] = [
  {
    tier: 'Tier A (Strong Evidence)',
    items: [
      {
        name: 'Creatine Monohydrate',
        evidenceRating: 'A+ (ISSN & Olympic Gold Standard)',
        optimalDose: '5g daily (every day, timing uncritical)',
        timing: 'Post-workout or with morning meal',
        ocrBenefit: 'Boosts phosphocreatine resynthesis, increasing short-burst power for obstacle rig lock-offs, 8ft wall climbs, and heavy sandbag transitions.',
        cautions: 'Causes 1-3 lbs intramuscular water retention (beneficial cellular hydration; do not cease before race day).'
      },
      {
        name: 'Beta-Alanine',
        evidenceRating: 'A (Strong Evidence for 1-4 min efforts)',
        optimalDose: '3.2g to 6.4g daily split into two doses',
        timing: 'Daily for minimum 4 weeks to elevate carnosine',
        ocrBenefit: 'Buffers muscle intracellular acidosis (H+ ions), delaying forearm pump and grip failure on long monkey bar rigs and multi-rig traverses.',
        cautions: 'Harmless paresthesia (skin tingling); split into two 1.6g doses if uncomfortable.'
      },
      {
        name: 'Caffeine Anhydrous',
        evidenceRating: 'A+ (Elite Performance Enhancer)',
        optimalDose: '3 - 6 mg per kg of body weight (~200 - 350 mg)',
        timing: '45 - 60 mins before start or key workout',
        ocrBenefit: 'Lowers perceived exertion (RPE), increases central motor unit drive, and enhances lipid oxidation during middle miles of Beast/Ultra.',
        cautions: 'Test in training to avoid gastrointestinal upset or jittery spear throw inaccuracy.'
      },
      {
        name: 'Whey or Pea/Rice Protein Isolate',
        evidenceRating: 'A (Essential Recovery Nutrient)',
        optimalDose: '25 - 40g per serving (minimum 3g leucine)',
        timing: 'Within 45m post-workout or between meals',
        ocrBenefit: 'Stimulates maximal muscle protein synthesis (MPS) to repair eccentric damage from downhill trail running and heavy carries.',
        cautions: 'Third-party tested (Informed Sport / NSF) to ensure purity.'
      },
      {
        name: 'Tart Cherry Juice Concentrate',
        evidenceRating: 'A- (Proven Recovery Accelerator)',
        optimalDose: '30 mL concentrate or 240 mL 100% juice twice daily',
        timing: '4-5 days leading up to race day and 48h post-race',
        ocrBenefit: 'Rich in anthocyanins; significantly attenuates inflammatory markers (IL-6, CRP) and speeds isometric strength recovery post-race.',
        cautions: 'Check for added sugars.'
      }
    ]
  },
  {
    tier: 'Tier B (Contextual / Emerging)',
    items: [
      {
        name: 'Dietary Nitrates (Beetroot Extract)',
        evidenceRating: 'B+ (Effective in Aerobic Modalities)',
        optimalDose: '400 - 600 mg inorganic nitrate (~70 mL Beet It shot)',
        timing: '2.5 to 3 hours pre-race',
        ocrBenefit: 'Lowers oxygen cost of running at submaximal threshold, improving economy on steep trail ascents.',
        cautions: 'Harmless red discoloration of urine; avoid antibacterial mouthwash which inhibits nitrate reduction.'
      },
      {
        name: 'Sodium Bicarbonate (Topical or Enteric)',
        evidenceRating: 'B (Strong Buffering Capacity)',
        optimalDose: '0.2 - 0.3 g/kg with carbs and fluid or PR lotion',
        timing: '60 - 90 mins prior to race',
        ocrBenefit: 'Extracellular blood buffer that neutralizes lactate accumulation during consecutive heavy obstacle penalties and sprint finishes.',
        cautions: 'Oral ingestion frequently causes severe osmotic diarrhea unless using delayed-release hydrogel systems.'
      }
    ]
  },
  {
    tier: 'Tier C (Overhyped / Ineffective)',
    items: [
      {
        name: 'BCAAs (Branched-Chain Amino Acids)',
        evidenceRating: 'C (Unnecessary if Daily Protein is Met)',
        optimalDose: 'N/A',
        timing: 'Not recommended as standalone',
        ocrBenefit: 'BCAAs lack the full spectrum of 9 Essential Amino Acids required to synthesize new muscle tissue. Whey or whole foods provide complete EAAs.',
        cautions: 'Wasted expense; prioritize whole protein powders instead.'
      },
      {
        name: 'Thermogenic "Fat Burners"',
        evidenceRating: 'D (High Risk / Low Efficacy)',
        optimalDose: 'None',
        timing: 'Avoid',
        ocrBenefit: 'Elevates resting heart rate, dehydrates tissues, and increases risk of heat stroke on open trail courses.',
        cautions: 'Can cause cardiac arrhythmias under extreme OCR heat strain.'
      }
    ]
  }
];

// 7. CLINICAL MEDICAL DISCLAIMER
export const NUTRITION_MEDICAL_DISCLAIMER = `CLINICAL SCOPE & MEDICAL SAFETY DISCLAIMER:
The nutrition, hydration, and supplementation guidance provided in this application is engineered strictly for athletic performance optimization, endurance conditioning, and educational purposes. 

It does NOT constitute Medical Nutrition Therapy (MNT), individualized dietary prescription, clinical diagnosis, or medical treatment. 

Athletes diagnosed with chronic kidney disease, metabolic disorders, diabetes, cardiac conditions, gastrointestinal pathologies (e.g. Crohn's, severe IBS), or any history of disordered eating MUST consult their Physician, Gastroenterologist, or a Licensed Registered Dietitian (RD/CSSD) before altering dietary intake, implementing aggressive electrolyte protocols, or initiating new supplementation.`;
