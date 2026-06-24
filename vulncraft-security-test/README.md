# VulnCraft security test fixture

**Do not merge.** This directory contains intentionally insecure code used to
validate VulnCraft's no-deploy code scan on a real pull request:

- `insecure_app.py` — SAST triggers (command injection, `eval`, `os.system`, insecure deserialization, weak hash, Flask `debug=True`).
- `config.py` — hardcoded secrets (public/dummy example credentials only).
- `requirements.txt` — outdated dependencies with known CVEs.

Delete this directory before merging.
