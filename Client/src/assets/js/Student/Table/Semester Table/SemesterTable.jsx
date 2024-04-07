import React, { useEffect, useRef } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { GetStudentSemestersSubjects } from "../../../../Toolkit/Slices/SemestersSlice";
import LodingFeachData from "../../../components/Loding Feach Data/LodingFeachData";
import "./SemesterTable.css";

function SemesterTable() {
  const params = useParams();
  const tableRef = useRef(null);
  const Dispatch = useDispatch();

  const { Subjects, loading } = useSelector((state) => state.Semester);

  useEffect(() => {
    Dispatch(GetStudentSemestersSubjects({ Semester_id: params.Semester_id }));
    //eslint-disable-next-line
  }, []);

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
    documentTitle: `${Subjects[0]?.Semester} table`,
  });

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: `${Subjects[0]?.Semester} table`,
    sheet: "Table",
  });

  return (
    <div className="SemesterTablePage">
      {loading ? (
        <LodingFeachData />
      ) : (
        <div className="container" data-aos="fade-down">
          <h1>{Subjects[0]?.Semester}</h1>
          <div className="button-control">
            <button onClick={handlePrint}>
              <i className="fa-solid fa-print"></i>
              print
            </button>
            <button onClick={onDownload}>
              <i className="fa-solid fa-cloud-arrow-down"></i>
              download
            </button>
          </div>
          <table className="printStudentTable" ref={tableRef}>
            <thead>
              <tr>
                <th>#</th>
                <th colSpan={2}>Subject Name </th>
                <th>Time</th>
                <th>Day</th>
                <th>Credit Hours</th>
              </tr>
            </thead>
            <tbody>
              {Subjects.map((subject, index) => (
                <tr>
                  <td>
                    <label htmlFor={subject._id} key={subject._id}></label>
                    {index + 1}
                  </td>
                  <td data-label="Subject Name" colSpan={2}>
                    {subject.name}
                  </td>
                  <td data-label="Time">{subject.time}</td>
                  <td data-label="Day">{subject.day}</td>
                  <td data-label="Credit Hours">{subject.credit_hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SemesterTable;
