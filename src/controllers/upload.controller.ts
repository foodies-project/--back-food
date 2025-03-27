import { Request, Response } from "express";
import path from "path";

export class UploadController {
  public getFile = (req: Request, res: Response) => {
    const fileName = req.params.file;
    const filePath = path.join(__dirname, "../uploads", fileName);
    if (!filePath) {
      res.status(404).json({ message: "File not found" });
    }

    res.sendFile(filePath);
  };
}
