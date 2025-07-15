import React, { useState, useEffect } from 'react';

const initialEmojis = {
  "😁": 0,
  "😳": 0,
  "🤯": 0,
  "🤪": 0,
};

function EmojiVoting() {
  const [votes, setVotes] = useState(initialEmojis);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const savedVotes = localStorage.getItem('emojiVotes');
    if (savedVotes) {
      setVotes(JSON.parse(savedVotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('emojiVotes', JSON.stringify(votes));
  }, [votes]);

  const handleVote = (emoji) => {
    setVotes(prevVotes => ({
      ...prevVotes,
      [emoji]: prevVotes[emoji] + 1,
    }));
  };

  const handleShowResults = () => {
    setShowResults(true);
  };

  const handleClearResults = () => {
    setVotes(initialEmojis);
    setShowResults(false);
    localStorage.removeItem('emojiVotes');
  };

  const getWinners = () => {
    const maxVotes = Math.max(...Object.values(votes));
    if (maxVotes === 0) return [];

    return Object.entries(votes)
      .filter(([_, count]) => count === maxVotes)
      .map(([emoji]) => emoji);
  };

  return (
    <div>
      <h1>Голосування за смайлики</h1>
      <ul>
        {Object.entries(votes).map(([emoji, count]) => (
          <li key={emoji} onClick={() => handleVote(emoji)}>
            {emoji}
            <span className="counter">{count}</span>
          </li>
        ))}
      </ul>

      <div className="buttons-container">
        <button onClick={handleShowResults}>Показати результати</button>
        <button onClick={handleClearResults}>Очистити результати</button>
      </div>

      {showResults && (
        <div className="results">
          <h2>Переможець: {getWinners().join(' ') || 'Ще немає голосів'}</h2>
        </div>
      )}
    </div>
  );
}

export default EmojiVoting;