const {faker} = require("@faker-js/faker");
const userModel = require("../models/userModel");
const messageModel = require("../models/messageModel");
const conversationModel = require("../models/conversationModel");
// const faker = require("faker");

const createUser = async (numUsers) => {
  try {
    const userPromise = [];

    for (let i = 0; i < numUsers; i++) {
      const user = new userModel({
        name: faker.person.firstName(),
        username: faker.internet.userName(),
        bio: faker.lorem.sentence(10),
        password: "123456",
        avatar: {
          public_id: faker.string.uuid(),
          url: faker.image.avatar(),
        },
      });
      userPromise.push(user.save());
    }
    await Promise.all(userPromise);
    console.log("Users Created Successfully", 10);
    process.exit(1);
  } catch (error){
    console.log(error);
    process.exit(1);
  }
};

const createSampleConversation = async (numChats) => {
  try {
    const users = await userModel.find().select("_id");

    const chatsPromise = [];

    for (let i = 0; i < users.length; i++) {
      for (let j = i + 1; j < users.length; j++) {
        const chat = new conversationModel({
          members: [users[i], users[j]],
          name: faker.person.firstName(),
        });
        chatsPromise.push(chat.save());
      }
    }
    await Promise.all(chatsPromise);
    console.log("conversation Created Successfully", 10);
    process.exit(1);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const createSampleMessages = async (userId, numMessages) => {
  try {
    const users = await userModel.find().select("_id");
    const conversation = await conversationModel.find().select("_id");
    const messagesPromise = [];

    for (let i = 0; i < numMessages; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomConversation =
        conversation[Math.floor(Math.random() * conversation.length)];

      const message = new messageModel({
        conversationId: randomConversation,
        senderId: randomUser,
        message: faker.lorem.sentence(10),
      });
      messagesPromise.push(message.save());
    }
    await Promise.all(messagesPromise);
    console.log("Messages Created Successfully", 10);
    process.exit(1);
  } catch (error) {
    console.log(error);
  }
};
module.exports = { createUser, createSampleConversation, createSampleMessages };
