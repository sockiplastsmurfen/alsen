# CV

A multi-user CV site built with [Astro](https://astro.build). Every folder under `content/` becomes a CV page at `/<folder>/` (e.g. `/thomas/`, `/alexis/`); `/` lists everyone. Static build, deployed to GitHub Pages by GitHub Actions.

## Add a user

1. Create `content/<username>/` (use a lowercase name without spaces; it becomes the URL, `/<username>/`).
2. Add `profile.yml` (required) — copy `content/alexis/profile.yml` and edit. Fields: `name`, `title`, `summary` (required); `location`, `email`, `avatar`, `accent` (hex colour), `links`, `skills`, `speaking`, `projects` (optional).
3. Add `avatar.jpg`/`.png`/`.svg` next to it and point `avatar:` at it.
4. Add entries as Markdown files:
   - `experience/2020-01-company.md` — frontmatter `title`, `company`, `start`, optional `stop` (omit = present), `link`, `location`, `tags`, `image`; the body is the description.
   - `education/xyz.md` — frontmatter `title`, `school`, `start`, optional `stop`.
   Images used in entries live in the user's folder and are referenced relatively (`image: ../photo.jpg`).

Everything except `profile.yml` is optional. Invalid frontmatter/fields fail the build with a message naming the file; a missing image fails with the image path. A folder without `profile.yml` is skipped with a build warning.

## Upload files

Upload via GitHub (**Add file → Upload files** in the web UI) or `git push` into `content/<username>/`. A push to `main` rebuilds and deploys; pull requests get a build check only.

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # output in dist/
```

## Deploy and custom domain

Set **Settings → Pages → Source: GitHub Actions**. The site is then at `https://<owner>.github.io/<repo>/` (the workflow sets `BASE=/<repo>` automatically).

For a custom domain: create `public/CNAME` containing just the domain (e.g. `cv.example.com`), set it under Settings → Pages, and add the DNS record (subdomain: `CNAME` → `<owner>.github.io`; apex: GitHub's `A` records). The workflow detects `public/CNAME` and builds with `BASE=/`. Locally, the `SITE` and `BASE` env vars override the defaults.

The repo is public, so everything in `content/` is public.
