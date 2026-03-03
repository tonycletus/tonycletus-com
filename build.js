const fs = require('fs-extra');
const ejs = require('ejs');
const { marked } = require('marked');
const fm = require('front-matter');
const path = require('path');
const glob = require('glob');

async function build() {
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

    // Load projects
    const projects = [];
    if (await fs.pathExists(projectsDir)) {
        const projectFiles = glob.sync(`${projectsDir}/*.json`);
        for (const file of projectFiles) {
            projects.push(await fs.readJson(file));
        }
    }

    // Load articles
    let upcomingArticles = [];
    let liveArticles = [];
    if (await fs.pathExists(articlesDir)) {
        const articleFiles = glob.sync(`${articlesDir}/*.md`);
        for (const file of articleFiles) {
            const content = await fs.readFile(file, 'utf-8');
            const parsed = fm(content);
            const bodyHtml = marked.parse(parsed.body);
            const slug = path.basename(file, '.md');
            const articleData = {
                ...parsed.attributes,
                slug,
                body: bodyHtml
            };

            // Process article templates
            if (await fs.pathExists(path.join(srcDir, 'article.ejs'))) {
                const articleTemplate = await fs.readFile(path.join(srcDir, 'article.ejs'), 'utf-8');
                const articleHtml = ejs.render(articleTemplate, { article: articleData });

                await fs.ensureDir(path.join(distDir, 'articles'));
                await fs.writeFile(path.join(distDir, 'articles', `${slug}.html`), articleHtml);
            }

            // Push to arrays based on "status" or assume all are live if no status
            if (articleData.status === 'upcoming') {
                upcomingArticles.push(articleData);
            } else {
                liveArticles.push(articleData);
            }
        }
    }

    // Build index.html NOW, because it has all extracted data 
    const indexTemplate = await fs.readFile(path.join(srcDir, 'index.ejs'), 'utf-8');
    const indexHtml = ejs.render(indexTemplate, { home: homeData, projects, liveArticles, upcomingArticles, marked });
    await fs.writeFile(path.join(distDir, 'index.html'), indexHtml);

    // Clean up template files and unneeded raw data files in dist
    await fs.remove(path.join(distDir, 'index.ejs'));
    await fs.remove(path.join(distDir, 'article.ejs'));
    await fs.remove(path.join(distDir, 'data'));
    await fs.remove(path.join(distDir, 'content'));

    console.log('Build successful!');
}

build().catch(err => {
    console.error(err);
    process.exit(1);
});
