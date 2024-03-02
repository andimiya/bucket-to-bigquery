#!/bin/bash

gcloud functions logs read \
  --gen2 \
  --region=us-east1 \
  --limit=10 \
  hello-node-function
