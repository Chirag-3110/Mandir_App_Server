import express from "express";
import userModal from "../Modals/Auth.modal";

const searchRoute = express.Router();

searchRoute.get('/search-user', async (req, res) => {
    let request = req.query;
    let usersFound = await userModal.find(request);
    if (usersFound) {
        res.send({
            status: 200,
            message: `${usersFound.length} users found`,
            data: usersFound
        })
    } else {
        res.send({
            status: 400,
            message: `No users found`,
            data: []
        })
    }

})

export default searchRoute;