import Notification from "../models/notifications.js"

export const postNotification = async (req, res) => {
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