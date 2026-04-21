export function calculateRisk(time: string, mood: number, stress: number): number {
  let base = 30;
  
  if (time === 'Late Night') base += 35;
  else if (time === 'Evening') base += 15;
  
  if (stress >= 8) base += 25;
  else if (stress >= 5) base += 12;
  
  if (mood <= 2) base += 20;
  else if (mood <= 3) base += 10;
  
  // Add a small amount of random noise to make it feel "AI calculated"
  const noise = Math.random() * 5;
  
  return Math.min(Math.round(base + noise), 99);
}
