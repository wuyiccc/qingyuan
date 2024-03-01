import styles from './index.module.less'
import StringUtils from '@/infrastructure/util/common/StringUtils.ts'
import { Button, ConfigProvider, Form, Input, Select, TreeSelect, Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import LocalDB from '@/infrastructure/db/LocalDB.ts'
import LocalDBConstants from '@/infrastructure/constants/LocalDBConstants.ts'
import FileApi from '@/infrastructure/api/FileApi.ts'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import SelectEntity from '@/infrastructure/pojo/entity/SelectEntity.ts'
import DevFileApi from '@/infrastructure/api/DevFileApi.ts'
import { FormItem } from '@/component/formItem'
import DevFileCreateBO from '@/infrastructure/pojo/bo/DevFileCreateBO.ts'
import molecule from '@dtinsight/molecule'
import VegaEditorConstants from '@/infrastructure/constants/VegaEditorConstants.ts'

export default function DevFileManageCreate({
  parentId = StringUtils.EMPTY,
  parentDevFileName = StringUtils.EMPTY,
  onCreateDevFileCallback
}: {
  parentId: string
  parentDevFileName: string
  onCreateDevFileCallback?: () => void
}) {
  const [createDevFileForm] = Form.useForm()
  const [fileTypeList, setFileTypeList] = useState<SelectEntity<number>[]>([])

  useEffect(() => {
    doGetFileTypeList()
    createDevFileForm.setFieldsValue({
      parentDevFileName: parentDevFileName,
      filename: '',
      fileType: null
    })
  }, [parentId])

  const doGetFileTypeList = async () => {
    const fileTypeList = await DevFileApi.getDevFileTypeList()
    setFileTypeList(fileTypeList)
  }

  const doCreateDevFile = async () => {
    const values = createDevFileForm.getFieldsValue()

    const devFileCreateBO = new DevFileCreateBO()
    devFileCreateBO.parentId = parentId
    devFileCreateBO.filename = values.filename
    devFileCreateBO.fileType = values.fileType
    await DevFileApi.addDevFile(devFileCreateBO)
    // const groupId = molecule.editor.getGroupIdByTab(VegaEditorConstants.EDITOR_TAB_DEV_FILE_MANAGE_CREATE_ID)
    // molecule.editor.closeTab(VegaEditorConstants.EDITOR_TAB_DEV_FILE_MANAGE_CREATE_ID, groupId)
    if (onCreateDevFileCallback) {
      console.log('执行callback方法')
      onCreateDevFileCallback()
    }
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
        <Form name='createDevFileForm' form={createDevFileForm} labelCol={{ span: 4 }} labelAlign='right'>
          <Form.Item label='父文件名称' name='parentDevFileName'>
            <Input disabled={true} />
          </Form.Item>
          <Form.Item label='文件名称' name='filename'>
            <Input placeholder='请输入文件名称' />
          </Form.Item>

          <Form.Item label='文件类型' name='fileType'>
            <Select
              placeholder='请选择文件类型'
              allowClear={true}
              style={{ width: 210 }}
              dropdownStyle={{ backgroundColor: '#282A36' }}
              options={fileTypeList?.map(fileType => ({ label: fileType.desc, value: fileType.key }))}
            ></Select>
          </Form.Item>
          <Form.Item>
            <Button className={styles.createDataBtn} onClick={doCreateDevFile}>
              确认
            </Button>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </div>
  )
}
