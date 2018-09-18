#!/bin/bash
BRANCHES=(
  "insufficiently_proteced_credentials"
  "insufficiently_proteced_credentials(2)"
  "insufficiently_proteced_credentials(3)"
  "master"
  "unprotected_transport_of_credentials"
  "unprotected_transport_of_credentials(2)"
  "unprotected_transport_of_credentials(2)-2"
  "unprotected_transport_of_credentials-2"
  "xss_stored"
  "xss_stored(2)"
  "xss_stored(3)"
)

CHERRYCOMMIT=$1
for BRANCH in "${BRANCHES[@]}";
do
    git checkout $BRANCH;
    git cherry-pick $CHERRYCOMMIT;
done