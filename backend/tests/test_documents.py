import io
import pytest


@pytest.mark.api
async def test_upload_document_txt_success(test_client, authenticated_headers):
    content = b"hello world"
    files = {"file": ("note.txt", content, "text/plain")}
    resp = await test_client.post("/api/v1/documents/upload", headers=authenticated_headers, files=files)
    assert resp.status_code == 200
    data = resp.json()
    assert data["status"] == "processed"
    assert data["chunks"] >= 0


@pytest.mark.api
async def test_upload_document_empty_file_error(test_client, authenticated_headers):
    files = {"file": ("empty.txt", b"", "text/plain")}
    resp = await test_client.post("/api/v1/documents/upload", headers=authenticated_headers, files=files)
    assert resp.status_code == 400


@pytest.mark.api
async def test_upload_document_unsupported_type_error(test_client, authenticated_headers):
    files = {"file": ("image.jpg", b"binary", "image/jpeg")}
    resp = await test_client.post("/api/v1/documents/upload", headers=authenticated_headers, files=files)
    assert resp.status_code == 400

