import express from "express";
import { dataUpdate, findMentor, findOld, getAllStudent, postCreateStudent, previousOne, previousUpdate, putEditStudent } from "../Controllers/student.js";
import { unassignedMentor } from "../Controllers/mentor.js";
const router = express.Router();


//2. api for create new student
router.post('/add', async (req, res) => {
    try {
        const newStudent = req.body;
        console.log(newStudent);
        if (Object.keys(newStudent).length === 0) {
            return res.status(400).json({ message: "please provide input to add" })
        }
        const response = await postCreateStudent(newStudent)
        if (!response.acknowledged) {
            return res.status(400).json({ message: "error in posting input" })
        }
        res.status(200).json({ "created successfull": newStudent, status: response })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "error in internal server" })
    }
})

//3.2 api for find students whos don't have mentor
router.get("/find/nomentor", async (req, res) => {
    try {
        const data = [""," ","  "]
        const response = await unassignedMentor(data)
        console.log(response);
        if (!response) {
            return res.status(400).json({ message: "Error in posting input" })
        }
        res.status(200).json({ "below students mentors not assigned yet": response})
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "error found in internal server" })
    }
})


// 4. api change mentor for a student using mongoDB object id and reqbody
router.put("/:studentid", async (req, res) => {
    try {
        const { studentid } = req.params;
        const update = req.body;
        console.log(studentid);
        if (!studentid && !update) {
            return res.status(400).json({ message: "Incorrect input" })
        }
        const perviousMentorSave = await findOld(studentid);
        console.log(perviousMentorSave);
        const response = await putEditStudent(studentid, update)
        console.log(response);
        if (!response) {
            return res.status(400).json({ message: "Error in posting input" })
        }
        if (!perviousMentorSave) {
            return res.status(400).json({ message: "Error in find data" })
        }
        const datafind = await previousOne(studentid)
        console.log(datafind)
        if (datafind) {
            const response = await previousUpdate(studentid, perviousMentorSave)
            console.log("previous data successfully updated", response)
        } else {
            const dataSend = await dataUpdate(perviousMentorSave);
            if (!dataSend) {
                return res.status(400).json({ message: "Error in update data on previousdata collection" })
            }
        }
        res.status(200).json({ "data added successfully": update, status: response })

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "error found in internal server" })
    }
})

//5. finding all students under a perticular mentor with mentor name
router.get('/mentor/:mentor', async (req, res) => {
    try {
        const { mentor } = req.params
        console.log(mentor);
        const student = await findMentor(mentor)
        console.log('student', student)
        if (student.length === 0) {
            res.status(400).json({ message: "no input available" })
        }
        res.status(200).send(student)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "error found in input or internal server" })
    }
})


//6. api for find previously assigned mentor for a particular student with student id
router.get('/previous/:id', async (req, res) => {
    try {
        const { id } = req.params
        console.log("id", id)
        const student = await previousOne(id);
        console.log(student)
        if (student === null) {
            res.status(400).json({ message: "no input available" })
        }
        res.status(200).json({ "previous data of a student": student })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "error found in input or internal server" })
    }
})

// student list
router.get("/all", async (req, res) => {
    try {
        console.log(req.query);
        const student = await getAllStudent(req)
        if (student.length === 0) {
            return res.status(400).json({ message: "No data available" })
        }
        res.status(200).json({ data: student })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "error found in input or internal server" })
    }
})


export const studentRouter = router;