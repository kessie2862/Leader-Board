import './index.css';
import {
  createGameScores,
  getGameScores,
  saveGameScore,
} from '../modules/gameFunc.js';

// 1. Create a new game and save its ID
// 2. Storing the generated game IDs in the localStorage
// 2.a. Check if a game ID has already been stored
// 2.b. If not, create a new one in the localStorage
// 3. Add functionalities for refreshing and submitting the game

const apiUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

let gameId;
const createGame = async () => {
  const storedGameId = localStorage.getItem('gameId');
  if (storedGameId) {
    gameId = storedGameId;
  } else {
    const response = await fetch(`${apiUrl}games/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: 'My Game' }),
    });
    const data = await response.json();
    gameId = data.result;
    localStorage.setItem('gameId', gameId);
  }
};
createGame();

// Refresh button
const refreshButton = document.querySelector('.refresh');
refreshButton.addEventListener('click', async () => {
  const scores = await getGameScores(gameId);
  const scoresList = document.getElementById('scores');
  scoresList.innerHTML = '';
  scores.forEach((score) => {
    const li = createGameScores(score.user, score.score);
    scoresList.appendChild(li);
  });
});

// Submit button
const submitButton = document.querySelector('.submit');
submitButton.addEventListener('click', async (event) => {
  event.preventDefault();
  const nameInput = document.getElementById('name');
  const scoreInput = document.getElementById('score');
  const name = nameInput.value;
  const score = scoreInput.value;
  await saveGameScore(gameId, name, score);
  nameInput.value = '';
  scoreInput.value = '';
});
