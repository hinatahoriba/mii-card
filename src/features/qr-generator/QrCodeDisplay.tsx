import { QRCodeCanvas } from 'qrcode.react'

type Props = {
  url: string
  size?: number
}

export default function QrCodeDisplay({ url, size = 256 }: Props) {
  return <QRCodeCanvas id="qr-canvas" value={url} size={size} />
}
