import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

// ---------- HARD-CODED USER DETAILS ----------
const FULL_NAME = "vanja_lahari";        // lowercase with underscore
const DOB_DDMMYYYY = "29102004";        // ddmmyyyy
const EMAIL = "laharivanja@gmail.com";
const ROLL_NUMBER = "22BCE9796";
const PORT = 3000;                       // can change if needed
// --------------------------------------------

// Middleware
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

// ----------------- Health Check -----------------
app.get("/", (_req, res) => {
    res.status(200).json({
        status: "ok",
        message: "VIT BFHL API running. Use POST /bfhl."
    });
});

// ----------------- Helpers -----------------
const isDigitsOnly = (s) => typeof s === "string" && /^[0-9]+$/.test(s);
const isAlphasOnly = (s) => typeof s === "string" && /^[A-Za-z]+$/.test(s);
const isSpecial = (s) => typeof s === "string" && !(isDigitsOnly(s) || isAlphasOnly(s));

const buildAlternatingCapsReversed = (tokens) => {
    const letters = [];
    for (const t of tokens) {
        if (typeof t !== "string") continue;
        for (const ch of t) {
            if (/[A-Za-z]/.test(ch)) letters.push(ch);
        }
    }
    letters.reverse();
    return letters
        .map((ch, idx) => (idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
        .join("");
};

// ----------------- POST /bfhl -----------------
app.post("/bfhl", (req, res) => {
    try {
        const { data } = req.body ?? {};

        if (!Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                user_id: `${FULL_NAME}_${DOB_DDMMYYYY}`,
                email: EMAIL,
                roll_number: ROLL_NUMBER,
                error: 'Invalid payload: expected JSON body like { "data": ["a","1","$"] }'
            });
        }

        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;

        for (const item of data) {
            const s = typeof item === "string" ? item : String(item);

            if (isDigitsOnly(s)) {
                const num = Number(s);
                sum += num;
                if (num % 2 === 0) even_numbers.push(s);
                else odd_numbers.push(s);
            } else if (isAlphasOnly(s)) {
                alphabets.push(s.toUpperCase());
            } else if (isSpecial(s)) {
                special_characters.push(s);
            } else {
                special_characters.push(s);
            }
        }

        const concat_string = buildAlternatingCapsReversed(
            data.map((x) => (typeof x === "string" ? x : String(x)))
        );

        return res.status(200).json({
            is_success: true,
            user_id: `${FULL_NAME}_${DOB_DDMMYYYY}`,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            odd_numbers,
            even_numbers,
            alphabets,
            special_characters,
            sum: String(sum),
            concat_string
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            is_success: false,
            user_id: `${FULL_NAME}_${DOB_DDMMYYYY}`,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            error: "Internal Server Error"
        });
    }
});

// ----------------- Start Server -----------------
app.listen(PORT, () => {
    console.log(`BFHL API listening on port ${PORT}`);
});
