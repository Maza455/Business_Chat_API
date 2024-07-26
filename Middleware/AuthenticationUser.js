import {
    config
} from "dotenv";
config()
import jwt from "jsonwebtoken";

function createToken(user) {
    let timeToken = 60 * 60
    return jwt.sign({
            emailAdd: user.emailAdd,
            userPwd: user.userPwd
        },
        process.env.SECRET_KEY, {
            expiresIn: timeToken
        }
    )
}


function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, encoded) => {
            if (err) {
                return res.status(401).json({
                    status: 401,
                    msg: "Please provide a valid token."
                });
            } else {
                next();
            }
        });
    } else {
        return res.status(401).json({
            status: 401,
            msg: "Please provide a valid token."
        });
    }
}

export {
    createToken,
    verifyToken
}