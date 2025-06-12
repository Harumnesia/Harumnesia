# Gunicorn configuration file
import os
import multiprocessing

# Server socket
bind = f"0.0.0.0:{os.getenv('PORT', '5050')}"
backlog = 2048

# Worker processes
workers = int(os.getenv('GUNICORN_WORKERS', multiprocessing.cpu_count() * 2 + 1))
worker_class = "sync"
worker_connections = 1000
timeout = 300
keepalive = 2

# Restart workers after this many requests, to help prevent memory leaks
max_requests = 1000
max_requests_jitter = 100

# Logging
accesslog = "-"
errorlog = "-"
loglevel = os.getenv('LOG_LEVEL', 'info')
access_log_format = '%(h)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s "%(f)s" "%(a)s" %(D)s'

# Process naming
proc_name = 'perfume-recommendation-api'

# Server mechanics
daemon = False
pidfile = '/tmp/gunicorn.pid'
user = None
group = None
tmp_upload_dir = None

# SSL (if needed)
# keyfile = None
# certfile = None

# Environment
raw_env = [
    'GUNICORN_RUN=true',
]

# Preload application for better performance
preload_app = True

# Server hooks
def on_starting(server):
    """Called just before the master process is initialized."""
    server.log.info("Starting Perfume Recommendation API")

def on_reload(server):
    """Called to recycle workers during a reload via SIGHUP."""
    server.log.info("Reloading Perfume Recommendation API")

def worker_int(worker):
    """Called just after a worker exited on SIGINT or SIGQUIT."""
    worker.log.info("Worker received INT or QUIT signal")

def pre_fork(server, worker):
    """Called just before a worker is forked."""
    server.log.info(f"Worker {worker.pid} about to be forked")

def post_fork(server, worker):
    """Called just after a worker has been forked."""
    server.log.info(f"Worker {worker.pid} spawned")

def worker_abort(worker):
    """Called when a worker received the SIGABRT signal."""
    worker.log.info(f"Worker {worker.pid} received SIGABRT signal")
