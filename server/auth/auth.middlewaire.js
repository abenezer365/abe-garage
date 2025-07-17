import jwt from "jsonwebtoken";

async function auth(req, res, next) {
  const authHeader = req.headers.authorization;     //EXPECTED 'Bearer Token'

if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({
         message: "Authentication invalid!! Access Denied. No Token Provided",
         success: false
         });
      }
  const token = authHeader.split(" ")[1];
    try {
        const {user_id, email, first_name, last_name, role } = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {user_id, email, first_name, last_name, role }; 
        next();
    } catch (error) {
        return res.status(500).json({
            message: "Invalid Token",
            success: false,
            error: error.message,
        });
    }
}

export default auth;

