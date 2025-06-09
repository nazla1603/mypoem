const poemDisplay = document.getElementById('poem-display');
const choicesContainer = document.getElementById('choices-container');
let userName = ''; // Variable to store user's name

// Object containing all poem segments and their choices
const poemData = {
    "start": {
        text: "Between the sunset's soft embrace,\na silent promise, etched with grace.\nMy steps dance on the edge of time's space,\nseeking meaning in this heart's maze.",
        choices: [
            { text: "Follow the wind's whisper", next: "wind_whisper" },
            { text: "Listen to my heartbeat", next: "heart_beat" }
        ]
    },
    "wind_whisper": {
        text: "The wind carries echoes of the past,\na scent of memories, holding fast.\nIllusions rise, meant not to last,\nof dreams forgotten, now outcast.",
        choices: [
            { text: "Chase that shadow", next: "chase_shadow" },
            { text: "Let it fade away", next: "let_go" }
        ]
    },
    "heart_beat": {
        text: "In silence, my heart begins to chime,\na rhythm boundless, defying time.\nStrength emerges from doubt's sublime,\nguiding my path, in this life's climb.",
        choices: [
            { text: "Face the fear", next: "face_fear" },
            { text: "Keep walking calmly", next: "calm_stride" }
        ]
    },
    "chase_shadow": {
        text: "The shadow dances, ever so far,\nI run, breathless, beneath a fading star.\nHingga di ujung fatamorgana yang semu,\nI find but emptiness, a silent roar.",
        choices: [
            { text: "Accept the void", next: "ending_empty" },
            { text: "Seek a new light", next: "seek_light_from_shadow" }
        ]
    },
    "let_go": {
        text: "I breathe out slowly, letting it go,\nthe past dissolving, soft and low.\nMy spirit floats, a boundless flow,\nfinding peace in the quiet glow.",
        choices: [
            { text: "Find serenity", next: "ending_peace" },
            { text: "Wish to restart", next: "restart_from_calm" }
        ]
    },
    "face_fear": {
        text: "Fear's monster takes a solid form,\nyet I gaze back, braving the storm. \nRealizing it's but an illusion warm,\nstrength arises, my soul takes reform.",
        choices: [
            { text: "Celebrate victory", next: "ending_triumph" },
            { text: "Share this tale", next: "share_story" }
        ]
    },
    "calm_stride": {
        text: "Calm steps traverse the flow of time,\neach footprint, a lesson sublime.\nWithout rush, without a doubt's chime,\ntowards destiny, awaiting its prime.",
        choices: [
            { text: "Enjoy the process", next: "ending_journey" },
            { text: "Explore deeper", next: "explore_deeper" }
        ]
    },
    "seek_light_from_shadow": {
        text: "From shadow's ruin, light starts to creep,\nhope blossoms where despair once steeped.\nA tiny lantern, promises to keep,\nguiding my path, to eternity's deep.",
        choices: [
            { text: "Discover hope", next: "ending_hope" },
            { text: "Desire deep reflection", next: "reflection_from_hope" }
        ]
    },
    "restart_from_calm": {
        text: "Back to square one, with a spirit new,\nthis time, my heart, I will choose you: my heartbeat true.",
        choices: [
            { text: "Listen to my heartbeat", next: "heart_beat" }
        ]
    },
    "share_story": {
        text: "My story now, a burning flame,\nigniting spirits, calling their name.\nA melody of courage, forever the same,\ninspiring, guiding, beyond any frame.",
        choices: [
            { text: "Inspire others", next: "ending_inspire" }
        ]
    },
    "explore_deeper": {
        text: "The soul's abyss calls out to me,\nwhere cosmos secrets peacefully be.\nEach layer unveiled, for all to see,\nfinding wisdom, eternally free.",
        choices: [
            { text: "Delve into wisdom", next: "ending_wisdom" }
        ]
    },
    // --- Ending Sections ---
    "ending_empty": {
        text: "Yet, emptiness lingers still,\nlike echoes in a lonely hall.\nNo end, no purpose to fulfill,\njust eternal silence, answering no call.",
        choices: []
    },
    "ending_peace": {
        text: "Beneath the sky, so calm and wide,\nmy soul finds where it can confide.\nWithout burden, with nothing to hide,\nonly perfect serenity, flowing like a tide.",
        choices: []
    },
    "ending_triumph": {
        text: "Scars as marks, tales as a claim,\nvictory is yours, a glorious game.\nRising from ashes, calling your name,\nthe soul blossoms, renewed by its flame.",
        choices: []
    },
    "ending_journey": {
        text: "This journey never truly ends,\neach moment, a gift that transcends.\nSavoring every step, as fate extends,\nuntil time itself, its final message sends.",
        choices: []
    },
    "ending_hope": {
        text: "Hope's light now gently guides me,\nbeyond limits, through darkness it sets free.\nA new dawn awaits, for me to see,\non the horizon, future's decree.",
        choices: []
    },
    "ending_inspire": {
        text: "This story becomes a guiding ray,\nilluminating paths for those astray.\nYour spirit will never fade away,\ninspiring souls, come what may.",
        choices: []
    },
    "ending_wisdom": {
        text: "In the depths, a pearl I found,\nwisdom's essence, profound.\nLife is the teacher, soul is the ground,\nunraveling mysteries, all around.",
        choices: []
    },
    "reflection_from_hope": {
        text: "That light not only shines so bright,\nbut also casts a subtle shadow's might.\nPrompting me to question, in this fading light,\nis this illusion, or pure reality's sight?",
        choices: [
            { text: "Start from the beginning", next: "start" }
        ]
    }
};

// Function to display a poem segment and its choices
function displayPoem(segmentId) {
    const segment = poemData[segmentId];
    if (!segment) {
        console.error("Poem segment ID not found:", segmentId);
        return;
    }

    let currentPoemText = segment.text;

    // Personalization: Replace [Reader's Name] placeholder if exists
    if (userName && currentPoemText.includes("[Reader's Name]")) {
        currentPoemText = currentPoemText.replace("[Reader's Name]", userName);
    }

    poemDisplay.innerText = currentPoemText; // Display the poem text
    choicesContainer.innerHTML = ''; // Clear previous choices

    // Create buttons for each choice
    segment.choices.forEach(choice => {
        const button = document.createElement('button');
        button.innerText = choice.text;
        button.onclick = () => displayPoem(choice.next); // When button is clicked, display the next segment
        choicesContainer.appendChild(button);
    });

    // If there are no choices, it's an ending. Add a "Start Again" button.
    if (segment.choices.length === 0) {
        const restartButton = document.createElement('button');
        restartButton.innerText = "Start the Poem Again";
        restartButton.classList.add('restart-button'); // Add a class for specific styling
        restartButton.onclick = () => {
            userName = ''; // Reset user name for a fresh start
            askForNameAndStart(); // Start over
        };
        choicesContainer.appendChild(restartButton);
    }
}

// Function to ask for user's name and start the poem
function askForNameAndStart() {
    userName = prompt("Welcome, wanderer of the soul! What is your name?");
    if (userName === null || userName.trim() === "") {
        userName = "Wanderer"; // Default name if not provided
    }

    // Modify the initial poem text to include the user's name
    poemData["start"].text = `Welcome, ${userName}, to this journey...\n\nBetween the sunset's soft embrace,\na silent promise, etched with grace.\nMy steps dance on the edge of time's space,\nseeking meaning in this heart's maze.`;

    displayPoem("start"); // Start displaying the poem from the beginning

    // Coba putar musik secara otomatis setelah pengguna berinteraksi (mengisi prompt)
    // Ini lebih mungkin berhasil daripada autoplay langsung saat halaman dimuat
    if (backgroundMusic && !isMusicPlaying) {
        backgroundMusic.play().then(() => {
            isMusicPlaying = true;
            musicToggleButton.innerText = "🔇 Hentikan Musik";
        }).catch(error => {
            console.warn("Autoplay was prevented by browser, user can click the button:", error);
        });
    }
}

// Initialize the poem when the page loads
window.onload = askForNameAndStart;


// --- Kode untuk Kontrol Musik ---
const backgroundMusic = document.getElementById('background-music');
const musicToggleButton = document.getElementById('music-toggle');
let isMusicPlaying = false; // Status musik

// Event listener untuk tombol play/pause musik
musicToggleButton.addEventListener('click', () => {
    if (isMusicPlaying) {
        backgroundMusic.pause();
        musicToggleButton.innerText = "🎵 Putar Musik";
    } else {
        backgroundMusic.play().catch(error => {
            console.error("Autoplay prevented:", error);
            alert("Browser memblokir pemutaran musik otomatis. Silakan klik tombol ini lagi jika Anda ingin memutar musik.");
        });
        musicToggleButton.innerText = "🔇 Hentikan Musik";
    }
    isMusicPlaying = !isMusicPlaying; // Toggle status
});