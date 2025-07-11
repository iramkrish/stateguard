# .husky/husky-utils.sh

SPINNER_CHARS=(⠋ ⠙ ⠹ ⠸ ⠼ ⠴ ⠦ ⠧ ⠇ ⠏)
spinner_pid=""
step_number=1
VERBOSE=${HUSKY_DEBUG:-false}

start_spinner() {
  local msg="$1"
  i=0
  (
    while true; do
      printf "\r[%s] %s %s" "$step_number" "${SPINNER_CHARS[i++ % ${#SPINNER_CHARS[@]}]}" "$msg"
      sleep 0.1
    done
  ) &
  spinner_pid=$!
}

stop_spinner() {
  local exit_code=$1
  local success_msg=$2
  local fail_msg=$3

  if [ -n "$spinner_pid" ]; then
    kill "$spinner_pid" >/dev/null 2>&1 || true
    wait "$spinner_pid" 2>/dev/null || true
  fi

  if [ "$exit_code" -eq 0 ]; then
    printf "\r[%s] ✔ %s\n" "$step_number" "$success_msg"
  else
    printf "\r[%s] ✘ %s\n" "$step_number" "$fail_msg"
    echo -e "\a"
    return 1
  fi

  step_number=$((step_number + 1))
}

abort_spinner() {
  local message="$1"
  if [ -n "$spinner_pid" ]; then
    kill "$spinner_pid" >/dev/null 2>&1 || true
    wait "$spinner_pid" 2>/dev/null || true
  fi
  printf "\r[%s] ✘ %s\n" "$step_number" "$message"
  echo -e "\a"
  step_number=$((step_number + 1))
  return 1
}
