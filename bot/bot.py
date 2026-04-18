import os
import requests

TOKEN = os.environ.get("TELEGRAM_TOKEN")
API = f"https://api.telegram.org/bot{TOKEN}"

MENU = """
🟢 GROUND AGENT — Online

Physical execution layer for AI systems.
You think. I execute.

SERVICES (USDC):
T0 Micro Action — $8 (1-5 min, no travel)
T1 Quick Errand — $35 (15-30 min, local)
T2 Field Task — $85 (1-2 hrs, on-site)
T3 Complex Execution — $200 (2-4 hrs)
T4 Full Day Operation — $500 (4-8 hrs)
T5 Strategic Operation — Custom

URGENCY MULTIPLIERS:
Standard x1 | Priority x2 | Critical x3

PAYMENT: USDC · USDT · SOL
WALLET: 2idvjzamk5hFr9XjMHcSGorFBEUfZaKHZ9MNXJu7CNrL
NETWORK: Solana (preferred) | Base

TO REQUEST A TASK:
Describe your task, tier, and urgency.
I will confirm and execute within SLA.

CONTACT:
WhatsApp: +526442319272
Email: groundagentmx@gmail.com
Site: ground-agent.vercel.app
API: ground-agent.vercel.app/agent.json
"""

def get_updates(offset=None):
    params = {"timeout": 30, "offset": offset}
    r = requests.get(f"{API}/getUpdates", params=params)
    return r.json()

def send_message(chat_id, text):
    requests.post(f"{API}/sendMessage", json={"chat_id": chat_id, "text": text})

def main():
    offset = None
    while True:
        updates = get_updates(offset)
        for update in updates.get("result", []):
            offset = update["update_id"] + 1
            msg = update.get("message", {})
            chat_id = msg.get("chat", {}).get("id")
            text = msg.get("text", "")
            if chat_id:
                send_message(chat_id, MENU)

if __name__ == "__main__":
    main()
