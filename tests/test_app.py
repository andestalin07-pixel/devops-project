import unittest
from unittest.mock import patch, MagicMock
import json
import os
import sys

# Ensure parent directory is in path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from server import app, safe_json_parse, SEED_NUGGETS

class NuggetAppTestCase(unittest.TestCase):
    def setUp(self):
        """Set up Flask test client before each test."""
        app.config["TESTING"] = True
        self.client = app.test_client()

    def test_safe_json_parse(self):
        """Test safe_json_parse utility with various data types."""
        self.assertEqual(safe_json_parse(None, []), [])
        self.assertEqual(safe_json_parse("", {}), {})
        self.assertEqual(safe_json_parse("null", "default"), "default")
        self.assertEqual(safe_json_parse('{"key": "value"}', {}), {"key": "value"})
        self.assertEqual(safe_json_parse('[1, 2, 3]', []), [1, 2, 3])
        self.assertEqual(safe_json_parse("invalid json", "fallback"), "fallback")
        self.assertEqual(safe_json_parse(["already", "list"], []), ["already", "list"])

    def test_seed_nuggets_structure(self):
        """Ensure initial seed nuggets have all required frontend properties."""
        self.assertGreater(len(SEED_NUGGETS), 0)
        for nugget in SEED_NUGGETS:
            self.assertIn("id", nugget)
            self.assertIn("title", nugget)
            self.assertIn("topic", nugget)
            self.assertIn("creator", nugget)
            self.assertIn("takeaways", nugget)
            self.assertIsInstance(nugget["takeaways"], list)

    def test_static_index_route(self):
        """Verify the root endpoint serves the index.html page."""
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"html", response.data.lower())
        response.close()

    def test_static_css_route(self):
        """Verify static CSS stylesheet can be retrieved."""
        response = self.client.get("/style.css")
        self.assertEqual(response.status_code, 200)
        response.close()

    def test_static_js_route(self):
        """Verify static JavaScript bundle can be retrieved."""
        response = self.client.get("/app.js")
        self.assertEqual(response.status_code, 200)
        response.close()

    @patch("server.get_db_connection")
    def test_health_check_success(self, mock_get_conn):
        """Verify health check endpoint returns 200 when database responds."""
        mock_conn = MagicMock()
        mock_cursor = MagicMock()
        mock_cursor.fetchone.side_effect = [
            {"version": "PostgreSQL 16.1 (Neon)"},
            {"total": 5}
        ]
        mock_conn.cursor.return_value.__enter__.return_value = mock_cursor
        mock_get_conn.return_value.__enter__.return_value = mock_conn

        response = self.client.get("/api/health")
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(data.get("status"), "connected")
        self.assertEqual(data.get("total_nuggets"), 5)

    @patch("server.get_db_connection")
    def test_health_check_failure(self, mock_get_conn):
        """Verify health check endpoint returns 500 when database fails."""
        mock_get_conn.side_effect = Exception("Database connection timeout")

        response = self.client.get("/api/health")
        self.assertEqual(response.status_code, 500)
        data = response.get_json()
        self.assertEqual(data.get("status"), "error")

if __name__ == "__main__":
    unittest.main()
