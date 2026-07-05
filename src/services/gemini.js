import { GoogleGenerativeAI } from '@google/generative-ai';

const getApiKey = () => {
  return import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('geminiApiKey') || '';
};

export async function analyzeData(data, question) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('Gemini API key not configured. Please add your API key in Settings.');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `You are an expert data analyst AI assistant. Analyze the following data and answer the user's question.

Data (JSON format):
${JSON.stringify(data, null, 2)}

User Question: ${question}

Please provide a comprehensive analysis including:
1. Direct Answer to the question
2. Key Insights from the data
3. Reasoning behind your analysis
4. Actionable Recommendations
5. Confidence Score (0-100%)
6. Business Impact Assessment

Format your response in clear sections with markdown.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to analyze data. Please check your API key and try again.');
  }
}

export async function generateInsights(data) {
  const apiKey = getApiKey();
  if (!apiKey) return null;

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `You are an expert data analyst. Analyze this dataset and generate actionable business insights.

Data Summary (JSON):
${JSON.stringify(data.slice(0, 50), null, 2)}

Generate insights including:
1. Top 3 Opportunities
2. Top 3 Risks
3. Best Performing Segment
4. Worst Performing Segment
5. Growth Suggestions
6. Overall Summary

Return as JSON with keys: opportunities (array), risks (array), bestSegment (object), worstSegment (object), suggestions (array), summary (string)`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
  } catch (error) {
    console.error('Error generating insights:', error);
    return null;
  }
}

export async function generateForecast(historicalData, forecastType = 'revenue') {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('API key not configured');

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `You are a forecasting expert. Based on this historical data, generate a ${forecastType} forecast.

Historical Data:
${JSON.stringify(historicalData, null, 2)}

Provide:
1. Next 6 periods forecast values
2. Trend analysis
3. Seasonal patterns if any
4. Confidence level
5. Key assumptions

Return as JSON with keys: forecast (array of {period, value, confidence}), trend (string), seasonality (string), confidence (number), assumptions (array)`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
  } catch (error) {
    console.error('Forecast error:', error);
    throw error;
  }
}

export async function generateRecommendations(data) {
  const apiKey = getApiKey();
  if (!apiKey) return [];

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `Based on this data analysis, generate strategic recommendations.

Data:
${JSON.stringify(data, null, 2)}

Generate 5 specific recommendations. Each should include:
- priority (high/medium/low)
- problem (string)
- reason (string)
- suggestedAction (string)
- expectedOutcome (string)
- estimatedImpact (string)
- confidence (number 0-100)

Return as JSON array with these keys.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : [];
  } catch (error) {
    console.error('Recommendation error:', error);
    return [];
  }
}
