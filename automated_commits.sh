#!/bin/bash
BRANCHES=(
"master_branch"
"insufficiently_proteced_credentials"
"insufficiently_proteced_credentials(2)"
"insufficiently_proteced_credentials(3)"
"xss_stored"
"xss_stored(2)"
"xss_stored(3)"
)
ORIGINALBRANCH=`git status | head -n1 | cut -c13-`
git commit -m $1
CHERRYCOMMIT=`git log -n1 | head -n1 | cut -c8-`
for BRANCH in "${BRANCHES[@]}";
do
    git stash;
    git checkout $BRANCH;
    git cherry-pick $CHERRYCOMMIT;
    git checkout $ORIGINALBRANCH;
    git stash pop;
done