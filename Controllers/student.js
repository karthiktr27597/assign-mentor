import { ObjectId } from "bson";
import { dbClient } from "../db.js";

export function getAllStudent(req) {
    return dbClient
        .db("zenclass")
        .collection("student")
        .find(req.query)
        .toArray()
}

export function postCreateStudent(newStudent) {
    return dbClient
        .db('zenclass')
        .collection("student")
        .insertOne(newStudent)
}

export function putEditStudent(id, data){
    return dbClient
    .db('zenclass')
    .collection("student")
    .findOneAndUpdate({_id: new ObjectId(id)}, {$set:data})
}

export function findOld(id){
    return dbClient
    .db('zenclass')
    .collection("student")
    .findOne({_id: new ObjectId(id)})
}

export function dataUpdate(data){
    return dbClient
    .db('zenclass')
    .collection("previousdata")
    .insertOne(data)
}

export function previousOne(id){
    return dbClient
    .db('zenclass')
    .collection("previousdata")
    .findOne({_id: new ObjectId(id)})
}

export function previousUpdate(id, data){
    return dbClient
    .db('zenclass')
    .collection("previousdata")
    .findOneAndUpdate({_id: new ObjectId(id)}, {$set:data})
}

export function findMentor(data){
    return dbClient
    .db('zenclass')
    .collection('student')
    .find({ mentor: data})
    .toArray()
}

