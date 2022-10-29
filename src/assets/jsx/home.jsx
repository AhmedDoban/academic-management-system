import React from "react";
import { useLocation } from "react-router-dom";

// const Home = (props) => {
//   const Location = useLocation();
//   React.useEffect(() => {
//     console.log(Location.state);
//   }, [Location]);

//   return (
//     <React.Fragment>
//       <div className="home">hi </div>
//     </React.Fragment>
//   );
// };

// export default Home;

class Home extends React.Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="home">hi </div>
      </React.Fragment>
    );
  }
}

export default Home;
