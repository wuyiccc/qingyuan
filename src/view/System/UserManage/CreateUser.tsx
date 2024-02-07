import { Form, Input, Modal, Upload, UploadFile } from 'antd'
import React, { useState } from 'react'
import TextArea from 'antd/lib/input/TextArea'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import LocalDB from '@/infrastructure/db/LocalDB.ts'
import HttpHeaderConstants from '@/infrastructure/constants/HttpHeaderConstants.ts'
import { RcFile, UploadChangeParam, UploadProps } from 'antd/lib/upload'
import FileUtils from '@/infrastructure/util/common/FileUtils.ts'
import { message } from '@/component/message/AntdGlobal.tsx'
import R from '@/infrastructure/pojo/R.ts'
import ServerBizCode from '@/infrastructure/constants/ServerBizCode.ts'
import StringUtils from '@/infrastructure/util/common/StringUtils.ts'

export default function CreateUser() {
  // 基础ui定义
  const [createUserForm] = Form.useForm()

  // 页面数据定义
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [faceUrl, setFaceUrl] = useState<string>(StringUtils.EMPTY)
  const baseURL = import.meta.env.VITE_BASE_API

  const handleSubmit = async () => {
    const valid = await createUserForm.validateFields()
    // console.log(valid)
  }

  const handleCancel = () => {}

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
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      if (info.file.response.code === ServerBizCode.OK) {
        console.log(info.file.response.data)
        setFaceUrl(info.file.response.data)
      } else {
        message.error('上传失败')
      }
      setLoading(false)
    } else if (info.file.status === 'error') {
      setLoading(false)
      message.error('服务器异常, 请稍后重试')
    }
  }

  return (
    <Modal
      title='创建用户'
      width={800}
      okText='确定'
      cancelText='取消'
      open={true}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form name='createUserForm' form={createUserForm} labelCol={{ span: 4 }} labelAlign='right'>
        <Form.Item label='用户头像' name='faceUrl' rules={[{ required: true, message: '请输入用户头像' }]}>
          <Upload
            listType='picture-card'
            showUploadList={false}
            headers={{
              token: LocalDB.get(HttpHeaderConstants.TOKEN)
            }}
            action={baseURL + '/file/uploadFile'}
            beforeUpload={handleBeforeUpload}
            onChange={handleChange}
          >
            {StringUtils.isNotEmpty(faceUrl) ? (
              <img src={faceUrl} style={{ width: '100%' }} alt='' />
            ) : (
              <div>
                {loading ? <LoadingOutlined rev={undefined} /> : <PlusOutlined rev={undefined} />}
                <div style={{ marginTop: 5 }}>上传头像</div>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Form.Item label='用户名' name='username' rules={[{ required: true, message: '请输入用户名称' }]}>
          <Input placeholder='请输入用户名称' />
        </Form.Item>
        <Form.Item label='用户昵称' name='nickname' rules={[{ required: true, message: '请输入用户昵称' }]}>
          <Input placeholder='请输入用户昵称' />
        </Form.Item>

        <Form.Item label='用户密码' name='password' rules={[{ required: true, message: '请输入用户密码' }]}>
          <Input.Password
            placeholder='请输入用户密码'
            visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
            autoComplete='off'
          />
        </Form.Item>

        <Form.Item label='备注' name='remark' rules={[{ required: true, message: '请输入用户备注' }]}>
          <TextArea rows={4} placeholder='请输入用户备注' maxLength={6} />
        </Form.Item>
      </Form>
    </Modal>
  )
}
