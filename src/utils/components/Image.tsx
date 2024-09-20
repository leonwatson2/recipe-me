import { FC, useState } from 'react'
type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>

export const Image: FC<ImageProps> = (props) => {
  const [error, setError] = useState(false)
  const onError = () => {
    setError(true)
    console.error('Image not found:', props.src)
  }
  if (error) return null
  return (<img  {...props} onError={onError}/>)

}

