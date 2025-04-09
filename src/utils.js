export const calculatePay = (salary, days, totalWorkingDays) => {
  const totalNoOfDays = parseFloat(totalWorkingDays);
  const totalSalary = parseFloat(salary);
  const workingDays = parseInt(days);

  const costPerDay = totalSalary / totalNoOfDays;

  // net pay
  const payableAmount = parseFloat((workingDays * costPerDay).toFixed(2));
  // Basic : 45% new Pay
  const base = parseFloat((payableAmount * 0.45).toFixed(2));
  // HRA : 50% Basic
  const inHRA = parseFloat((base * 0.4).toFixed(2));

  const rest = payableAmount - (base + inHRA);
  // Medical : 60% of rest
  const medic = parseFloat((rest * 0.6).toFixed(2));
  // Allowance : 40% of rest
  const allow = parseFloat((rest * 0.4).toFixed(2));

  return { base, inHRA, medic, allow, payableAmount };
};
