# Branch cleanup — pending manual step

Seven `cursor/*` feature branches sit on `origin` from prior work cycles. I audited each against `main` (as of this session). The sandbox can't authenticate to GitHub to delete them, so run these on your machine:

## Safe to delete (0 unique commits)

These branches are fully behind `main` and contain nothing not already merged:

```bash
git fetch --prune origin
git push origin --delete \
  cursor/announcement-banner-visibility-365a \
  cursor/map-marker-zoom-1bca \
  cursor/president-s-message-image-1b12 \
  cursor/whatsapp-widget-button-issue-0910 \
  cursor/french-website-localization-a0a8
```

> `cursor/french-website-localization-a0a8` had 3 unique commits but they're predecessors of the FR support already shipped in `main`. Safe to drop.

## Worth a 30-second look first

These have one unique commit each. Open them, decide if the change is still wanted, then either cherry-pick or delete:

| Branch | Unique commit | Recommendation |
| --- | --- | --- |
| `cursor/courses-page-filters-responsiveness-7d45` | "Improve courses filter responsiveness on mobile" (`bccb807`) | The filter has been touched in `main` since. Diff: `git diff main origin/cursor/courses-page-filters-responsiveness-7d45 -- components/CourseFilters.tsx`. If diff looks valuable, cherry-pick; otherwise delete. |
| `cursor/hero-content-mobile-centering-4e34` | "Fix mobile hero vertical centering on homepage" (`1d91e35`) | Quick visual win on mobile. Diff: `git diff main origin/cursor/hero-content-mobile-centering-4e34 -- app/page.tsx components/HeroCarousel.tsx`. Cherry-pick if `main` still has the centering issue. |

After deciding, delete the branch:

```bash
git push origin --delete cursor/courses-page-filters-responsiveness-7d45
git push origin --delete cursor/hero-content-mobile-centering-4e34
```
