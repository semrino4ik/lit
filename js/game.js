window.onload = () => {
    showTab('exchangeTabContent'); // Show "Mine" tab by default
 };
    
    let coins = 0; // Number of coins
    const hamsterElement = document.getElementById('hamster');
    const playerNameElement = document.getElementById('playerName');
    
    hamsterElement.addEventListener('click', () => {
        coins += 1; // Add 1 coin per click
        updateDisplay();
    });
    

    let earnings = 0;
    let currentEnergy = 100;
    const INITIAL_ENERGY = 100;
    const ENERGY_RECOVERY_RATE = 1; // 1 energy every 2 seconds
    let energyInterval;
    
    // BTC PAIRS
    let btcPairsLevel = 1;
    let btcPairsPrice = 150;
    let profitPerHour = 100;
    
    function updateEarningsDisplay() {
        document.getElementById('earnings').innerText = earnings.toFixed(2);
    }
    
    function updateEnergyDisplay() {
        document.getElementById('energy').innerText = currentEnergy;
    }
    
    function handleTap() {
        if (currentEnergy > 0) {
            earnings += 1; // Increase earnings
            currentEnergy -= 1; // Use energy
            updateEarningsDisplay();
            updateEnergyDisplay();
        } else {
            alert("Немає енергії!");
        }
    }
    
    // Buying BTC PAIRS
    function buyBtcPairs() {
        if (earnings >= btcPairsPrice) {
            earnings -= btcPairsPrice; // Spend money
            updateEarningsDisplay();
            btcPairsLevel += 1; // Increase level
            btcPairsPrice += 100; // Increase price
            profitPerHour += 25; // Increase profit
            updateBtcPairsDisplay();
        } else {
            alert("Недостатньо грошей для купівлі BTC PAIRS!");
        }
    }
    
    function updateBtcPairsDisplay() {
        document.getElementById('btcPairsPrice').innerText = `$${btcPairsPrice}`;
        document.getElementById('profitPerHour').innerText = `$${profitPerHour}`;
        document.getElementById('btcPairsLevel').innerText = btcPairsLevel;
    }
    
    // Energy Recovery
    function startEnergyRecovery() {
        energyInterval = setInterval(() => {
            if (currentEnergy < INITIAL_ENERGY) {
                currentEnergy += ENERGY_RECOVERY_RATE; // Recover energy
                if (currentEnergy > INITIAL_ENERGY) {
                    currentEnergy = INITIAL_ENERGY; // Cap at maximum value
                }
                updateEnergyDisplay();
            }
        }, 2000); // Every 2000 ms (2 seconds)
    }
    
    // Tab handling
    function showTab(tabId) {
        const tabs = ['mineTabContent', 'friendsTabContent', 'earnTabContent', 'airdropTabContent'];
        tabs.forEach(id => {
            document.getElementById(id).style.display = 'none';
        });
    
        document.getElementById(tabId).style.display = 'block';
    
        // Show the selected tab
        if (tabId === 'mainTab') {
            document.getElementById('gameContainer').style.display = 'flex';
            updateEnergyDisplay(); // Show energy on main screen
        } else if (tabId === 'mineTab') {
            document.getElementById('mineTabContent').style.display = 'block'; // Show income tab
        } else if (tabId === 'friendsTab') {
            document.getElementById('friendsTabContent').style.display = 'block'; // Show upgrades tab
        } else if (tabId === 'earnTab') {
            document.getElementById('earnTabContent').style.display = 'block'; // Show earn tab
        } else if (tabId === 'airdropTab') {
            document.getElementById('airdropTabContent').style.display = 'block'; // Show airdrop tab
        }
    }
    
    document.getElementById('exchangeTab').addEventListener('click', () => showTab('exchangeTabContent'));
    document.getElementById('mineTab').addEventListener('click', () => showTab('mineTabContent'));
    document.getElementById('friendsTab').addEventListener('click', () => showTab('friendsTabContent'));
    document.getElementById('earnTab').addEventListener('click', () => showTab('earnTabContent'));
    document.getElementById('airdropTab').addEventListener('click', () => showTab('airdropTabContent'));
    
    // Modal functions
    function openModal() {
        document.getElementById('modalOverlay').style.display = 'flex';
    }
    
    function closeModal() {
        document.getElementById('modalOverlay').style.display = 'none';
    }
    
    function restartGame() {
        earnings = 0;
        currentEnergy = INITIAL_ENERGY;
        updateEnergyDisplay();
        document.getElementById('earnings').innerText = earnings;
        closeModal();
    }
    
    function deleteAccount() {
        // Add logic to delete the account
        alert('Акаунт видалено!');
        closeModal();
    }
    
    function chooseLanguage() {
        // Add logic to choose the language
        alert('Вибір мови!');
        closeModal();
    }
    
    // Open settings on button click
    document.getElementById('settingsButton').addEventListener('click', openModal);
    
    // Start energy recovery on load
    startEnergyRecovery();
    
    let tapCount = 0;
    let level = 1;
    const hamsterImage = document.getElementById('hamsterImage');
    const levelDisplay = document.getElementById('level');
    
    const images = [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhPtHlqcXjJ1YmfaQy2oK6Dd-BgU0xmYHXJg&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaFkINkt1NlVnElHFObQMHQtGoUVNngjywzQ&s', // Level 2 (100 taps)
        'https://optim.tildacdn.com/tild3832-6332-4239-b138-646264323032/-/format/webp/mango.png' // Level 3 (1000 taps)
    ];
    
    document.getElementById('tapButton').addEventListener('click', () => {
        tapCount++;
    
        // Determine new level
        if (tapCount >= 1000000000) {
            level = 10;
        } else if (tapCount >= 100000000) {
            level = 9;
        } else if (tapCount >= 20000000) {
            level = 8;
        } else if (tapCount >= 1000000) {
            level = 7;
        } else if (tapCount >= 500000) {
            level = 6;
        } else if (tapCount >= 50000) {
            level = 5;
        } else if (tapCount >= 5000) {
            level = 4;
        } else if (tapCount >= 1000) {
            level = 3;
        } else if (tapCount >= 100) {
            level = 2;
        } else {
            level = 1;
        }
    
        // Update image and level
        hamsterImage.src = images[level - 1];
        levelDisplay.textContent = `Level: ${level}`;
    });
    
    let experience = 0; // Experience
    const experienceToLevelUp = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]; // Example experience required for leveling up
    
    // Function for tap handling
    hamsterElement.addEventListener('click', () => {
        if (!isModalOpen) { // Check if modal is open
            coins += 1; // Add 1 coin per click
            experience += 1; // Increase experience by 1
    
            updateDisplay();
            updateExperienceDisplay(); // Update experience display
        }
    });
    
    // Function to update experience display
    function updateExperienceDisplay() {
        experienceDisplay.innerText = `${experience}/${experienceToLevelUp[level - 1]}`; // Show experience
        updateExperienceProgress(); // Update progress bar
    
        // Level up check
        if (experience >= experienceToLevelUp[level - 1]) {
            level += 1; // Level up
            experience = 0; // Reset experience
            if (level <= experienceToLevelUp.length) {
                alert(`Вітаємо! Ви підвищили рівень до ${level}!`);
            } else {
                alert("Максимальний рівень досягнуто!");
            }
        }
        levelDisplay.innerText = level; // Update level display
    }
    
    // Function to update experience progress
    function updateExperienceProgress() {
        const progressWidth = (experience / experienceToLevelUp[level - 1]) * 100; // Calculate progress bar width
        experienceProgress.style.width = `${progressWidth}%`; // Update width style
    }
    
