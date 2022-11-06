import user from "../img/user.png";
function StudentBox(props) {
  return (
    <div className="StudentBox p-20 p-sticky">
      <img src={user} alt="user avatar" className="img-medium  mb-20" />
      <table>
        <tr>
          <h3 className="align-center display-flex  gap-20">
            First name : <p>Ahmed </p>
          </h3>
        </tr>
        <tr>
          <h3 className="align-center display-flex  gap-20">
            Last name : <p>Doban</p>
          </h3>
        </tr>
        <tr>
          <h3 className="align-center display-flex gap-20">
            class : <p>3 </p>
          </h3>
        </tr>
        <tr>
          <h3 className="align-center display-flex  gap-20">
            n.of.courses : <p>25</p>
          </h3>
        </tr>
      </table>
    </div>
  );
}

export default StudentBox;
