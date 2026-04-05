// import models from "../modelData/models";

// /**
//  * fetchModel - Fetch a model from the web server.
//  *
//  * @param {string} url      The URL to issue the GET request.
//  *
//  */
// async function fetchModel(url) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       try {
//         if (url === "/user/list") {
//           resolve(models.userListModel());
//         } else if (url.startsWith("/user/")) {
//           const id = url.split("/")[2];
//           resolve(models.userModel(id));
//         } else if (url.startsWith("/photosOfUser/")) {
//           const id = url.split("/")[2];
//           resolve(models.photoOfUserModel(id));
//         } else if (url === "/test/info") {
//           resolve(models.schemaInfo());
//         } else {
//           reject(new Error("Not Found"));
//         }
//       } catch (err) {
//         reject(err);
//       }
//     }, 100);
//   });
// }

// export default fetchModel;

import models from "../modelData/models";

/**
 
 *
 * @param {string} url      
 *
 */
async function fetchModel(url) {
  try {
    const backendUrl = "https://9spk72-8080.csb.app" + url;

    const response = await fetch(backendUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.error("Fetch Error:", err);
    throw err;
  }
}

export default fetchModel;
