import DevFileTreeEntity from '@/infrastructure/pojo/entity/DevFileTreeEntity.ts'
import React, { ReactNode } from 'react'
import { FolderOutlined } from '@ant-design/icons'
import IconFont from '@/component/icon/IconFont.tsx'

class AntdTreeDTO {
  public key?: string

  public title?: string

  public isLeaf?: boolean

  public children?: AntdTreeDTO[]

  public icon?: ReactNode

  public static parseDevFileTree(devFileEntityList: DevFileTreeEntity[]): AntdTreeDTO[] {
    if (devFileEntityList === null || devFileEntityList.length === 0) {
      return []
    }

    const treeDTOList: AntdTreeDTO[] = []

    devFileEntityList.forEach(e => {
      const treeDTO: AntdTreeDTO = convertToTreeDTO(e)
      treeDTOList.push(treeDTO)
    })

    function convertToTreeDTO(devFileTree: DevFileTreeEntity): AntdTreeDTO {
      const treeDTO: AntdTreeDTO = {
        key: devFileTree.id,
        title: devFileTree.filename,
        isLeaf: devFileTree.fileType === 2 || devFileTree.fileType === 4,
        children: [],
        icon:
          devFileTree.fileType === 1 ? null : devFileTree.fileType === 2 ? (
            <IconFont type='icon-wuyicccCONF' />
          ) : devFileTree.fileType === 3 ? (
            <IconFont type='icon-wuyiccccloud-server' />
          ) : devFileTree.fileType === 4 ? (
            <IconFont type='icon-wuyicccnginx' />
          ) : (
            <IconFont type='icon-wuyicccnginx' />
          )
      }

      if (devFileTree.children) {
        treeDTO.children = devFileTree.children.map(convertToTreeDTO)
      }

      return treeDTO
    }
    return treeDTOList
  }
}

export default AntdTreeDTO
