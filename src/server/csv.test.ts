import { Readable } from 'stream';
import {isCsvValid, saveCsv, validateRow} from './csv';
import {getDatabaseConnection} from './db';

jest.mock('./db');

test('Validate CSV', async () => {
    expect(await isCsvValid({
        fieldname: 'files',
        originalname: 'test2.csv',
        encoding: '7bit',
        mimetype: 'text/csv',
        destination: '/tmp/',
        filename: '13fb66evmlfmvf963f12bb5f2a3af15839a1df1',
        path: '/tmp/13fvnfkvkb66e963f12bb5f2a3af15839a1df1',
        size: 47,
        stream: new Readable,
        buffer: Buffer.from('nmvdnmvf', "utf-8")
    }
        )).toBe({isValid: false, rows: []});
});

test('Validate Rows - No firstName', async () => {
    expect(validateRow(['', 'lastName', 0])).toBe(false);
});

test('Validate Rows - No lastName', async () => {
    expect(validateRow(['firstName', '', 0])).toBe(false);
});

test('Validate Rows - No id', async () => {
    expect(validateRow(['firstName', 'lastName'])).toBe(false);
});

test('Validate Rows - Valid data', async () => {
    expect(validateRow(['firstName', 'lastName', 1])).toBe(true);
});

test('SaveCSV - Valid data', async () => {

    // @ts-ignore
    getDatabaseConnection.mockReturnValue({
        connect: jest.fn(),
        query: jest.fn(),
        end: jest.fn(),
      });

        await saveCsv({
            fieldname: 'files',
            originalname: 'test2.csv',
            encoding: '7bit',
            mimetype: 'text/csv',
            destination: '/tmp/',
            filename: '13fb66evmlfmvf963f12bb5f2a3af15839a1df1',
            path: '/tmp/13fvnfkvkb66e963f12bb5f2a3af15839a1df1',
            size: 47,
            stream: new Readable,
            buffer: Buffer.from('nmvdnmvf', "utf-8")
        },
        ['firstName', 'lastName', 1]
        );
        expect(getDatabaseConnection).toHaveBeenCalled();
    });

