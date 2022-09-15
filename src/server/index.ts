import {createServer} from './server';

const port = '9990';

createServer().then((server) => {
    server.listen(port, () => {
        // tslint:disable-next-line:no-console
        console.log( `server started at http://localhost:${port}`);
    });

}).catch((error) => {
    throw new Error(`Server failed to start: ${error.message}`);
});

