#!/bin/bash

# Update this FUNCTION_NAME to your own function name
gcloud functions deploy 'FUNCTION_NAME' \
  --gen2 \
  --runtime=nodejs20 \
  --region=us-east1 \
  --source=. \
  --entry-point=helloGET \
  # Update this BUCKET_NAME to your own bucket
  --trigger-bucket=BUCKET_NAME \
  --allow-unauthenticated
