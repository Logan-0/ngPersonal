import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import getApiCreds from "./ts/apiUtil.js";
import mail from "./ts/mail.js";
// The Express app is exported so that it can be used by serverless Functions.
export function app() {
    const server = express();
    const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
    const __dirname = path.dirname(__filename); // get the name of the directory
    const corsOptions = {
        origin: '*',
        credentials: true, //access-control-allow-credentials:true
        optionSuccessStatus: 200,
    };
    server.use(express.static(path.resolve(__dirname, '../client/build')));
    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());
    server.use(cors(corsOptions));
    // All regular routes use the Angular engine
    server.use('*', (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    }, cors({ maxAge: 31536000 }));
    let keys;
    try {
        keys = getApiCreds();
    }
    catch (e) {
        console.log("Api Functionality Limited");
    }
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
    server.post('/email', async (req, res) => {
        // Prep User Response
        let sendBackData = {
            data: false
        };
        // Collect information from user submitted form data
        // Who sent from website, firstName, lastName, messageBody
        let sender = req.body.sender;
        let fname = req.body.firstName;
        let lname = req.body.lastName;
        let text = req.body.message;
        // Check Sender Information
        // console.log("Sender Email: " + sender)
        // console.log("FirstName: " + fname)
        // console.log("LastName: " + lname)
        // console.log("Text: " + text)
        try {
            //(senderAddr, receiveAddr, receivePass, firstName, lastName, message)
            sendBackData.data = await mail(sender, fname, lname, text, keys?.MAIL_API_KEY);
            if (sendBackData.data) {
                // Return to the user the status of the message
                return res.status(200).send(sendBackData);
            }
            else {
                // Log Error
                return res.status(500);
            }
        }
        catch (error) {
            // Log Error
            console.log("Error Sending E-Mail: ", error);
            return res.status(503);
        }
    });
    server.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../../../client/dist/ng-site/browser', 'index.html')); // load the single view file (angular will handle the page changes on the front-end)
    });
    return server;
}
function run() {
    const port = process.env['PORT'] || 8080;
    // Start up the Node server
    const server = app();
    server.listen(port, () => {
        console.log(`Node Express server listening on http://localhost:${port}`);
    });
}
run();
//# sourceMappingURL=server.js.map