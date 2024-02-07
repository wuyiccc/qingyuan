import { RcFile } from 'antd/lib/upload'

class FileUtils {
  public static checkImgFileType(file: RcFile) {
    return file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
  }

  public static checkLimit10M(file: RcFile) {
    return file.size / 1024 / 1024 <= 10
  }
}

export default FileUtils
