---
layout: default
title: Neural Link - AI Hint Protocol
permalink: /learninggame/hints-instructions
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
    }

    .instruction-card {
        background: rgba(15, 23, 42, 0.9);
        backdrop-filter: blur(20px);
        border-radius: 24px;
        border: 2px solid rgba(6, 182, 212, 0.4);
        padding: 40px;
        max-width: 950px;
        box-shadow: 0 0 60px rgba(6, 182, 212, 0.25);
        position: relative;
    }

    .instruction-card::before {
        content: "3RD PARTY API LINK: ESTABLISHED // AI CORE: ONLINE";
        position: absolute;
        top: 15px;
        right: 25px;
        font-family: 'Courier New', monospace;
        font-size: 10px;
        color: #10b981;
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
    
    .api-call { color: #f472b6; font-weight: bold; }
</style>

<div class="instruction-card">
    <h1>🤖 Mission: AI-Generated Hints</h1>
    <div class="subtitle">// ASSIGNED TO: CADET CYRUS // PROTOCOL: 3RD PARTY INTEGRATION //</div>

    <p>Cadet Cyrus, your task is to implement the <strong>AI Neural Link</strong>. You must use an <strong>External 3rd Party API</strong> (OpenAI or Groq) to generate hints based on the specific question the user is stuck on. You will then save these hints to our database to satisfy the Create PT requirements.</p>

    <div class="step">
        <span class="pt-badge">Skill B: 3rd Party API Procedure</span>
        <h2>1. The External AI Procedure (<code>api/robop_api.py</code>)</h2>
        <p>First, run <code>pip install requests</code> in your terminal. Then, add this procedure to your Python file. This function calls a 3rd party AI to generate hints.</p>
<pre>
import requests

def generate_ai_hints(question_text):
    # This is the 3rd Party API Call (Using Groq or OpenAI)
    URL = "https://api.groq.com/openai/v1/chat/completions"
    HEADERS = {"Authorization": "Bearer YOUR_API_KEY"}
    
    # Procedural Logic: Construct a prompt to get 3 specific hints
    prompt = f"Provide 3 helpful hints for this coding question: {question_text}. Format as a JSON list of strings."
    
    response = requests.post(URL, headers=HEADERS, json={
        "model": "llama3-8b-8192",
        "messages": [{"role": "user", "content": prompt}],
        "response_format": {"type": "json_object"}
    })
    
    # Output: Extract the list from the 3rd party response
    return response.json()['choices'][0]['message']['content']
</pre>
    </div>

    <div class="step">
        <span class="pt-badge">Skill B: Selection & Storage</span>
        <h2>2. Build the Hint Terminal (<code>api/robop_api.py</code>)</h2>
        <p>This <code>POST</code> route handles the logic. It uses <b>Selection</b> to check if we already have the hint in our <b>List</b> (Database). If not, it triggers the 3rd Party Procedure.</p>
<pre>
@robop_api.route("/get_hint", methods=["POST"])
def get_hint():
    data = request.get_json()
    module_key = data.get("module_key")
    q_text = data.get("question") # Input from frontend
    idx = data.get("attempt") 

    # 1. SELECTION: Check if hint exists in our DB List
    entry = StationHint.query.filter_by(_module_key=module_key).first()
    
    if not entry:
        # 2. PROCEDURE: Call 3rd Party API if DB is empty
        new_hints = generate_ai_hints(q_text) 
        entry = StationHint(module_key, new_hints)
        db.session.add(entry)
        db.session.commit()

    # 3. OUTPUT: Return the specific hint from the list
    return jsonify({"hint": entry._hint_list[idx]})
</pre>
    </div>

    <div class="step">
        <span class="pt-badge">Skill B: Iteration & Frontend I/O</span>
        <h2>3. Update the UI Logic (<code>gameteacher.md</code>)</h2>
        <p>Your <code>toggleHint()</code> function must now grab the <strong>actual question text</strong> from the screen to send it to the AI.</p>
<pre>
async function toggleHint() {
    const bubble = document.getElementById('help-bubble');
    // Grab the current question text from the UI
    const currentQ = document.getElementById('questionText').innerText;

    // INPUT: Send data to your Full-Stack API
    const response = await fetch(`${window.API_URL}/get_hint`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            module_key: `s${currentSectorNum}_m${currentQuestion}`,
            question: currentQ,
            attempt: localHintAttempt 
        })
    });

    const data = await response.json();
    
    // OUTPUT: Display the AI-generated hint
    bubble.innerText = data.hint;
    bubble.style.display = 'block';
}
</pre>
    </div>

    <div class="step">
        <h2>✅ Cyrus's Create PT Checklist</h2>
        <ul>
            <li><strong>3rd Party API:</strong> You are using <span class="api-call"> Groq/OpenAI</span> to create content dynamically.</li>
            <li><strong>List:</strong> Your <code>StationHint</code> table stores a JSON List of strings.</li>
            <li><strong>Procedure:</strong> <code>generate_ai_hints</code> is your complex procedure with parameters.</li>
            <li><strong>Selection:</strong> The <code>if not entry</code> block decides whether to use the DB or the 3rd Party API.</li>
            <li><strong>Iteration:</strong> Use a <code>for</code> loop in your Python code to clean the AI strings before saving them to the DB.</li>
        </ul>
    </div>

    <div style="text-align: center; margin-top: 40px;">
        <a href="{{ '/learninggame/home' | relative_url }}" style="color: #06b6d4; text-decoration: none; font-weight: bold; text-transform: uppercase; font-size: 14px;">← Return to Station Deck</a>
    </div>
</div>