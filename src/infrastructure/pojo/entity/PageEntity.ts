class PageEntity<T> {
  public currentPageNum: number

  public totalPageNums: number
  public totalRecordNums: number
  public records: T[]
}

export default PageEntity
