import express from 'express';

// Inicijalizacija aplikacije
const app = express();

// Pokretanje servera
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
