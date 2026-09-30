// Tap (or press Space/Enter) to toggle an item done — used for steps and ingredients.
export function makeTappable(items: Iterable<HTMLElement>) {
  for (const el of items) {
    if (el.dataset.tappable) continue;
    el.dataset.tappable = '1';
    el.tabIndex = 0;
    el.setAttribute('role', 'checkbox');
    el.setAttribute('aria-checked', 'false');
    const toggle = (e: Event) => {
      if ((e.target as HTMLElement).closest('a, button')) return;
      const done = el.classList.toggle('done');
      el.setAttribute('aria-checked', String(done));
    };
    el.addEventListener('click', toggle);
    el.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggle(e);
      }
    });
  }
}
