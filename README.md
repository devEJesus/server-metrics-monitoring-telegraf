# Project Overview

This project consists of two main sections: a client-side dashboard built with Vue3 and a server-side WebSocket server implemented in Node.js. The client dashboard connects to the WebSocket server to receive real-time data exported by Telegraf from a PostgreSQL database. Additionally, the server features a simple notification system that sends email alerts based on defined parameters.

## Client (client_v2)

### Installation

1. Navigate to the `client_v2` directory.
2. Run `npm install` to install dependencies.

### Usage

1. After installing dependencies, start the development server with `npm run dev`.
2. Access the dashboard through the provided URL (by default, http://localhost:3000).
3. The dashboard will connect to the WebSocket server automatically to display real-time data.

### Structure

- `src`: Contains the source code for the Vue3 dashboard.
- `src/components`: Vue components used throughout the dashboard.
- `src/layout`: Layout components for the dashboard.
- `src/service`: Services for fetching data.
- `src/views`: Views and pages of the dashboard.
- `src/assets`: Static assets like images and stylesheets.

## Server

### Installation

1. Navigate to the `server` directory.
2. Run `npm install` to install dependencies.

### Usage

1. After installing dependencies, start the server with `npm start`.
2. The server will establish WebSocket connections with clients and broadcast data from the PostgreSQL database.
3. Make sure to configure Telegraf to export data to the PostgreSQL database specified in the server configuration.

### Structure

- `src`: Contains the source code for the WebSocket server.
- `src/outputs`: Output modules for handling different data sources.
  - `file.js`: Output module for exporting data to files.
  - `postgres.js`: Output module for exporting data to PostgreSQL database.
- `src/services`: Notification service for sending emails.
- `src/utils`: Utility functions and constants.
- `src/ws`: WebSocket server implementation.

### Telegraf Configuration

Make sure to include the Telegraf configuration file (`telegraf.conf`) used to export data to the PostgreSQL database. You can place this file in the `server` directory.

### Environment Variables

Create a `.env` file in the `server` directory and configure the following environment variables:

```plaintext
####### NOTIFICATIONS #######
# Define the thresholds for triggering notifications based on CPU, disk, memory, and processes usage.
NOTIFICATION_CPU=70
NOTIFICATION_DISK=70
NOTIFICATION_MEMORY=70
NOTIFICATION_PROCESSES=100

####### DATABASE #######
# Configure the PostgreSQL database connection parameters.
DB_HOST="localhost"          # Hostname of the PostgreSQL server.
DB_USER="postgres"           # Username for database authentication.
DB_PASSWORD="edgar"          # Password for the specified user.
DB_PORT=5432                 # Port number on which PostgreSQL is running.
DB_DATABASE="telegraf_data"  # Name of the database storing Telegraf data.
DB_MAX_CLIENTS=10            # Maximum number of clients allowed to connect to the database.
DB_CLOSE_AFTER=30000         # Time in milliseconds after which idle clients are closed.

####### EMAIL #######
# Configure the SMTP server settings for sending email notifications.
EMAIL_HOST="smtp.mailtrap.io"     # Hostname of the SMTP server.
EMAIL_PORT=2525                    # Port number for the SMTP server.
EMAIL_USERNAME="a949f71592f966"    # Username for SMTP authentication.
EMAIL_PASSWORD="a3a654afc7d387"    # Password for SMTP authentication.
EMAIL_FROM="dev.e.jesus@gmail.com" # Email address from which notifications will be sent.
EMAIL_TO="dev.e.jesus@gmail.com"   # Email address(es) to which notifications will be sent.
