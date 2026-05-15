import { QRCodeSVG } from 'qrcode.react'

type Props = {
  url: string
  size?: number
}

export default function QrCodeDisplay({ url, size = 256 }: Props) {
  return <QRCodeSVG value={url} size={size} />
}
