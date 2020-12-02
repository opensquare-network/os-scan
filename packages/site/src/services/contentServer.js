import ApiBase from "./apiBase";

class Api extends ApiBase {
  fetchContent = params => {
    return this.cancelableFetch('/content', params)
  }
}

const api = new Api(process.env.REACT_APP_CONTENT_SERVER)

export default api
