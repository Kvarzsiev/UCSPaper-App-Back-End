# Use the official PostgreSQL image from Docker Hub
FROM postgres:latest

# Set environment variables
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=1234
ENV POSTGRES_DB=postgres

# Expose the PostgreSQL port
EXPOSE 5432
