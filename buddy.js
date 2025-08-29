document.addEventListener("DOMContentLoaded", async () => {
  const logoImg = document.querySelector('.logo-img');

  const checkImage = (url) => {
      return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(url);
          img.onerror = reject;
          img.src = url;
      });
  };

  const loadLogos = async () => {
    let cachedLogos = localStorage.getItem('cachedLogos');
    if (cachedLogos) {
        return JSON.parse(cachedLogos);
    }

    const logos = [];
    const maxLogos = 100; // Adjust this number based on your maximum expected number of logos

    for (let i = 0; i < maxLogos; i++) {
        try {
            const url = `logos/logo${i}.png`;
            await checkImage(url);
            logos.push(url);
        } catch (error) {
            // If an image fails to load, we assume we've reached the end of available logos
            break;
        }
    }

    if (logos.length > 0) {
        localStorage.setItem('cachedLogos', JSON.stringify(logos));
    }

    return logos;
  };

  const addWatermark = (src) => {
      return new Promise((resolve) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              
              canvas.width = 400;
              canvas.height = 400;
              
              requestAnimationFrame(() => {
                  const aspect = img.width / img.height;
                  let newWidth = 400;
                  let newHeight = 400;
                  
                  if (img.width > img.height) {
                      newHeight = 400 / aspect;
                  } else {
                      newWidth = 400 * aspect;
                  }
                  
                  const xOffset = (400 - newWidth) / 2;
                  const yOffset = (400 - newHeight) / 2;
                  
                  ctx.drawImage(img, xOffset, yOffset, newWidth, newHeight);
                  
                  ctx.save();
                  ctx.translate(canvas.width, canvas.height);
                  ctx.rotate(-Math.PI / 2);
                  ctx.font = '12px Arial';
                  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                  ctx.fillText('@ohmybuddyboy', 5, -5);
                  ctx.restore();
                  
                  resolve(canvas.toDataURL());
              });
          };
          img.src = src;
      });
  };

  try {
    const logos = await loadLogos();
    console.log(`Found ${logos.length} logos:`, logos);
    if (logos.length > 0) {
        // Check if seasonal theme is active (if body has a theme class, don't change logo)
        const hasSeasonalTheme = document.body.classList.contains('theme-halloween') || 
                                document.body.classList.contains('theme-christmas') || 
                                document.body.classList.contains('theme-fourthOfJuly');
        
        if (!hasSeasonalTheme) {
            const randomLogo = logos[Math.floor(Math.random() * logos.length)];
            console.log('Selected logo:', randomLogo);
            const watermarkedLogo = await addWatermark(randomLogo);
            logoImg.src = watermarkedLogo;
        } else {
            console.log('Seasonal theme active, logo already set by theme system');
        }
    } else {
        console.error('No logos found.');
    }
  } catch (error) {
      console.error('Error processing logos:', error);
  }

  document.addEventListener('contextmenu', (e) => e.preventDefault(), false);
});
