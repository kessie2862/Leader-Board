import './index.css';
import {
  createGameScores,
  getGameScores,
  saveGameScore,
} from '../modules/gameFunc.js';

// 1. Create a new game and save it's ID
// 2. Add functionalities for refreshing and submitting the game

const apiUrl =
  'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

let gameId;
const createGame = async () => {
  const response = await fetch(`${apiUrl}games/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: 'My Game' }),
  });
  const data = await response.json();
  gameId = data.result.slice(-5);
};
createGame();

// Refresh button
const refreshButton = document.querySelector('.refresh');
const scoresList = document.getElementById('scores');
refreshButton.addEventListener('click', async () => {
  const scores = await getGameScores(gameId);
  scoresList.innerHTML = '';
  scores.forEach((score) => {
    const li = createGameScores(score.user, score.score);
    scoresList.appendChild(li);
  });
});

// Submit button
const submitButton = document.querySelector('.submit');
const nameInput = document.getElementById('name');
const scoreInput = document.getElementById('score');
submitButton.addEventListener('click', async (e) => {
  e.preventDefault();
  const name = nameInput.value;
  const score = scoreInput.value;
  await saveGameScore(gameId, name, score);
  const newScore = createGameScores(name, score);
  scoresList.appendChild(newScore);
  nameInput.value = '';
  scoreInput.value = '';
});
