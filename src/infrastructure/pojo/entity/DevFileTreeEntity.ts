class DevFileTreeEntity {
  public id?: string

  /**
   * 父节点id
   */
  public parentId?: string

  /**
   * 文件名称
   */
  public filename?: string

  /**
   * 文件类型
   *
   */
  public fileType?: number

  public gmtCreate?: string

  public gmtModified?: string

  /**
   * 子列表
   */
  public children?: DevFileTreeEntity[]
}

export default DevFileTreeEntity
