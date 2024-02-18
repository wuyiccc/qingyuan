import styles from './index.module.less'
import React from 'react'

function Logo() {
  return (
    <div>
      <div className={styles.logo}>
        <img src='/img/logo.png' alt='' className={styles.img} />
      </div>
    </div>
  )
}

export default Logo
