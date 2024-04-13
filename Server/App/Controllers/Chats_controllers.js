// import schema from Instructor modle
import Chats_Model from "../Model/Chats_Model.js";
import Codes from "../utils/Codes.js";
import mongoose from "mongoose";

// get all chats from back end
const Get_All_Messages = async (Req, Res) => {
  const { Subject_Id } = Req.body;
  try {
    const Messages = await Chats_Model.aggregate([
      { $sort: { createdAt: 1 } },
      {
        $match: { Subject_Id: new mongoose.Types.ObjectId(Subject_Id) },
      },
    ]);

    return Res.json({
      Status: Codes.SUCCESS,
      Status_Code: Codes.SUCCESS_CODE,
      Data: Messages,
    });
  } catch (err) {
    // Error in serching handelar
    return Res.json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Sorry Something went wrong please try again later !",
    });
  }
};

// Add new Message
const Add_Message = async (Req, Res) => {
  const { Subject_Id, Message, User_Avatar, User_Id, User_Name } = Req.body;

  try {
    const NewMessage = new Chats_Model({
      Subject_Id,
      Message,
      User_Avatar,
      User_Id,
      User_Name,
    });
    await NewMessage.save();

    return Res.json({
      Status: Codes.SUCCESS,
      Status_Code: Codes.SUCCESS_CODE,
      message: "Message inserted",
    });
  } catch (err) {
    // Error in serching handelar
    return Res.json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Sorry Something went wrong please try again later !",
    });
  }
};

export default {
  Get_All_Messages,
  Add_Message,
};
