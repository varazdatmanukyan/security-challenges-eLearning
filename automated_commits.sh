#!/bin/bash
BRANCHES=(
master_branch
develop_branch
testing_branch
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