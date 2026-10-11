# ==============================================================
# Dockerfile for Nugget Full-Stack Application
# ==============================================================
FROM python:3.12-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=5000

# Set working directory inside container
WORKDIR /app

# Create a non-privileged user and group for security
RUN groupadd -r appgroup && useradd -r -g appgroup -d /app -s /sbin/nologin appuser

# Install Python dependencies first for optimal Docker layer caching
COPY requirements.txt /app/
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy application source code into the container
COPY . /app/

# Set ownership and execution permissions of files
RUN chown -R appuser:appgroup /app && \
    chmod +x /app/entrypoint.sh

# Switch to non-root user
USER appuser

# Expose web server port
EXPOSE 5000

# Container healthcheck using standard Python library (no extra tools needed)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD python -c "import urllib.request, sys; sys.exit(0 if urllib.request.urlopen('http://localhost:5000/').getcode() == 200 else 1)"

# Production entrypoint
CMD ["/app/entrypoint.sh"]

