import os
import requests
import threading
from http.server import HTTPServer, BaseHTTPRequestHandler

TOKEN = os.environ.get("TELEGRAM_TOKEN")
API = f"https://api.telegram.org/bot{TOKEN}"

WELCOME = """🟢 GROUND AGENT — Online

Physical execution layer for AI systems.
You think. I execute.

Commands:
/services — View service catalog
/request — Submit a task
/payment — Payment info
/status — Operator status
"""

SERVICES = """📋 SERVICE CATALOG

T0 · MICRO ACTION — $8 USDC
⏱ 1-5 min | SLA: <30 min
→ Press button, photograph object

T1 · QUICK ERRAND — $35 USDC
⏱ 15-30 min | SLA: <2 hrs
→ Cash payment, form submission

T2 · FIELD TASK — $85 USDC
⏱ 1-2 hrs | SLA: <4 hrs
→ Location inspection, asset verification

T3 · COMPLEX EXECUTION — $200 USDC
⏱ 2-4 hrs | SLA: Same day
→ Contractor coordination, negotiation

T4 · FULL DAY OPERATION — $500 USDC
⏱ 4-8 hrs | SLA: 24hr advance
→ Procurement, space setup

T5 · STRATEGIC OPERATION — Custom
Multi-day | Custom SLA

URGENCY: Standard x1 | Priority x2 | Critical x3
"""

PAYMENT = """💳 PAYMENT INFO

Accepted: USDC · USDT · SOL
Networks: Solana (preferred) · Base

Wallet:
2idvjzamk5hFr9XjMHcSGorFBEUfZaKHZ9MNXJu7CNrL

T0/T1: Prepayment required
T3+: Escrow available
"""

REQUEST = """📬 SUBMIT A TASK

Format:
TIER: [T0-T5]
TASK: [description]
LOCATION: [if applicable]
OUTPUT: [expected result]
URGENCY: [standard/priority/critical]

Contact:
📱 WhatsApp: +526442319272
✉️ groundagentmx@gmail.com
🌐 ground-agent.vercel.app
"""

STATUS = """⚡ OPERATOR STATUS

ID: LAURO_001
Location: Ciudad Obregón, Sonora, MX
Status: 🟢 ONLINE
Coverage: Sonora (primary) · Mexico national (T4+)
Hours: Mon-Sun 8am-8pm CST | Priority 24/7
"""

class HealthHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b"Ground Agent Bot running")
    def log_message(self, format, *args):
        pass

def run_server():
    port = int(os.environ.get("PORT", 10000))
    server = HTTPServer(("0.0.0.0", port), HealthHandler)
    server.serve_forever()

def send_message(chat_id, text):
    requests.post(f"{API}/sendMessage", json={"chat_id": chat_id, "text": text})

def get_updates(offset=None):
    try:
        r = requests.get(f"{API}/getUpdates", params={"timeout": 30, "offset": offset}, timeout=35)
        return r.json()
    except:
        return {"result": []}

def handle_message(chat_id, text):
    t = text.strip().lower()
    if t in ["/start", "/help"]:
        send_message(chat_id, WELCOME)
    elif t == "/services":
        send_message(chat_id, SERVICES)
    elif t == "/payment":
        send_message(chat_id, PAYMENT)
    elif t == "/request":
        send_message(chat_id, REQUEST)
    elif t == "/status":
        send_message(chat_id, STATUS)
    elif "tier:" in t or "task:" in t:
        send_message(chat_id, "✅ Task received. Operator will contact you shortly.")
    else:
        send_message(chat_id, WELCOME)

def run_bot():
    print("Ground Agent Bot starting...")
    offset = None
    while True:
        updates = get_updates(offset)
        for update in updates.get("result", []):
            offset = update["update_id"] + 1
            msg = update.get("message", {})
            chat_id = msg.get("chat", {}).get("id")
            text = msg.get("text", "")
            if chat_id and text:
                handle_message(chat_id, text)

if __name__ == "__main__":
    t = threading.Thread(target=run_server)
    t.daemon = True
    t.start()
    run_bot()
