#!/bin/bash

# Update this FUNCTION_NAME to your own function name
gcloud functions deploy 'loadCSVFromGCS' \
  --gen2 \
  --runtime=nodejs20 \
  --region=us-east1 \
  --source=. \
  --entry-point=loadCSVFromGCS \
  --trigger-bucket=andi-data \
  --allow-unauthenticated
