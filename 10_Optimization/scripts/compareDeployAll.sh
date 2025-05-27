#!/bin/bash

# Default: no clean or compile
DO_CLEAN=false
DO_COMPILE=false

# Parse flags
while [[ $# -gt 0 ]]; do
  case $1 in
    --clean)
      DO_CLEAN=true
      shift
      ;;
    --compile)
      DO_COMPILE=true
      shift
      ;;
    *)
      echo "Unknown option: $1"
      echo "Usage: $0 [--clean] [--compile]"
      exit 1
      ;;
  esac
done

optimizerModes=("none" "low" "default" "high")

for mode in "${optimizerModes[@]}"; do
  echo "=== Running with OPT_MODE=$mode ==="
  
  # Set environment variable for this run only
  OPT_MODE=$mode

  if $DO_CLEAN; then
    echo "→ Running hardhat clean"
    npx hardhat clean
  fi

  if $DO_COMPILE; then
    echo "→ Running hardhat compile"
    npx hardhat compile
  fi

  # Run your script with OPT_MODE environment variable set
  OPT_MODE=$mode npx hardhat run compareDeploy.js --network hardhat
  echo ""
done
