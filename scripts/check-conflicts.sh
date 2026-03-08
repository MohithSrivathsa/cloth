#!/usr/bin/env bash
set -euo pipefail

if rg -n --hidden --glob '!.git' '^(<<<<<<<|=======|>>>>>>>)' . >/tmp/conflict_markers.txt; then
  echo "❌ Unresolved merge conflict markers found:" >&2
  cat /tmp/conflict_markers.txt >&2
  exit 1
fi

echo "✅ No merge conflict markers detected"
