import StringUtils from '@/util/common/StringUtils.ts'

class StorageUtils {
  static setString(key: string, value: string) {
    localStorage.setItem(key, value)
  }

  static setNumber(key: string, value: number) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  static set(key: string, value: object) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  static get(key: string): string {
    const value = localStorage.getItem(key)
    if (!value) {
      return StringUtils.EMPTY
    }

    try {
      return JSON.parse(value)
    } catch (error) {
      return value
    }
  }

  static remove(key: string) {
    localStorage.removeItem(key)
  }

  static clear() {
    localStorage.clear()
  }
}

export default StorageUtils
