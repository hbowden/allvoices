import express, {Request, Response} from 'express';
import multer from 'multer';
import { getDatabaseConnection } from './db';
import {isCsvValid, saveCsv} from './csv';

export function getUploader() {
    const storage = multer.diskStorage({
        destination: "/tmp/",
    });
    
    const upload = multer({storage}).array('files', 12);

    return upload;
}

export async function createServer() {
    const app = express();

    await getDatabaseConnection();

    app.post('/v1/upload', (req: Request, res: Response) => {
        upload(req, res, async function(err) {
            if(err) {
                res.status(500);
                res.send({error: "Error uploading CSV"});
                res.end();
                return;
            }
            const files = req.files as Express.Multer.File[];
            
            for(let i = 0; i < files.length; i++) {
                const f = files[i];

                const {isValid, rows} = await isCsvValid(f);
                if(isValid === true) {
                    await saveCsv(f, rows);
                } else {
                    res.status(400);
                    res.send({error: "Invalid format"});
                    res.end();
                    return;
                }
            }
            
            res.json({"success": "File is uploaded"});
            res.end();
        });
    });

    return app;
}

const upload = getUploader();



