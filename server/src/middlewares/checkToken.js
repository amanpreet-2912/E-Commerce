import jwt from "jsonwebtoken";
export const checkToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json("Not Authorized");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Invalid token" });
  }
};
