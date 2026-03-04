const fs = require('fs-extra');
const ejs = require('ejs');
const fm = require('front-matter');
const path = require('path');
const glob = require('glob');

async function build() {
    const { marked } = await import('marked');
    // Directories
    const srcDir = path.join(__dirname, 'src');
    const distDir = path.join(__dirname, 'dist');
    const dataDir = path.join(srcDir, 'data');
    const articlesDir = path.join(srcDir, 'content', 'articles');
    const projectsDir = path.join(srcDir, 'content', 'projects');

    // Make sure dist is empty initially
    await fs.emptyDir(distDir);

    // Copy src to dist
    await fs.copy(srcDir, distDir);

    // Load home.json
    let homeData = { title: "Tony Cletus" };
    if (await fs.pathExists(path.join(dataDir, 'home.json'))) {
        homeData = await fs.readJson(path.join(dataDir, 'home.json'));
    }

    // Load projects and sort
    const projects = [];
    if (await fs.pathExists(projectsDir)) {
        const projectFiles = glob.sync(`${projectsDir}/*.json`);
        for (const file of projectFiles) {
            projects.push(await fs.readJson(file));
        }
    }
    // Sort projects alphabetically from a to z
    projects.sort((a, b) => a.title.localeCompare(b.title));

    // Load articles and sort
    let upcomingArticles = [];
    let liveArticles = [];
    if (await fs.pathExists(articlesDir)) {
        const articleFiles = glob.sync(`${articlesDir}/*.md`);
        for (const file of articleFiles) {
            const content = await fs.readFile(file, 'utf-8');
            const parsed = fm(content);
            const bodyHtml = marked.parse(parsed.body);
            const slug = path.basename(file, '.md');
            const wordCount = parsed.body.split(/\s+/).length;
            const readTime = Math.ceil(wordCount / 200) || 1;

            const articleData = {
                ...parsed.attributes,
                slug,
                body: bodyHtml,
                readTime
            };

            // Process article templates only for internal articles
            if (!articleData.is_external && await fs.pathExists(path.join(srcDir, 'article.ejs'))) {
                const articleTemplate = await fs.readFile(path.join(srcDir, 'article.ejs'), 'utf-8');
                const articleHtml = ejs.render(articleTemplate, { article: articleData, marked });

                await fs.ensureDir(path.join(distDir, 'articles'));
                await fs.writeFile(path.join(distDir, 'articles', `${slug}.html`), articleHtml);
            }

            // Push to arrays
            if (articleData.status === 'upcoming') {
                upcomingArticles.push(articleData);
            } else {
                liveArticles.push(articleData);
            }
        }

        // Sort articles by date descending
        const dateSort = (a, b) => new Date(b.date || 0) - new Date(a.date || 0);
        liveArticles.sort(dateSort);
        upcomingArticles.sort(dateSort);
    }

    // Build index.html NOW, because it has all extracted data 
    const indexTemplate = await fs.readFile(path.join(srcDir, 'index.ejs'), 'utf-8');
    const indexHtml = ejs.render(indexTemplate, { home: homeData, projects, liveArticles, upcomingArticles, marked });
    await fs.writeFile(path.join(distDir, 'index.html'), indexHtml);

    // Build westsunset.html 
    let westsunsetData = {};
    if (await fs.pathExists(path.join(dataDir, 'westsunset.json'))) {
        westsunsetData = await fs.readJson(path.join(dataDir, 'westsunset.json'));
    }
    if (await fs.pathExists(path.join(srcDir, 'westsunset.ejs'))) {
        const westsunsetTemplate = await fs.readFile(path.join(srcDir, 'westsunset.ejs'), 'utf-8');
        const westsunsetHtml = ejs.render(westsunsetTemplate, { page: westsunsetData, marked });
        await fs.writeFile(path.join(distDir, 'westsunset.html'), westsunsetHtml);
    }

    // Clean up template files and unneeded raw data files in dist
    await fs.remove(path.join(distDir, 'index.ejs'));
    await fs.remove(path.join(distDir, 'article.ejs'));
    await fs.remove(path.join(distDir, 'westsunset.ejs'));
    await fs.remove(path.join(distDir, 'data'));
    await fs.remove(path.join(distDir, 'content'));

    console.log('Build successful!');
}

build().catch(err => {
    console.error(err);
    process.exit(1);
});
