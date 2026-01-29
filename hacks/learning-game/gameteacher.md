---
layout: base
title: Game Teacher Module
authors: Anika, Rishabh, Cyrus
permalink: /learninggame/gameteacher
---

<style>
    /* UI DESIGN BY ANIKA - Positioned to the entire screen */
    #teacher-overlay {
        display: none; 
        position: fixed; /* Fixed to viewport */
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(10, 14, 39, 0.95);
        z-index: 2000;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(10px);
    }

    .teacher-card {
        background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
        border: 2px solid #3b82f6;
        border-radius: 15px;
        padding: 30px;
        max-width: 500px;
        text-align: center;
        box-shadow: 0 0 40px rgba(59, 130, 246, 0.4);
    }

    /* Fixed to bottom right of the entire browser window */
    #help-bot-icon {
        position: fixed; 
        bottom: 30px;
        right: 30px;
        width: 65px;
        height: 65px;
        background: #3b82f6;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        z-index: 3000;
        box-shadow: 0 0 25px rgba(59, 130, 246, 0.6);
        transition: 0.3s;
        font-size: 30px;
    }

    #help-bot-icon:hover { transform: scale(1.1) rotate(10deg); }

    #help-bubble {
        display: none;
        position: fixed;
        bottom: 110px;
        right: 30px;
        background: white;
        color: #0f172a;
        padding: 15px;
        border-radius: 12px;
        max-width: 250px;
        z-index: 3000;
        border: 2px solid #3b82f6;
        box-shadow: 0 5px 15px rgba(0,0,0,0.5);
        font-family: sans-serif;
        line-height: 1.4;
    }
</style>

<!-- Teacher Overlay -->
<div id="teacher-overlay">
    <div class="teacher-card">
        <h2 id="teacher-title" style="color: #60a5fa; margin-bottom: 15px; font-family: 'Segoe UI', sans-serif;"></h2>
        <p id="teacher-msg" style="color: white; line-height: 1.6; margin-bottom: 20px; font-family: 'Segoe UI', sans-serif;"></p>
        <button onclick="dismissTeacher()" style="padding: 12px 25px; background: #3b82f6; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; text-transform: uppercase;">Start Training</button>
    </div>
</div>

<!-- Persistent Global Icon -->
<div id="help-bubble"></div>
<div id="help-bot-icon" onclick="toggleHint()">🤖</div>

<script>
    // CONTENT BY RISHABH | LOGIC BY ANIKA
    const teacherData = {
        1: {
            title: "Stop 1: Training",
            msg: "Robot Code: Robot code is a pseudocode-style language with four commands—MOVE_FORWARD(), ROTATE_LEFT(), ROTATE_RIGHT(), and CAN_MOVE(direction)—used to control a robot through a maze. Pseudocode: Use plain-language, step-by-step logic (variables, conditionals, loops, and logical flow) to describe how your algorithm should work before worrying about strict programming syntax. Computational thinking: break the problem into small rules, test your logic, and iterate based on what you observe.",
            // Each question at this stop has a unique hint
            hints: [
                [
                    "HINT 1: You need only one command for this task."
                    "HINT 2: Use the MOVE_FORWARD() command."
                    "HINT 3: Just write: MOVE_FORWARD()"
                ],
                [
                    "HINT 1: Initialize sum ← 0 before the loop",
                    "HINT 2: FOR EACH num IN nums, do sum ← sum + num",
                    "HINT 3: After loop, RETURN sum / LENGTH(nums)"
                ],
                [
                    "HINT 1: ",
                    "HINT 2: ",
                    "HINT 3: "
                ]
            ]
        },
        2: {
            title: "Stop 2: Training",
            msg: "Robot Code: Use simple, readable command blocks to control the robot and debug one movement decision at a time. Pseudocode: In the code runner, write College Board–level pseudocode solutions (conditionals, variables, algorithm development, and logical flow) and notice how different logical choices change the program’s behavior as you progress through the maze. Computational thinking: practice structured problem-solving by tracing steps, checking edge cases, and improving your solution until it works.",
            hints: [
                [
                    "HINT 1: This requires a rotation command, not a movement command.",
                    "HINT 2: Use ROTATE_RIGHT() to turn the robot 90 degrees clockwise",
                    "HINT 3: Just write: ROTATE_RIGHT()"
                ],
                [
                    "HINT 1: Initialize count ← 0 before the loop",
                    "HINT 2: FOR EACH value IN nums, check IF value > threshold",
                    "HINT 3: When condition is true, do count ← count + 1"
                    "HINT 4: RETURN count after the loop completes"
                ],
                [
                    "HINT 1: ",
                    "HINT 2: ",
                    "HINT 3: "
                ]
            ]
        },
        3: {
            title: "Stop 3: Training",
            msg: "Robot Code: Combine multiple commands (MOVE_FORWARD, ROTATE_LEFT, ROTATE_RIGHT) to navigate complex paths and use CAN_MOVE(direction) to check for obstacles before moving. Pseudocode: Apply variables and assignment operators to store values, then use conditional statements (IF-ELSE) to make decisions based on those values in your College Board–style solutions. Computational thinking: identify patterns in the maze, create reusable logic blocks, and test your algorithm with different scenarios to ensure it handles all possible paths.",
            hints: [
                [
                    "HINT 1: You need to move forward twice.",
                    "HINT 2: Use MOVE_FORWARD() two times in a row.",
                    "HINT 3: Write: MOVE_FORWARD() MOVE_FORWARD()"
                ],
                [
                    "HINT 1: Set max ← nums[1] (first element)",
                    "HINT 2: Loop through remaining elements starting at index 2",
                    "HINT 3: IF nums[i] > max, update max ← nums[i]"
                    "HINT 4: RETURN max after checking all elements"
                ],
                [
                    "HINT 1: ",
                    "HINT 2: ",
                    "HINT 3: "
                ]
            ]
        },
        4: {
            title: "Stop 4: Training",
            msg: "Robot Code: Master complex navigation by chaining conditional checks with CAN_MOVE() and creating efficient movement sequences. Pseudocode: Implement loops (REPEAT and REPEAT UNTIL) to avoid repetitive code, and combine them with conditionals to create dynamic algorithms that adapt to changing conditions. Computational thinking: analyze the problem systematically, decompose it into smaller sub-problems, and optimize your solution by reducing redundant steps while maintaining correctness.",
            hints: [
                [
                    "HINT 1: This requires two commands in sequence: move, then rotate",
                    "HINT 2: First MOVE_FORWARD(), then ROTATE_LEFT()",
                    "HINT 3: Write: MOVE_FORWARD() ROTATE_LEFT()"
                ],
                [
                    "HINT 1: Use FOR i FROM 1 TO LENGTH(words) for index-based loop",
                    "HINT 2: Check IF words[i] = target",
                    "HINT 3: When match found, set words[i] ← replacement"
                    "HINT 4: RETURN words at the end"
                ],
                [
                    "HINT 1: ",
                    "HINT 2: ",
                    "HINT 3: "
                ]
            ]
        },
        5: {
            title: "Stop 5: Training",
            msg: "Robot Code: Apply all four commands strategically to solve the most challenging maze configurations, planning your entire route before executing. Pseudocode: Create comprehensive algorithms using variables, conditionals, loops, and logical operators (AND, OR, NOT) that mirror real AP CSP exam questions. Computational thinking: demonstrate mastery by developing efficient, elegant solutions that show deep understanding of algorithm design, abstraction, and the relationship between pseudocode logic and actual program execution.",
            hints: [
                [
                    "HINT 1: You need to move forward three times.",
                    "HINT 2: Use MOVE_FORWARD() three times in a row.",
                    "HINT 3: Write: MOVE_FORWARD() MOVE_FORWARD() MOVE_FORWARD()"
                ],
                [
                    "HINT 1: Create evens ← empty list before loop",
                    "HINT 2: FOR EACH num IN nums, check IF num MOD 2 = 0",
                    "HINT 3: When num is even, use APPEND(evens, num)"
                    "HINT 4: RETURN evens after processing all numbers"
                ],
                [
                    "HINT 1: ",
                    "HINT 2: ",
                    "HINT 3: "
                ]
            ]
            
        }
    };

    let currentStopId = 1;
    let currentQuestionIdx = 0;

    function initTeacher(stopId, qIdx = 0) {
        currentStopId = stopId;
        currentQuestionIdx = qIdx;
        const data = teacherData[stopId] || {title: `Stop ${stopId}`, msg: "Ready for the next challenge?", hints: ["Keep going!", "You got this!", "Almost done!"]};
        
        // Update Overlay
        document.getElementById('teacher-title').innerText = data.title;
        document.getElementById('teacher-msg').innerText = data.msg;
        
        // Update Hint Bubble for the current question
        document.getElementById('help-bubble').innerText = data.hints[qIdx] || "Look closely at the code!";
        
        document.getElementById('teacher-overlay').style.display = 'flex';
    }

    function updateHint(qIdx) {
        currentQuestionIdx = qIdx;
        const data = teacherData[currentStopId];
        if (data && data.hints) {
            document.getElementById('help-bubble').innerText = data.hints[qIdx] || "Keep trying!";
        }
    }

    function dismissTeacher() {
        document.getElementById('teacher-overlay').style.display = 'none';
    }

    function toggleHint() {
        const bubble = document.getElementById('help-bubble');
        bubble.style.display = (bubble.style.display === 'none' || bubble.style.display === '') ? 'block' : 'none';
    }
</script>