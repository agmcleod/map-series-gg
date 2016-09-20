#!/bin/bash

command -v s3cmd >/dev/null 2>&1 || { echo >&2 "I require s3cmd but it's not installed. brew install s3cmd"; exit 1; }
command -v berks >/dev/null 2>&1 || { echo >&2 "I require berks but it's not installed. https://downloads.chef.io/chef-dk/"; exit 1; }
command -v aws >/dev/null 2>&1 || { echo >&2 "I require aws but it's not installed. brew install awscli"; exit 1; }
command -v jq >/dev/null 2>&1 || { echo >&2 "I require jq but it's not installed. brew install jq"; exit 1; }

AWS_ACCESS_KEY=`cat .settings | jq -r ".AWS_ACCESS_KEY"`
AWS_SECRET_KEY=`cat .settings | jq -r ".AWS_SECRET_KEY"`
S3_BUCKET=`cat .settings | jq -r ".S3_BUCKET"`

rm cookbooks-*.tar.gz
berks package
COOKBOOKARCHIVE=`ls -l -rt -A1 *.tar.gz | tail -1`

while [[ -z "$ACCESS_KEY" ]] ; do
  read -p "AWS Access Key [$AWS_ACCESS_KEY] ? " ACCESS_KEY
  ACCESS_KEY=${ACCESS_KEY:-$AWS_ACCESS_KEY}
done

while [[ -z "$SECRET_KEY" ]] ; do
  read -p "AWS Secret Key [$AWS_SECRET_KEY] ? " SECRET_KEY
  SECRET_KEY=${SECRET_KEY:-$AWS_SECRET_KEY}
done

cp $COOKBOOKARCHIVE latest.tar.gz
# s3cmd put $COOKBOOKARCHIVE s3://$S3_BUCKET/$COOKBOOKARCHIVE --access_key=$ACCESS_KEY --secret_key=$SECRET_KEY
s3cmd put latest.tar.gz s3://$S3_BUCKET/latest.tar.gz --access_key=$ACCESS_KEY --secret_key=$SECRET_KEY
