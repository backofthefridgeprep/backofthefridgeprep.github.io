// Groups a recipe's ingredients the way you'd shop for them: veggies, protein,
// grains, spices, pantry, frozen. The section is guessed from the item name;
// set `aisle:` on an ingredient in the recipe file to override a wrong guess.

import type { Recipe } from './content';

export type Aisle = 'veggies' | 'protein' | 'grains' | 'spices' | 'pantry' | 'frozen' | 'other';

export const aisleLabel: Record<Aisle, string> = {
  veggies: 'Veggies & fruit',
  protein: 'Protein & dairy',
  grains: 'Grains, beans & noodles',
  spices: 'Spices & herbs',
  pantry: 'Pantry, oils & sauces',
  frozen: 'Frozen',
  other: 'Other',
};

const order: Aisle[] = ['veggies', 'protein', 'grains', 'spices', 'pantry', 'frozen', 'other'];

// First match wins, so the order of these rules matters.
const rules: [Aisle, RegExp][] = [
  ['frozen', /frozen dumpling|edamame/],
  ['pantry', /coconut milk|broth|rice vinegar|marinara|curry paste|prune/],
  ['grains', /\brice\b|noodle|pasta|sourdough|bread|chapati|roti|flour|oats|quinoa|chickpea|black beans|kidney beans|lentil|\bdal\b/],
  ['protein', /chicken|tofu|paneer|shrimp|fish|\beggs?\b|sour cream|\bcream\b|yogurt|\bmilk\b|cheese|butter/],
  ['spices', /\bsalt\b|black pepper|oregano|paprika|cumin|coriander powder|turmeric|chili powder|chili flakes|garam masala|kasuri methi|mustard seeds|\bhing\b|asafoetida|italian seasoning|\bdill\b|curry powder|cinnamon|cardamom|elaichi|haldi|jeera/],
  ['pantry', /\boil\b|ghee|tahini|soy sauce|vinegar|sugar|honey|cornstarch|sriracha|water/],
  ['veggies', /lemon|lime|garlic|ginger|onion|tomato|pepper|okra|eggplant|broccoli|mushroom|spinach|cabbage|potato|zucchini|lettuce|chilies|chili\b|cilantro|carrot|cauliflower|cucumber|peas|herbs|mint|\bpears?\b|mango|pumpkin/],
];

export function guessAisle(item: string): Aisle {
  const s = item.toLowerCase();
  for (const [aisle, re] of rules) if (re.test(s)) return aisle;
  return 'other';
}

export interface ShoppingItem {
  item: string;
  amounts: string[];
  uses: string[]; // "Marinade: minced", "grated"
  optional: boolean;
}

// Merge repeats (garlic in the marinade and the sauce) into one line.
export function shoppingList(recipe: Recipe) {
  const groups = new Map<Aisle, Map<string, ShoppingItem>>();
  for (const g of recipe.data.ingredients) {
    for (const i of g.items) {
      const aisle = (i.aisle as Aisle | undefined) ?? guessAisle(i.item);
      if (!groups.has(aisle)) groups.set(aisle, new Map());
      const bucket = groups.get(aisle)!;
      const key = i.item.toLowerCase().replace(/s$/, '');
      const entry = bucket.get(key) ?? { item: i.item, amounts: [], uses: [], optional: true };
      if (i.amount) entry.amounts.push(i.amount);
      // Short label: "Marinade: minced" (drop the "(for 8 containers...)" part of group names).
      const groupName = g.group?.replace(/\s*\(.*\)\s*$/, '');
      const use = [groupName, i.note].filter(Boolean).join(': ');
      if (use) entry.uses.push(use);
      entry.optional = entry.optional && i.optional;
      bucket.set(key, entry);
    }
  }
  return order
    .filter((a) => groups.has(a))
    .map((a) => ({ aisle: a, label: aisleLabel[a], items: [...groups.get(a)!.values()] }));
}
