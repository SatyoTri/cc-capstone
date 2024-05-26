// quizRoutes.js
const express = require('express');
const router = express.Router();
const quizController = require('../controller/quizController.js');

// Endpoint untuk memulai kuis
router.post('/start-quiz', quizController.startQuiz);

// Endpoint untuk menerima jawaban
router.post('/submit-answers', quizController.submitAnswers);

module.exports = router;
