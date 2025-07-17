import connection from "../config/database.config.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
// .env support
import dotenv from 'dotenv'
dotenv.config()


//Login Controller
export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Please enter all required fields",
      success: false,   
    });
  }
  
   try {
    //Finding User using Email
    const [user] = await connection.execute(
      "SELECT * from users where email = ? ",
      [email]
    );
    
    if (user.length == 0) {
      return res.status(404).json({message: "User not found", success: false});
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user[0].password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credential", success: false });
    }

    //JWT
    const { user_id, email: user_email, first_name, last_name, role } = user[0];
    const token = jwt.sign({ user_id, email: user_email, first_name, last_name, role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "User login successfully",
      success: true,
      user: {
        user_id : user_id,
        email: email,
        first_name: first_name,
        last_name: last_name,
        role: role
      },
      token : token,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Something went wrong, try again later!",
      success: false,
      error: error.message,
    });
  }
}
//Register Controller
export async function add_user(req, res) {
  const { first_name, last_name, email, password, phone ,role } = req.body;

  //check if all fields are provided
  if (!email || !password || !first_name || !last_name || !phone || !role) {
   return res.status(400).json({
      message: "Please enter all required fields",
      success : false    
    });
  }

  //Password length Check
  if (password.trim().length < 8) {
    return res.status(400).json({
      message: "Password must be at least 8 characters" ,
      success: false,   
    });
   }

  try {
    //check if username or email already exists(row, field)
    const [user] = await connection.execute("SELECT * FROM users where email = ?",[email]);
    if (user.length > 0) {
      if (user[0].email === email) {
         return res.status(409).json({
            message: "User Already exist"  ,
            success: false, 
         });
      }
    }
    //encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await connection.execute(
      "INSERT INTO users (first_name, last_name, email, password, phone, role, is_active) VALUES (?,?,?,?,?,?,?)",
      [first_name, last_name, email, hashedPassword, phone, role, true ]
    );

    return res.status(201).json({
        message: "User account registered",
        success: true
    });

    } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Internal server error, something went wrong!"
    });
  }
}

//Update user info Controller
export async function editProfile(req, res) {
  const { first_name, last_name, email, phone, password } = req.body;
  const userId = req.user.user_id; // From auth middleware

  if (!email || !first_name || !last_name || !phone) {
    return res.status(400).json({
      message: "Missing required fields",
      success: false
    });
  }

  try {
    // 1. Check for duplicate email (excluding current user)
    const [existingUser] = await connection.execute(
      "SELECT user_id FROM users WHERE email = ? AND user_id != ?",
      [email, userId]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({
        message: "Email already in use by another account",
        success: false
      });
    }

    // Handle conditional password update
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await connection.execute(
        `UPDATE users 
         SET first_name = ?, 
             last_name = ?, 
             email = ?, 
             password = ?, 
             phone = ? 
         WHERE user_id = ?`,
        [first_name, last_name, email, hashedPassword, phone, userId]
      );
    } else {
      await connection.execute(
        `UPDATE users 
         SET first_name = ?, 
             last_name = ?, 
             email = ?, 
             phone = ? 
         WHERE user_id = ?`,
        [first_name, last_name, email, phone, userId]
      );
    }

    return res.status(200).json({
      message: "User profile updated successfully!",
      success: true
    });

  } catch (error) {
    console.log("Error editing profile:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: error.message
    });
  }
}


//Check User
export async function checkUser(req, res) {
  // req.user comes from JWT middleware(user info from verified token)
  const userId = req.user.user_id;

  try {
    const [user] = await connection.execute(
      "SELECT * FROM users WHERE user_id = ?",
      [userId]
    );

    if (user.length === 0) {
      return res.status(404).json({
        error: "User not found",
        success: false
      });
    }

    res.status(200).json({
      message: "User profile retrieved successfully",
      success: true,
      user: user[0]
    })

  } catch (error) {
    res.status(500).json({
      message: "Failed to get user profile",
      success: false,
      error: error.message,
    });
  }
}



//Get all users info Controller
export async function getAllUsers(req, res) {
  // req.user comes from JWT middleware(user info from verified token)
  const userId = req.user.user_id;

  try {
    const [users] = await connection.execute(
      "SELECT * FROM users LIMIT 10"
    );

    if (users.length === 0) {
      return res.status(200).json({
        error: "No employees yet!",
        success: true
      });
    }

    res.status(200).json({
      message: "Employees data retrieved successfully",
      success: true,
      users: users
    })

  } catch (error) {
     return res.status(500).json({
       message: "Unable to qeury employees! Internal server error!",
       success: false,
      error: error.message
    });
  }
}

//Get single user info Controller
export async function getSingleUser(req, res) {
  // req.params.user_id comes from reqeust parameter
  const {user_id} = req.params;

  try {
    const [user] = await connection.execute(
      "SELECT * FROM users WHERE user_id = ?",[user_id]
    );

    if (user.length === 0) {
      return res.status(200).json({
        error: "No employee yet!",
        success: true
      });
    }

    res.status(200).json({
      message: "Employee data retrieved successfully",
      success: true,
      user: user[0]
    })

  } catch (error) {
     return res.status(500).json({
       message: "Unable to qeury employee! Internal server error!",
       success: false,
      error: error.message
    });
  }
}

//Deactivate user Controller
export async function deactivate(req, res) {
  // req.params.user_id comes from reqeust parameter
  const {user_id} = req.params;

  try {
    const [user] = await connection.execute(
      "SELECT * FROM users WHERE user_id = ?",[user_id]
    );

    if (user.length === 0) {
      return res.status(200).json({
        error: "No employee yet!",
        success: true
      });
    }

    await connection.execute(
      "UPDATE users SET is_active = false WHERE user_id = ?",[user_id]
    );

     res.status(200).json({
      message: "Employee Deactivated",
      success: true
    })

  } catch (error) {
     return res.status(500).json({
       message: "Unable to deactivate employee! Internal server error!",
       success: false,
       error: error.message
    });
  }
}

//Ativate user Controller
export async function activate(req, res) {
  // req.params.user_id comes from reqeust parameter
  const {user_id} = req.params;

  try {
    const [user] = await connection.execute(
      "SELECT * FROM users WHERE user_id = ?",[user_id]
    );

    if (user.length === 0) {
      return res.status(200).json({
        error: "No employee yet!",
        success: true
      });
    }

    await connection.execute(
      "UPDATE users SET is_active = true WHERE user_id = ?",[user_id]
    );

     res.status(200).json({
      message: "Employee Activated",
      success: true
    })

  } catch (error) {
     return res.status(500).json({
       message: "Unable to Activate employee! Internal server error!",
       success: false,
       error: error.message
    });
  }
}

//Delete User
export async function deleteUser(req, res) {
  // req.params.user_id comes from reqeust parameter
  const {user_id} = req.params;

  try {
    const [user] = await connection.execute(
      "SELECT * FROM users WHERE user_id = ?",[user_id]
    );

    if (user.length === 0) {
      return res.status(200).json({
        message: "User not found",
        success: true
      });
    }
       // Perform deletion
    await connection.execute(
      "DELETE FROM users WHERE user_id = ?",
      [user_id]
    );

     res.status(200).json({
      message: "Employee Deleted ✅",
      success: true
    })

  } catch (error) {
     return res.status(500).json({
       message: "Unable to Delete employee! Internal server error!",
       success: false,
       error: error.message
    });
  }
}