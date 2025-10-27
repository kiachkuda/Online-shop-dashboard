
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const query = require("../Model/query");


// Load environment variables
dotenv.config();

// User login
 const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password)   
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const user = await query.executeQuery('SELECT * from users WHERE email= ?', [email]);
    

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    } 

    if(user[0].verified == false) {
       return res.status(400).json({ message: "Verify Email to continue" });
    }

    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
};

 const verifyToken = (req, res, next) =>{
  const token = req.headers["authorization"]?.split(" ")[1]; // Bearer <token>
  if (!token) return res.status(403).json({ error: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
      req.user = decoded; // attach user id to request
    next();
  });
}

const forgotPassword = async (req, res) => {
  try {
    const {email} = req.body;
    const user = await query.executeQuery(`SELECT * FROM users WHERE email = ?`, [email]);
    if(!user){
      return res.status(403).json({message:"Email not registered"})
    }

    // Generate a 6-digit verification code
    const verificationCode = crypto.randomInt(100000, 999999).toString();

    // Save code and expiry to user (optional, if you want to verify later)
    user.resetCode = verificationCode;
    user.resetCodeExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save();

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Your Password Reset Verification Code",
      text: `Your verification code is: ${verificationCode}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Verification code sent to your email." });

  }catch(err){
    res.status(500).json({ message: err.message });
  }
}

const resetPassword = async (req, res) => {
  try {
    const { code, newPassword } = req.body;
    if (!code || !newPassword) {
      return res.status(400).json({ message: "Code and new password are required" });
    }
    const user = await User.findOne({ resetCode: code, resetCodeExpiry: { $gt: Date.now() } });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired code" });
    }
    const salt = await bcrypt.genSalt(10);
    user.password_hash = await bcrypt.hash(newPassword, salt);
    user.resetCode = undefined;
    user.resetCodeExpiry = undefined;
    await user.save();
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function verifyEmail(req, res) {
  try {
    const db = await clientDb();
    const body = await req.json(); 
    const { otp } = body;

    const cookieStore = await cookies();
    const email = cookieStore.get("email")?.value;
    
    if (!email) {
      return res.status(400).json({ error: "No email in cookie" });
    }

    const user = await query.executeQuery('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (user.verified === true) {
      return res.status(400).json({ error: "User already verified" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }
    if (user.otpExpiry && new Date() > new Date(user.otpExpiry)) {
      return res.status(400).json({ error: "OTP has expired" });
    }
    const res = await query.executeQuery("UPDATE users SET verified = ? otp = ? otpExpiry = ? WHERE email = ?", [true, null, null, email]);

    if (res.modifiedCount === 0) {
      return res.status(400).json({ error: "Failed to verify user" });
    }else{
        (await cookies()).delete("email");
    }

    return res.json(
      { message: "User verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    return res.json(
      { error: "Internal Server Error", details: String(error) },
      { status: 500 }
    );
  }
}

const isAdmin = (req, res, next) => {
  if(req.user.role != "admin"){
    return res.status(401).json({error: "Contact the Administrator"})
  }
  next();
}

const isSeller = (req, res, next) => {
  if(req.user.role != "seller"){
    return res.status(401).json({error: "Contact the Administrator"})
  }
  next();
}

const isadminOrSeller = (req, res, next) => {
  if(req.user.role != "admin" && req.user.role != "seller") {
    return res.status(401).json({error: "Contact the Administrator"})
  }
  next();
}

module.exports = {
  login,
  verifyToken,
  isadminOrSeller,
  forgotPassword,
  resetPassword
};
