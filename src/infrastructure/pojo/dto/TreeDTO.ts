class TreeDTO {
  id?: string
  name?: string
  icon?: string
  isLeaf?: boolean
  fileType?: string
  children: TreeDTO[]
}

export default TreeDTO
