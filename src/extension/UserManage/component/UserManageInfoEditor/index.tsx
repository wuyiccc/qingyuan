import React, { useEffect, useState } from 'react'
import StringUtils from '@/infrastructure/util/common/StringUtils.ts'
import UserApi from '@/infrastructure/api/UserApi.ts'
import { ConfigProvider, Form, Input, Layout, message, Upload, UploadFile } from 'antd'
import styles from './index.module.less'
import LocalDB from '@/infrastructure/db/LocalDB.ts'
import LocalDBConstants from '@/infrastructure/constants/LocalDBConstants.ts'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { RcFile, UploadChangeParam, UploadProps } from 'antd/lib/upload'
import FileUtils from '@/infrastructure/util/common/FileUtils.ts'
import ServerBizCode from '@/infrastructure/constants/ServerBizCode.ts'
import FileApi from '@/infrastructure/api/FileApi.ts'
import UserUpdateBO from '@/infrastructure/pojo/bo/UserUpdateBO.ts'
import CurrentEditorDataDTO from '@/infrastructure/pojo/dto/CurrentEditorDataDTO.ts'
import EditorDataTypeEnum from '@/infrastructure/pojo/enumeration/EditorDataTypeEnum.ts'

export function UserManageInfoEditor({ userId = StringUtils.EMPTY }: { userId: string }) {
  useEffect(() => {
    doGetUserEntity()
  }, [userId])

  const doGetUserEntity = async function () {
    const curUserEntity = await UserApi.getUserById(userId)

    editUserInfoManageForm.setFieldsValue({
      id: curUserEntity.id,
      username: curUserEntity.username,
      nickname: curUserEntity.nickname,
      remark: curUserEntity.remark,
      gmtCreate: curUserEntity.gmtCreate
    })
    setFaceUrl(curUserEntity.faceUrl)
    updateDB(curUserEntity.faceUrl)
  }

  const [editUserInfoManageForm] = Form.useForm()

  const [faceUrl, setFaceUrl] = useState<string>()
  const [uploadFaceImgLoading, setUploadFaceImgLoading] = useState<boolean>()

  // 上传之前 接口图片处理
  const handleBeforeUpload = (file: RcFile) => {
    if (!FileUtils.checkImgFileType(file)) {
      message.error('只能上传png/jpeg/jpg格式的图片')
      return false
    }
    if (!FileUtils.checkLimit10M(file)) {
      message.error('图片大小不能超过10m')
      return false
    }
  }

  // 上传后, 图片处理
  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setUploadFaceImgLoading(true)
      return
    }
    if (info.file.status === 'done') {
      if (info.file.response.code === ServerBizCode.OK) {
        setFaceUrl(info.file.response.data)
        updateDB(info.file.response.data)
      } else {
        message.error(info.file.response.msg)
      }
      setUploadFaceImgLoading(false)
    } else if (info.file.status === 'error') {
      setUploadFaceImgLoading(false)
      message.error('服务器异常, 请稍后重试')
    }
  }

  const onUserInfoEditorFormChange = () => {
    updateDB(faceUrl)
  }

  const updateDB = curFaceUrl => {
    const userUpdateBO = new UserUpdateBO()
    const fieldsValue = editUserInfoManageForm.getFieldsValue()
    userUpdateBO.id = fieldsValue.id
    userUpdateBO.nickname = fieldsValue.nickname
    userUpdateBO.remark = fieldsValue.remark
    userUpdateBO.faceUrl = curFaceUrl
    const currentEditorDataDTO = new CurrentEditorDataDTO()
    currentEditorDataDTO.editorDataType = EditorDataTypeEnum.USER
    currentEditorDataDTO.jsonData = JSON.stringify(userUpdateBO)

    LocalDB.set(LocalDBConstants.CURRENT_EDIT_FILE_DATA, currentEditorDataDTO)
  }

  const normalFile = e => {
    console.log('Upload event:', e)
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
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
          }
        }}
      >
        <Form
          name='userManageForm'
          form={editUserInfoManageForm}
          labelCol={{ span: 4 }}
          labelAlign='right'
          onChange={onUserInfoEditorFormChange}
        >
          <Form.Item label='用户头像' name='faceUrl' valuePropName='fileList' getValueFromEvent={normalFile}>
            <Upload
              listType='picture-card'
              showUploadList={false}
              headers={{
                token: LocalDB.get(LocalDBConstants.TOKEN)
              }}
              action={FileApi.UPLOAD_FILE_URL}
              beforeUpload={handleBeforeUpload}
              onChange={handleChange}
            >
              {StringUtils.isNotEmpty(faceUrl) ? (
                <img src={faceUrl} style={{ width: '100%', borderRadius: 5 }} alt='' />
              ) : (
                <div>
                  {uploadFaceImgLoading ? <LoadingOutlined rev={undefined} /> : <PlusOutlined rev={undefined} />}
                  <div style={{ marginTop: 5 }}>上传头像</div>
                </div>
              )}
            </Upload>
          </Form.Item>
          <Form.Item label='用户id' name='id'>
            <Input disabled={true} />
          </Form.Item>
          <Form.Item label='登录名称' name='username'>
            <Input disabled={true} />
          </Form.Item>
          <Form.Item label='用户昵称' name='nickname'>
            <Input placeholder='请输入用户昵称' />
          </Form.Item>
          <Form.Item label='备注' name='remark'>
            <Input.TextArea />
          </Form.Item>
          <Form.Item label='创建时间' name='gmtCreate'>
            <Input disabled={true} />
          </Form.Item>
        </Form>
      </ConfigProvider>
    </div>
  )
}
