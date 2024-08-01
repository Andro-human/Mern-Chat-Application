import { Avatar } from '@mui/material'
import { transformImage } from '../../lib/features'

const AvatarCard = ({avatar}) => {
  return ( 
   <Avatar src={transformImage(avatar)} alt="avatar" sx={{ width: "3rem", height: "3rem" }} />
  )
}

export default AvatarCard
