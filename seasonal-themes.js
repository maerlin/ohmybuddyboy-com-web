// Seasonal Themes Handler
class SeasonalThemes {
    constructor() {
        this.themes = {
            halloween: {
                name: 'halloween',
                startDate: { month: 10, day: 1 }, // October 1st
                endDate: { month: 10, day: 31 }, // October 31st
                logo: 'logos/logo22.png', // Fixed logo for Halloween (no randomization)
                cssClass: 'theme-halloween'
            },
            christmas: {
                name: 'christmas',
                startDate: { month: 12, day: 1 }, // December 1st
                endDate: { month: 12, day: 31 }, // December 31st
                logo: 'logos/logo2.png', // Fixed logo for Christmas (no randomization)
                cssClass: 'theme-christmas'
            },
            fourthOfJuly: {
                name: 'fourthOfJuly',
                startDate: { month: 7, day: 1 }, // July 1st
                endDate: { month: 7, day: 7 }, // July 7th (week of 4th)
                logo: 'logos/logo11.png', // Fixed logo for 4th of July (no randomization)
                cssClass: 'theme-fourthOfJuly'
            }
        };
        
        this.currentTheme = null;
        this.init();
    }

    init() {
        this.detectCurrentTheme();
        this.applyTheme();
    }

    detectCurrentTheme() {
        const today = new Date();
        const currentMonth = today.getMonth() + 1; // getMonth() returns 0-11
        const currentDay = today.getDate();

        for (const [key, theme] of Object.entries(this.themes)) {
            if (this.isDateInRange(currentMonth, currentDay, theme.startDate, theme.endDate)) {
                this.currentTheme = theme;
                break;
            }
        }
    }

    isDateInRange(currentMonth, currentDay, startDate, endDate) {
        if (startDate.month === endDate.month) {
            // Same month range (like 4th of July)
            return currentMonth === startDate.month && 
                   currentDay >= startDate.day && 
                   currentDay <= endDate.day;
        } else if (startDate.month < endDate.month) {
            // Normal month range (like Halloween)
            return (currentMonth === startDate.month && currentDay >= startDate.day) ||
                   (currentMonth === endDate.month && currentDay <= endDate.day) ||
                   (currentMonth > startDate.month && currentMonth < endDate.month);
        } else {
            // Cross-year range (like Christmas to New Year)
            return (currentMonth === startDate.month && currentDay >= startDate.day) ||
                   (currentMonth === endDate.month && currentDay <= endDate.day) ||
                   (currentMonth > startDate.month || currentMonth < endDate.month);
        }
    }

    applyTheme() {
        if (!this.currentTheme) {
            return; // No theme to apply
        }

        // Add theme class to body
        document.body.classList.add(this.currentTheme.cssClass);
        
        // Add theme class to main container
        const container = document.getElementById('pb-container');
        if (container) {
            container.classList.add(this.currentTheme.cssClass);
        }

        // Update logo source for seasonal theme
        const logoImg = document.querySelector('.logo-img');
        if (logoImg) {
            logoImg.src = this.currentTheme.logo;
            console.log(`Set seasonal logo: ${this.currentTheme.logo}`);
        }

        // Add seasonal background elements
        this.addSeasonalBackground();
        
        console.log(`Applied ${this.currentTheme.name} theme!`);
    }

    addSeasonalBackground() {
        // Remove any existing seasonal backgrounds from body
        const existingBg = document.body.querySelector('.seasonal-background');
        if (existingBg) {
            existingBg.remove();
        }

        const bgElement = document.createElement('div');
        bgElement.className = 'seasonal-background';
        
        switch (this.currentTheme.name) {
                            case 'halloween':
                    bgElement.innerHTML = `
                        <div class="halloween-elements">
                            <div class="bat"></div>
                            <div class="bat"></div>
                            <div class="bat"></div>
                            <div class="bat"></div>
                            <div class="ghost"></div>
                            <div class="ghost"></div>
                            <div class="ghost"></div>
                            <div class="spider"></div>
                        </div>
                    `;
                    break;
            case 'christmas':
                bgElement.innerHTML = `
                    <div class="christmas-elements">
                        <div class="snowflake" style="--delay: 0s"></div>
                        <div class="snowflake" style="--delay: 1s"></div>
                        <div class="snowflake" style="--delay: 2s"></div>
                        <div class="snowflake" style="--delay: 3s"></div>
                        <div class="snowflake" style="--delay: 4s"></div>
                        <div class="snowflake" style="--delay: 5s"></div>
                        <div class="snowflake" style="--delay: 6s"></div>
                        <div class="snowflake" style="--delay: 7s"></div>
                        <div class="snowflake" style="--delay: 8s"></div>
                        <div class="snowflake" style="--delay: 9s"></div>
                    </div>
                `;
                break;
            case 'fourthOfJuly':
                bgElement.innerHTML = `
                    <div class="fourth-of-july-elements">
                        <div class="firework" style="--delay: 0s"></div>
                        <div class="firework" style="--delay: 1s"></div>
                        <div class="firework" style="--delay: 2s"></div>
                        <div class="firework" style="--delay: 3s"></div>
                        <div class="firework" style="--delay: 4s"></div>
                    </div>
                `;
                break;
        }

        document.body.appendChild(bgElement);
    }
}

// Initialize seasonal themes when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SeasonalThemes();
});
