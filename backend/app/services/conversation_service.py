from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import Optional, List
from app.models.bot import Conversation, Message
from sqlalchemy.dialects.postgresql import UUID as PGUUID

class ConversationService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create_conversation(self, bot_id: PGUUID, user_id: Optional[str], title: Optional[str]) -> Conversation:
        convo = Conversation(bot_id=bot_id, user_id=user_id, title=title or "New Conversation")
        self.db.add(convo)
        await self.db.commit()
        await self.db.refresh(convo)
        return convo

    async def get_conversation(self, conversation_id: PGUUID, user_id: Optional[str]) -> Optional[Conversation]:
        result = await self.db.execute(select(Conversation).where(Conversation.id == conversation_id))
        return result.scalar_one_or_none()

    async def list_conversations(self, bot_id: PGUUID, user_id: Optional[str]) -> List[Conversation]:
        result = await self.db.execute(select(Conversation).where(Conversation.bot_id == bot_id))
        return result.scalars().all()

    async def delete_conversation(self, conversation_id: PGUUID) -> bool:
        convo = await self.get_conversation(conversation_id, None)
        if not convo:
            return False
        await self.db.delete(convo)
        await self.db.commit()
        return True

    async def add_message(self, conversation_id: PGUUID, message_type: str, content: str, metadata: dict) -> Message:
        msg = Message(conversation_id=conversation_id, message_type=message_type, content=content, metadata=metadata)
        self.db.add(msg)
        await self.db.commit()
        await self.db.refresh(msg)
        return msg

    async def list_messages(self, conversation_id: PGUUID) -> List[Message]:
        result = await self.db.execute(select(Message).where(Message.conversation_id == conversation_id))
        return result.scalars().all()
