let _stream = null

export const setStream  = s  => { _stream = s }
export const getStream  = () => _stream
export const stopStream = () => {
  _stream?.getTracks().forEach(t => t.stop())
  _stream = null
}
