#!/usr/bin/env bash

export ENVIRONMENT="development"
export ENV_PUBLISH_API="DEVELOP"

export API_PORT=9000
export API_DEBUG_PORT=9229

export BACKEND_SOURCE_ROOT=$(pwd)/backend

export DB_PORT_EXTERNAL=5432
export DB_PORT=5432
export DB_HOST=db
export DB_NAME=postgres
export DB_USER=postgres
export DB_PASSWORD="1234"

export TOKEN_EXPIRE=180
export JWT_SECRET="QwaPPccjVXVTCQ9zgfxBMGU4nBRtcAjx"

export APP_BASE_URL=""
