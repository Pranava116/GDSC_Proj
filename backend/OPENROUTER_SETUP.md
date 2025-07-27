# Gemini API Integration Setup

## Environment Variables

Create a `.env` file in your project root with the following variables:

```env
# Gemini API Configuration
# Get your API key from: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=your_gemini_api_key_here

# Server Configuration
PORT=5000
```

## Getting Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key" to generate a new key
4. Copy the key and paste it in your `.env` file

## Available Models

The current implementation uses the `gemini-pro` model. You can modify the model in `utils/aiUtils.js`:

```javascript
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
```

Available Gemini models:
- `gemini-pro` - Text generation (default)
- `gemini-pro-vision` - Text and image generation
- `gemini-1.5-pro` - Latest model with improved performance
- `gemini-1.5-flash` - Faster, more efficient model

## Benefits of Gemini API

- **Cost Effective**: Competitive pricing compared to other AI providers
- **High Quality**: Advanced language model with strong reasoning capabilities
- **Google Integration**: Seamless integration with Google's ecosystem
- **Reliable**: Enterprise-grade reliability and uptime
- **Multimodal**: Support for text and image generation (with vision models)

## Installation

After updating your `.env` file, install the new dependency:

```bash
npm install
```

## Testing

After setting up your API key, test the integration:

```bash
npm run dev
```

Then make a POST request to `/api/docify/generate` with a GitHub repository URL. 