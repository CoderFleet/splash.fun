"""
VulnCraft test fixture — INTENTIONALLY INSECURE.
This file exists only to validate VulnCraft's no-deploy code scan (SAST).
Do NOT merge. Do NOT ship. Remove the `vulncraft-security-test/` directory
before merging this PR.
"""
import hashlib
import os
import pickle
import subprocess

import yaml
from flask import Flask, request

app = Flask(__name__)


@app.route("/ping")
def ping():
    # SAST: command injection via shell=True with untrusted input
    host = request.args.get("host", "")
    return subprocess.check_output("ping -c 1 " + host, shell=True)


@app.route("/calc")
def calc():
    # SAST: code injection via eval on user input
    expr = request.args.get("expr", "0")
    return str(eval(expr))


@app.route("/run")
def run():
    # SAST: os.system with untrusted input
    cmd = request.args.get("cmd", "")
    os.system(cmd)
    return "ok"


def load_config(blob):
    # SAST: insecure deserialization
    return yaml.load(blob)  # missing Loader=
    # and pickle of untrusted data:


def load_session(data):
    return pickle.loads(data)


def hash_password(pw):
    # SAST: weak hashing algorithm
    return hashlib.md5(pw.encode()).hexdigest()


if __name__ == "__main__":
    # SAST: debug=True in production exposes the Werkzeug console
    app.run(host="0.0.0.0", debug=True)
