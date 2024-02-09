import http from '../common/http'

const basePath = './mock'

const api = {
  getFolderTree() {
    return http.get(`${basePath}/folderTree.json`)
  }
}

export default api
