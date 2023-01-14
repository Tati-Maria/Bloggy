/* eslint-disable @next/next/no-img-element */

const Message = ({children, avatar, username, title, description}) => {
  return (
    <div className='bg-white p-8 border-b-2 rounded-lg shadow dark:text-white dark:bg-gray-900 my-5'>
        <div className='flex items-center gap-2'>
            <img src={avatar} alt={username} className="w-10 rounded-full" />
            <h2 className=''>{username}</h2>
        </div>
        <div className='space-y-1 mt-2'>
            <h3 className='font-medium'>{title}</h3>
            <p className='font-light text-base'>{description}</p>
        </div>
        {children}
    </div>
  )
}

export default Message;