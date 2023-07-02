import { ObjectId } from "bson";
import { dbClient } from "../db.js";



export function getAllMentor(req) {
    return dbClient
        .db("zenclass")
        .collection("mentor")
        .find(req)
        .toArray()
}

export function postCreateMentor(newMentor) {
    return dbClient
        .db("zenclass")
        .collection("mentor")
        .insertOne(newMentor)
}

export function putEditMentor(id, data) {
    return dbClient
        .db("zenclass")
        .collection("mentor")
        .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: data })
}

export function unassignedMentor(data) {
    return dbClient
        .db("zenclass")
        .collection("student")
        .find({ $or: [{ mentor: data[0] }, { mentor: data[1] }, { mentor: data[2] }] })
        .toArray()
}








