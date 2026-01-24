const mainText = document.getElementById("main-text");
const mainImage = document.getElementById("main-image");
const buttonContainer = document.getElementById("button-container");
const questionSection = document.getElementById("question-section");
const giftSection = document.getElementById("gift-section");
const revealArea = document.getElementById("reveal-area");
const giftContent = document.getElementById("gift-content");

// 1. Floating Hearts
function createHeart() {
    const container = document.getElementById('hearts-container');
    if (!container) return;
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 2 + 3 + "s";
    container.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 5000);
}
setInterval(createHeart, 300);

// 2. NO Button Logic
function handleNo() {
    mainText.innerText = "Try again please";
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

// 3. Transitions
function goToGifts() {
    questionSection.classList.add("hidden");
    giftSection.classList.remove("hidden");
}

function revealGift(n) {
    // Hide the grid and instruction text
    document.querySelector('.gift-grid').classList.add('hidden');
    const instruction = document.querySelector('#gift-section p');
    if (instruction) instruction.classList.add('hidden');

    revealArea.classList.remove("hidden");
    if (n === 1) showRoses();
    if (n === 2) showGift2();
    if (n === 3) showGift3();
}

// 4. Gift 1 Flow (THE FIX IS HERE)
function showRoses() {
    // We are manually telling JS to create this button
    giftContent.innerHTML = `
        <div class="fade-in">
            <h3>Your gift is a flower bouquet and a Date</h3>
            <img src="roses.gif" width="250" style="border-radius:15px;">
            <p>I will always love you no matter what!</p>
            <button class="pink-btn" onclick="showLetter()">Next</button>
        </div>
    `;
}

function showGift2() {
    giftContent.innerHTML = `
        <div class="fade-in">
            <h3>Your gift is a Brand new airmax and a Date</h3>
            <img src="roses.gif" width="250" style="border-radius:15px;">
            <p>I will always love you no matter what!</p>
            <button class="pink-btn" onclick="showLetter()">Next</button>
        </div>
    `;
}

function showGift3() {
    giftContent.innerHTML = `
        <div class="fade-in">
            <h3>Your gift is a IPHONE 17 promax and a Date</h3>
            <img src="roses.gif" width="250" style="border-radius:15px;">
            <p>I will always love you no matter what!</p>
            <button class="pink-btn" onclick="showLetter()">Next</button>
        </div>
    `;
}

function showLetter() {
    giftContent.innerHTML = `
        <div class="fade-in">
            <h3>Words from my Heart</h3>
            <div class="letter-box">
                <p>I am so lucky to have you Mpoa. I love you wholeheartedly!</p>
                <p>You mean everything to me. Happy Valentine's Day!</p>
            </div>
            <button class="click-me-btn" onclick="showSong()">click me!</button>
        </div>
    `;
}

function showSong() {
    giftContent.innerHTML = `
        <div class="fade-in">
            <h3>A Song for You</h3>
            <p>This song reminds me of you...acha nku choche kidogo.</p>
            <a href="https://www.youtube.com/watch?v=kffacxfA7G4" target="_blank" style="text-decoration: none;">
                <button class="click-me-btn" style="background-color: #ff0000;">🎵 Listen to Our Song</button>
            </a>
            <br><br>
            <button class="pink-btn" onclick="location.reload()">Restart</button>
        </div>
    `;
}