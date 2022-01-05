import { useEffect, useRef, useState } from 'preact/hooks'
import type { FunctionalComponent } from 'preact'

type Props = {
  data: {
    key: string
    value: string
  }
  onChange: (value: string) => void
}

const FieldEditor: FunctionalComponent<Props> = ({ data: { key, value }, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [editing, setEditing] = useState(false)

  function handleEnter(event: KeyboardEvent) {
    if (event.key === 'Enter')
      // trigger blur event
      setEditing(false)
  }

  function handleChange(event: FocusEvent | KeyboardEvent) {
    if (editing && event.target) {
      const target = event.target as HTMLInputElement
      setEditing(false)
      if (target.value !== value)
        onChange(target.value)
    }
  }

  useEffect(() => {
    if (editing)
      inputRef.current?.focus()
  }, [editing])

  return (
    <li class="flex items-center space-x-1">
      <span>{key}:</span>
      {editing
        ? <input ref={inputRef} type="text" value={value} onBlur={handleChange} class="bg-transparent" onKeyPress={handleEnter} />
        : <>
          <span>{value}</span>
          <button class="i-uil-pen" onClick={() => setEditing(true)} />
        </>
      }
    </li>
  )
}

export default FieldEditor
