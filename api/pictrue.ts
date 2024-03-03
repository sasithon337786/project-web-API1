import express from "express";
import { conn, queryAsync } from "../dbconnect";
import mysql from "mysql";
import { PictruepostResponse } from "../mode/PictruepostResponse";


export const router = express.Router();


router.get("/all", (req,res)=>{
  const sql = "SELECT * FROM pictrue ORDER BY RAND() LIMIT 2";
        conn.query(sql,(err,result)=>{
            res.json(result);
        })
    }
);

router.put("/:id", async (req, res) => { 
    let id = +req.params.id;
    let pictrue: PictruepostResponse = req.body;
    let pictrueOriginal: PictruepostResponse | undefined;
  
    let sql = mysql.format("select * from pictrue where pictrue_id = ?", [id]);
  
    let result = await queryAsync(sql);
    const rawData = JSON.parse(JSON.stringify(result));
    console.log(rawData);
    pictrueOriginal = rawData[0] as PictruepostResponse;
    console.log(pictrueOriginal);
  
    let updatepictrue = {...pictrueOriginal, ...pictrue};
    console.log(pictrue);
    console.log(updatepictrue);
      sql =
        "update  `pictrue` set `pictrue_p`=? where `pictrue_id`=?";
      sql = mysql.format(sql, [
        pictrue.pictrue_p,
        id,
      ]);
      conn.query(sql, (err, result) => {
        if (err) throw err;
        res.status(201).json({ affected_row: result.affectedRows });
      });
  });