import axios from "axios"

export const postWebhooks = async (req, res) => { // webhook endpoints
    console.log(req)
    // parse the query parameters from the request
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    // Check the mode and token sent is correct
    if (mode === "subscribe" && token === "teststring") { // replace "teststring" with your verify token
        console.log("WEBHOOK_VERIFIED");
        // Respond with the challenge token from the request
        res.status(200).send(challenge);
    } else {
        // Respond with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403);
    }
};
