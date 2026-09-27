import { getCollection, type CollectionEntry } from 'astro:content';

export type Recipe = CollectionEntry<'recipes'>;
export type Prep = CollectionEntry<'preps'>;

// Drafts show up in `astro dev` so you can preview them, but never in the built site.
const showDrafts = import.meta.env.DEV;

export async function getRecipes(): Promise<Recipe[]> {
  const all = await getCollection('recipes', ({ data }) => showDrafts || !data.draft);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.data.title.localeCompare(b.data.title));
}

export async function getPreps(): Promise<Prep[]> {
  const all = await getCollection('preps', ({ data }) => showDrafts || !data.draft);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function formatMinutes(min?: number): string | undefined {
  if (min === undefined) return undefined;
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h} hr ${m} min` : `${h} hr`;
}

export function totalMinutes(r: Recipe): number | undefined {
  const { prepMinutes, cookMinutes } = r.data;
  if (prepMinutes === undefined && cookMinutes === undefined) return undefined;
  return (prepMinutes ?? 0) + (cookMinutes ?? 0);
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

// ISO 8601 duration for schema.org, e.g. PT1H35M
export function isoDuration(min?: number): string | undefined {
  if (min === undefined) return undefined;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `PT${h ? `${h}H` : ''}${m || !h ? `${m}M` : ''}`;
}

export const dietLabel: Record<string, string> = {
  vegetarian: 'Vegetarian',
  vegan: 'Vegan',
  eggless: 'Eggless',
  'gluten-free': 'Gluten-free',
  'low-carb': 'Low-carb',
  'contains-meat': 'Has meat',
  'contains-seafood': 'Has seafood',
};

export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
