const Notification = ({ message, messageStyle }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className='error' style={messageStyle}>
        {message}
      </div>
    )
  }

  export default Notification;