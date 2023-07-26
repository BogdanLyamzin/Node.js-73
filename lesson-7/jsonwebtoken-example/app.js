import jwt from "jsonwebtoken";
import "dotenv/config";

const {JWT_SECRET} = process.env;

const payload = {
    id: "64c1550f77e3d0b4e9b53975",
};

const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "23h"});
// console.log(token);
const decodeToken = jwt.decode(token);
// console.log(decodeToken);

try {
    const {id} = jwt.verify(token, JWT_SECRET);
    // console.log(id);
    const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YzE1NTBmNzdlM2QwYjRlOWI1Mzk3NSIsImlhdCI6MTY5MDM5MzIxNiwiZXhwIjoxNjkwNDc2MDE2fQ.9KTdnbn-hLD2GZdJ4V_lFl0TlRV32lcJhF2wkMTrsTO";
    jwt.verify(invalidToken, JWT_SECRET);
}
catch(error) {
    console.log(error.message);
}