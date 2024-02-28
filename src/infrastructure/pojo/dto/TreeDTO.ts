import DevFileTreeEntity from '@/infrastructure/pojo/entity/DevFileTreeEntity.ts'

class TreeDTO {
  id?: string
  name?: string
  icon?: string
  isLeaf?: boolean
  fileType?: string
  children: TreeDTO[]

  public static parseDevFileTree(devFileEntityList: DevFileTreeEntity[]): TreeDTO[] {
    if (devFileEntityList === null || devFileEntityList.length === 0) {
      return []
    }

    const treeDTOList: TreeDTO[] = []

    devFileEntityList.forEach(e => {
      const treeDTO: TreeDTO = convertToTreeDTO(e)
      treeDTOList.push(treeDTO)
    })

    function convertToTreeDTO(devFileTree: DevFileTreeEntity): TreeDTO {
      const treeDTO: TreeDTO = {
        id: devFileTree.id,
        name: devFileTree.filename,
        icon: '', // You can set the icon based on your requirements
        isLeaf: !devFileTree.children || devFileTree.children.length === 0,
        fileType: devFileTree.fileType?.toString(),
        children: []
      }

      if (devFileTree.children) {
        treeDTO.children = devFileTree.children.map(convertToTreeDTO)
      }

      return treeDTO
    }
    return treeDTOList
  }
}

export default TreeDTO
