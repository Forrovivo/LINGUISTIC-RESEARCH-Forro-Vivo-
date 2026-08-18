FROM python:3.12-slim

WORKDIR /app

COPY api/requirements.txt api/requirements.txt
RUN pip install --no-cache-dir -r api/requirements.txt

COPY api api
COPY data data
COPY schema schema

ENV PYTHONPATH=/app
ENV PORT=8080
ENV HOST=0.0.0.0
EXPOSE 8080

CMD ["python", "-m", "api"]
