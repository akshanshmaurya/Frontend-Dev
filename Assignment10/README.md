# Assignment 10 — JSON APIs & Frontend Wiring

This folder contains five small demos (Q1–Q5). Each question has a separate db.json file — run each with `json-server` on its own port.

Prerequisite: install JSON Server globally or locally

```powershell
npm install -g json-server
```

Run each API on its own port (example ports used below):

Q1 (Live Search — products) --> port 3001
```powershell
json-server --watch Q1_db.json --port 3001
```

Q2 (Employee Status) --> port 3002
```powershell
json-server --watch Q2_db.json --port 3002
```

Q3 (Task Manager) --> port 3004
```powershell
json-server --watch Q3_db.json --port 3004
```

Q4 (Multi-API Dashboard) --> port 3005
```powershell
json-server --watch Q4_db.json --port 3005
```

Q5 (Timetable Viewer) --> port 3006
```powershell
json-server --watch Q5_db.json --port 3006
```

Notes:
- Each front-end HTML/JS file under this folder expects the JSON Server for its question to run on the port specified in its JS file (e.g. Q1 uses `http://localhost:3001`). If you want to use a different port, update the API base URL inside the corresponding JS file.
- JSON Server supports query parameters like `?q=term`, `?priority=High`, and `?completed=true` used in the examples.

Open the corresponding HTML file from this folder in a browser and make sure the JSON Server for that question is running.
