import axios from "axios";
import Swal from "sweetalert2";

// HANDLE Delete api
export const HandleDelete = (api, target) => {
  Swal.fire({
    title: "Are you sure?",
    text: `You won't Delete this Student ? `,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: `<i class="fa-solid fa-check"></i>`,
    cancelButtonText: `<i class="fa-solid fa-xmark"></i>`,
  }).then((result) => {
    if (result.isConfirmed) {
      axios.delete(`${api}/${target}`);
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    }
  });
};
