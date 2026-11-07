// ======================================
// STORYSPARK - RANDOM STORY GENERATOR
// ======================================

const genreSelect = document.getElementById("genre");
const characterSelect = document.getElementById("character");
const settingSelect = document.getElementById("setting");
const moodSelect = document.getElementById("mood");
const lengthSelect = document.getElementById("length");
const ideaInput = document.getElementById("idea");

const generateBtn = document.getElementById("generateBtn");
const surpriseBtn = document.getElementById("surpriseBtn");
const copyBtn = document.getElementById("copyBtn");
const favoriteBtn = document.getElementById("favoriteBtn");
const regenerateBtn = document.getElementById("regenerateBtn");

const emptyState = document.getElementById("emptyState");
const storyResult = document.getElementById("storyResult");
const storyTitle = document.getElementById("storyTitle");
const storyText = document.getElementById("storyText");
const storyGenre = document.getElementById("storyGenre");

const libraryList = document.getElementById("libraryList");
const favoriteCount = document.getElementById("favoriteCount");
const toast = document.getElementById("toast");

let currentStory = null;
let activeTab = "history";

let history = loadData("storySparkHistory");
let favorites = loadData("storySparkFavorites");

function loadData(key) {
    try {
        return JSON.parse(localStorage.getItem(key)) || [];
    } catch {
        return [];
    }
}

function saveData() {
    localStorage.setItem("storySparkHistory", JSON.stringify(history));
    localStorage.setItem("storySparkFavorites", JSON.stringify(favorites));
}

function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Story ingredients
const openings = [
    "It all began on a day that seemed completely ordinary.",
    "Nobody in the world believed the strange legend until that morning.",
    "The first sign appeared just as the sun disappeared behind the horizon.",
    "Everything changed when an unexpected message arrived.",
    "There was a secret hidden in this place, waiting for someone brave enough to find it.",
    "At first, it seemed like an ordinary adventure. It was anything but.",
    "A strange sound echoed through the air, and the adventure began.",
    "Somewhere beyond the familiar world, an incredible secret was waiting."
];

const discoveries = [
    "Behind an ancient door, there was a glowing object unlike anything anyone had ever seen.",
    "A mysterious map appeared, revealing a place that did not exist on any ordinary map.",
    "A tiny creature suddenly appeared and whispered a secret.",
    "An old book opened by itself, revealing a message written in golden letters.",
    "A hidden staircase led to a room filled with forgotten memories.",
    "A strange symbol began glowing, as if it recognized its visitor.",
    "A mysterious voice called out from somewhere nearby.",
    "An unexpected visitor arrived carrying a gift that would change everything."
];

const challenges = [
    "But there was one problem: the secret could only be unlocked before midnight.",
    "However, a powerful force was determined to keep the truth hidden.",
    "The journey was not going to be easy, and every step brought a new challenge.",
    "Suddenly, the path behind them disappeared.",
    "There was a difficult choice to make, and neither option seemed simple.",
    "A surprising obstacle appeared, testing every bit of courage they had.",
    "The closer they came to the truth, the stranger everything became.",
    "Time was running out, and the most important clue was still missing."
];

const actions = [
    "With courage in their heart, they decided to follow the mysterious clues.",
    "Instead of giving up, they took a deep breath and searched for another way.",
    "They gathered their strength and stepped forward into the unknown.",
    "Using their creativity and intelligence, they discovered a clever solution.",
    "They realized that the answer was closer than they had imagined.",
    "With the help of an unexpected friend, they continued the journey.",
    "They followed the glowing trail, hoping it would lead them to the truth.",
    "They made a promise to never abandon the adventure."
];

const twists = [
    "Then came the biggest surprise: the person they had been searching for was right beside them all along.",
    "The mysterious object was not a treasure at all. It was a key to a much bigger secret.",
    "The strange message had actually been written by someone from the future.",
    "What looked like the end of the journey was actually the beginning of something greater.",
    "The greatest mystery was connected to a forgotten moment from their own past.",
    "The unexpected helper turned out to know the entire story.",
    "The real magic was not in the object, but in the courage it inspired.",
    "The final clue revealed something nobody could have predicted."
];

const endings = [
    "And from that day forward, the world was never quite the same.",
    "They returned home with a wonderful story and a lesson they would never forget.",
    "The adventure ended, but a new mystery was already waiting around the corner.",
    "Everyone celebrated, knowing that even the impossible could become possible.",
    "They finally understood that courage grows whenever we choose not to give up.",
    "And so, a new legend was born.",
    "As the stars appeared in the sky, they smiled, knowing this was only the beginning.",
    "The secret was safe, and the greatest adventure became their favorite memory."
];

const moodDetails = {
    "magical and exciting": [
        "Glittering lights danced through the air.",
        "A wave of sparkling energy filled the surroundings.",
        "Every moment felt like stepping into a dream."
    ],
    "funny and cheerful": [
        "Things became ridiculous in the funniest possible way.",
        "Nobody could stop laughing at what happened next.",
        "Even the most serious character could not keep a straight face."
    ],
    "dark and mysterious": [
        "A cold wind moved through the silent surroundings.",
        "Shadows seemed to hide secrets of their own.",
        "Something unseen was watching from the darkness."
    ],
    "heartwarming and emotional": [
        "A feeling of hope slowly replaced the fear.",
        "The smallest act of kindness made the biggest difference.",
        "For the first time in a long while, everything felt possible."
    ],
    "suspenseful and thrilling": [
        "Every second felt more important than the last.",
        "A sudden noise made everyone turn around.",
        "The next discovery could change absolutely everything."
    ],
    "peaceful and inspiring": [
        "The quiet surroundings offered a moment of clarity.",
        "A gentle breeze carried a feeling of new beginnings.",
        "For once, there was no need to rush."
    ]
};

const genreDetails = {
    "Fantasy": "magic and ancient secrets",
    "Adventure": "discovery and daring journeys",
    "Mystery": "hidden clues and unexpected answers",
    "Romance": "unexpected connections and heartfelt moments",
    "Science Fiction": "technology and unexplored possibilities",
    "Horror": "strange events and unsettling discoveries",
    "Comedy": "unexpected mishaps and hilarious surprises",
    "Fairy Tale": "wishes, wonder and extraordinary destiny"
};

function createTitle(genre, setting) {
    const titles = [
        `The Secret of ${capitalize(setting)}`,
        "The Last Hidden Door",
        "A Journey Beyond the Stars",
        "The Mystery of the Forgotten Key",
        "The Day Everything Changed",
        "The Unexpected Adventure",
        "Whispers of a New World",
        "The Secret Nobody Knew",
        "Beyond the Impossible",
        "The Adventure of a Lifetime"
    ];

    return randomItem(titles);
}

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function generateStory() {
    const genre = genreSelect.value;
    const character = characterSelect.value;
    const setting = settingSelect.value;
    const mood = moodSelect.value;
    const length = lengthSelect.value;
    const idea = ideaInput.value.trim();

    const moodLines = moodDetails[mood];

    let paragraphs = [
        `${randomItem(openings)} In ${setting}, ${character} was about to experience something extraordinary. The world around them was filled with ${genreDetails[genre]}, but nothing could have prepared them for what was coming.`
    ];

    paragraphs.push(
        `${randomItem(discoveries)} ${randomItem(moodLines)}`
    );

    paragraphs.push(
        `${randomItem(challenges)} ${randomItem(actions)}`
    );

    if (idea) {
        paragraphs.push(
            `There was one more important detail: ${idea} This unexpected idea became an essential part of the adventure.`
        );
    }

    paragraphs.push(
        `${randomItem(twists)} ${randomItem(moodLines)}`
    );

    paragraphs.push(
        `${randomItem(endings)}`
    );

    let selectedParagraphs;

    if (length === "short") {
        selectedParagraphs = [paragraphs[0], paragraphs[2], paragraphs[4]];
    } else if (length === "long") {
        selectedParagraphs = paragraphs;
        selectedParagraphs.splice(
            3,
            0,
            `${character.charAt(0).toUpperCase() + character.slice(1)} paused for a moment. The journey had already taught them something important: every challenge was an opportunity to discover a new strength. ${randomItem(actions)}`
        );
        selectedParagraphs.splice(
            selectedParagraphs.length - 1,
            0,
            `${randomItem(discoveries)} It was another reminder that the world was full of surprises waiting to be explored.`
        );
    } else {
        selectedParagraphs = paragraphs;
    }

    const text = selectedParagraphs.join("\n\n");

    currentStory = {
        id: Date.now() + Math.floor(Math.random() * 10000),
        title: createTitle(genre, setting),
        genre: genre,
        text: text,
        date: new Date().toLocaleString(),
        isFavorite: false
    };

    history.unshift(currentStory);
    history = history.slice(0, 30);

    saveData();
    displayStory(currentStory);
    renderLibrary();
    showToast("✨ Your new story is ready!");
}

function displayStory(story) {
    currentStory = story;

    emptyState.classList.add("hidden");
    storyResult.classList.remove("hidden");

    storyTitle.textContent = story.title;
    storyText.textContent = story.text;
    storyGenre.textContent = story.genre;

    copyBtn.disabled = false;
    favoriteBtn.disabled = false;
    regenerateBtn.disabled = false;

    const saved = favorites.some(item => item.id === story.id);

    favoriteBtn.textContent = saved ? "♥ Saved" : "♡ Save";
    favoriteBtn.classList.toggle("saved", saved);
}

function toggleFavorite() {
    if (!currentStory) return;

    const index = favorites.findIndex(item => item.id === currentStory.id);

    if (index >= 0) {
        favorites.splice(index, 1);
        showToast("Story removed from favorites.");
    } else {
        favorites.unshift({ ...currentStory });
        showToast("♥ Story added to favorites!");
    }

    saveData();
    renderLibrary();
    displayStory(currentStory);
}

async function copyStory() {
    if (!currentStory) return;

    const content = `${currentStory.title}\n\n${currentStory.text}`;

    try {
        await navigator.clipboard.writeText(content);
        showToast("📋 Story copied to clipboard!");
    } catch {
        const temporary = document.createElement("textarea");
        temporary.value = content;
        document.body.appendChild(temporary);
        temporary.select();
        document.execCommand("copy");
        temporary.remove();
        showToast("📋 Story copied!");
    }
}

function renderLibrary() {
    const items = activeTab === "history" ? history : favorites;

    libraryList.replaceChildren();
    favoriteCount.textContent = favorites.length;

    if (items.length === 0) {
        const message = document.createElement("p");
        message.className = "library-empty";
        message.textContent = activeTab === "history"
            ? "Your generated stories will appear here."
            : "You haven't saved any favorites yet.";
        libraryList.appendChild(message);
        return;
    }

    items.forEach(story => {
        const item = document.createElement("div");
        item.className = "library-item";

        const main = document.createElement("div");
        main.className = "library-item-main";

        const title = document.createElement("h3");
        title.textContent = story.title;

        const info = document.createElement("p");
        info.textContent = `${story.genre} · ${story.date}`;

        main.append(title, info);
        main.addEventListener("click", () => {
            displayStory(story);
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "✕";
        deleteButton.title = "Remove story";

        deleteButton.addEventListener("click", () => {
            if (activeTab === "history") {
                history = history.filter(item => item.id !== story.id);
            } else {
                favorites = favorites.filter(item => item.id !== story.id);
            }

            saveData();
            renderLibrary();
            showToast("Story removed.");
        });

        item.append(main, deleteButton);
        libraryList.appendChild(item);
    });
}

function switchTab(tab) {
    activeTab = tab;

    document.querySelectorAll(".tab").forEach(button => {
        button.classList.toggle("active", button.dataset.tab === tab);
    });

    renderLibrary();
}

function surpriseMe() {
    const randomize = (select) => {
        select.selectedIndex = Math.floor(Math.random() * select.options.length);
    };

    randomize(genreSelect);
    randomize(characterSelect);
    randomize(settingSelect);
    randomize(moodSelect);
    randomize(lengthSelect);

    ideaInput.value = "";

    generateStory();
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(showToast.timer);

    showToast.timer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

// Button events
generateBtn.addEventListener("click", generateStory);
surpriseBtn.addEventListener("click", surpriseMe);
copyBtn.addEventListener("click", copyStory);
favoriteBtn.addEventListener("click", toggleFavorite);
regenerateBtn.addEventListener("click", generateStory);

// Library tabs
document.querySelectorAll(".tab").forEach(button => {
    button.addEventListener("click", () => {
        switchTab(button.dataset.tab);
    });
});

// Load saved library when the page opens
renderLibrary();