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
        const logos = [];
        let index = 0;
        while (true) {
            try {
                const url = `logos/logo${index}.png`;
                await checkImage(url);
                logos.push(url);
                index++;
            } catch {
                break; // Stop when we can't load an image
            }
        }
        return logos;
    };

    const addWatermark = (src) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "anonymous"; // Add this line
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                const desiredWidth = 400;
                const desiredHeight = 400;
                
                const aspect = img.width / img.height;
                let newWidth = desiredWidth;
                let newHeight = desiredHeight;
                
                if (img.width > img.height) {
                    newHeight = desiredWidth / aspect;
                } else {
                    newWidth = desiredHeight * aspect;
                }
                
                canvas.width = desiredWidth;
                canvas.height = desiredHeight;
                
                const xOffset = (desiredWidth - newWidth) / 2;
                const yOffset = (desiredHeight - newHeight) / 2;
                
                ctx.drawImage(img, xOffset, yOffset, newWidth, newHeight);
                
                ctx.save();
                ctx.translate(canvas.width, canvas.height);
                ctx.rotate(-Math.PI / 2);
                ctx.font = '12px Arial';
                ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                ctx.fillText('@ohmybuddyboy', 5, -5);
                ctx.restore();
                
                resolve(canvas.toDataURL());
            };
            img.onerror = reject;
            img.src = src;
        });
    };

    try {
        const logos = await loadLogos();
        if (logos.length > 0) {
            const randomLogo = logos[Math.floor(Math.random() * logos.length)];
            const watermarkedLogo = await addWatermark(randomLogo);
            logoImg.src = watermarkedLogo;
        } else {
            console.error('No logos found.');
        }
    } catch (error) {
        console.error('Error processing logos:', error);
    }

    // Disable right-click on the entire webpage
    document.addEventListener('contextmenu', (e) => e.preventDefault(), false);
});
