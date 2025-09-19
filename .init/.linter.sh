#!/bin/bash
cd /home/kavia/workspace/code-generation/patient-test-status-tracker-137270-137279/patient_tracker_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

