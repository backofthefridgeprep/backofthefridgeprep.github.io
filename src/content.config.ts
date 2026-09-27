// Content schema for Fridge First.
//
// Two collections:
//   recipes — one dish (or one technique) per Markdown file. Steps live in the body.
//   preps   — one Sunday prep session: the week's menu, the cooking timeline,
//             and where each container goes (fridge vs freezer).
//
// Keep the frontmatter structured and boring: this is the data the
// "reverse recipe" agent will read later.

import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const ingredient = z.object({
  item: z.string(),
  // Free text on purpose: "2.25–2.5 lb", "1/2 cup", "1 block (14–16 oz)".
  // The nutrition script parses these into grams later.
  amount: z.coerce.string().optional(),
  note: z.string().optional(),
  optional: z.boolean().default(false),
});

const ingredientGroup = z.object({
  group: z.string().optional(), // "Marinade", "Sauce" — omit for a single flat list
  items: z.array(ingredient),
});

const nutrition = z.object({
  // Always estimates, never lab values. Shown with an "estimated" label.
  estimated: z.literal(true).default(true),
  source: z.string().default('USDA FoodData Central'),
  perServing: z.object({
    calories: z.number(),
    proteinG: z.number(),
    carbsG: z.number(),
    fatG: z.number(),
    satFatG: z.number().optional(),
    fiberG: z.number().optional(),
    sodiumMg: z.number().optional(),
  }),
});

const recipes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/recipes' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(), // one or two sentences, used on cards and for SEO
      date: z.coerce.date(),
      draft: z.boolean().default(false),
      kind: z.enum(['recipe', 'technique']).default('recipe'),

      cuisine: z.array(z.string()).default([]),
      course: z.array(z.enum(['main', 'side', 'soup', 'sauce', 'bread', 'dessert', 'drink'])).default([]),
      diet: z.array(z.enum(['vegetarian', 'vegan', 'eggless', 'gluten-free', 'low-carb', 'contains-meat', 'contains-seafood'])).default([]),
      tags: z.array(z.string()).default([]),

      servings: z.number().int().positive().optional(),
      servingNote: z.string().optional(), // "6 chicken + 5 tofu dabbas"
      prepMinutes: z.number().int().nonnegative().optional(),
      cookMinutes: z.number().int().nonnegative().optional(),
      equipment: z.array(z.string()).default([]),
      ingredients: z.array(ingredientGroup).default([]),

      storage: z
        .object({
          fridgeDays: z.number().int().optional(),
          freezer: z.boolean().default(false),
          freezerMonths: z.number().optional(),
          notes: z.string().optional(),
        })
        .optional(),
      reheat: z.string().optional(),
      forLittleOnes: z.string().optional(), // what to set aside for toddlers before seasoning

      nutrition: nutrition.optional(),

      image: image().optional(),
      imageAlt: z.string().optional(),

      source: z
        .object({
          kind: z.enum(['original', 'adapted']).default('original'),
          credit: z.string().optional(),
          url: z.url().optional(),
        })
        .default({ kind: 'original' }),

      prep: reference('preps').optional(), // the Sunday prep this came from
    }),
});

const preps = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/preps' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(), // the Sunday you cook
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),

    containers: z.number().int().positive(), // total dabbas / meals
    people: z.number().int().positive().optional(),
    activeTime: z.string(), // "about 3 hours"

    recipes: z.array(reference('recipes')).default([]),

    menu: z
      .array(
        z.object({
          day: z.string(), // "Mon", "Day 1"
          meals: z.array(
            z.object({
              slot: z.string().optional(), // "Lunch", "Dinner"
              dish: z.string(),
              where: z.enum(['fridge', 'freezer', 'fresh']).optional(),
            }),
          ),
        }),
      )
      .default([]),

    timeline: z
      .array(
        z.object({
          time: z.string(), // "0:00", "0:50–1:20"
          task: z.string(),
          station: z.string().optional(), // "Oven", "Stovetop", "Instant Pot"
        }),
      )
      .default([]),
  }),
});

export const collections = { recipes, preps };
