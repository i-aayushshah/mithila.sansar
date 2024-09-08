export async function fetchChatbotResponse(prompt) {
  try {
    const response = await fetch('/api/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    })

    if (!response.ok) {
      throw new Error('Failed to fetch chatbot response')
    }

    const data = await response.json()
    return data.response
  } catch (error) {
    console.error('Error in fetchChatbotResponse:', error)
    throw error
  }
}
