const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3000;
const quizRoutes = require('./routes/quizRoutes');

app.use(cors());
app.use(express.json());

app.use('/quiz', quizRoutes);

app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`);
})