FROM python:3.10-slim

WORKDIR ./Weather-Wizard/services/data-collection-service/

COPY requirements.txt requirements.txt

RUN pip install --no-cache-dir -r requirements.txt

COPY . . 

CMD ["fastapi", "run", "./main.py", "--port", "8000"]