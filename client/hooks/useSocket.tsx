import { useCallback } from 'react'
import { io, Socket } from 'socket.io-client'

// const backUrl = process.env.NODE_ENV === 'production' ? 'http://3.34.139.72:3095' : 'http://3.34.139.72:3095'
const backUrl = process.env.NODE_ENV === 'production' ? 'http://3.34.139.72:3095' : 'http://localhost:3095'


const sockets: { [key: string]: Socket } = {}

const useSocket = (workspace?: string): [Socket | undefined, () => void] => {
  console.log('workspace', workspace)
  const disconnect = useCallback(() => {
    if (workspace && sockets[workspace]) {
      sockets[workspace].disconnect()
      delete sockets[workspace]
    }
  }, [workspace])

  if (!workspace) {
    return [undefined, disconnect]
  }

  if (!sockets[workspace]) {
    sockets[workspace] = io(`${backUrl}/ws-${workspace}`, {
      transports: ['websocket'],
    })
    console.info('create socket', workspace, sockets[workspace])
  }

  return [sockets[workspace], disconnect]
}

export default useSocket