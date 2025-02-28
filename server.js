import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const USER_ID = "john_doe_17091999";
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";

// POST endpoint to process data
app.post("/bfhl", (req, res) => {
    try {
        if (!req.body.data || !Array.isArray(req.body.data)) {
            return res.status(400).json({ is_success: false, message: "Invalid input format" });
        }

        const inputData = req.body.data;
        const numbers = inputData.filter(item => !isNaN(item));
        const alphabets = inputData.filter(item => /^[A-Za-z]$/.test(item));
        const highestAlphabet = alphabets.length ? [alphabets.sort().pop()] : [];

        res.status(200).json({
            is_success: true,
            user_id: USER_ID,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            numbers,
            alphabets,
            highest_alphabet: highestAlphabet
        });
    } catch (error) {
        res.status(500).json({ is_success: false, message: "Server error" });
    }
});

// GET endpoint returning operation_code
app.get("/bfhl", (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
