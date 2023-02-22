import React, { useRef } from "react";
import "./StudentTablePage.css";
import { useReactToPrint } from "react-to-print";
import { useDownloadExcel } from "react-export-table-to-excel";
import Footer from "../../components/Footer/Footer";
import RanDomQuote from "../Random Quote/RanDomQuote";
import Head from "../../components/Header/Head";

class StudentTable extends React.PureComponent {
  render() {
    return (
      <div className="StudentTablePage">
        <div className="StudentTablePageContainer">
          <table className="printTable" ref={this.props.currentTableRef}>
            <thead>
              <tr
                data-aos="fade-right"
                data-aos-easing="ease-in-out"
                data-aos-duration="1000"
              >
                <th>#</th>
                <th>8 - 9 </th>
                <th>9 - 10</th>
                <th>10 - 11</th>
                <th>11 - 12</th>
                <th>12 - 1 </th>
                <th>1 - 2</th>
                <th>2 - 3 </th>
              </tr>
            </thead>
            <tbody>
              <tr
                data-aos="fade-right"
                data-aos-easing="ease-in-out"
                data-aos-duration="1000"
              >
                <td>Saturday</td>
                <td data-label="Time : 8 - 9 ">Cell 1</td>
                <td data-label="Time : 9 - 10 ">Cell 2</td>
                <td data-label="Time : 10 - 11  ">Cell 3</td>
                <td data-label="Time : 11 - 12 ">Cell 4</td>
                <td data-label="Time : 12 - 1  ">Cell 5</td>
                <td data-label="Time : 1 - 2  "> Cell 6</td>
                <td data-label="Time : 2 - 3  ">Cell 7</td>
              </tr>
              <tr
                data-aos="fade-right"
                data-aos-easing="ease-in-out"
                data-aos-duration="1000"
              >
                <td>Sunday</td>
                <td data-label="Time : 8 - 9 ">Cell 1</td>
                <td data-label="Time : 9 - 10 ">Cell 2</td>
                <td data-label="Time : 10 - 11  ">Cell 3</td>
                <td data-label="Time : 11 - 12 ">Cell 4</td>
                <td data-label="Time : 12 - 1  ">Cell 5</td>
                <td data-label="Time : 1 - 2  "> Cell 6</td>
                <td data-label="Time : 2 - 3  ">Cell 7</td>
              </tr>
              <tr
                data-aos="fade-right"
                data-aos-easing="ease-in-out"
                data-aos-duration="1000"
              >
                <td>Monday</td>
                <td data-label="Time : 8 - 9 ">Cell 1</td>
                <td data-label="Time : 9 - 10 ">Cell 2</td>
                <td data-label="Time : 10 - 11  ">Cell 3</td>
                <td data-label="Time : 11 - 12 ">Cell 4</td>
                <td data-label="Time : 12 - 1  ">Cell 5</td>
                <td data-label="Time : 1 - 2  "> Cell 6</td>
                <td data-label="Time : 2 - 3  ">Cell 7</td>
              </tr>
              <tr
                data-aos="fade-right"
                data-aos-easing="ease-in-out"
                data-aos-duration="1000"
              >
                <td>Tuesday</td>
                <td data-label="Time : 8 - 9 ">Cell 1</td>
                <td data-label="Time : 9 - 10 ">Cell 2</td>
                <td data-label="Time : 10 - 11  ">Cell 3</td>
                <td data-label="Time : 11 - 12 ">Cell 4</td>
                <td data-label="Time : 12 - 1  ">Cell 5</td>
                <td data-label="Time : 1 - 2  "> Cell 6</td>
                <td data-label="Time : 2 - 3  ">Cell 7</td>
              </tr>
              <tr
                data-aos="fade-right"
                data-aos-easing="ease-in-out"
                data-aos-duration="1000"
              >
                <td>Wednesday</td>
                <td data-label="Time : 8 - 9 ">Cell 1</td>
                <td data-label="Time : 9 - 10 ">Cell 2</td>
                <td data-label="Time : 10 - 11  ">Cell 3</td>
                <td data-label="Time : 11 - 12 ">Cell 4</td>
                <td data-label="Time : 12 - 1  ">Cell 5</td>
                <td data-label="Time : 1 - 2  "> Cell 6</td>
                <td data-label="Time : 2 - 3  ">Cell 7</td>
              </tr>
              <tr
                data-aos="fade-right"
                data-aos-easing="ease-in-out"
                data-aos-duration="1000"
              >
                <td>Thursday</td>
                <td data-label="Time : 8 - 9 ">Cell 1</td>
                <td data-label="Time : 9 - 10 ">Cell 2</td>
                <td data-label="Time : 10 - 11  ">Cell 3</td>
                <td data-label="Time : 11 - 12 ">Cell 4</td>
                <td data-label="Time : 12 - 1  ">Cell 5</td>
                <td data-label="Time : 1 - 2  "> Cell 6</td>
                <td data-label="Time : 2 - 3  ">Cell 7</td>
              </tr>
              <tr
                data-aos="fade-right"
                data-aos-easing="ease-in-out"
                data-aos-duration="1000"
              >
                <td>Friday</td>
                <td data-label="Time : 8 - 9 ">Cell 1</td>
                <td data-label="Time : 9 - 10 ">Cell 2</td>
                <td data-label="Time : 10 - 11  ">Cell 3</td>
                <td data-label="Time : 11 - 12 ">Cell 4</td>
                <td data-label="Time : 12 - 1  ">Cell 5</td>
                <td data-label="Time : 1 - 2  "> Cell 6</td>
                <td data-label="Time : 2 - 3  ">Cell 7</td>
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
  const tableRef = useRef(null);
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Users table",
    sheet: "Users",
  });
  return (
    <React.Fragment>
      <Head />
      <div className="toolbar">
        <div className="management">
          <h1>Student table</h1>
          <div className="control">
            <button onClick={handlePrint}>
              <i className="fa-solid fa-print"></i>
            </button>
            <button onClick={onDownload}>
              <i className="fa-solid fa-cloud-arrow-down"></i>
            </button>
          </div>
        </div>

        <StudentTable
          ref={componentRef}
          currentTableRef={tableRef}
          {...props}
        />
      </div>
      <RanDomQuote />
      <Footer />
    </React.Fragment>
  );
}

export default StudentTablePage;
