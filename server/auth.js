// Client-side login function
const loginUser = async () => {
  const response = await fetch("https://api.example.com/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "user@email.com",
      password: "123456",
    }),
  });

  const data = await response.json();

  if (data.token) {
    // save token
    console.log("Login success", data.token);
  }
};

// Server-side login endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // check user in DB
  const user = await User.findOne({ email });

  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, "secretKey");

  res.json({ token });
});

// User data/balance object
const userData = {
  "userId": "123",
  "balance": 500,
  "transactions": [
    { "type": "credit", "amount": 200 },
    { "type": "debit", "amount": 100 }
  ]
};

module.exports = {
  loginUser,
  userData
};