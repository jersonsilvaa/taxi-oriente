import { useState, useRef } from 'react'

import styles from '@/styles/InputCode.module.css'

export default function InputCode ({ length, loading, onComplete }) {
  const [code, setCode] = useState([...Array(length)].map(() => ''))
  const inputs = useRef([])

  const processInput = (e, slot) => {
    const num = e.target.value

    if (/[^0-9]/.test(num)) return
    const newCode = [...code]
    newCode[slot] = num
    setCode(newCode)

    slot !== length - 1 && inputs.current[slot + 1].focus()

    newCode.every(num => num !== '') && onComplete(newCode.join(''))
  }

  const onKeyUp = (e, slot) => {
    if (e.keuCode === 8 && !code[slot] && slot !== 0) {
      const newCode = [...code]
      newCode[slot - 1] = ''
      setCode(newCode)
      inputs.current[slot - 1].focus()
    }
  }

  return (
    <div className={styles.codeInput}>
      <div className={styles.codeInputs}>
        {code.map((num, index) => {
          return (
            <input
              key={index}
              type='text'
              inputMode='numeric'
              maxLength={1}
              value={num}
              autoFocus={!code[0].length && index === 0}
              readOnly={loading}
              onChange={e => processInput(e, index)}
              onKeyUp={e => onKeyUp(e, index)}
              ref={ref => inputs.current.push(ref)}
            />
          )
        })}
      </div>
    </div>
  )
}
