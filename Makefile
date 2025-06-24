# Makefile for QLab: React (TS) + Azure Functions (Python)

PYTHON=python3.10
VENV=.venv
FRONTEND_DIR=frontend
BACKEND_DIR=api

## React 관련 명령어
install-frontend:
	cd $(FRONTEND_DIR) && npm install

dev-frontend:
	cd $(FRONTEND_DIR) && npm start

build-frontend:
	cd $(FRONTEND_DIR) && npm run build

## Python Functions 관련 명령어
install-backend:
	cd $(BACKEND_DIR) && $(PYTHON) -m venv $(VENV) && \
	. $(BACKEND_DIR)/$(VENV)/bin/activate && \
	pip install -r $(BACKEND_DIR)/requirements.txt

dev-backend:
	cd $(BACKEND_DIR) && . $(VENV)/bin/activate && func start

## 코드 정리/청소
clean:
	find . -type d -name '__pycache__' -exec rm -r {} +
	rm -rf $(BACKEND_DIR)/$(VENV)
	rm -rf $(FRONTEND_DIR)/node_modules

format:
	black $(BACKEND_DIR)

lint:
	flake8 $(BACKEND_DIR)
