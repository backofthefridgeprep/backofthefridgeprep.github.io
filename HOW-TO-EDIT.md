# How to edit the site (no zip files)

## Every time
1. Open the `backofthefridge` folder in VS Code.
2. In the terminal (Ctrl+`): `npm run dev`, then open http://localhost:4321.
3. Click the spark icon (Claude Code) and ask for what you want, in plain words.
   Examples:
   - "Add a new recipe for mutter paneer. Here are my notes: ..."
   - "Add palak_paneer.jpg as the photo for the palak paneer recipe."
   - "Make the banner on the Sunday prep page say ... instead."
4. Check the change in the browser.
5. Save it to GitHub: Source Control panel (left sidebar) → type a short message → Commit → Sync Changes.
   Or in the terminal:
   ```
   git add -A
   git commit -m "Add mutter paneer"
   git push
   ```
6. The site updates at https://backofthefridgeprep.com a minute or two later (watch the Actions tab on GitHub).

## Adding things yourself
- Recipe: copy a file in `src/content/recipes/`, rename it, edit. It stays hidden until it has `tested:` with the date you cooked it (or keep `draft: true`).
- Photo: drop it in `src/assets/photos/`, then add `photo: file_name.jpg` and `imageAlt: ...` to the recipe.
- Tip/article: add a `.md` file in `src/content/articles/`.
- Sunday prep: copy a file in `src/content/preps/`.
