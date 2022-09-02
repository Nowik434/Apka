import { useEffect } from "react";

const useDownload = (url) => {

    const download = async (url) => {
      try {
        const response = await fetch(`https://cors-anywhere.herokuapp.com/http://localhost:1337/uploads/thumbnail_stolarka_f772059252.png?width=1688&height=1125`,{
            method: "GET",
            headers: {'Content-Type': 'application/json','Access-Control-Allow-Origin': "*","Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}
          });

        response.arrayBuffer().then(function (buffer) {
            const url = window.URL.createObjectURL(new Blob([buffer]));
            const link = document.createElement("a");
            link.href = url;
            link.download = "fdsfd.jpg";
            link.click();
          });
      } catch (error) {
        console.log(error);
      }
    };

    return {download};
  };

export default useDownload;




// const download = (e) => {
//     fetch(
//       "https://upload.wikimedia.org/wikipedia/en/6/6b/Hello_Web_Series_%28Wordmark%29_Logo.png",
//       {
//         method: "GET",
//         headers: {}
//       }
//     )
//       .then((response) => {
//         response.arrayBuffer().then(function (buffer) {
//           const url = window.URL.createObjectURL(new Blob([buffer]));
//           const link = document.createElement("a");
//           link.href = url;
//           link.download = "image.png";
//           link.click();
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };