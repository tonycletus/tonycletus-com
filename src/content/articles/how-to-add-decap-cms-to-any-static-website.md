---
title: How to Add Decap CMS to Any Static Website
subtitle: Learn how to set up a free, open-source headless CMS on your static
  site hosted on Netlify, Cloudflare, or anywhere else - with real examples from
  tonycletus.com and programmify.org
date: 2026-03-06T10:14:00.000+01:00
status: live
is_external: false
---

## What is Decap CMS?

**Decap CMS** (formerly known as Netlify CMS) is a **free, open-source, Git-based headless content management system**. It gives you a clean, easy-to-use admin interface right inside your website (e.g., `yoursite.com/admin`) where you can create, edit, and delete content - blog posts, pages, projects - without ever touching code.



## What is Decap CMS?


**Decap CMS** (formerly known as Netlify CMS) is a **free, open-source, Git-based headless content management system**. It gives you a clean, easy-to-use admin interface right inside your website (e.g., `yoursite.com/admin`) where you can create, edit, and delete content - blog posts, pages, projects - without ever touching code.


### Why Decap CMS?


- **100% Free** - No subscription, no pricing tiers. Ever.
- **Open Source** - The source code is on [GitHub](https://github.com/decaporg/decap-cms). You can inspect, fork, or contribute.
- **Git-Based** - Every content edit creates a Git commit. Your content lives in your repo alongside your code. Full version history, rollback, branching - all for free.
- **Works with Any Static Site Generator** - Hugo, Jekyll, Eleventy, Next.js, Gatsby, or your own custom setup (like mine).
- **Works with Any Host** - Netlify, Cloudflare Pages, Vercel, GitHub Pages, or your own server.
- **No Database Required** - Content is stored as Markdown files, JSON files, or YAML files right inside your Git repository.


### Official Resources


- **Website:** [decapcms.org](https://decapcms.org/)
- **Documentation:** [decapcms.org/docs](https://decapcms.org/docs/intro/)
- **GitHub:** [github.com/decaporg/decap-cms](https://github.com/decaporg/decap-cms)


---


## How Decap CMS Works (The Big Picture)


Here is what happens under the hood:


1. You add two files to your project: `admin/index.html` and `admin/config.yml`.
2. When you visit `yoursite.com/admin`, Decap CMS loads as a single-page app in your browser.
3. You log in (via Netlify Identity, GitHub OAuth, or other backends).
4. The admin UI lets you create/edit content through user-friendly forms.
5. When you hit "Publish", Decap CMS creates a Git commit to your repository with the content change.
6. Your hosting platform detects the new commit, rebuilds your site, and deploys the update.


**That's it.** No server. No database. No monthly cost.


---


## Part 1: Adding Decap CMS to a Custom Static Site on Netlify


This is exactly what I did for **[tonycletus.com](https://tonycletus.com)**. My site uses a custom build system with **EJS templates** and a **Node.js build script** (`build.js`). No framework at all - just plain files.


### Step 1: Create the Admin Files


Inside your project's source directory, create an `admin` folder with two files:

**`admin/index.html`**




```html
<!doctype html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Content Manager</title>
    <!-- Include the Netlify Identity widget -->
    <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</head>
<body>
    <!-- Include the Decap CMS script -->
    <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
</body>
</html>
```




This is the page that loads the entire CMS. It pulls two scripts:
- **Netlify Identity Widget** - handles login/authentication.
- **Decap CMS** - the actual CMS app.




**`admin/config.yml`**




This is the heart of Decap CMS. It defines your backend, media storage, and content collections.




