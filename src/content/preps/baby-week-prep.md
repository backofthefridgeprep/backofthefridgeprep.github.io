---
title: Baby's Week of Meals
description: "Egg-oat porridge, veg khichdi and two kinds of fritters: one session, Monday to Friday breakfast, lunch and early dinner for a baby 9 months and up."
date: 2026-10-04
testing: true # live, labeled 'not cooked yet'. TODO(Shreya): remove this line after cooking the full session
tags: [baby, freezer-friendly, 9-months-plus]
containers: 15
activeTime: about 1.5–2 hours
recipes: [baby-egg-oat-porridge, baby-veg-khichdi, baby-broccoli-potato-cheese-fritters, baby-tofu-zucchini-fritters, baby-fruit-puree-cubes]
dishes:
  - { name: Egg-oat porridge, recipe: baby-egg-oat-porridge, servings: 4, freezes: true, note: "Breakfast. 2 in the fridge, 2 frozen. Make a 5th by adding 1/4 cup oats, 1/4 cup milk and 1 yolk." }
  - { name: Veg khichdi, recipe: baby-veg-khichdi, servings: 5, freezes: true, note: "Lunch. 2 in the fridge, the rest frozen." }
  - { name: Broccoli-potato-cheese fritters, recipe: baby-broccoli-potato-cheese-fritters, servings: 3, freezes: true, note: "Dinner Mon, Wed, Fri, with dahi." }
  - { name: Tofu-zucchini fritters, recipe: baby-tofu-zucchini-fritters, servings: 2, freezes: true, note: "Dinner Tue, Thu, with dahi." }
  - { name: "Fruit purée cubes (pear, mango, prune)", recipe: baby-fruit-puree-cubes, freezes: true, note: One cube stirred into each day's porridge. }
plan:
  - title: Cook
    steps:
      - together:
          - { task: Start the khichdi., recipe: baby-veg-khichdi, station: Pressure cooker }
          - { task: Boil the potato for the broccoli fritters., recipe: baby-broccoli-potato-cheese-fritters, station: Stove }
      - together:
          - { task: "Steam all the broccoli at once, for the khichdi and the fritters.", station: Steamer }
          - { task: Press the tofu. Grate and squeeze the zucchini., recipe: baby-tofu-zucchini-fritters }
      - together:
          - { task: Make the egg-oat porridge., recipe: baby-egg-oat-porridge, station: Stove }
          - { task: Steam the pear. Soak the prunes in hot water., recipe: baby-fruit-puree-cubes, station: Steamer }
      - together:
          - { task: Mix and fry the broccoli-potato-cheese fritters., recipe: baby-broccoli-potato-cheese-fritters, station: Stove }
          - { task: Mix the tofu fritter batter., recipe: baby-tofu-zucchini-fritters }
      - together:
          - { task: Fry the tofu-zucchini fritters in the same pan., recipe: baby-tofu-zucchini-fritters, station: Stove }
          - { task: Blend the fruit purées and fill the moulds., recipe: baby-fruit-puree-cubes }
  - title: Pack
    steps:
      - { task: "Cool everything fast: shallow containers, or the pot in a sink of cold water. Into the fridge or freezer within 2 hours." }
      - { task: "Fridge (Mon–Tue): 2 porridge, 2 khichdi, Monday and Tuesday fritters." }
      - { task: "Freezer (Wed–Fri): everything else. Porridge, khichdi and purées in covered moulds; fritters flat on a tray, then bagged." }
      - { task: Label every bag with the food and the date. }
      - { task: "Each night, move the next day's portions and one fruit cube to the fridge." }
---

One prep session covers Monday to Friday for a baby who likes thick, mashable food. The recipes use whole milk, ghee, cheese and extra egg yolks, so a small portion still fills a small tummy. No salt or sugar; the fruit does the sweetening.

## Reheating

- Reheat once, until steaming all the way through. Cool to warm and test before serving.
- Microwave? Stir well. It leaves hot spots.
- Add ghee after reheating, not before freezing.
- Never refreeze food that's been thawed. Throw away what's left in the bowl.

## Safety

- For babies around 9 months and up who have already had egg, dairy and soy.
- Introduce new foods one at a time and watch for a reaction for a few days.
- No salt, sugar or honey before 12 months.
- Whole milk is fine cooked into food from about 9 months, but not as a drink before 12 months.
- Always sit with your baby while they eat. Check with your pediatrician about your baby's needs.
