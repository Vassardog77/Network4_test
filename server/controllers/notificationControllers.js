import Notification from "../models/notifications.js"
import User from '../models/userModel.js'
import { Expo } from 'expo-server-sdk';

// Create a new Expo SDK client
let expo = new Expo();

export const postNotification = async (req, res) => {
  try {
    const { type, recipient, sender, content } = req.body;

    // Create an array to hold push notifications
    let messages = [];

    // For each recipient in the array, update or create a notification
    for (let email of recipient) {
      await Notification.findOneAndUpdate(
        { user: email },
        { $push: { unreads: { type, email, sender, content } } },
        { new: true, upsert: true }
      );

      // Fetch the user's push token
      const user = await User.findOne({ email: email });

      if (!Expo.isExpoPushToken(user.expoPushToken)) {
        console.log("token"+user.expoPushToken+ "not working")
        console.error(`Push token ${user.expoPushToken} is not a valid Expo push token for user ${email}`);
        continue;
      }
      console.log("token"+user.expoPushToken+ "IS working")
      messages.push({
        to: user.expoPushToken,
        sound: 'default',
        body: `You have a new ${type} from ${sender}`,
        data: { content }
      });
    }

    // Send messages in chunks
    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];

    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error(error);
      }
    }

    res.status(200).send({ message: "Notifications sent successfully." });
  } catch (error) {
    res.status(500).send({ message: "Error sending notifications." });
    console.log(error);
  }
};


export const getNotification = async (req, res) => { 
    const email = req.body.user;
    try {
        const userNotification = await Notification.findOne({ user: email });
        if (userNotification) {
            res.status(200).json(userNotification.unreads);
        } else {
            res.status(404).json({ message: "No notifications found for this user." });
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving notifications." });
        console.error(error);
    }
}

export const deleteNotification = async (req, res) => {
    try {
      const { user, unreads } = req.body;
  
      await Notification.updateOne(
        { user },
        { $pull: { unreads } }
      );
  
      res.status(200).json({ message: "Notifications deleted successfully." });
    } catch (error) {
      res.status(500).json({ message: "Error deleting notifications." });
      console.error(error);
    }
  };

  export const updatePushToken = async (req, res) => {
    try {
        const { email, token } = req.body;
        console.log('email: '+{email})
        console.log('token: '+{token})
        // Find the user by email and update the expoPushToken field
        const user = await User.findOneAndUpdate({email}, { expoPushToken: token }, { new: true });
        //console.log('user: '+user)

        if (user) {
            res.status(200).send({ message: 'Push token updated successfully.' });
        } else {
            res.status(404).send({ message: 'User not found.' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error updating push token.' });
        console.log(error);
    }
};


/*export const oldpostNotification = async (req, res) => {
  try {
    const { type, recipient, sender, content } = req.body;

    // For each recipient in the array, update or create a notification
    recipient.forEach(async email => {
      await Notification.findOneAndUpdate(
        { user: email },
        { $push: { unreads: { type, email, sender, content } } },
        { new: true, upsert: true }
      );
    });

    res.status(200).send({ message: "Notifications sent successfully." });
  } catch (error) {
    res.status(500).send({ message: "Error sending notifications." });
    console.log(error);
  }
};*/