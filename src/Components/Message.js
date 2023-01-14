/* eslint-disable @next/next/no-img-element */

const Message = ({children, avatar, username, title, description}) => {
  return (
    <div className='message-container'>
        <div className='message-header'>
            <img src={avatar} alt={username} className="message-img" />
            <h2 className='text-base'>{username}</h2>
        </div>
        <div className='message-body'>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
        {children}
    </div>
  )
}

export default Message;