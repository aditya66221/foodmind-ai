export const AI_QUOTES = {
  savage: [
    "You're not hungry. You're procrastinating.",
    "Your body doesn't need food. Your anxiety does.",
    "That pizza won't fix your deadlines.",
    "Boredom isn't hunger. Close the delivery app."
  ],
  coach: [
    "Drink 300ml water. Wait 10 mins. Then decide.",
    "Stress + late night = your biggest risk window.",
    "Your future self is watching this decision."
  ],
  buddy: [
    "Hey, rough day? Let's find something that won't wreck your sleep 🙂",
    "You've done great today! One good choice left 💪"
  ]
};

export const MOCK_SCAN_RESULTS = [
  {
    foodName: "Double Pepperoni Pizza",
    healthScore: 24,
    calories: 850,
    protein: 34,
    carbs: 88,
    fat: 42,
    verdict: "This will spike your blood sugar and ruin your deep sleep in 2 hours.",
    betterAlternative: "Greek yogurt with almonds and a slice of dark chocolate."
  },
  {
    foodName: "Glazed Donut",
    healthScore: 12,
    calories: 320,
    protein: 4,
    carbs: 45,
    fat: 16,
    verdict: "Pure sugar rush. The crash will hit you exactly when you need focus.",
    betterAlternative: "Apple slices with a tablespoon of peanut butter."
  },
  {
    foodName: "Grilled Chicken Salad",
    healthScore: 92,
    calories: 410,
    protein: 45,
    carbs: 15,
    fat: 18,
    verdict: "Perfect fuel. Steady energy release with zero crash.",
    betterAlternative: "You're already making a great choice!"
  }
];

export const MOCK_TIMELINE_DECISIONS = [
  {
    id: 1,
    timestamp: "Today, 11:45 PM",
    risk: "High",
    action: "Craved Pizza",
    outcome: "Drank Water",
    status: "resisted" // green
  },
  {
    id: 2,
    timestamp: "Today, 4:20 PM",
    risk: "Medium",
    action: "Sugar Craving",
    outcome: "Ate Apple",
    status: "compromised" // yellow
  },
  {
    id: 3,
    timestamp: "Yesterday, 12:15 AM",
    risk: "High",
    action: "Ordered Fast Food",
    outcome: "Gave in",
    status: "failed" // red
  },
  {
    id: 4,
    timestamp: "Yesterday, 8:00 PM",
    risk: "Low",
    action: "Healthy Dinner",
    outcome: "Cooked",
    status: "resisted"
  },
  {
    id: 5,
    timestamp: "2 days ago, 3:00 PM",
    risk: "Medium",
    action: "Office Snacks",
    outcome: "Ate Donut",
    status: "failed"
  },
  {
    id: 6,
    timestamp: "2 days ago, 10:30 PM",
    risk: "High",
    action: "Stress Eating",
    outcome: "Read a book",
    status: "resisted"
  }
];

// 7 columns (Mon–Sun) × 6 rows (time blocks)
export const MOCK_HEATMAP_DATA = [
  // 6AM - 10AM
  [10, 15, 12, 10, 20, 45, 30],
  // 10AM - 2PM
  [20, 25, 22, 18, 30, 50, 40],
  // 2PM - 6PM
  [45, 50, 48, 40, 55, 60, 50],
  // 6PM - 10PM
  [60, 65, 70, 60, 80, 85, 75],
  // 10PM - 2AM (High Risk)
  [85, 90, 88, 85, 95, 98, 90],
  // 2AM - 6AM
  [10, 5, 8, 10, 40, 50, 15]
];
