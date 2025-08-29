

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// ✅ User details from .env (with fallbacks)
const fullName = (process.env.FULL_NAME || "vanja_lahari").toLowerCase();
const dob = process.env.DOB || "29102004";
const email = process.env.EMAIL || "laharivanja@gmail.com";
const rollNumber = process.env.ROLL_NUMBER || "22BCE9796";

// 🔹 Helper: alternating caps reverse string
function alternatingCapsReverse(str) {
  let reversed = str.split("").reverse().join("");
  return reversed
    .split("")
    .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join("");
}

// 🔹 GET health check
app.get("/bfhl", (req, res) => {
  res.status(200).json({
    operation_code: 1,
    message: "Server is running. Use POST /bfhl to process data."
  });
});

// 🔹 POST endpoint
app.post("/bfhl", (req, res) => {
  try {
    const { array } = req.body;

    if (!Array.isArray(array)) {
      return res.status(400).json({
        is_success: false,
        user_id: `${fullName}_${dob}`,
        message: "Invalid input. 'array' must be an array."
      });
    }

    let evens = [];
    let odds = [];
    let alphabets = [];
    let specials = [];
    let sum = 0;

    array.forEach(item => {
      // ✅ Check if item is a number or numeric string
      if (!isNaN(item)) {
        const num = Number(item);
        if (num % 2 === 0) evens.push(num);
        else odds.push(num);
        sum += num;
      } 
      // ✅ Check if it's an alphabet
      else if (typeof item === "string" && /^[a-zA-Z]$/.test(item)) {
        alphabets.push(item.toUpperCase());
      } 
      // ✅ Everything else = special character
      else {
        specials.push(item);
      }
    });

    const concatAlpha = alternatingCapsReverse(alphabets.join(""));

    return res.status(200).json({
      is_success: true,
      user_id: `${fullName}_${dob}`,
      email,
      roll_number: rollNumber,
      odd_numbers: odds,
      even_numbers: evens,
      alphabets,
      special_characters: specials,
      sum,
      concatenated_alphabets: concatAlpha
    });

  } catch (error) {
    return res.status(500).json({
      is_success: false,
      user_id: `${fullName}_${dob}`,
      message: "Internal server error",
      error: error.message
    });
  }
});

// 🔹 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}/bfhl`);
});
