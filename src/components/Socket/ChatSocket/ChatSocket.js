/* React */
import React, { useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled from 'styled-components';

/* Socket */
import io from 'socket.io-client';

/* Styled Components */
const Container = styled.div`
`;

const MessageWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 350px;
  overflow-y: scroll;
`;
const MessageList = styled.ul`
  position: absolute;
  bottom: 0; 
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  max-height: 350px;
`;
const MessageItem = styled.li`
`;

/* Custom Hooks */
const useSocket = props =>{
  const {
    uri,
    options
  } = props;
  
  const [ socket, setSocket ] = useState(null);

  useEffect(()=>{
    const _socket = io(uri, options);

    setSocket(_socket);

    return ()=>( _socket.disconnect() )
  }, []);
  
  return socket;
}
useSocket.propTypes = {
  uri: PropTypes.string.required,
  options: PropTypes.object,
}
useSocket.defaultProps = {
  options: {
    reconnection: false
  }
}

/* Main Component */
const ChatSocket = props => {
  /* Props */
  const {
    ...rest
  } = props;
  
  /* State */
  const scrollRef = useRef();
  const [ messages, setMessages ] = useState([]);
  const [ value, setValue ] = useState("");
  const socket = useSocket({
    uri: "http://localhost:3000/chat?username=dochi",
    options: {
      reconnection: false
    }
  });
  
  /* Handlers */
  const handleSubmit = useCallback( event => {
    event.preventDefault();
    
    const send_data = {
      room: "lobby",
      message: value
    }
    socket.emit("send_message", send_data, ()=> setValue("") );

  }, [ socket, value ]);
  
  const handleChange = useCallback( event => {
    setValue( event.target.value );
  }, []);
  
  /* Side Effects */
  useEffect(()=>{
    if( socket ){
      socket.on("connect", ()=>{
        console.log("connect");
      });
      
      socket.on("connect_error", ( error )=>{
        console.log("connect_error", error);
      });
      
      socket.on("disconnect", ()=>{
        console.log("disconnect");
      });
      
      socket.on("error", ( error )=>{
        console.log( error );
      });
      
      socket.on("receive_message", ( data )=>{
        console.log("receive message:", data);

        setMessages(( _messages )=> [].concat( _messages, data) );
      });
    }
  }, [ socket ]);

  useEffect(()=>{
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [ messages ]);
 
  /* Renderer */
  return (
    <Container>
      <MessageWrapper ref={ scrollRef }>
        <MessageList>
          {
            messages.map(({ user, message }, idx )=>(
              <MessageItem key={ idx }>
                { `${user.name}: ${message}` }
              </MessageItem>
            ))
          }
        </MessageList>
      </MessageWrapper>
      <form onSubmit={ handleSubmit }>
        <input value={ value } onChange={ handleChange }/>
        <button type="submit">send</button>
      </form>
    </Container>
  );
}

/* Main Component Settings */
ChatSocket.propTypes = { }
ChatSocket.defaultProps = { }

/* Exports */
export default ChatSocket;