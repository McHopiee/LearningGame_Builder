---
layout: base
title: Character Selection Protocol
permalink: /character/spacesuit
---

<style>
    /* SPACE CADET THEME UI */
    body {
        background: linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e1b4b 100%);
        color: white;
        font-family: 'Segoe UI', Tahoma, sans-serif;
        margin: 0;
        padding: 40px 20px;
        display: flex;
        justify-content: center;
        min-height: 100vh;
    }

    .instruction-card {
        background: rgba(15, 23, 42, 0.9);
        backdrop-filter: blur(20px);
        border-radius: 24px;
        border: 2px solid rgba(6, 182, 212, 0.4);
        padding: 40px;
        max-width: 900px;
        box-shadow: 0 0 60px rgba(6, 182, 212, 0.25);
        position: relative;
    }

    /* Tech UI Accents */
    .instruction-card::before {
        content: "STATUS: ENCRYPTED BEYOND PROTOCOL";
        position: absolute;
        top: 15px;
        right: 25px;
        font-family: monospace;
        font-size: 10px;
        color: #06b6d4;
        opacity: 0.6;
    }

    h1 { color: #06b6d4; text-transform: uppercase; letter-spacing: 4px; text-shadow: 0 0 15px rgba(6,182,212,0.5); margin-bottom: 5px; }
    .subtitle { color: #67e8f9; font-family: 'Courier New', monospace; font-size: 14px; margin-bottom: 30px; }
    
    h2 { color: #fbbf24; margin-top: 35px; border-bottom: 1px solid rgba(251,191,36,0.3); padding-bottom: 8px; font-size: 20px; }
    
    .step { 
        background: rgba(6, 182, 212, 0.05); 
        border-left: 4px solid #06b6d4; 
        padding: 20px; 
        margin: 20px 0;
        border-radius: 0 12px 12px 0;
    }

    .pt-badge { 
        background: #10b981; 
        color: white; 
        padding: 4px 12px; 
        border-radius: 999px; 
        font-size: 11px; 
        font-weight: 900; 
        text-transform: uppercase;
        margin-bottom: 10px; 
        display: inline-block; 
    }

    pre { 
        background: #020617; 
        padding: 15px; 
        border-radius: 12px; 
        border: 1px solid #1e293b; 
        color: #a5f3fc;
        font-family: 'Consolas', 'Courier New', monospace;
        font-size: 13px;
        overflow-x: auto;
    }

    code { color: #fbbf24; font-weight: bold; }

    ul { line-height: 1.6; color: #cbd5e1; }
    
    .nav-btn {
        display: inline-block;
        margin-top: 30px;
        padding: 15px 40px;
        background: linear-gradient(135deg, #06b6d4, #3b82f6);
        color: white;
        text-decoration: none;
        border-radius: 12px;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 1px;
        box-shadow: 0 10px 20px rgba(6, 182, 212, 0.3);
        transition: 0.3s;
    }

    .nav-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 15px 30px rgba(6, 182, 212, 0.5);
    }
</style>

<div class="instruction-card">
    <h1>🚀 Select Your Character</h1>
    <div class="subtitle">// Choose your cadet identity and customize your profile //</div>

    <div style="margin: 40px 0;">
        <div id="character-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 30px 0;">
            <!-- Characters will be rendered here by JavaScript -->
        </div>

        <div style="background: rgba(6, 182, 212, 0.05); border: 2px solid rgba(6, 182, 212, 0.2); border-radius: 12px; padding: 25px; margin-top: 30px;">
            <label style="display: block; margin-bottom: 10px; color: #67e8f9; font-weight: bold;">Enter Your Character Name:</label>
            <input type="text" id="character-name-input" placeholder="Type your cadet name..." style="width: 100%; padding: 12px; border: 1px solid rgba(6, 182, 212, 0.4); border-radius: 8px; background: rgba(2, 6, 23, 0.8); color: white; font-size: 16px; box-sizing: border-box;">
            <p id="error-message" style="color: #ef4444; margin-top: 10px; display: none; font-size: 14px;"></p>
        </div>

        <div style="text-align: center; margin-top: 30px;">
            <button id="submit-btn" style="padding: 15px 40px; background: linear-gradient(135deg, #06b6d4, #3b82f6); color: white; border: none; border-radius: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; font-size: 16px; cursor: pointer; box-shadow: 0 10px 20px rgba(6, 182, 212, 0.3); transition: 0.3s;">Ready to Enter Maze →</button>
        </div>
    </div>
</div>

<script>
// LIST: Define characters using an array
const characters = [
    { 
        name: "Axiom Space Suit", 
        icon: "🛰️",
        image: "{{ '/images/learninggame/axiom.png' | relative_url }}", // Add character image path
        trait: "Advanced Commercial Design",
        description: "Modern next-gen suit technology"
    },
    { 
        name: "Gemini G4c Space Suit", 
        icon: "🔧",
        image: "{{ '/images/learninggame/gemini.png' | relative_url }}", // Add character image path
        trait: "Classic NASA Engineering",
        description: "Proven reliability and durability"
    },
    { 
        name: "Orlan Space Suit", 
        icon: "🧪",
        image: "{{ '/images/learninggame/orlan.png' | relative_url }}", // Add character image path
        trait: "Modular Russian Design",
        description: "Flexible and adaptable systems"
    },
    { 
        name: "Feitian Space Suit", 
        icon: "⚡",
        image: "{{ '/images/learninggame/feitian.png' | relative_url }}", // Add character image path
        trait: "Advanced Chinese Technology",
        description: "Cutting-edge innovation"
    }
];

let selectedCharacter = null;

// ITERATION: Loop through characters and render them
function renderCharacters() {
    const grid = document.getElementById('character-grid');
    
    characters.forEach((character) => {
        const card = document.createElement('div');
        card.className = 'character-card';
        card.style.cssText = `
            background: rgba(15, 23, 42, 0.7);
            border: 2px solid rgba(6, 182, 212, 0.3);
            border-radius: 12px;
            padding: 20px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
        `;
        
        card.innerHTML = `
            <img src="${character.image}" alt="${character.name}" style="width: 100%; height: 200px; object-fit: contain; border-radius: 8px; margin-bottom: 15px;">
            <h3 style="color: #06b6d4; margin: 10px 0; font-size: 18px;">${character.name}</h3>
            <p style="color: #fbbf24; font-size: 12px; font-weight: bold; margin-bottom: 8px;">${character.trait}</p>
            <p style="color: #cbd5e1; font-size: 13px; margin: 0;">${character.description}</p>
        `;
        
        card.addEventListener('mouseover', function() {
            this.style.borderColor = 'rgba(251, 191, 36, 0.6)';
            this.style.boxShadow = '0 0 20px rgba(251, 191, 36, 0.3)';
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseout', function() {
            if (selectedCharacter !== character.name) {
                this.style.borderColor = 'rgba(6, 182, 212, 0.3)';
                this.style.boxShadow = 'none';
                this.style.transform = 'translateY(0)';
            }
        });
        
        card.addEventListener('click', function() {
            // SELECTION: Handle character selection
            selectCharacter(character.name, card);
        });
        
        grid.appendChild(card);
    });
}

// INPUT: Handle character selection
function selectCharacter(characterName, cardElement) {
    // Deselect previous selection
    const allCards = document.querySelectorAll('.character-card');
    allCards.forEach(card => {
        card.style.borderColor = 'rgba(6, 182, 212, 0.3)';
        card.style.boxShadow = 'none';
        card.style.backgroundColor = 'rgba(15, 23, 42, 0.7)';
    });
    
    // Select current character
    selectedCharacter = characterName;
    cardElement.style.borderColor = '#06b6d4';
    cardElement.style.boxShadow = '0 0 30px rgba(6, 182, 212, 0.6)';
    cardElement.style.backgroundColor = 'rgba(6, 182, 212, 0.1)';
}

// OUTPUT: Submit character selection
document.getElementById('submit-btn').addEventListener('click', function() {
    const characterName = document.getElementById('character-name-input').value.trim();
    const errorMessage = document.getElementById('error-message');
    
    // SELECTION: Validate input
    if (!characterName) {
        errorMessage.textContent = "⚠️ Please enter your character name!";
        errorMessage.style.display = 'block';
        return;
    }
    
    if (!selectedCharacter) {
        errorMessage.textContent = "⚠️ Please select a character class!";
        errorMessage.style.display = 'block';
        return;
    }
    
    errorMessage.style.display = 'none';
    
    // Disable button during submission
    this.disabled = true;
    this.textContent = "Saving...";
    
    // Generate or retrieve player ID (stored in session/localStorage)
    let playerId = localStorage.getItem('playerId');
    if (!playerId) {
        playerId = 'player_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('playerId', playerId);
    }
    
    // I/O: Send data to backend server
    fetch('http://localhost:3000/player/' + playerId + '/character', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            displayName: characterName, 
            characterClass: selectedCharacter 
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Character saved:', data.player);
            // Show success and redirect
            this.textContent = "✓ Profile Created!";
            this.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            setTimeout(() => {
                window.location.href = "{{ '/learninggame/home' | relative_url }}";
            }, 1500);
        } else {
            throw new Error(data.error || 'Failed to save character');
        }
    })
    .catch(error => {
        console.error('Error saving character:', error);
        errorMessage.textContent = "❌ Failed to save character: " + error.message;
        errorMessage.style.display = 'block';
        this.disabled = false;
        this.textContent = "Ready to Enter Maze →";
    });
});

// Initialize on page load
window.addEventListener('DOMContentLoaded', renderCharacters);
</script>