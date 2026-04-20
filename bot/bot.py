import os
import requests
import json

TOKEN = os.environ.get("TELEGRAM_TOKEN")
API = f"https://api.telegram.org/bot{TOKEN}"

WELCOME = """🟢 GROUND AGENT — Online

Physical execution layer for AI systems.
You think. I execute.

Commands:
/services — View service catalog
/quote — Calculate price
/request — Submit a task
/payment — Payment info
/status — Operator status
"""

SERVICES = """📋 SERVICE CATALOG

T0 · MICRO ACTION — $8 USDC
⏱ 1-5 min | SLA: <30 min
→ Press button, photograph object
→ Read physical display, confirm asset

T1 · QUICK ERRAND — $35 USDC
⏱ 15-30 min | SLA: <2 hrs
→ Cash payment, form submission
→ Verbal relay, collect document

T2 · FIELD TASK — $85 USDC
⏱ 1-2 hrs | SLA: <4 hrs
→ Location inspection, asset verification
→ Facility photography, in-person inquiry

T3 · COMPLEX EXECUTION — $200 USDC
⏱ 2-4 hrs | SLA: Same day
→ Contractor coordination, negotiation
→ Hardware installation, location scouting

T4 · FULL DAY OPERATION — $500 USDC
⏱ 4-8 hrs | SLA: 24hr advance
→ Procurement management, space setup
→ Vendor coordination, legal execution

T5 · STRATEGIC OPERATION — Custom
⏱ Multi-day | SLA: Custom
→ Facility establishment
→ Ongoing representation

URGENCY MULTIPLIERS:
Standard x1 | Priority x2 | Critical x3

Use /quote to calculate final price.
"""

PAYMENT = """💳 PAYMENT INFO

Accepted: USDC · USDT · SOL
Networks: Solana (preferred) · Base
Protocol: x402 compatible

Wallet:
2idvjzamk5hFr9XjMHcSGorFBEUfZaKHZ9MNXJu7CNrL

Machine-readable endpoint:
ground-agent.vercel.app/agent.json

T0/T1: Prepayment required
T3+: Escrow available
"""

REQUEST = """📬 SUBMIT A TASK REQUEST

Send your request in this format:

TIER: [T0/T1/T2/T3/T4/T5]
TASK: [describe what needs to be done]
LOCATION: [address or area, if applicable]
OUTPUT: [what you expect to receive]
URGENCY: [standard/priority/critical]
DEADLINE: [when you need it done]

After submitting here, you will be contacted via:
📱 WhatsApp: +526442319272
✉️ Email: groundagentmx@gmail.com
🌐 Site: ground-agent.vercel.app
"""

STATUS = """⚡ OPERATOR STATUS

Human ID: LAURO_001
Location: Ciudad Obregón, Sonora, MX
Status: 🟢 ONLINE

Coverage:
• Ciudad Obregón (primary)
• Sonora state (extended)  
• Mexico national (T4+)

Availability:
• Standard: Mon-Sun 8am-8pm CST
• Priority/Critical: 24/7

Active tasks: Accepting requests
Queue: Open
"""

def send_message(chat_id, text):
    payload = {
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "Markdown"
    }
    requests.post(f"{API}/sendMessage", json=payload)

def get_updates(offset=None):
    params = {"timeout": 30, "offset": offset}
    try:
        r = requests.get(f"{API}/getUpdates", params=params, timeout=35)
        return r.json()
    except:
        return {"result": []}

def handle_message(chat_id, text):
    text = text.strip().lower()
    
    if text in ["/start", "/help"]:
        send_message(chat_id, WELCOME)
    elif text == "/services":
        send_message(chat_id, SERVICES)
    elif text == "/payment":
        send_message(chat_id, PAYMENT)
    elif text == "/request":
        send_message(chat_id, REQUEST)
    elif text == "/status":
        send_message(chat_id, STATUS)
    elif text == "/quote":
        send_message(chat_id, "Send your tier and urgency level:\nExample: T2 priority\n\nI will reply with the final price.")
    elif "tier:" in text or "task:" in text:
        # Forward task request notification
        send_message(chat_id, "✅ Task request received.\n\nThe operator will contact you shortly via WhatsApp or email to confirm details and payment.\n\nExpected response: within SLA for your tier.")
    else:
        send_message(chat_id, WELCOME)

def main():
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
    main()
