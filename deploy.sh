#!/usr/bin/env sh

if [[ "$DEPLOY_KEY" ]]; then
  GIT_SSH_COMMAND='ssh -i $DEPLOY_KEY'
fi

BUILD_NUMBER=${SNAP_PIPELINE_COUNTER:-DEV}

rm -rf deploy

git clone git@github.com:zonginator/zonginator.github.io.git deploy

cp -r dist/* deploy

cd deploy && git commit -am "Deploying build $BUILD_NUMBER" && git push