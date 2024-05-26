// quizController.js
const shuffle = require('../utils/shuffle');
const questions = require('../models/question')

exports.startQuiz = (req, res) => {
    try {
        const category = req.body.category.toLowerCase();
        const selectedQuestions = questions[category];

        if (!selectedQuestions) {
            return res.status(400).json({ error: 'Invalid category' });
        }

        // Mengambil 10 pertanyaan secara acak dari kategori yang dipilih
        const shuffledQuestions = shuffle(selectedQuestions).slice(0, 10);
        
        // Kirim pertanyaan ke pengguna
        res.json({ questions: shuffledQuestions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.submitAnswers = (req, res) => {
     try {
        const answers = req.body.answers;
        const category = req.body.category.toLowerCase();

        // Validasi jawaban
        if (!Array.isArray(answers) || answers.length !== 10 || answers.some(ans => ans !== 1 && ans !== 0)) {
            return res.status(400).json({ error: 'Invalid answers' });
        }

        // Logika untuk menentukan apakah user menderita penyakit mental
        // Di sini Anda dapat menggunakan model ML atau aturan heuristik sesuai kebutuhan

        // Contoh sederhana: jika jumlah jawaban 'yes' lebih dari setengahnya, user dianggap menderita
        const yesCount = answers.reduce((total, ans) => total + ans, 0);
        const isSuffering = yesCount > 5;

        // Respons yang sesuai berdasarkan kategori
        const responseMessages = {
            anxiety: 'Anda terdeteksi terkena anxiety.',
            depression: 'Anda terdeteksi terkena depression.',
            // Tambahkan kategori lainnya di sini
        };

        const successMessage = responseMessages[category] || 'Anda mungkin menderita penyakit mental dari kategori yang Anda pilih.';
        const failureMessage = `Anda tidak terdeteksi terkena ${category}.`;

        // Kirim hasil ke pengguna
        if (isSuffering) {
            res.json({ message: successMessage });
        } else {
            res.json({ message: failureMessage });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
