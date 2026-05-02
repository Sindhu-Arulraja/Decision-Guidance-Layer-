import os
import requests
import json

# Configuration
API_KEY = "YOUR_GROQ_API_KEY"
MODEL_LAMA_8B = "llama-3.1-8b-instant"
MODEL_LAMA_70B = "llama-3.3-70b-versatile"
BASE_URL = "https://api.groq.com/openai/v1/chat/completions"

def invoke_groq(prompt, system, model=MODEL_LAMA_8B, json_mode=True):
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    body = {
        "model": model,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.1
    }
    if json_mode:
        body["response_format"] = {"type": "json_object"}
    
    response = requests.post(BASE_URL, headers=headers, json=body)
    if response.status_code != 200:
        raise Exception(f"API Error: {response.text}")
    
    content = response.json()['choices'][0]['message']['content']
    return json.loads(content) if json_mode else content

def test_classification():
    print("\n=== Phase 1: Testing Intent Classification ===")
    prompt = "I need to choose between AWS and Azure for my startup"
    system = """You are an AI router. Return ONLY valid JSON for ClassificationSchema: 
        { "intent_type": "decision|execution", "decision_type": "planning|ranking", "intent_confidence": 0.9 }"""
    res = invoke_groq(prompt, system)
    print(json.dumps(res, indent=2))

def test_context_gap():
    print("\n=== Phase 2: Testing Context Gap Detection ===")
    prompt = "compare cloud providers"
    system = """You are an AI router. Return ONLY valid JSON for ContextSchema:
        { "missing_information": [{"item":"str","impacts":"goal|constraints|success_metric"}], "assumptions_made": ["str"], "confidence": 0.9 }"""
    res = invoke_groq(prompt, system)
    print(json.dumps(res, indent=2))

def test_decision_engine():
    print("\n=== Phase 3: Testing Decision Guidance Engine ===")
    prompt = "AWS vs GCP for a low budget startup"
    system = """You are a Decision Engine. Return ONLY valid JSON matching the ranking framework schema:
        { "framework": "ranking", "options": [{"name": "string", "criteria_scores": {"impact": 10, "effort": 5, "risk": 2}, "pros": ["string"], "cons": ["string"], "score": 85}], "recommendation": "string", "reasoning": "string" }"""
    res = invoke_groq(prompt, system, model=MODEL_LAMA_70B)
    print(json.dumps(res, indent=2))

def test_pattern_detector():
    print("\n=== Phase 8: Testing Skill-focused Pattern Detector ===")
    prompt = "write a reply email"
    system = """You are a Pattern Detector. Analyze if this task should be saved as a reusable SKILL.
        STEP 1: Classify Task Type (content_generation|analysis|automation|decision).
        STEP 2: Atomic Task Gate. If it produces a single output with no dependencies (e.g. "write an email"), it is a SKILL.
        STEP 3: Check for repetition. 
        Return ONLY valid JSON matching this schema:
        { "task_type": "string", "is_single_step": boolean, "reason": "string explaining why", "name": "Suggested Skill Name", "prompt_template": "Generalized prompt template for this task" }"""
    res = invoke_groq(prompt, system)
    print(json.dumps(res, indent=2))

def test_ai_edit():
    print("\n=== Phase 6: Testing Capability AI Edit Mode ===")
    current_data = {"name": "Test Skill", "prompt_template": "Hello {name}"}
    instruction = "Add a placeholder for 'company'"
    system = f"You are an AI Editor. Modify the following JSON object based on the user's instruction. Return ONLY the modified JSON object. Current JSON: {json.dumps(current_data)}"
    res = invoke_groq(instruction, system)
    print(json.dumps(res, indent=2))

def test_skill_matcher():
    print("\n=== Phase 9: Testing Semantic Skill Matching ===")
    prompt = "write a formal reply"
    saved_skills = [
        {"id": "1", "name": "Reply Email (Formal)", "description": "Write a formal business response"},
        {"id": "2", "name": "Summarize Notes", "description": "Extract key points from raw notes"}
    ]
    system = f"""You are a Skill Matcher. Compare the user query with the list of saved skills.
        Return ONLY valid JSON matching this schema:
        {{ "matched_skill_id": string|null, "confidence": float, "reason": string }}
        Skills: {json.dumps(saved_skills)}"""
    res = invoke_groq(prompt, system)
    print(json.dumps(res, indent=2))

if __name__ == "__main__":
    try:
        test_classification()
        test_context_gap()
        test_decision_engine()
        test_pattern_detector()
        test_ai_edit()
        test_skill_matcher()
        print("\n=== End-to-End Test Complete ===")
    except Exception as e:
        print(f"\n!!! Test Failed: {str(e)}")
