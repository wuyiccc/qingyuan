import styles from './index.module.less'
import StringUtils from '@/infrastructure/util/common/StringUtils.ts'
import { Button, ConfigProvider, Form, Input, TreeSelect } from 'antd'
import React, { useEffect, useState } from 'react'
import DevFileApi from '@/infrastructure/api/DevFileApi.ts'
import molecule from '@dtinsight/molecule'
import VegaEditorConstants from '@/infrastructure/constants/VegaEditorConstants.ts'
import DevFileUpdateBO from '@/infrastructure/pojo/bo/DevFileUpdateBO.ts'
import DevFileTreeEntity from '@/infrastructure/pojo/entity/DevFileTreeEntity.ts'
import DbConstants from '@/infrastructure/constants/DbConstants.ts'
import RemoteServerApi from '@/infrastructure/api/RemoteServerApi.ts'
import RemoteServerUpdateBO from '@/infrastructure/pojo/bo/RemoteServerUpdateBO.ts'
import { Text } from 'echarts/types/src/util/graphic'
import ConsoleOutputUtils from '@/infrastructure/util/common/ConsoleOutputUtils.ts'
import RemoteServerTestConnectBO from '@/infrastructure/pojo/bo/RemoteServerTestConnectBO.ts'
import ArrayUtils from '@/infrastructure/util/common/ArrayUtils.ts'

export default function DevFileRemoteServerEditor({ id = StringUtils.EMPTY }: { id: string }) {
  const [updateRemoteServerForm] = Form.useForm()

  useEffect(() => {
    doGetRemoteServerDetail()
  }, [id])

  const doGetRemoteServerDetail = async () => {
    const remoteServerEntity = await RemoteServerApi.getRemoteServerDetail(id)

    updateRemoteServerForm.setFieldsValue({
      id: id,
      serverName: remoteServerEntity.serverName,
      host: remoteServerEntity.host,
      port: remoteServerEntity.port,
      username: remoteServerEntity.username,
      password: remoteServerEntity.password,
      remark: remoteServerEntity.remark,
      gmtCreate: remoteServerEntity.gmtCreate,
      gmtModified: remoteServerEntity.gmtModified
    })
  }

  const doUpdateRemoteServer = async () => {
    const updateBO = new RemoteServerUpdateBO()

    const values = updateRemoteServerForm.getFieldsValue()
    updateBO.id = values.id
    updateBO.host = values.host
    updateBO.port = values.port
    updateBO.username = values.username
    updateBO.password = values.password
    updateBO.remark = values.remark

    await RemoteServerApi.updateRemoteServer(updateBO)
    ConsoleOutputUtils.printInfoMessage('更新成功')
  }

  const doTestRemoteServerConnect = async () => {
    const testBO = new RemoteServerTestConnectBO()

    const values = updateRemoteServerForm.getFieldsValue()
    testBO.host = values.host
    testBO.port = values.port
    testBO.username = values.username
    testBO.password = values.password

    const res = await RemoteServerApi.testRemoteServerConnect(testBO)

    const msgList = res.msgList
    if (ArrayUtils.isEmpty(msgList)) {
      ConsoleOutputUtils.printInfoMessage('未获取到测试结果')
    }

    for (let i = 0; i < msgList.length; i++) {
      ConsoleOutputUtils.printInfoMessage(msgList[i])
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
        <Form name='updateRemoteServerForm' form={updateRemoteServerForm} labelCol={{ span: 4 }} labelAlign='right'>
          <Form.Item label='文件id' name='id' hidden={true}>
            <Input disabled={true} />
          </Form.Item>

          <Form.Item label='服务器名称' name='serverName'>
            <Input disabled={true} />
          </Form.Item>

          <Form.Item label='主机地址' name='host'>
            <Input placeholder='请输入主机地址' />
          </Form.Item>

          <Form.Item label='端口' name='port'>
            <Input placeholder='请输入端口' />
          </Form.Item>
          <Form.Item label='用户名' name='username'>
            <Input placeholder='请输入用户名' />
          </Form.Item>
          <Form.Item label='密码' name='password'>
            <Input placeholder='请输入密码' />
          </Form.Item>
          <Form.Item label='备注' name='remark'>
            <Input.TextArea placeholder='请输入备注' />
          </Form.Item>
          <Form.Item label='创建时间' name='gmtCreate'>
            <Input disabled={true} />
          </Form.Item>
          <Form.Item label='修改时间' name='gmtModified'>
            <Input disabled={true} />
          </Form.Item>
          <Form.Item className={styles.btnWrapper}>
            <Button className={styles.testBtn} onClick={doTestRemoteServerConnect}>
              测试连接
            </Button>
            <Button className={styles.okBtn} onClick={doUpdateRemoteServer}>
              确认
            </Button>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </div>
  )
}
