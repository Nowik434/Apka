



// import { Routes, Route, Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { createBrowserHistory } from "history";
// import { useSelector } from "react-redux";

import { Modal } from "@mui/material";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";


// export default function LeaveAlert() {
//     const isEdited = useSelector((state) => state.resume.isEdited);
//     const history = createBrowserHistory();
//   const [block, setBlock] = useState(false);


//   useEffect(() => {
//       let unblock;
//     console.log('isBlock', block)
//     if(isEdited){
//         setBlock(true)
//     } else (
//         setBlock(false)
//     )
//     if (block) {
//         console.log('jesli block true')
//       unblock = history.block((tx) => {
//         if (window.confirm(`Czy napewno chcesz wyjść bez zapisania?`)) {
//           unblock();
//           tx.retry();
//         }
//       });
//     }

//     return () => {
//         console.log('unmounted Leave Alert', unblock)
//         if (typeof unblock === "function") {
//             console.log('unblocked')
//         unblock();
//       }
//     };
//   }, [block, isEdited]);

// };



export default function LeaveAlert() {
const location = useLocation();
    const [showModal, setShowModal] = useState(false);

    const initialPage = useRef(location.pathname);

    useEffect(() => {
      console.log('floccc', location)
      console.log('fffffffffffff', showModal)
      console.log('ddddd', initialPage.current, location.pathname)
      if (location.pathname !== initialPage.current) {
            setShowModal(true);
        }
    }, [location]);


    return (
      <Modal
  open={showModal}
  onClose={console.log('handleClose')}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>

        <p>dsadsadasdsa</p>
      </Modal>
    )
  }