/* eslint-disable @next/next/no-img-element */

const Message = ({children, avatar, username, title, description}) => {
  return (
    <div className='message-container'>
        <div className='flex items-center gap-2'>
            <img src={avatar} alt={username} className="w-10 rounded-full" />
            <h2 className='text-base'>{username}</h2>
        </div>
        <div className='space-y-1 mt-2'>
            <h3 className='text-lg'>{title}</h3>
            <p className='font-light text-base'>{description}</p>
        </div>
        {children}
    </div>
  )
}

export default Message;