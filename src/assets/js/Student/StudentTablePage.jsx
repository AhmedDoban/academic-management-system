import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Footer from "./../components/Footer";
class StudentTable extends React.PureComponent {
  render() {
    return (
      <div className="StudentTablePage">
        <h1>Student Table </h1>
        <div className="StudentTablePageContainer">
          <table className="printTable">
            <thead>
              <tr
                data-aos="fade-right"
                data-aos-easing="ease-in-out"
                data-aos-duration="1000"
              >
                <th>sat</th>
                <th>Sun</th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
              </tr>
            </thead>
            <tbody>
              <tr
                data-aos="fade-right"
                data-aos-easing="ease-in-out"
                data-aos-duration="1500"
              >
                <td>Cell 1</td>
                <td>Cell 2</td>
                <td>Cell 3</td>
                <td>Cell 4</td>
                <td>Cell 5</td>
                <td>Cell 6</td>
                <td>Cell 7</td>
              </tr>
              <tr
                data-aos="fade-right"
                data-aos-easing="ease-in-out"
                data-aos-duration="2000"
              >
                <td>Cell 1</td>
                <td>Cell 2</td>
                <td>Cell 3</td>
                <td>Cell 4</td>
                <td>Cell 5</td>
                <td>Cell 6</td>
                <td>Cell 7</td>
              </tr>
              <tr
                data-aos="fade-right"
                data-aos-easing="ease-in-out"
                data-aos-duration="2500"
              >
                <td>Cell 1</td>
                <td>Cell 2</td>
                <td>Cell 3</td>
                <td>Cell 4</td>
                <td>Cell 5</td>
                <td>Cell 6</td>
                <td>Cell 7</td>
              </tr>
              <tr
                data-aos="fade-right"
                data-aos-easing="ease-in-out"
                data-aos-duration="3000"
              >
                <td>Cell 1</td>
                <td>Cell 2</td>
                <td>Cell 3</td>
                <td>Cell 4</td>
                <td>Cell 5</td>
                <td>Cell 6</td>
                <td>Cell 7</td>
              </tr>
              <tr
                data-aos="fade-right"
                data-aos-easing="ease-in-out"
                data-aos-duration="3000"
              >
                <td>Cell 1</td>
                <td>Cell 2</td>
                <td>Cell 3</td>
                <td>Cell 4</td>
                <td>Cell 5</td>
                <td>Cell 6</td>
                <td>Cell 7</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

function StudentTablePage(props) {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="toolbar">
      <button onClick={handlePrint}>
        <i class="fa-solid fa-print"></i>
      </button>
      <StudentTable ref={componentRef} />
      <Footer />
    </div>
  );
}

export default StudentTablePage;
