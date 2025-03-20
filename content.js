const interactForDuration = async (durationInMinutes) => {
    const durationInMs = durationInMinutes * 60 * 1000; // Convert minutes to milliseconds
    const startTime = Date.now();

    const getRandomDelay = (min, max) => Math.random() * (max - min) + min;

    const performActions = async () => {
        if (Date.now() - startTime > durationInMs) {
            console.log("Interaction complete!");
            return;
        }

        // Scroll down the page
        window.scrollBy({
            top: window.innerHeight,
            behavior: "smooth" // Smooth scrolling
        });
        console.log("Scrolled down!");

        // Introduce a random delay before the next action (e.g., 3-7 seconds)
        await new Promise(resolve => setTimeout(resolve, getRandomDelay(3000, 7000)));

        // Locate navigation links
        const navigationLinks = Array.from(document.querySelectorAll("a, button"));
        const targetLinks = navigationLinks.filter(link => {
            const text = link.innerText.toLowerCase();
            return text.includes("home") || text.includes("about") || text.includes("services") || text.includes("contact");
        });

        // Randomly click on one of the found links, if any
        if (targetLinks.length > 0) {
            const randomIndex = Math.floor(Math.random() * targetLinks.length);
            const selectedLink = targetLinks[randomIndex];

            selectedLink.click();
            console.log(`Navigated to: ${selectedLink.innerText}`);
        } else {
            console.log("No navigation links found!");
        }

        // Introduce another random delay before repeating actions
        await new Promise(resolve => setTimeout(resolve, getRandomDelay(3000, 7000)));

        // Repeat actions
        performActions();
    };

    performActions();
};

// Start interaction for 20 minutes
interactForDuration(20);
