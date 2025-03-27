import { Request, Response } from "express";
import path from "path";
import fs from "fs";

export class UploadController {
  public getFile = (req: Request, res: Response) => {
    const fileName = req.params.file;
    const filePath = path.join(__dirname, "../../uploads", fileName);
    // res.sendFile(filePath);
    res.json({ message: "helo" });
  };
}
