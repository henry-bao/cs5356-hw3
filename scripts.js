const jokeSetup = document.getElementById('joke-setup');
const jokeDelivery = document.getElementById('joke-delivery');
const jokeBtn = document.getElementById('joke-btn');

async function getJoke() {
    try {
        jokeDelivery.classList.remove('visible');

        wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        await wait(500);

        const response = await fetch('https://v2.jokeapi.dev/joke/Any?safe-mode');
        const data = await response.json();

        if (!data.error) {
            if (data.type === 'twopart') {
                jokeSetup.textContent = data.setup;
                jokeDelivery.textContent = data.delivery;
                setTimeout(() => {
                    jokeDelivery.classList.add('visible');
                }, 500);
            } else {
                jokeSetup.textContent = data.joke;
                jokeDelivery.textContent = '';
            }
        } else {
            jokeSetup.textContent = 'Could not fetch a joke. Please try again.';
            jokeDelivery.textContent = '';
        }
    } catch (error) {
        jokeSetup.textContent = 'Could not connect to the joke service.';
        jokeDelivery.textContent = '';
        console.error('Error fetching joke:', error);
    }
}

jokeBtn.addEventListener('click', getJoke);

// Load a joke when the page loads
document.addEventListener('DOMContentLoaded', getJoke);

// Dark mode toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    themeToggle.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Mouse follower
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursorFollower.style.left = `${e.clientX}px`;
    cursorFollower.style.top = `${e.clientY}px`;
});

// Make the follower larger when hovering over interactive elements
const interactiveElements = document.querySelectorAll('button, a, summary');

interactiveElements.forEach((element) => {
    element.addEventListener('mouseenter', () => {
        cursorFollower.style.width = '40px';
        cursorFollower.style.height = '40px';
    });

    element.addEventListener('mouseleave', () => {
        cursorFollower.style.width = '20px';
        cursorFollower.style.height = '20px';
    });
});
