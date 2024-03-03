import StringUtils from '@/infrastructure/util/common/StringUtils.ts'
import styles from './index.module.less'
import React, { useEffect, useState } from 'react'
import { Button, ConfigProvider, Space, Table } from 'antd'
import NginxConfFileApi from '@/infrastructure/api/NginxConfFileApi.ts'
import NginxConfFileHistorySimpleEntity from '@/infrastructure/pojo/entity/NginxConfFileHistorySimpleEntity.ts'
import DevFileTreeEntity from '@/infrastructure/pojo/entity/DevFileTreeEntity.ts'
export default function NginxConfVersionTable({ id = StringUtils.EMPTY }: { id: string }) {
  const [historyList, setHistoryList] = useState<any>()

  useEffect(() => {
    console.log('useEffect')
    reload()
  }, [id])

  const reload = async () => {
    await doGetGetNginxConfFileHistoryList()
  }

  const doGetGetNginxConfFileHistoryList = async () => {
    const dataList: NginxConfFileHistorySimpleEntity[] = await NginxConfFileApi.getNginxConfFileHistoryList(id)

    const versionTableList = []
    for (let i = 0; i < dataList.length; i++) {
      const data = dataList[i]
      const versionTable = {
        key: data.id,
        id: data.id,
        fileId: data.fileId,
        fileCode: data.fileCode,
        fileVersion: data.fileVersion,
        gmtCreate: data.gmtCreate,
        gmtModified: data.gmtModified
      }
      versionTableList.push(versionTable)
    }

    setHistoryList(versionTableList)
  }

  const columns = [
    {
      title: '文件编码',
      dataIndex: 'fileCode',
      key: 'fileCode'
    },
    {
      title: '版本',
      dataIndex: 'fileVersion',
      key: 'fileVersion'
    },
    {
      title: '创建时间',
      dataIndex: 'gmtCreate',
      key: 'gmtCreate'
    },
    {
      title: '修改时间',
      dataIndex: 'gmtModified',
      key: 'gmtModified'
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render(_, record: DevFileTreeEntity) {
        return (
          <Space>
            <Button
              type='text'
              // onClick={() => {
              //   openEditFileModal(record)
              // }}
            >
              编辑
            </Button>
            <Button
              type='text'
              danger
              // onClick={() => {
              //   handleFileDel(record)
              // }}
            >
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  return (
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
          },
          Table: {
            cellFontSize: 12,
            cellFontSizeMD: 12,
            cellFontSizeSM: 12
          }
        }
      }}
    >
      <div className={styles.blankContentWrapper}>
        <div className={styles.buttonWrapper}>
          <Button className={styles.refreshButton} onClick={reload}>
            刷新
          </Button>
        </div>
        <Table dataSource={historyList} columns={columns} pagination={false} size={'small'} />
      </div>
    </ConfigProvider>
  )
}
