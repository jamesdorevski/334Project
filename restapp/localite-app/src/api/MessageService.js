import axios from "axios";
const API_URL = "http://localhost:8080/messages/";

class MessageService {
  getAllConvos(id) {
    return axios.get(API_URL + `${id}`);
  }

  sendMessage(senderID, receiverID, message) {
    return axios.post(API_URL + `sendMessage/${senderID}/${receiverID}`, {
      content: message,
    });
  }
}

export default new MessageService();
