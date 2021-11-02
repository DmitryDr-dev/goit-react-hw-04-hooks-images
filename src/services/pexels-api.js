import axios from 'axios';

export class PexelsApi {
  #BASE_URL = 'https://api.pexels.com/v1/';
  #API_KEY = '563492ad6f9170000100000142740a29c00e426eb1ebfda344bd325b';

  constructor() {
    this.searchQuery = '';
    this.pageNumber = 1;
    this.qtyPerPage = 12;
    this.endPoint = 'search';
  }

  // searchQuery getter
  get query() {
    return this.searchQuery;
  }

  // searchQuery setter
  set query(newSearchQuery) {
    this.searchQuery = newSearchQuery;
  }

  get page() {
    return this.pageNumber;
  }

  set page(newPage) {
    this.pageNumber = newPage;
  }

  async fetchImages() {
    axios.defaults.baseURL = this.#BASE_URL;
    axios.defaults.headers.common.Authorization = this.#API_KEY;

    const url = `${this.endPoint}?query=${this.searchQuery}&page=${this.pageNumber}&orientation=landscape&per_page=${this.qtyPerPage}`;

    try {
      const response = await axios.get(url);
      const imageArr = await response.data.photos;
      return imageArr;
    } catch (error) {
      console.log("Something's wrong", error.message);
    }
  }
}
