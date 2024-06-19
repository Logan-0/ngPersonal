import express, { NextFunction, Request, Response } from "express";
import { fileURLToPath } from 'url';
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'
import getApiCreds from "./ts/apiUtil.js";
import mail from "./ts/mail.js"
dotenv.config();

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
    const server = express();

    const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
    const __dirname = path.dirname(__filename); // get the name of the directory

    const corsOptions = {
        origin: '*',
        credentials: true,            //access-control-allow-credentials:true
        optionSuccessStatus: 200,
    }

    server.use(express.static(path.resolve(__dirname, '../client/build')));
    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());
    server.use(cors<Request>(corsOptions));

    // All regular routes use the Angular engine
    server.use('*', (req: Request, res: Response, next: NextFunction) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    }, cors({ maxAge: 31536000 }));
    
    let keys:any;

    try {
        keys = getApiCreds();
    } catch ( e ) {
        console.log("Api Functionality Limited")
    }

    // Enable Http - s for secure site redirection
    // if (keys?.PRODUCTION === 'PRODUCTION') {
    //     server.use((req, res, next) => {
    //         if (req.header('x-forwarded-proto') !== 'https') {
    //             res.redirect(`https://${req.header('host')}${req.url}`)
    //         } else {
    //             next()
    //         }
    //     })
    // } else {
    //     console.log("Production Values Incorrectly Set");
    // }


    // Sending an email for contact 
    server.post('/email', async (req: Request, res: Response) => {

        // Prep User Response of whether or not the request from the post call was successful.
        let sendBackData: any = {data: false}

        // Collect information from user submitted form data
        // Who sent from website, firstName, lastName, messageBody
        let sender = req.body.sender;
        let fname = req.body.firstName;
        let lname = req.body.lastName;
        let text = req.body.message;

        try {
            // Api call returns true or false, value changes if successful, just returns if not.
            sendBackData.data = await mail(sender, fname, lname, text, keys?.MAIL_API_KEY)
            if (sendBackData.data) {
                // Return to the user the status of the message if successful
                return res.status(200).send(sendBackData);
            } else {
                // Log Error if false
                return res.status(500);
            }
        } catch (error) {
            // Log Error
            console.log("Error Sending E-Mail: ", error)
            return res.status(503);
        }
    });

    server.get('*', (req: Request, res: Response) => {
        res.sendFile(path.resolve(__dirname, '../../../client/dist/ng-site/browser', 'index.html')); // load the single view file (angular will handle the page changes on the front-end)
    });

    return server;
}

function run(): void {
    const port = process.env['PORT'] || 8080;

    // Start up the Node server
    const server = app();
    server.listen(port, () => {
        console.log(`Node Express server listening on http://localhost:${port}`);
    });
}

run();