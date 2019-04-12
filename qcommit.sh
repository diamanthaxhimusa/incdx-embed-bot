#!/bin/bash

current_branch=$(git branch | grep \* | tr -d ' *')
# BranchMaster=master
# if [$current_branch == $BranchMaster]
#     then
#         echo 'You are not in master'
# fi

git pull origin $current_branch
git add .
git commit -m "$1"
git push origin $current_branch
