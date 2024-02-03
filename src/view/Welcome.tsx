import request from '@/infrastructure/api/request.ts'
import { Button } from 'antd'
import LocalDB from '@/infrastructure/db/LocalDB.ts'
import NumberUtils from '@/infrastructure/util/common/NumberUtils.ts'
import DateUtils from '@/infrastructure/util/common/DateUtils.ts'

function handleClick() {
  request.post('/user/login', {
    username: 'admin',
    password: '1234'
  })
}

function handleStorage(type: number) {
  if (type === 1) {
    const formatNum = NumberUtils.formatNum('12333.5678')
    console.log(formatNum)
    const dateStr = DateUtils.formatDate(new Date(), DateUtils.DATETIME_FORMAT)
    console.log(dateStr)
    LocalDB.setString('name', 'wuyiccc')
    LocalDB.setNumber('age', 31)
  } else if (type === 2) {
    const name = LocalDB.get('name')
    console.log('name:', name)
  } else if (type === 3) {
    LocalDB.remove('name')
  } else if (type === 4) {
    LocalDB.clear()
  }
}

export default function Welcome() {
  return (
    <div className='welcome'>
      <p>Welcome</p>
      <p>
        <Button onClick={handleClick}>点击事件</Button>
        <Button onClick={() => handleStorage(1)}>写入</Button>
        <Button onClick={() => handleStorage(2)}>读取</Button>
        <Button onClick={() => handleStorage(3)}>删除</Button>
        <Button onClick={() => handleStorage(4)}>清空</Button>
      </p>
    </div>
  )
}
