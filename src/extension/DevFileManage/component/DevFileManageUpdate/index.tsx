import styles from './index.module.less'
import StringUtils from '@/infrastructure/util/common/StringUtils.ts'
import { Button, ConfigProvider, Form, Input, TreeSelect } from 'antd'
import React, { useEffect, useState } from 'react'
import DevFileApi from '@/infrastructure/api/DevFileApi.ts'
import molecule from '@dtinsight/molecule'
import VegaEditorConstants from '@/infrastructure/constants/VegaEditorConstants.ts'
import DevFileUpdateBO from '@/infrastructure/pojo/bo/DevFileUpdateBO.ts'
import DevFileTreeEntity from '@/infrastructure/pojo/entity/DevFileTreeEntity.ts'
import CurrentEditorDataDTO from '@/infrastructure/pojo/dto/CurrentEditorDataDTO.ts'
import EditorDataTypeEnum from '@/infrastructure/pojo/enumeration/EditorDataTypeEnum.ts'
import LocalDB from '@/infrastructure/db/LocalDB.ts'
import LocalDBConstants from '@/infrastructure/constants/LocalDBConstants.ts'

export default function DevFileManageUpdate({
  id = StringUtils.EMPTY,
  parentId = StringUtils.EMPTY,
  filename = StringUtils.EMPTY,
  onUpdateDevFileCallback
}: {
  id: string
  parentId: string
  filename: string
  onUpdateDevFileCallback?: (id: string, filename: string) => void
}) {
  const [updateDevFileForm] = Form.useForm()
  const [fileTreeSelect, setFileTreeSelect] = useState<any[]>()

  useEffect(() => {
    updateDevFileForm.setFieldsValue({
      id: id,
      parentId: parentId,
      filename: filename
    })
    doQueryFileTree()

    console.log('重新加载更新文件页面')
    const currentEditorDataDTO = new CurrentEditorDataDTO()
    currentEditorDataDTO.editorDataType = EditorDataTypeEnum.DEV_FILE_MANAGE
    currentEditorDataDTO.jsonData = JSON.stringify(StringUtils.EMPTY)
    LocalDB.set(LocalDBConstants.CURRENT_EDIT_FILE_DATA, currentEditorDataDTO)
  }, [id])

  const doUpdateDevFile = async () => {
    const values = updateDevFileForm.getFieldsValue()

    const devFileUpdateBO = new DevFileUpdateBO()
    devFileUpdateBO.id = values.id
    devFileUpdateBO.parentId = values.parentId
    devFileUpdateBO.filename = values.filename
    await DevFileApi.updateDevFile(devFileUpdateBO)
    if (onUpdateDevFileCallback) {
      console.log('执行callback方法')
      onUpdateDevFileCallback(id, values.filename)
    }
    const groupId = molecule.editor.getGroupIdByTab(VegaEditorConstants.EDITOR_TAB_DEV_FILE_MANAGE_CREATE_ID)
    molecule.editor.closeTab(VegaEditorConstants.EDITOR_TAB_DEV_FILE_MANAGE_CREATE_ID, groupId)
  }

  const doQueryFileTree = async () => {
    const fileList: DevFileTreeEntity[] = await DevFileApi.getDevFileTree(StringUtils.EMPTY)

    setFileTreeSelect(fileList)
  }

  return (
    <div className={styles.contentWrapper}>
      <ConfigProvider
        theme={{
          token: {
            colorBgContainerDisabled: '#282A36',
            colorBgContainer: '#282A36',
            colorTextDisabled: '#bdbdbd',
            colorText: '#bdbdbd'
          },
          components: {
            Select: {
              // selectorBg: 'grey'
              optionActiveBg: '#17181f',
              optionSelectedBg: '#17181f'
            }
          }
        }}
      >
        <Form name='updateDevFileForm' form={updateDevFileForm} labelCol={{ span: 4 }} labelAlign='right'>
          <Form.Item label='文件id' name='id' hidden={true}>
            <Input disabled={true} />
          </Form.Item>

          <Form.Item
            label='父文件'
            name='parentId'
            rules={[
              { required: true, message: '请选择父文件' },
              { max: 128, message: '不能超过128字符' }
            ]}
          >
            <TreeSelect
              showSearch
              style={{ width: '100%' }}
              value={parentId}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder='请选择父文件'
              allowClear
              treeDefaultExpandAll
              treeData={fileTreeSelect}
              fieldNames={{ label: 'filename', value: 'id', children: 'children' }}
            />
          </Form.Item>

          <Form.Item label='文件名称' name='filename'>
            <Input placeholder='请输入文件名称' />
          </Form.Item>

          <Form.Item>
            <Button className={styles.createDataBtn} onClick={doUpdateDevFile}>
              确认
            </Button>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </div>
  )
}
