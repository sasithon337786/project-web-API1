import express from "express";
import { conn, queryAsync } from "../dbconnect";

export const router = express.Router();


router.get("/user", (req,res)=>{
        const sql = "select * from users";
        conn.query(sql,(err,result)=>{
            res.json(result);
        })
    }
);