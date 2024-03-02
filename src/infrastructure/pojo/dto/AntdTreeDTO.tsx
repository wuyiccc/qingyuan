import DevFileTreeEntity from '@/infrastructure/pojo/entity/DevFileTreeEntity.ts'
import React, { ReactNode } from 'react'
import IconFont from '@/component/icon/IconFont.tsx'
import ObjectUtils from '@/infrastructure/util/common/ObjectUtils.ts'
import ArrayUtils from '@/infrastructure/util/common/ArrayUtils.ts'

class AntdTreeDTO {
  public key?: string

  public title?: string

  public isLeaf?: boolean

  public children?: AntdTreeDTO[]

  public icon?: ReactNode

  public type?: number

  public parentId?: string

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
        type: devFileTree.fileType,
        parentId: devFileTree.parentId,
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

  public static findAntdTreeDTOByKey(entityList: AntdTreeDTO[], key: string): AntdTreeDTO {
    if (ArrayUtils.isEmpty(entityList)) {
      return null
    }

    for (let i = 0; i < entityList.length; i++) {
      const entity = entityList[i]
      if (entity.key === key) {
        return entity
      }

      const subList = entity.children
      if (ArrayUtils.isNotEmpty(subList)) {
        const result = this.findAntdTreeDTOByKey(subList, key)
        if (ObjectUtils.nonNull(result)) {
          return result
        }
      }
    }
    return null
  }
}

export default AntdTreeDTO
