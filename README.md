# Modern Portfolio Website

A sleek and modern portfolio website built with TypeScript, React, Next.js, and SCSS. Features a clean design with smooth animations and responsive layout.

## 🚀 Tech Stack

- **Frontend**: React 18, Next.js 15, TypeScript
- **Styling**: SCSS, CSS Modules
- **Design**: Modern Gray & White Theme with Beige Accents
- **Animation**: CSS Animations, Smooth Transitions
- **Development**: ESLint 9, Modern Build Tools

## ✨ Key Features

- 🎨 **Modern Design**: Clean gray and white theme with sophisticated beige accents
- 📱 **Fully Responsive**: Optimized experience across all devices
- 🃏 **Interactive Cards**: Clickable project and study cards with detailed overlays
- ⚡ **Smooth Animations**: Subtle hover effects and seamless transitions
- 📊 **Timeline Layout**: Professional experience displayed in timeline format
- 📧 **Email Integration**: Custom email composition overlay with form validation
- 🎯 **Portfolio Sections**: Organized sections for projects, experience, study, and contact
- ⚡ **Performance Optimized**: Built with modern React patterns and optimizations

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with navigation
│   └── page.tsx           # Home page with all sections
├── data/                  # Static data files
│   ├── projects.json      # Featured projects data
│   ├── experience.json    # Professional experience
│   ├── study.json         # Learning & blog posts
│   └── contact.json       # Contact information
└── styles/               # Global styles
    └── globals.scss      # Global SCSS variables and base styles
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will start at [http://localhost:3000](http://localhost:3000).

### Build for Production
```bash
# Create production build
npm run build

# Start production server
npm start
```

## 🎨 Customization

### Color Theme
Modify CSS variables in `src/styles/globals.scss`:

```scss
:root {
  --primary-dark: #222831;      # Main dark color
  --secondary-dark: #393E46;    # Secondary dark
  --accent-beige: #DFD0B8;      # Beige accent
  --light-beige: #948979;       # Light beige
  --white: #ffffff;             # Background white
  --light-gray: #f8f8f8;        # Light gray background
}
```

### Content Management
Update data in the JSON files in `src/data/`:

- **projects.json**: Featured projects with descriptions and tech stacks
- **experience.json**: Professional experience and education
- **study.json**: Learning posts and blog articles
- **contact.json**: Contact methods and information

## 📱 Responsive Design

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: 767px and below

All sections are optimized for each screen size.

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Build
npm run build

# Upload the generated files to Netlify
```

## 📄 License

MIT License - Feel free to use and modify as needed.

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

- Email: jihwan.kim@email.com
- GitHub: [jihwan.kim](https://github.com/jihwan.kim)
- LinkedIn: [JiHwan Kim](https://linkedin.com/in/jihwan-kim)

---

⭐ If this project helped you, please give it a star!
