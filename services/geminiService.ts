
export const polishStory = async (rawNotes: string): Promise<string> => {
  try {
    const res = await fetch('/api/polish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes: rawNotes }),
    });

    if (!res.ok) {
      console.error('Server error while polishing story:', await res.text());
      return "Something beautiful is blossoming. We can't wait to celebrate with you!";
    }

    const json = await res.json();
    return json.text || "Love is in the air. We can't wait to share our journey with you.";
  } catch (error) {
    console.error("Gemini (client) Error:", error);
    return "Something beautiful is blossoming. We can't wait to celebrate with you!";
  }
};
