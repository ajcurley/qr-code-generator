FROM ubuntu:22.04

# Configure system settings
ENV DEBIAN_FRONTEND=noninteractive
SHELL ["/bin/bash", "--login", "-c"]

# Set the working directory
WORKDIR /code

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
  curl \
  python3-dev \
  python3-pip

# Install Python dependencies
COPY requirements.txt .
RUN pip3 install -r requirements.txt

# Copy the application files
COPY . .

# Start the web server
CMD ["flask", "--app", "qr.app:app", "run", "--host", "0.0.0.0", "--port", "8000", "--debug"]
