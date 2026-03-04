---
title: How to Add Decap CMS to Any Static Website
subtitle: Learn how to set up a free, open-source headless CMS on your static
  site hosted on Netlify, Cloudflare, or anywhere else - with real examples from
  tonycletus.com and programmify.org.
date: 2026-03-04T10:00:00.000Z
status: live
is_external: false
gallery_img1: ""
---

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

```yaml
backend:
  name: git-gateway
  branch: main

media_folder: "src/public/uploads"
public_folder: "public/uploads"

collections:
  - name: "articles"
    label: "Articles"
    folder: "src/content/articles"
    create: true
    slug: "{{slug}}"
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Subtitle", name: "subtitle", widget: "string", required: false}
      - {label: "Date", name: "date", widget: "datetime"}
      - {label: "Thumbnail Image", name: "thumbnail", widget: "image", required: false}
      - {label: "Body", name: "body", widget: "markdown"}
```

Let me break down every line:

| Key | What It Does |
|---|---|
| `backend.name: git-gateway` | Uses Netlify's Git Gateway to read/write your repo |
| `backend.branch: main` | Targets the `main` branch |
| `media_folder` | Where uploaded images are saved in your repo |
| `public_folder` | The public URL path to those images at runtime |
| `collections` | Defines the types of content you can manage |
| `folder` | The directory where content files are stored |
| `create: true` | Allows creating new entries (not just editing) |
| `slug` | The filename pattern for new entries |
| `fields` | The form fields in the admin UI |

### Step 2: Add the Netlify Identity Widget to Your Site

Add this script tag to every page on your main site (e.g., your `index.html`):

```html
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
```

Then, add this redirect script at the bottom of your main page so users are taken to the admin after login:

```html
<script>
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
      if (!user) {
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }
</script>
```

### Step 3: Enable Netlify Identity + Git Gateway

1. Go to [app.netlify.com](https://app.netlify.com) and open your site.
2. Navigate to **Site settings → Identity** and click **Enable Identity**.
3. Under **Registration preferences**, select **Invite only** (so only you can log in).
4. Scroll down to **Services → Git Gateway** and click **Enable Git Gateway**.
5. Go to the **Identity** tab and click **Invite users** - invite your own email.

### Step 4: Build Your Content with a Static Site Generator

Here is a simplified version of my `build.js` that reads Markdown articles and renders them with EJS:

```javascript
const fs = require('fs-extra');
const ejs = require('ejs');
const fm = require('front-matter');
const path = require('path');
const glob = require('glob');

async function build() {
    const { marked } = await import('marked');
    const srcDir = path.join(__dirname, 'src');
    const distDir = path.join(__dirname, 'dist');
    const articlesDir = path.join(srcDir, 'content', 'articles');

    await fs.emptyDir(distDir);
    await fs.copy(srcDir, distDir);

    // Process each Markdown article
    const articleFiles = glob.sync(`${articlesDir}/*.md`);
    for (const file of articleFiles) {
        const content = await fs.readFile(file, 'utf-8');
        const parsed = fm(content);           // Extract front-matter
        const bodyHtml = marked.parse(parsed.body); // Convert Markdown to HTML
        const slug = path.basename(file, '.md');

        const articleData = {
            ...parsed.attributes,  // title, date, thumbnail, etc.
            slug,
            body: bodyHtml,
        };

        // Render the article template
        const template = await fs.readFile(
            path.join(srcDir, 'article.ejs'), 'utf-8'
        );
        const html = ejs.render(template, { article: articleData });

        await fs.ensureDir(path.join(distDir, 'articles'));
        await fs.writeFile(
            path.join(distDir, 'articles', `${slug}.html`), html
        );
    }

    // Clean up template files in dist
    await fs.remove(path.join(distDir, 'article.ejs'));
    await fs.remove(path.join(distDir, 'content'));

    console.log('Build successful!');
}

build();
```

And in your `netlify.toml`:

```toml
[build]
  command = "node build.js"
  publish = "dist"
```

### Step 5: Visit Your Admin

Deploy your site. Then visit `https://yoursite.com/admin/`. Log in with the email you invited. You should now see the Decap CMS dashboard with your collections.

---

## Part 2: Adding Decap CMS to a Hugo Site on Cloudflare Pages

This is the approach I used for **[programmify.org](https://programmify.org)** - a Hugo site deployed on Cloudflare Pages.

### Step 1: Create the Admin Files

In Hugo, static files go in the `static/` directory. Create:

**`static/admin/index.html`**

```html
<!doctype html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Content Manager</title>
</head>
<body>
    <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
</body>
</html>
```

> **Note:** No Netlify Identity script here - we will use GitHub OAuth instead since we are on Cloudflare, not Netlify.

**`static/admin/config.yml`**

```yaml
backend:
  name: github
  repo: your-username/your-repo-name
  branch: main

media_folder: "static/images/uploads"
public_folder: "/images/uploads"

collections:
  - name: "blog"
    label: "Blog Posts"
    folder: "content/blog"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Date", name: "date", widget: "datetime"}
      - {label: "Description", name: "description", widget: "string"}
      - {label: "Featured Image", name: "image", widget: "image", required: false}
      - {label: "Draft", name: "draft", widget: "boolean", default: false}
      - {label: "Body", name: "body", widget: "markdown"}
```

**Key difference:** The backend here is `github` (not `git-gateway`). This means Decap CMS will authenticate directly against GitHub using OAuth.

### Step 2: Set Up GitHub OAuth

Since we are not on Netlify, we need to provide our own OAuth server. The easiest approach is to use an **external OAuth provider**.

**Option A: Use a free OAuth proxy (recommended for simplicity)**

Use the community-maintained proxy at [decap-oauth.netlify.app](https://decap-oauth.netlify.app/):

1. Go to your **GitHub Settings → Developer Settings → OAuth Apps → New OAuth App**.
2. Set **Authorization callback URL** to: `https://api.netlify.com/auth/done`
3. Note the **Client ID** and **Client Secret**.
4. Deploy the [netlify-cms-oauth-provider](https://github.com/vencax/netlify-cms-github-oauth-provider) on a free service (Netlify, Render, etc.).

**Option B: Use Netlify as your OAuth proxy only (simpler)**

Even if your *site* is on Cloudflare, you can still use Netlify purely as the OAuth layer:

1. Create a *separate* Netlify site just for auth (it can be empty).
2. Enable **Netlify Identity** and **Git Gateway** on it.
3. In your Hugo site's `config.yml`, point the backend to that Netlify site:

```yaml
backend:
  name: git-gateway
  branch: main
  identity_url: "https://your-auth-site.netlify.app/.netlify/identity"
  gateway_url: "https://your-auth-site.netlify.app/.netlify/git/github"
```

### Step 3: Hugo Content Structure

Hugo expects content in a specific structure. When you create a blog post via Decap CMS, it creates a Markdown file like:

```
content/
  blog/
    2026-03-04-my-first-post.md
```

With front-matter like:

```markdown
---
title: "My First Post"
date: 2026-03-04T10:00:00Z
description: "A short description"
image: "/images/uploads/my-image.jpg"
draft: false
---

Your article body in Markdown here...
```

Hugo automatically renders this into a page based on your templates in `layouts/`.

### Step 4: Cloudflare Pages Build Settings

In **Cloudflare Pages → Your Project → Settings → Builds & Deployments:**

| Setting | Value |
|---|---|
| Build command | `hugo` |
| Build output directory | `public` |
| Root directory | `/` |
| Environment variable | `HUGO_VERSION` = `0.121.0` (or your version) |

Cloudflare Pages automatically rebuilds when you push to your repo - including commits made by Decap CMS.

---

## Understanding the `config.yml` in Depth

The `config.yml` is the single most important file in Decap CMS. Here is a complete reference of the options you will use most:

### Backends

| Backend | Use Case |
|---|---|
| `git-gateway` | Best for Netlify sites; handles auth for you |
| `github` | Direct GitHub OAuth; works on any host |
| `gitlab` | Direct GitLab OAuth |
| `bitbucket` | Direct Bitbucket OAuth |
| `test-repo` | Local testing without a real backend |

### Widget Types

Widgets define what kind of form field appears in the admin UI:

| Widget | Description | Example |
|---|---|---|
| `string` | Single-line text input | Title, author name |
| `text` | Multi-line text area | Short descriptions |
| `markdown` | Rich text editor with Markdown output | Blog post body |
| `image` | File uploader for images | Thumbnails, hero images |
| `datetime` | Date and time picker | Publish date |
| `boolean` | Toggle switch | Draft yes/no |
| `select` | Dropdown menu | Status (live/draft) |
| `list` | Repeatable group of fields | Tags, gallery items |
| `number` | Numeric input | Price, order |
| `object` | Nested group of fields | SEO settings |
| `relation` | Link to another collection entry | Author reference |
| `hidden` | Hidden field with a default value | Template name |

### Collection Types

**Folder collections** - Content stored as individual files in a folder. Best for repeatable content like blog posts, projects, etc.

```yaml
- name: "blog"
  label: "Blog"
  folder: "content/blog"
  create: true
  fields:
    - {label: "Title", name: "title", widget: "string"}
```

**File collections** - Content stored in specific named files. Best for singleton pages like "Home", "About", etc.

```yaml
- name: "pages"
  label: "Pages"
  files:
    - label: "Home Page"
      name: "home"
      file: "src/data/home.json"
      fields:
        - {label: "Hero Title", name: "hero_title", widget: "string"}
```

---

## Real-World Example: My Full `config.yml` for tonycletus.com

Here is the actual config I use in production:

```yaml
backend:
  name: git-gateway
  branch: main

media_folder: "src/public/uploads"
public_folder: "public/uploads"

collections:
  - name: "pages"
    label: "Pages"
    files:
      - label: "Home Page"
        name: "home"
        file: "src/data/home.json"
        fields:
          - {label: "Hero Name", name: "hero_name", widget: "string"}
          - {label: "About Text", name: "about_text", widget: "markdown"}
          - {label: "About Highlight", name: "about_highlight", widget: "markdown"}
      - label: "West Sunset Page"
        name: "westsunset"
        file: "src/data/westsunset.json"
        fields:
          - {label: "Hero Title", name: "hero_title", widget: "string"}
          - {label: "Hero Subtitle", name: "hero_subtitle", widget: "string"}
          - {label: "Hero Image", name: "hero_image", widget: "image"}
          - {label: "About Text", name: "about_text", widget: "markdown"}
          - label: "Stats"
            name: "stats"
            widget: "list"
            fields:
              - {label: "Number", name: "number", widget: "string"}
              - {label: "Label", name: "label", widget: "string"}
          - label: "Features"
            name: "features"
            widget: "list"
            fields:
              - {label: "Feature Text", name: "text", widget: "string"}
          - label: "Gallery Images"
            name: "gallery"
            widget: "list"
            fields:
              - {label: "Image", name: "image", widget: "image"}
              - {label: "Label/Number", name: "label", widget: "string"}
  - name: "projects"
    label: "Projects"
    folder: "src/content/projects"
    create: true
    slug: "{{slug}}"
    extension: "json"
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Status", name: "status", widget: "select",
         options: ["Live", "Coming Soon", "Unreleased", "Live Research"]}
      - {label: "Description", name: "description", widget: "text"}
      - {label: "Tags", name: "tags", widget: "list"}
      - {label: "Live Link URL", name: "link_url", widget: "string", required: false}
      - {label: "Live Link Text", name: "link_text", widget: "string", required: false}
      - {label: "GitHub URL", name: "github_url", widget: "string", required: false}
  - name: "articles"
    label: "Articles"
    folder: "src/content/articles"
    create: true
    slug: "{{slug}}"
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Subtitle", name: "subtitle", widget: "string", required: false}
      - {label: "Date", name: "date", widget: "datetime"}
      - {label: "Status", name: "status", widget: "select",
         options: ["live", "upcoming"], default: "live"}
      - {label: "Thumbnail Image", name: "gallery_img1",
         widget: "image", required: false}
      - {label: "Body", name: "body", widget: "markdown", required: false}
```

This gives me three collections to manage from `tonycletus.com/admin`:
- **Pages** - Edit the Home page and the West Sunset project page.
- **Projects** - Add, edit, or remove portfolio projects.
- **Articles** - Write new blog posts or link to external articles.

---

## Prompts to Give AI Coding Agents

If you are using an AI coding agent (like Claude Code, Cursor, or Antigravity), here are ready-to-copy prompts to help you implement Decap CMS on your project:

### Prompt 1: Add Decap CMS to a Netlify-Hosted Static Site

```
Add Decap CMS to my static site hosted on Netlify. Here is what I need:

1. Create an `admin/index.html` file that loads the Decap CMS script
   and the Netlify Identity widget.
2. Create an `admin/config.yml` file with:
   - backend: git-gateway, branch: main
   - media_folder pointing to my images directory
   - A "blog" collection pointing to my blog content folder,
     with fields for: title (string), date (datetime),
     description (string), featured image (image, optional),
     and body (markdown).
3. Add the Netlify Identity widget script to my main index.html.
4. Update my build script to process Markdown files from the blog
   content folder.

My project structure is:
[paste your folder structure here]
```

### Prompt 2: Add Decap CMS to a Hugo Site on Cloudflare Pages

```
Add Decap CMS to my Hugo site deployed on Cloudflare Pages. I need:

1. Create `static/admin/index.html` with the Decap CMS script.
2. Create `static/admin/config.yml` with:
   - backend: github, repo: my-username/my-repo, branch: main
   - media_folder: "static/images/uploads"
   - public_folder: "/images/uploads"
   - A "blog" collection under "content/blog" with fields for:
     title, date, description, featured image, draft toggle, and body.
3. Help me set up GitHub OAuth for authentication.

My Hugo content structure is:
[paste your content/ folder here]
```

### Prompt 3: Add a New Content Collection to Existing Decap CMS

```
I already have Decap CMS set up on my site. I want to add a new
collection called "projects" to my admin/config.yml.

Each project should have:
- Title (required)
- Description (text, required)
- Status (dropdown: "Live", "Coming Soon", "Unreleased")
- Tags (list of strings)
- Live URL (optional)
- GitHub URL (optional)

Store projects as JSON files in src/content/projects/.
Update my build script to read these JSON files and render them
into my projects section on the homepage.
```

### Prompt 4: Make Specific Page Content Editable via CMS

```
I have a page at /about.html that is currently hardcoded.
I want to make it editable through Decap CMS.

1. Add a new "file" collection entry in my config.yml pointing
   to a JSON data file (e.g., src/data/about.json).
2. Define fields for: hero title, hero subtitle, bio text (markdown),
   and a profile image.
3. Update my build script to read this JSON file and inject it into
   my about page template.
4. Convert my static about.html to a template that reads from
   this data file.
```

---

## Common Pitfalls and How to Fix Them

### 1. "Failed to load config" error
Your `config.yml` is not in the right place. It must be inside the `admin/` folder and accessible at `yoursite.com/admin/config.yml`. Make sure your build process copies the admin folder to your output directory.

### 2. Login loop / "Unable to access identity settings"
- Make sure Netlify Identity is enabled in your Netlify dashboard.
- Make sure Git Gateway is enabled under Identity → Services.
- Check that the Netlify Identity widget script is on your main page, not just the admin page.

### 3. Images not showing after upload
Your `media_folder` and `public_folder` paths are mismatched. `media_folder` is the path *in your Git repo* where uploads are saved. `public_folder` is the URL path your site uses to serve those images. These are often different.

### 4. Content changes not appearing on site
Your build is not being triggered or your build script does not read from the folder Decap CMS writes to. Double check that the `folder` path in your collection matches where your build script looks for content.

### 5. YAML indentation errors
YAML is whitespace-sensitive. Use 2 spaces for indentation (never tabs). Use a YAML validator like [yamllint.com](https://www.yamllint.com/) to check your config.

---

## Summary

| Feature | Detail |
|---|---|
| **Cost** | Free, forever |
| **License** | MIT (open source) |
| **Backend** | Git (GitHub, GitLab, Bitbucket) |
| **Storage** | Your own repo (Markdown, JSON, YAML) |
| **Auth** | Netlify Identity, GitHub OAuth, GitLab OAuth |
| **Hosting** | Works on Netlify, Cloudflare, Vercel, GitHub Pages, or anywhere |
| **UI** | Clean admin panel at `/admin` |

Decap CMS removes the friction of managing content on static sites. You get the speed and security of static hosting with the editing convenience of a traditional CMS. No database. No server. No cost. Just Git.

If you found this useful, share it with a fellow builder. And if you build something with Decap CMS, I would love to see it - reach out on [Twitter @iamtonycletus](https://twitter.com/iamtonycletus).
