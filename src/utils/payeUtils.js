// src/utils/payeUtils.js

// 2025–26 UK income tax thresholds
export const PERSONAL_ALLOWANCE = 12570;
export const BASIC_RATE_LIMIT    = 50270;
export const HIGHER_RATE_LIMIT   = 125140;

export const BASIC_RATE         = 0.20;
export const HIGHER_RATE        = 0.40;
export const ADDITIONAL_RATE    = 0.45;

// 2025–26 UK National Insurance (Class 1) thresholds
export const NI_PRIMARY_THRESHOLD     = 12570;
export const NI_UPPER_EARNINGS_LIMIT  = 50270;

export const NI_LOWER_RATE = 0.12;
export const NI_UPPER_RATE = 0.02;

/**
 * Given a gross annual income and optional pension%
 * returns an object { gross, taxable, tax, ni, pension, net } all in £.
 */
export function calculatePaye({ grossAnnual, pensionPercent = 0 }) {
  // 1) pension deduction (pre-tax)
  const pensionContribution = grossAnnual * (pensionPercent / 100);
  const afterPensionGross = grossAnnual - pensionContribution;

  // 2) compute taxable income
  const taxableIncome = Math.max(0, afterPensionGross - PERSONAL_ALLOWANCE);

  // 3) income tax
  let tax = 0;
  if (taxableIncome <= BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE) {
    tax = taxableIncome * BASIC_RATE;
  } else {
    const basicPortion = (BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE) * BASIC_RATE;
    const higherPortion = Math.min(
      taxableIncome - (BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE),
      HIGHER_RATE_LIMIT - BASIC_RATE_LIMIT
    ) * HIGHER_RATE;
    const additionalPortion = Math.max(
      taxableIncome - (HIGHER_RATE_LIMIT - PERSONAL_ALLOWANCE),
      0
    ) * ADDITIONAL_RATE;
    tax = basicPortion + higherPortion + additionalPortion;
  }

  // 4) National Insurance on after-pension gross
  let ni = 0;
  if (afterPensionGross > NI_PRIMARY_THRESHOLD) {
    const lowerNI = Math.min(afterPensionGross, NI_UPPER_EARNINGS_LIMIT) - NI_PRIMARY_THRESHOLD;
    ni += lowerNI * NI_LOWER_RATE;
    if (afterPensionGross > NI_UPPER_EARNINGS_LIMIT) {
      ni += (afterPensionGross - NI_UPPER_EARNINGS_LIMIT) * NI_UPPER_RATE;
    }
  }

  // 5) net take-home
  const net = afterPensionGross - tax - ni;

  return {
    gross:    grossAnnual,
    pension:  pensionContribution,
    taxable:  taxableIncome,
    tax,
    ni,
    net
  };
}
