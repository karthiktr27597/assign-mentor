import express from "express"
import { getAllMentor, postCreateMentor, putEditMentor } from "../Controllers/mentor.js";

//Intializing the routes
const router = express.Router();


//1. api for create mentor /mentor/add
router.post("/add", async (req, res) => {
    try {
        const newMentor = req.body;
        if (Object.keys(newMentor).length === 0) {
            return res.status(400).json({ message: "Please provide input on json body" })
        }
        const response = await postCreateMentor(newMentor)
        if (!response.acknowledged) {
            return res.status(400).json({ message: "Error in posting input" })
        }
        res.status(200).json({ "created successfull": newMentor, status: response })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "error found in internal server" })
    }
})

//3.1 api for assign students to mentor
router.get("/nomentor", async (req, res) => {
    try {
        // const { mentorid } = req.params;
        const update = req.body;
        // console.log(mentorid);
        // console.log('update', update)
        if (!mentorid || Object.keys(update).length === 0) {
            return res.status(400).json({ message: "Incorrect input" })
        }
        const response = await putEditMentor(mentorid, update)
        if (!response.lastErrorObject.updatedExisting) {
            return res.status(400).json({ message: "Error in posting input" })
        }
        res.status(200).json({ "Updated Successfully": update, status: response.value })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "error found in internal server" })
    }
})



// mentor list
router.get("/all", async (req, res) => {
    try {
        console.log(req.query);
        const mentor = await getAllMentor(req.query)
        if (mentor.length === 0) {
            return res.status(400).json({ message: "No data available" })
        }
        res.status(200).json({ data: mentor })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "error found in input or internal server" })
    }
})

export const mentorRouter = router;