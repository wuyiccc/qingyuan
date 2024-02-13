import 'reflect-metadata'
import React from 'react'
import molecule from '@dtinsight/molecule'
import styles from './index.module.less'

const Input = molecule.component.Input

export type FormItemProps = {
  style?: React.CSSProperties
  className?: string
  label: string
  name: string
  id: string
}

export function FormItem(props: React.PropsWithChildren<Partial<FormItemProps>>) {
  const { id, label, name, children, ...restProps } = props
  return (
    <div {...restProps}>
      {label ? (
        <label title={label} htmlFor={id}>
          {label}:
        </label>
      ) : null}
      {children || <Input id={id} name={name || label} autoComplete='false' />}
    </div>
  )
}
