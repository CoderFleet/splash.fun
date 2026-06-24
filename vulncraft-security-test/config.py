"""
VulnCraft test fixture — INTENTIONALLY INSECURE (hardcoded secrets).
These are well-known PUBLIC example/dummy credentials (AWS docs sample key,
etc.) used to validate the secret scanner. They grant access to nothing.
Do NOT merge.
"""

# detect-secrets: AWS access key id (AWS docs example value — not live)
AWS_ACCESS_KEY_ID = "AKIAIOSFODNN7EXAMPLE"
AWS_SECRET_ACCESS_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"

# detect-secrets: keyword-detected secrets
DATABASE_PASSWORD = "Sup3rS3cr3tP@ssw0rd123!"
GITHUB_TOKEN = "ghp_AbCdEfGhIjKlMnOpQrStUvWxYz0123456789"
PAYMENT_API_KEY = "a9f3c2e8b7d14056f9128347abef5610cdef7890bb12"
SERVICE_AUTH_TOKEN = "Z1xQ9pL4mN7vR2sT6wY8uK3jH5gF0dB1cA4eD7iOqW"

# detect-secrets: private key block
PRIVATE_KEY = """-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEA0qS8b3xY4exampledummykeymaterialnotrealatallzzzz
abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789++//
-----END RSA PRIVATE KEY-----"""
