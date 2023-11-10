import React from 'react';
import ChatViewContext from '../../chat/ChatViewContext';
import ChatNavButton from '../../chat/ChatNavButton';
import ChatView from '../../chat/ChatView';

export function ChatNav() {
  return (
    <ChatViewContext.Consumer>
      {({ toggle, visible }) => (
        <>
          <ChatNavButton isExpanded={visible} onToggle={toggle} />
          {visible && <ChatView />}
        </>
      )}
    </ChatViewContext.Consumer>
  );
}

export default ChatNav;
