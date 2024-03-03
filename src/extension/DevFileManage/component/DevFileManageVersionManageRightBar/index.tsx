import { connect } from '@dtinsight/molecule/esm/react'
import molecule from '@dtinsight/molecule'
import styles from './index.module.less'
import EditorTabUtils from '@/infrastructure/util/common/EditorTabUtils.ts'
import StringUtils from '@/infrastructure/util/common/StringUtils.ts'
import DevFileApi from '@/infrastructure/api/DevFileApi.ts'
import DevFileTreeEntity from '@/infrastructure/pojo/entity/DevFileTreeEntity.ts'
import LocalDBConstants from '@/infrastructure/constants/LocalDBConstants.ts'
import { LocalDB } from '@dtinsight/dt-utils/lib'
import AntdTreeDTO from '@/infrastructure/pojo/dto/AntdTreeDTO.tsx'
import ObjectUtils from '@/infrastructure/util/common/ObjectUtils.ts'
import DevFileTypeConstants from '@/infrastructure/constants/DevFileTypeConstants.ts'
import NginxConfVersionTable from '@/extension/DevFileManage/component/DevFileManageVersionManageRightBar/NginxConfVersionTable/NginxConfVersionTable.tsx'

export default function DevFileManageVersionManageRightBar() {
  const Container = connect(molecule.editor, ({ current }: molecule.model.IEditor) => {
    /**
     * 当前的 tab 是否不合法，如不合法则展示 Empty
     */
    if (!current?.tab?.id) {
      return <div className={styles.blankContentWrapper}>请打开Nginx配置文件</div>
    }

    const devFileManageId = EditorTabUtils.getDevFileManageEditorTabId(current?.tab?.id as string)
    if (StringUtils.isEmpty(devFileManageId)) {
      return <div className={styles.blankContentWrapper}>请打开Nginx配置文件</div>
    }
    console.log('devFileManageId', devFileManageId)

    const devFileManageAntdTree: AntdTreeDTO[] = LocalDB.get(LocalDBConstants.DEV_FILE_MANAGE_ANTD_TREE)

    const data = AntdTreeDTO.findAntdTreeDTOByKey(devFileManageAntdTree, devFileManageId)
    console.log('获取antd树结构信息', data)
    if (ObjectUtils.isNull(data)) {
      return <div className={styles.blankContentWrapper}>请打开Nginx配置文件</div>
    }

    if (!(DevFileTypeConstants.NGINX_CONFIG_FILE.type === data.type)) {
      return <div className={styles.blankContentWrapper}>请打开Nginx配置文件</div>
    } else {
      return <NginxConfVersionTable id={devFileManageId} />
    }
  })

  return <Container />
}
