import axios from "axios";

axios.defaults.headers.common["x-api-key"] =
  "live_cQnvOV2Frx6eQkmlGdFdtdHJY9bsYY2nvNXNzcWp1dc19OZF2CHgD1GLk40MK2Me";
const baseUrl = "https://api.thecatapi.com/v1/breeds";

export async function fetchBreeds() {
  try {
    const res = await axios.get(baseUrl);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error.messege);
  }
}

export async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    return response;
  } catch (error) {
    console.log(error.message);
  }
}
