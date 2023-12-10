# worker_processes 8
# worker_processes 2
worker_processes 1

pid "/var/run/unicorn.pid"
# listen "/var/tmp/unicorn.sock"
listen 3000

stdout_path "./log/unicorn.stdout.log"
stderr_path "./log/unicorn.stderr.log"
