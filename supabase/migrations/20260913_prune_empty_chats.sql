-- Drop site-assistant greetings that never got a visitor reply.
DELETE FROM chat_conversations c
WHERE NOT EXISTS (
  SELECT 1 FROM chat_messages m
  WHERE m.conversation_id = c.id
    AND m.role = 'user'
);
