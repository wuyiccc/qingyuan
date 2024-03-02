import { useRef, useState } from 'react'
import MonacoEditor, { monaco } from 'react-monaco-editor'

export default function VegaEditor() {
  const editorRef = useRef()
  const [code, setCode] = useState('select * from ')
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

  const editorDidMount = (editor: any, monaco: any) => {
    console.log('editorDidMount', editor)
    editor.focus()
  }
  const onChange = (newValue: any, e: any) => {
    console.log('onChange', newValue, e)
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
    <>
      <MonacoEditor
        width='100%'
        height='100%'
        language='sql'
        theme='VegaMonacoTheme'
        value={code}
        options={options}
        onChange={onChange}
        //editorDidMount={editorDidMount}
      />
    </>
  )
}
