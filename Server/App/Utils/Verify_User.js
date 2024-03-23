import Codes from "./Codes.js";

const Verify_User = (...Roles) => {
  return (Req, Res, Next) => {
    if (Roles.includes(Req.Verifyed_User.Role)) {
      Next();
    } else {
      return Res.json({
        Status: Codes.FAILD,
        Status_Code: Codes.SUCCESS_CODE,
        message: "Unauthorized ! You Can't access this Route. ",
      });
    }
  };
};
export default Verify_User;
