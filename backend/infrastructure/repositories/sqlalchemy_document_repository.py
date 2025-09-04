"""
Infrastructure Repository - SqlAlchemyDocumentRepository

Provides CRUD operations for DocumentModel and maps to simple dicts for app layer stubs.
"""

import logging
from typing import Optional, Sequence, Dict, Any

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError

from infrastructure.database.models.document import DocumentModel


logger = logging.getLogger(__name__)


class SqlAlchemyDocumentRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def add(self, data: Dict[str, Any]) -> DocumentModel:
        try:
            model = DocumentModel(**data)
            self.session.add(model)
            await self.session.flush()
            await self.session.refresh(model)
            return model
        except SQLAlchemyError as e:
            logger.error("Error adding document: %s", e)
            await self.session.rollback()
            raise

    async def get_by_id(self, doc_id: int) -> Optional[DocumentModel]:
        stmt = select(DocumentModel).where(DocumentModel.id == doc_id)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def list_by_owner(self, owner_id: int, limit: int = 50, offset: int = 0) -> Sequence[DocumentModel]:
        stmt = (
            select(DocumentModel)
            .where(DocumentModel.owner_id == owner_id)
            .order_by(DocumentModel.created_at.desc())
            .limit(limit)
            .offset(offset)
        )
        result = await self.session.execute(stmt)
        return list(result.scalars().all())

    async def update_status(self, doc_id: int, status: str, error_message: Optional[str] = None) -> Optional[DocumentModel]:
        model = await self.get_by_id(doc_id)
        if not model:
            return None
        model.status = status
        model.error_message = error_message
        await self.session.flush()
        await self.session.refresh(model)
        return model


