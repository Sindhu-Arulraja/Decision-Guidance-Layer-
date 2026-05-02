import { LLMClient, EmbeddingsClient } from '../Phase 2/api';
import { HeavyLLMClient } from '../Phase 3/decision_engine';

export class GroqClient implements LLMClient, HeavyLLMClient, EmbeddingsClient {
  private apiKey: string;
  private baseUrl = 'https://api.groq.com/openai/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  // Generic fetch wrapper for Groq
  private async fetchGroq(messages: any[], model: string, jsonMode: boolean = false) {
    const body: any = {
      model,
      messages,
      temperature: 0.1,
    };

    if (jsonMode) {
      body.response_format = { type: "json_object" };
    }

    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Groq API Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  // Phase 2: Lightweight JSON call (using fast Llama3.1 8b)
  async invokeJson<T>(prompt: string, schemaName: string): Promise<T> {
    const systemPrompt = `You are an AI router. Return ONLY valid JSON matching the schema for ${schemaName}.`;
    
    const result = await this.fetchGroq([
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt }
    ], "llama-3.1-8b-instant", true);

    return JSON.parse(result) as T;
  }

  // Phase 3: Heavy Sequential call (using capable Llama3.3 70b)
  async invokeFramework<T>(prompt: string, framework: string): Promise<T> {
    const systemPrompt = `You are a Decision Engine. Return ONLY valid JSON matching the ${framework} framework schema. 
    Analyze the user's request deeply and provide structured guidance.`;
    
    const result = await this.fetchGroq([
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt }
    ], "llama-3.3-70b-versatile", true);

    return JSON.parse(result) as T;
  }

  // Phase 2: Embeddings (Mocked for now since Groq doesn't provide them natively)
  async getEmbedding(text: string): Promise<number[]> {
    console.warn("[GroqClient] Emulating embedding - Groq does not have a native embedding endpoint.");
    // Return a dummy array
    return new Array(1536).fill(0).map(() => Math.random());
  }
}
