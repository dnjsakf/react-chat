/* React */
import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled from 'styled-components';

/* Other Modules */
import io from 'socket.io-client';

/* Styled Components */
const Container = styled.div`
`;


const useSocket = props =>{
  const {
    uri,
    options
  } = props;
  
  const [ socket, setSocket ] = useState(null);
  
  const handleConnect = useCallback(()=>{
    setSocket(io( uri, options));
  }, []);
  
  const handleDisconnect = useCallback(()=>{
    if( socket && socket.connected ){
      socket.disconnect();
    }
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
  const [ message, setMessage ] = useState("");
  const socket = useSocket({
    uri: "http://localhost:3000/chat?username=dochi",
    options: {
      reconnection: false
    }
  });
  
  /* Handlers */
  const handleSubmit = useCallback( event => {
    event.preventDefault();
    
    socket.emit("send_message", {
      room: "lobby",
      message: message
    });
    
  }, [ socket, message ]);
  
  const handleChangeMessage = useCallback( event => {
    setMessage( event.target.value );
  }, [ socket ]);
  
  /* Side Effects */
  useEffect(()=>{
    if( socket ){
      socket.connect();
    }
  }, []);
  
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
      });
      
      return ()=>{
        console.log( socket );
        socket.disconnect();
      }
    }
  }, [ socket ]);
 
  /* Renderer */
  return (
    <Container>
      ChatSocket
      <form onSubmit={ handleSubmit }>
        <input value={ message } onChange={ handleChangeMessage }/>
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