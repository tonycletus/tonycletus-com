# Tony Cletus - Portfolio Website

A modern, responsive portfolio website showcasing the work and expertise of Tony Cletus - a full-stack developer, digital marketer, and product manager with 5+ years of experience.

## 🏗️ Project Structure

```
tonycletus-com/
├── public/                  # Static assets served as-is
│   ├── downloads/          # Resume, CV, and downloadable content
│   ├── img/               # Images, icons, and favicon
│   ├── manifest.json      # PWA manifest file
│   └── sw.js             # Service worker for PWA functionality
├── src/                   # Source files (HTML, CSS)
│   ├── css/              # Stylesheets
│   ├── posts/            # Blog posts and articles
│   ├── index.html        # Main portfolio page
│   ├── westsunset.html   # West Sunset NFT showcase
│   └── test-toast.html   # Toast notification test page
├── README.md             # This file
└── .gitignore           # Git ignore rules
```

## 🚀 Features

- **Modern UI/UX Design**: Clean, professional design with smooth animations and transitions
- **Custom Toast Notifications**: Built-in notification system similar to MagicUI/React Toast
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between themes with system preference detection
- **PWA Support**: Progressive Web App with offline capabilities
- **Semantic HTML**: Accessible and SEO-friendly markup
- **Modern CSS**: CSS custom properties, Flexbox, Grid, and responsive design
- **Performance Optimized**: Optimized images and efficient loading
- **Haptic Feedback**: Vibration feedback on mobile devices (where supported)
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and accessibility features
- **CSS3**: Custom properties, Flexbox, Grid, and responsive design
- **JavaScript**: Vanilla JS for theme switching, toast notifications, and PWA functionality
- **PWA**: Service worker and manifest for app-like experience
- **Fonts**: Google Fonts (Syne) and Boxicons for icons

## 🎨 Design System

### Color Scheme
- **Primary**: Custom CSS variables for easy theming
- **Dark Theme**: `#0a0a0a` background, `#ffffff` text, `#f0f2a1` accent
- **Light Theme**: `#ffffff` background, `#37352F` text, `#000000` accent
- **Success**: `#10b981` (green)
- **Error**: `#ef4444` (red)
- **Warning**: `#f59e0b` (yellow)
- **Info**: `#3b82f6` (blue)

### Typography
- **Primary Font**: Syne (Google Fonts) - 400, 500, 600, 700, 800 weights
- **Icon Font**: Boxicons
- **Responsive**: Fluid typography with breakpoints

### Components
- **Toast Notifications**: Custom-built notification system with 4 types (success, error, warning, info)
- **Cards**: Elevated design with hover effects and smooth transitions
- **Buttons**: Interactive buttons with loading states and haptic feedback
- **Forms**: Modern form design with validation and error handling

## 📁 Directory Structure Details

### `/public/` - Static Assets
- **downloads/**: PDF files (resume, CV, digital marketing guide)
- **img/**: All images including:
  - Portfolio images
  - Sunset NFT collection
  - Icons and favicon
  - Banners and logos
- **manifest.json**: PWA configuration
- **sw.js**: Service worker for offline functionality

### `/src/` - Source Files
- **css/style.css**: Main stylesheet with modern design system
- **posts/**: Blog posts and articles
- **index.html**: Main portfolio page with enhanced UI/UX
- **westsunset.html**: NFT showcase page
- **test-toast.html**: Toast notification testing page

## 🔧 Development

### Local Development
1. Clone the repository
2. Navigate to the `src/` directory
3. Start a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   ```
4. Open `http://localhost:8000` in your browser

### Testing Toast Notifications
Visit `http://localhost:8000/test-toast.html` to test the custom toast notification system.

### File Organization
- **HTML Files**: Located in `/src/` with semantic structure
- **CSS**: Single file in `/src/css/` with modern design system
- **Assets**: All static files in `/public/` for easy serving
- **Images**: Optimized and organized in `/public/img/`

### Best Practices
- Use semantic HTML5 elements
- Maintain accessibility standards (ARIA labels, alt text)
- Follow responsive design principles
- Optimize images for web
- Use CSS custom properties for theming
- Implement proper error handling
- Add haptic feedback for mobile interactions

## 🎯 UI/UX Improvements

### Modern Design Principles
- **Consistency**: Unified design language across all components
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Optimized animations and transitions
- **Responsiveness**: Mobile-first design approach
- **Interactivity**: Smooth hover effects and micro-interactions

### Custom Toast System
- **4 Types**: Success, Error, Warning, Info
- **Auto-dismiss**: Configurable duration (default: 4 seconds)
- **Manual close**: Click X to dismiss immediately
- **Haptic feedback**: Vibration on mobile devices
- **Smooth animations**: Slide-in/out with opacity transitions
- **Accessible**: Proper ARIA labels and keyboard navigation

### Enhanced Form Experience
- **Real-time validation**: Instant feedback on input
- **Loading states**: Visual feedback during submission
- **Error handling**: Clear error messages with toast notifications
- **Success feedback**: Confirmation messages
- **Accessibility**: Proper form labels and error associations

## 📱 PWA Features

- **Offline Support**: Service worker caches essential resources
- **Installable**: Can be installed as a native app
- **Manifest**: App metadata and icons
- **Theme Color**: Consistent branding across platforms

## 🚀 Deployment

The site is designed to be deployed as static files. Simply upload the contents to any web server or static hosting service:

- **Netlify**: Drag and drop the project folder
- **Vercel**: Connect your Git repository
- **GitHub Pages**: Push to a GitHub repository
- **Traditional Hosting**: Upload via FTP/SFTP

## 🔒 Security Features

- **CSRF Protection**: Form tokens and validation
- **Input Sanitization**: Proper email validation
- **XSS Prevention**: Content Security Policy headers
- **HTTPS Ready**: Secure asset loading

## 📄 License

This project is personal and proprietary. All rights reserved.

## 👤 Contact

- **Email**: tc@tonycletus.com
- **Twitter**: [@iamtonycletus](https://twitter.com/iamtonycletus)
- **LinkedIn**: [Tony Cletus](https://linkedin.com/in/tonycletus)
- **GitHub**: [tonycletus](https://github.com/tonycletus)

---

*Built with ❤️ by Tony Cletus*
