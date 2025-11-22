const query = require('../Model/query')
const bcrypt = require("bcryptjs")
const cookie = require("cookie");
const nodemailer = require('nodemailer')


async function postuser(req, res) {
    const { firstname, lastname, email, password, phone} = req.body;

    const name = firstname + " " + lastname;

    try {

        if (!validName(firstname, lastname)) {
            return res.status(400).json({ errorType: "name", error: "Invalid name. First and last names must be at least 2 characters long." });
        }
        if (!validEmail(email)) {
            return res.status(400).json({ errorType: "email", error: "Invalid email format." });
        }

        if (!validatePhoneNumber(phone)) {
            return res.status(400).json({ errorType: "phone", error: "Invalid Phone Number format." });
        }

        const existingUser = await query.executeQuery('SELECT * FROM users WHERE email = ?', [email]);

        if (existingUser.length > 0) {
            return res.status(400).json({  errorType: "email", error: "Email already in use." });
        }

        if (!validPassword(password)) {
            return res.status(400).json({ errorType: "password", error: "Invalid password. Password must be at least 6 characters long and include at least one number, one uppercase letter, one lowercase letter, and one special character." });
        }

        

        const hashedPassword = await bcrypt.hash(password, 10);
        const otpExpiry = new Date(Date.now() + 4 * 60 * 60 * 1000); // 4 hours from now
        
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP

        
    
    // Hash the password before storing it
    /* Send registration email to user */
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "kiachkuda12@gmail.com",
            pass: "zaheixudycojquae",
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Welcome to Mtushadmin!",
        text: `Hello ${firstname},\n\nThank you for registering. Your OTP is: ${otp}\n\nBest regards,\nMtushadmin Team`,
    };

   const sendmail =  await transporter.sendMail(mailOptions);

   if(!sendmail){
    return res.status(400).json( {error: "Sending Mail Failed"})
   }

    const user = await query.executeQuery(`insert into users(name, email, phone, password_hash)
            values(?, ?, ?, ?)`, [name, email, phone, hashedPassword]);

    console.log(user.insertedId)   

    // Set cookie before sending response
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("email", email, {
      httpOnly: true,
      path: "/",
      maxAge: 4 * 60 * 60,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    })
  );
     res.status(201).json(
        { message: "User registered successfully" },
       
    );

    } catch (err) {
        res.status(500).json({error: err + " Server error"})
    }
}


function validName(first, last) {
    if (!first || !last) return false;
    if (first.length < 2 && last.length < 2) return false;
    return true;
}

function validEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validPassword(password) {

    return /\d/.test(password)
        && /[a-z]/.test(password)
        && /[A-Z]/.test(password)
        && password.length >= 6;

}

function validatePhoneNumber(phone) {
  // Remove spaces for consistency
  const clean = phone.replace(/\s+/g, "");

  // Regular expression for accepted formats
  const regex = /^(?:0|\+?254)[-\s]?\d{3}[-\s]?\d{3}[-\s]?\d{3}$/;

  return regex.test(clean);
}


module.exports = {
    postuser
};
