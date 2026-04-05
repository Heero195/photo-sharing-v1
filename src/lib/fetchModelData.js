import models from "../modelData/models";

/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */
async function fetchModel(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (url === "/user/list") {
          resolve(models.userListModel());
        } else if (url.startsWith("/user/")) {
          const id = url.split("/")[2];
          resolve(models.userModel(id));
        } else if (url.startsWith("/photosOfUser/")) {
          const id = url.split("/")[2];
          resolve(models.photoOfUserModel(id));
        } else if (url === "/test/info") {
          resolve(models.schemaInfo());
        } else {
          reject(new Error("Not Found"));
        }
      } catch (err) {
        reject(err);
      }
    }, 100);
  });
}

export default fetchModel;
