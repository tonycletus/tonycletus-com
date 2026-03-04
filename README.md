# Tony Cletus - Portfolio Website

[![Netlify Status](https://api.netlify.com/api/v1/badges/250124cc-300a-49ed-8250-1e4be72cd416/deploy-status)](https://app.netlify.com/projects/pensive-curran-7396c5/deploys)
A modern, responsive portfolio website showcasing Tony Cletus's work as a Full-Stack Developer, Product Manager, and AI researcher.

## 🚀 Features

- **Responsive Design** - Works perfectly on all devices
- **Dark/Light Theme** - User preference with auto-detection
- **PWA Ready** - Progressive Web App with offline capabilities
- **Performance Optimized** - Fast loading with optimized assets
- **SEO Optimized** - Meta tags, Open Graph, and Twitter Cards
- **Accessibility** - WCAG compliant with proper ARIA labels

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties
- **JavaScript** - Vanilla JS for interactivity
- **Boxicons** - Icon library
- **Google Fonts** - Typography

## 📁 Project Structure

```
tonycletus-com/
├── src/                    # Source files (publish directory)
│   ├── index.html         # Main portfolio page
│   ├── css/               # Stylesheets
│   ├── posts/             # Blog posts
│   ├── public/            # Static assets
│   │   ├── img/           # Images and logos
│   │   ├── downloads/     # PDF files
│   │   ├── manifest.json  # PWA manifest
│   │   └── sw.js         # Service Worker
│   └── ...
├── netlify.toml          # Netlify configuration
├── package.json          # Project metadata
└── README.md             # This file
```

## 🚀 Deployment

### Netlify (Recommended)

This site is configured for effortless deployment on Netlify:

1. **Connect Repository**: Link your GitHub/GitLab repository to Netlify

2. **Auto-Deploy**: Netlify will automatically detect the configuration and deploy

3. **No Build Required**: This is a static site - no build process needed

4. **Easy Updates**: Just commit and push your changes:
   ```bash
   git add .
   git commit -m "Update site"
   git push
   ```

#### Netlify Configuration

The `netlify.toml` file includes:
- **Publish Directory**: `src` (where your `index.html` is located)
- **No Build Command**: Static site doesn't need building
- **Security Headers**: XSS protection, frame options, etc.
- **Caching**: Optimized cache headers for static assets
- **Redirects**: Clean URL handling

### Manual Deployment

If you prefer to deploy manually:

1. Clone the repository
2. Upload the `src` directory contents to your web server
3. Ensure the `public` folder is accessible

## 🔧 Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/tonycletus-com.git
   cd tonycletus-com
   ```

2. Open `src/index.html` in your browser or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve src
   ```

3. Visit `http://localhost:8000` in your browser

## 📝 Customization

### Content Updates
- Edit `src/index.html` to update your portfolio content
- Modify `src/css/style.css` for styling changes
- Update images in `src/public/img/`

### SEO & Meta Tags
- Update meta tags in the `<head>` section of `index.html`
- Modify Open Graph and Twitter Card properties
- Update the `src/public/manifest.json` for PWA settings

## 🌐 Live Site

Visit: [https://tonycletus.com](https://tonycletus.com)

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ by Tony Cletus
