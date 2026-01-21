const mainText = document.getElementById("main-text");
const mainImage = document.getElementById("main-image");
const buttonContainer = document.getElementById("button-container");
const questionSection = document.getElementById("question-section");
const giftSection = document.getElementById("gift-section");
const revealArea = document.getElementById("reveal-area");
const giftContent = document.getElementById("gift-content");

// 1. Floating Hearts (From Bottom)
function createHeart() {
    const container = document.getElementById('hearts-container');
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 2 + 3 + "s";
    container.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 5000);
}
setInterval(createHeart, 300);

// 2. NO Logic (Shows Try Again Button)
function handleNo() {
    mainText.innerText = "Try again please :(";
    mainImage.src = "heart-break.gif";
    buttonContainer.innerHTML = `<button class="try-again-btn" onclick="resetPage()">Try Again</button>`;
}

function resetPage() {
    mainText.innerText = "Will you be my Valentine?";
    mainImage.src = "giphy.gif";
    buttonContainer.innerHTML = `
        <button id="yes-button" onclick="goToGifts()">YES OF COURSE</button>
        <button id="no-button" onclick="handleNo()">NO THANK YOU</button>
    `;
}

// 3. Gift Selection
function goToGifts() {
    questionSection.classList.add("hidden");
    giftSection.classList.remove("hidden");
}

function revealGift(n) {
    document.querySelector('.gift-grid').classList.add('hidden');
    revealArea.classList.remove("hidden");
    if (n === 1) showRoses();
}

// 4. Multi-Step Reveal
function showRoses() {
    giftContent.innerHTML = `
        <h3>Your Rose Bouquet</h3>
        <img src="roses.gif" width="250" style="border-radius:15px;">
        <p>I will always love you no matter what!</p>
        <button class="pink-btn" onclick="showLetter()">Next</button>
    `;
}

function showLetter() {
    giftContent.innerHTML = `
        <h3>Words from my Heart</h3>
        <div class="letter-box">
            <p>I am so lucky to have you. I love you wholeheartedly!</p>
            <p>You mean everything to me. Happy Valentine's Day!</p>
        </div>
        <button class="click-me-btn" onclick="showSong()">click me!</button>
    `;
}

function showSong() {
    // UPDATED: Replaced QR code image with a YouTube link button
    giftContent.innerHTML = `
        <h3>A Song for You</h3>
        <p>This song reminds me of you...</p>
        <br>
        <a href="https://www.youtube.com/watch?v=kffacxfA7G4" target="_blank" style="text-decoration: none;">
            <button class="pink-btn" style="background-color: #ff0000; cursor: pointer;">
                🎵 Listen to Our Song
            </button>
        </a>
        <br><br>
        <button class="pink-btn" onclick="location.reload()">Restart</button>
    `;
}