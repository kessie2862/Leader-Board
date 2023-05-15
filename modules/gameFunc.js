const apiUrl =
  'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

// create a new score item for the list
export const createGameScores = (name, score) => {
  const li = document.createElement('li');
  li.textContent = `${name}: ${score}`;
  return li;
};

// get all scores for a game from the API
export const getGameScores = async (gameId) => {
  const response = await fetch(`${apiUrl}games/${gameId}/scores/`);
  const data = await response.json();
  return data.result;
};

// save score for a game to the API
export const saveGameScore = async (gameId, name, score) => {
  const response = await fetch(`${apiUrl}games/${gameId}/scores/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: name, score }),
  });
  const data = await response.json();
  return data.result;
};
