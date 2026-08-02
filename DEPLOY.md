# Deployment notes — Firebase service account and Docker

This project expects Firebase Admin credentials to be provided securely at runtime.

Recommended methods (pick one):

- Base64-encoded JSON env (recommended for many PaaS):

  1. Locally encode your service account JSON:

     - Linux/macOS:
       ```bash
       cat firebase-service-account.json | base64 -w0
       ```

     - Windows PowerShell:
       ```powershell
       [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((Get-Content firebase-service-account.json -Raw)))
       ```

  2. Add the resulting single-line string as the `FIREBASE_SERVICE_ACCOUNT` secret in your platform's UI.

  3. The app will detect and decode base64 automatically.

- Mounted secret file (recommended for containers):

  1. Mount the JSON into the container at `/run/secrets/firebase-sa.json` (or another path supported by your platform).
  2. Set `FIREBASE_SERVICE_ACCOUNT_PATH=/run/secrets/firebase-sa.json` in environment config.

- Local dev (NOT for production):

  - Copy `firebase-service-account.json` into the repo root and set `FIREBASE_SERVICE_ACCOUNT=./firebase-service-account.json`.
  - Remember: do NOT commit the JSON file to Git.

Verify locally

1. From the `backend` folder, run:

```bash
node src/scripts/test-firebase-init.mjs
```

This script will print whether Firebase Admin was initialized using the current environment.

Notes

- The code supports raw JSON in `FIREBASE_SERVICE_ACCOUNT`, base64 JSON, a relative path in `FIREBASE_SERVICE_ACCOUNT` or an absolute path in `FIREBASE_SERVICE_ACCOUNT_PATH`.
- Avoid adding `firebase-service-account.json` to `.gitignore` exceptions; prefer platform secrets.
