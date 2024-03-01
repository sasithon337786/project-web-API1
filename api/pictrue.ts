import express from "express";
import { conn, queryAsync } from "../dbconnect";



export const router = express.Router();


router.get("/pictrue", (req,res)=>{
        const sql = "select * from pictrue";
        conn.query(sql,(err,result)=>{
            res.json(result);
        })
    }
);