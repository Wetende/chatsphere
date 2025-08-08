from enum import Enum
from typing import List, Dict

class Permission(Enum):
    READ = "read"
    WRITE = "write"
    DELETE = "delete"
    ADMIN = "admin"

class Resource(Enum):
    BOT = "bot"
    DOCUMENT = "document"
    CONVERSATION = "conversation"
    USER = "user"
    SETTING = "setting"

class RBACManager:
    def __init__(self):
        self.role_permissions: Dict[str, Dict[Resource, List[Permission]]] = {
            'admin': {resource: list(Permission) for resource in Resource},
            'moderator': {
                Resource.BOT: [Permission.READ, Permission.WRITE],
                Resource.DOCUMENT: [Permission.READ, Permission.WRITE, Permission.DELETE],
                Resource.CONVERSATION: [Permission.READ, Permission.DELETE],
                Resource.USER: [Permission.READ],
                Resource.SETTING: [Permission.READ],
            },
            'user': {
                Resource.BOT: [Permission.READ, Permission.WRITE],
                Resource.DOCUMENT: [Permission.READ, Permission.WRITE],
                Resource.CONVERSATION: [Permission.READ, Permission.WRITE],
                Resource.USER: [Permission.READ],
            },
        }

    def has_permission(self, user_roles: List[str], resource: Resource, permission: Permission) -> bool:
        for role in user_roles:
            if role in self.role_permissions and resource in self.role_permissions[role]:
                if permission in self.role_permissions[role][resource]:
                    return True
        return False

    def get_user_permissions(self, user_roles: List[str]) -> Dict[str, List[str]]:
        permissions: Dict[str, List[str]] = {}
        for role in user_roles:
            if role in self.role_permissions:
                for resource, perms in self.role_permissions[role].items():
                    permissions.setdefault(resource.value, [])
                    permissions[resource.value].extend([p.value for p in perms])
        return permissions