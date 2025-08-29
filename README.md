# Webpage: https://ohmybuddyboy.com
Very silly, simple, basic, HTML + CSS website for the Best Dog on the Internets.

## Features

### Random Dog Images
- Serves a random dog image on each page refresh
- Images are cached in localStorage for performance
- Automatic watermarking with "@ohmybuddyboy"

### Seasonal Themes 🎃🎄⭐
The website automatically changes its appearance on special dates:

- **Halloween** (October 1-31): Spooky dark theme with pumpkins, ghosts, bats, and spiders
- **Christmas** (December 1-31): Festive blue theme with falling snow and Christmas trees
- **4th of July** (July 1-7): Patriotic red, white, and blue theme with fireworks and stars

Each seasonal theme includes:
- Special background colors and gradients
- Animated decorative elements
- Dedicated logo image (logo22.png for Halloween, logo2.png for Christmas, logo11.png for 4th of July)
- Themed text colors and styling

## Files

- `index.html` - Main website
- `buddy.js` - Random image logic and watermarking
- `seasonal-themes.js` - Automatic seasonal theme detection and application
- `buddy.css` - Styling including seasonal theme styles
- `theme-tester.html` - Test page to preview all themes (for development)

## How It Works

The seasonal themes system automatically detects the current date and applies the appropriate theme. Users visiting during holiday periods will see the themed version without any interaction required. The system is completely transparent and enhances the surprise factor of the random dog images.
