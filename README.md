# Cyberpunk Portfolio Website

A visually stunning, cyberpunk-inspired personal portfolio website that showcases my skills and projects in an immersive, futuristic digital environment.

## Features

- **Dynamic 3D Space Background**: Immersive Three.js-powered 3D environment with floating neon grids and low-poly cityscapes
- **Neon Cyberpunk Aesthetics**: Dark interfaces with glowing electric blue and purple accents
- **Interactive Elements**: Glitchy text effects, hover-triggered particle bursts, and reactive 3D project cards
- **Hidden Easter Egg**: Secret contact form accessible only by entering the Konami code
- **Parallax Effects**: Depth-enhanced scrolling experience with layered elements
- **Responsive Design**: Fully responsive across all device sizes

## Easter Egg

The website includes a hidden contact form that can be accessed by entering the Konami code:

↑ ↑ ↓ ↓ ← → ← → B A

This will trigger a special "ACCESS GRANTED" animation and reveal the contact form.

## Technologies Used

- **Next.js**: React framework for server-rendered applications
- **TypeScript**: Type-safe JavaScript
- **Three.js**: 3D rendering library for creating the immersive background
- **React Three Fiber**: React renderer for Three.js
- **Framer Motion**: Animation library for React
- **Tailwind CSS**: Utility-first CSS framework
- **GSAP**: Advanced animation library for complex effects

## Setup and Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cyberpunk-portfolio.git
cd cyberpunk-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

```bash
npm run build
npm run start
```

## Performance Considerations

- The 3D background uses optimized geometries to ensure smooth performance
- Images are properly sized and optimized for web
- Component code splitting and dynamic imports are used to reduce initial load time

## License

This project is open source and available under the [MIT License](LICENSE).

## Credits

- Fonts: Orbitron, Press Start 2P, and Rajdhani from Google Fonts
- 3D inspiration from Three.js examples and demos
- Project images from Unsplash

## Email Configuration

The contact form is set up to send emails to your personal address. To configure this feature:

1. Edit the `.env.local` file with your email credentials:
   ```
   EMAIL_USER=your-gmail-address@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_RECIPIENT=where-to-receive-messages@example.com
   ```

2. For Gmail, you'll need to create an "App Password":
   - Go to your Google Account settings
   - Enable 2-Step Verification if you haven't already
   - Go to "Security" → "App passwords"
   - Create a new app password for "Mail" → "Other (Custom name)"
   - Use the generated password as your EMAIL_PASS

3. Restart the development server after making these changes.

Note: Never commit your `.env.local` file to version control. It's already in the `.gitignore` file.

---

Designed and developed with ❤️ by Tiffany 

