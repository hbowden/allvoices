import * as fs from 'fs';
import * as csv from 'fast-csv'
import { getDatabaseConnection } from './db';

export async function isCsvValid(file: Express.Multer.File): Promise<{isValid: boolean, rows: []}> {
    return new Promise(function(resolve,reject){ 
        const rows: any = [];
        fs.createReadStream(file.path)
        .pipe(csv.parse())
        .on('error', error => { console.log("Error: ", error); return resolve({isValid: false, rows: []}); })
        .on('data', row => { if(validateRow(row) === false ) {
            resolve({isValid: false, rows: []});
         } else {
           rows.push({firstName: row[0], lastName: row[1], rowId: row[2]});
         }})
        .on('end', () => { resolve({isValid: true, rows}); })
    });
}

export function validateRow(row: any) {
    const firstName = row[0];
    const lastName = row[1];
    const id = row[2];
    if(firstName.length === 0 || lastName.length === 0 || typeof id === 'undefined' || typeof Number(id) !== 'number') {
        return false;
    } else {
        return true;
    }
}

export async function saveCsv(file: Express.Multer.File, rows: any[]) {

    const conn = await getDatabaseConnection();

    try {
        await conn.query('BEGIN')
        const queryText = 'INSERT INTO Files(file_name) VALUES($1) RETURNING file_id';
        const res = await conn.query(queryText, [file.originalname]);

        for(let i = 0; i < rows.length; i++) {
            const insertText = 'INSERT INTO CSVRows(first_name, last_name, row_id, file_id) VALUES ($1, $2, $3, $4)'
            const insertTextValues = [rows[0].firstName, rows[0].lastName, rows[0].rowId, res.rows[0].file_id]
    
            await conn.query(insertText, insertTextValues);
        }

        await conn.query('COMMIT');

       fs.unlink(file.path, () => {
        return;
       })

      } catch (e) {
        await conn.query('ROLLBACK');
        throw e
      } 
    
}