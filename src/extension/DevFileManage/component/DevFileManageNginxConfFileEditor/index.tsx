import { useEffect, useRef, useState } from 'react'
import MonacoEditor, { monaco } from 'react-monaco-editor'
import StringUtils from '@/infrastructure/util/common/StringUtils.ts'
import CurrentEditorDataDTO from '@/infrastructure/pojo/dto/CurrentEditorDataDTO.ts'
import EditorDataTypeEnum from '@/infrastructure/pojo/enumeration/EditorDataTypeEnum.ts'
import LocalDB from '@/infrastructure/db/LocalDB.ts'
import LocalDBConstants from '@/infrastructure/constants/LocalDBConstants.ts'
import NginxConfFileApi from '@/infrastructure/api/NginxConfFileApi.ts'
import NginxConfFileDetailEntity from '@/infrastructure/pojo/entity/NginxConfFileDetailEntity.ts'
import styles from './index.module.less'
import { Button, ConfigProvider, Descriptions, Input } from 'antd'
import ConsoleOutputUtils from '@/infrastructure/util/common/ConsoleOutputUtils.ts'
import NginxConfFileUpdateBO from '@/infrastructure/pojo/bo/NginxConfFileUpdateBO.ts'

export default function DevFileManageNginxConfFileEditor({ id = StringUtils.EMPTY }: { id: string }) {
  const [fileContent, setFileContent] = useState('select * from ')
  const [fileCode, setFileCode] = useState<string>(StringUtils.EMPTY)

  useEffect(() => {
    doGetNginxConfFileDetail()
    console.log('重新加载远程服务编辑页面')
    const currentEditorDataDTO = new CurrentEditorDataDTO()
    currentEditorDataDTO.editorDataType = EditorDataTypeEnum.DEV_FILE_NGINX_CONF
    currentEditorDataDTO.jsonData = JSON.stringify(StringUtils.EMPTY)
    LocalDB.set(LocalDBConstants.CURRENT_EDIT_FILE_DATA, currentEditorDataDTO)
  }, [id])

  const doGetNginxConfFileDetail = async () => {
    const nginxConfFileDetailEntity: NginxConfFileDetailEntity = await NginxConfFileApi.getNginxConfFileDetail(id)
    setFileCode(nginxConfFileDetailEntity.fileCode)
    setFileContent(nginxConfFileDetailEntity.fileContent)
  }

  const onFileCodeChange = e => {
    setFileCode(e.target.value)
  }

  const options: any = {
    // selectOnLineNumbers: true,
    // roundedSelection: false,
    // readOnly: false,
    // cursorStyle: 'line',
    // automaticLayout: true,
    // selectOnLineNumbers: true,
    // renderSideBySide: false,
    // scrollBeyondLastLine: false,
    // formatOnPaste: true,
    // automaticLayout: true,
    // contextmenu: false, // 禁止右键
    // fixedOverflowWidgets: true, // 超出编辑器大小的使用fixed属性显示
    // quickSuggestions: true, // 默认的提示关掉
    minimap: {
      // // 缩略图
      enabled: true
    }
    // scrollbar: {
    // // 滚动条
    // horizontalScrollbarSize: 6,
    // verticalScrollbarSize: 6,
    // },
    // lineNumbersMinChars: 3, // 最少显示3位长的行号
    // lineNumbers: 'on', // 是否显示行号
  }

  const onChange = (fileContent: any, e: any) => {
    setFileContent(fileContent)
  }

  const onSave = async () => {
    ConsoleOutputUtils.printInfoMessage('nginx配置文件开始保存')

    const updateBO = new NginxConfFileUpdateBO()
    updateBO.id = id
    updateBO.fileCode = fileCode
    updateBO.fileContent = fileContent

    await NginxConfFileApi.updateNginxConfFile(updateBO)

    ConsoleOutputUtils.printInfoMessage('nginx配置文件保存成功')
  }

  const onSaveToVersion = async () => {
    ConsoleOutputUtils.printInfoMessage('nginx配置文件开始保存为版本')

    const updateBO = new NginxConfFileUpdateBO()
    updateBO.id = id
    updateBO.fileCode = fileCode
    updateBO.fileContent = fileContent

    await NginxConfFileApi.saveVersion(updateBO)

    ConsoleOutputUtils.printInfoMessage('nginx配置文件保存为版本成功')
  }

  monaco.editor.defineTheme('VegaMonacoTheme', {
    base: 'vs-dark',
    inherit: true,
    rules: [{ background: '#282A36', token: '' }],
    colors: {
      // 相关颜色属性配置
      // 'editor.foreground': '#000000',
      'editor.background': '#282A36' //背景色
      // 'editorCursor.foreground': '#8B0000',
      // 'editor.lineHighlightBackground': '#0000FF20',
      // 'editorLineNumber.foreground': '#008800',
      // 'editor.selectionBackground': '#88000030',
      // 'editor.inactiveSelectionBackground': '#88000015'
    }
  })

  monaco.editor.setTheme('VegaMonacoTheme')

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
        <div className={styles.contentHeader}>
          <div className={styles.contentHeaderLeft}>
            <span className={styles.contentSpan}>文件编码: </span>
            <Input
              className={styles.contentInput}
              placeholder='请输入文件编码'
              value={fileCode}
              onChange={onFileCodeChange}
            ></Input>
          </div>
          <div className={styles.contentHeaderRight}>
            <Button className={styles.saveBtn} onClick={onSave}>
              保存
            </Button>
            <Button className={styles.saveVersionBtn} onClick={onSaveToVersion}>
              保存为版本
            </Button>
          </div>
        </div>
        <MonacoEditor
          width='100%'
          height='100%'
          theme='VegaMonacoTheme'
          value={fileContent}
          options={options}
          onChange={onChange}
          //editorDidMount={editorDidMount}
        />
      </ConfigProvider>
    </div>
  )
}
