// import express from "express";
// import cors from "cors";
// import morgan from "morgan";

// const app = express();

// // ---------- EDIT THESE (your identity details) ----------
// const FULL_NAME = "Vanja_Lahari";         // lowercase full name with underscore
// const DOB_DDMMYYYY = "29102004";      // ddmmyyyy
// const EMAIL = "laharivanja@gmail.com";
// const ROLL_NUMBER = "22BCE9796";
// // --------------------------------------------------------

// // Middleware
// app.use(cors());
// app.use(express.json({ limit: "1mb" }));
// app.use(morgan("dev"));

// // Health check / root
// // Health-check route (keep this!)
// app.get("/", (_req, res) => {
//     res.status(200).json({
//         status: "ok",
//         message: "VIT BFHL API running. Use GET/POST /bfhl."
//     });
// });

// // GET /bfhl
// app.get("/bfhl", (_req, res) => {
//     res.json({ operation_code: 1 });
// });

// // POST /bfhl
// app.post("/bfhl", (req, res) => {
//     const data = req.body.data || [];

//     const numbers = data.filter((item) => !isNaN(item));
//     const alphabets = data.filter((item) => isNaN(item));

//     let highestAlphabet = "";
//     if (alphabets.length > 0) {
//         highestAlphabet = [alphabets.sort().reverse()[0]];
//     }

//     res.json({
//         is_success: true,
//         user_id: "Vanja_Lahari_01042003",
//         email: "vanjalahari04@gmail.com",
//         roll_number: "22BCE5343",
//         numbers,
//         alphabets,
//         highest_alphabet: highestAlphabet,
//     });
// });


// /**
//  * Helpers
//  */

// // is purely digits (e.g., "334", "0") — numbers must be returned as strings
// const isDigitsOnly = (s) => typeof s === "string" && /^[0-9]+$/.test(s);

// // is purely alphabets (e.g., "a", "ABcD") — will be uppercased in alphabets[]
// const isAlphasOnly = (s) => typeof s === "string" && /^[A-Za-z]+$/.test(s);

// // classify specials: anything not purely digits or purely alphabets
// // (including strings with symbols, spaces, mixed alnum like "a1", or punctuation)
// const isSpecial = (s) =>
//     typeof s === "string" && !(isDigitsOnly(s) || isAlphasOnly(s));

// /**
//  * Build alternating caps (Upper, lower, Upper, ...)
//  * Steps:
//  *  1) Take all alphabetical characters from the input (flattened across tokens)
//  *  2) Reverse that character sequence
//  *  3) Apply alternating caps starting Upper on index 0
//  */
// const buildAlternatingCapsReversed = (tokens) => {
//     const letters = [];
//     for (const t of tokens) {
//         if (typeof t !== "string") continue;
//         for (const ch of t) {
//             if (/[A-Za-z]/.test(ch)) letters.push(ch);
//         }
//     }
//     letters.reverse();

//     return letters
//         .map((ch, idx) => {
//             const lower = ch.toLowerCase();
//             return idx % 2 === 0 ? lower.toUpperCase() : lower; // Upper, lower, Upper, ...
//         })
//         .join("");
// };

// app.post("/bfhl", (req, res) => {
//     try {
//         const { data } = req.body ?? {};

//         // Validate input shape
//         if (!Array.isArray(data)) {
//             return res.status(400).json({
//                 is_success: false,
//                 user_id: `${FULL_NAME}_${DOB_DDMMYYYY}`,
//                 email: EMAIL,
//                 roll_number: ROLL_NUMBER,
//                 error: 'Invalid payload: expected JSON body like { "data": ["a","1","$"] }'
//             });
//         }

//         const odd_numbers = [];
//         const even_numbers = [];
//         const alphabets = [];
//         const special_characters = [];

//         let sum = 0;

//         for (const item of data) {
//             // Only strings are considered per examples; coerce others to string safely
//             const s = typeof item === "string" ? item : String(item);

//             if (isDigitsOnly(s)) {
//                 // keep as string in responses (requirement)
//                 const num = Number(s);
//                 sum += num;
//                 if (num % 2 === 0) {
//                     even_numbers.push(s);
//                 } else {
//                     odd_numbers.push(s);
//                 }
//             } else if (isAlphasOnly(s)) {
//                 // push the whole token uppercased
//                 alphabets.push(s.toUpperCase());
//             } else if (isSpecial(s)) {
//                 special_characters.push(s);
//             } else {
//                 // Empty strings or other odd cases treated as special (but won't match digits/alphas)
//                 special_characters.push(s);
//             }
//         }

//         const concat_string = buildAlternatingCapsReversed(
//             data.map((x) => (typeof x === "string" ? x : String(x)))
//         );

//         const payload = {
//             is_success: true,
//             user_id: `${FULL_NAME}_${DOB_DDMMYYYY}`,
//             email: EMAIL,
//             roll_number: ROLL_NUMBER,
//             odd_numbers,
//             even_numbers,
//             alphabets,
//             special_characters,
//             sum: String(sum),
//             concat_string
//         };

//         return res.status(200).json(payload);
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({
//             is_success: false,
//             user_id: `${FULL_NAME}_${DOB_DDMMYYYY}`,
//             email: EMAIL,
//             roll_number: ROLL_NUMBER,
//             error: "Internal Server Error"
//         });
//     }
// });

// // Required by Render/Railway
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`BFHL API listening on port ${PORT}`);
// });




import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

// ---------- EDIT THESE (your identity details) ----------
const FULL_NAME = "Vanja_Lahari";       // lowercase full name with underscore
const DOB_DDMMYYYY = "29102004";        // ddmmyyyy
const EMAIL = "laharivanja@gmail.com";
const ROLL_NUMBER = "22BCE9796";
// --------------------------------------------------------

// Middleware
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

// Health check / root
app.get("/", (_req, res) => {
    res.status(200).json({
        status: "ok",
        message: "VIT BFHL API running. Use GET/POST /bfhl."
    });
});

// GET /bfhl
app.get("/bfhl", (_req, res) => {
    res.json({
        operation_code: 1,
        name: "Vanja Lahari",
        user_id: "Vanja_Lahari",
        email: "laharivanja@gmail.com",
        roll_number: "22BCE9796"
    });
});


/**
 * Helpers
 */
const isDigitsOnly = (s) => typeof s === "string" && /^[0-9]+$/.test(s);
const isAlphasOnly = (s) => typeof s === "string" && /^[A-Za-z]+$/.test(s);
const isSpecial = (s) =>
    typeof s === "string" && !(isDigitsOnly(s) || isAlphasOnly(s));

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
        .map((ch, idx) => {
            const lower = ch.toLowerCase();
            return idx % 2 === 0 ? lower.toUpperCase() : lower;
        })
        .join("");
};

// POST /bfhl
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
                if (num % 2 === 0) {
                    even_numbers.push(s);
                } else {
                    odd_numbers.push(s);
                }
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

// Port binding (Render/Railway)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`BFHL API listening on port ${PORT}`);
});
