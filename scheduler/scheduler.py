import os
from apscheduler.schedulers.background import BackgroundScheduler
from requests import post
from datetime import datetime
import time
import atexit

venv_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'backend', '.venv', 'Scripts', 'activate.bat'))
print("Venv path:", venv_path)

if os.path.exists(venv_path):
    print("Activating the virtual environment...")
    os.system(f'call "{venv_path}"')
else:
    print("Error: Virtual environment not found.")
    exit(1)

def run_scraper():
    URL = "http://127.0.0.1:5000/run-scraper"
    print(f"Sending POST request to {URL}")
    try:
        response = post(URL)
        print(f"Status code: {response.status_code}")
        if response.status_code == 200:
            print("Scraper ran successfully.")
            write_last_run_time()
        else:
            print(f"Failed to run scraper. Response: {response.text}")
    except Exception as e:
        print(f"Error sending POST request: {e}")

def check_if_missed_run():
    last_run_time = read_last_run_time()
    if last_run_time is None or (datetime.now() - last_run_time).days >= 30:
        print("Missed a run or first time running, triggering the scraper...")
        run_scraper()

timestamp_file = os.path.join(os.path.dirname(__file__), 'last_run_timestamp.txt')

def read_last_run_time():
    try:
        with open(timestamp_file, 'r') as f:
            return datetime.fromisoformat(f.read().strip())
    except (FileNotFoundError, ValueError):
        return None

def write_last_run_time():
    with open(timestamp_file, 'w') as f:
        f.write(datetime.now().isoformat())

scheduler = BackgroundScheduler()
scheduler.add_job(run_scraper, 'cron', day=1, hour=0, minute=0, id='monthly_scraper')
scheduler.start()

atexit.register(lambda: scheduler.shutdown(wait=False) if scheduler.running else None)

if __name__ == "__main__":
    check_if_missed_run()
    print("Scheduler is running...")
    try:
        while True:
            time.sleep(60)
    except (KeyboardInterrupt, SystemExit):
        print("Shutting down scheduler...")
        scheduler.shutdown()
