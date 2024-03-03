import express from "express";
import { conn, queryAsync } from "../dbconnect";
import mysql from "mysql";
import { VotePostResponse } from "../mode/VotepostResponse";


export const router = express.Router();


router.get("/votes", (req,res)=>{
    const sql = "select * from vote";
    conn.query(sql,(err,result)=>{
        res.json(result);
    })
}
);

router.post("/vote", (req, res) => {
    let vote: VotePostResponse = req.body;
    let sql =
          "INSERT INTO `vote`(`pt_id1`, `pt_id2`, `vote_point1`, `vote_point2`, `vote_timestamp`,`u_id`) VALUES (?,?,?,?,?,?)";
    sql = mysql.format(sql, [
        vote.pt_id1,
        vote.pt_id2,
        vote.vote_point1,
        vote.vote_point2,
        vote.vote_timestamp,
        vote.u_id

        ]);
    conn.query(sql, (err, result) => {
      if (err) throw err;
      res
        .status(201)
        .json({ affected_row: result.affectedRows, last_idx: result.insertId });
    });
  });
