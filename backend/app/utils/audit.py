import json
import logging
from datetime import datetime
from typing import Dict, Any

_logger = logging.getLogger("audit")
if not _logger.handlers:
    handler = logging.FileHandler("audit.log")
    formatter = logging.Formatter('%(asctime)s - %(message)s')
    handler.setFormatter(formatter)
    _logger.addHandler(handler)
    _logger.setLevel(logging.INFO)

def audit_log(action: str, user_id: str, resource: str, details: Dict[str, Any]) -> None:
    entry = {
        "timestamp": datetime.utcnow().isoformat(),
        "action": action,
        "user_id": user_id,
        "resource": resource,
        "details": details,
    }
    _logger.info(json.dumps(entry))