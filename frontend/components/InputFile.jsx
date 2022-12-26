import { useState, useRef } from 'react'
import { InputGroup, Input, InputRightAddon } from '@chakra-ui/react'

export default function InputFile({ name, accepted, placeholder, onChange, ...props }) {
  const inputRef = useRef()
  const [fileName, setFileName] = useState('')

  return (
    <InputGroup>
      <input type="file" name={name} accept={accepted} ref={inputRef} style={{ display: 'none' }}
        onChange={e => {
          const [file] = e.target.files
          setFileName(file ? file.name : '')
          onChange({ target: { name, value: file } })
        }}
        {...props} />
      <Input
        placeholder={placeholder || "Subir archivo ..."}
        onClick={() => inputRef.current.click()}
        value={fileName}
        readOnly={true} />
      <InputRightAddon children="Archivo" />
    </InputGroup>
  )
}
