# Parking App Documentation

## Introduction

This application demonstrates a complete solution for managing parking areas and calculating parking fees, built as per the requirements outlined in the RavenDB Work Assignment. It consists of four main views to handle different functionalities of the app.

### Application Views

1. **Main Screen (Home)**  
   Provides an overview of the application. This screen includes a description of the app's functionality and purpose, which is to manage parking areas and compute fees based on time, rates, and discounts.

2. **Parking Areas List**  
   Displays a list of all existing parking areas. Each area’s weekday and weekend rates, along with any discounts, are shown here. This view offers a quick summary of all available parking spaces in the system.

3. **Parking Area Management**  
   Allows users to add, edit, and delete parking areas. For each area, the following properties are managed:

   - **Name**: The name of the parking area.
   - **Weekday Rate (USD)**: Hourly rate during weekdays.
   - **Weekend Rate (USD)**: Hourly rate on weekends.
   - **Discount**: A percentage discount applied to the computed parking fee.

4. **Payment Calculator**  
   This view allows users to calculate the parking fee for a selected area. It considers:

   - **Selected Parking Area**: Chosen from available areas.
   - **Start and End Time**: Specifies the time range for parking.
   - **Day of the Week**: Determines if the rate is weekday or weekend.
   - **Currency**: USD by default, with options to convert to EUR and PLN based on the current exchange rate.

   The fee calculation occurs on the server, with optional currency conversion using rates from exchangeratesapi.io.

### Technical Stack

- **Frontend**: React
- **Backend**: Node.js (Express)
- **Database**: RavenDB
- **API for Currency Conversion**: exchangeratesapi.io

### Installation Guide

1. **Project Setup**: Extract the provided ZIP file.
2. **Frontend and Backend Installation**:

   - Run `npm install` in both `client` and `server` directories to install dependencies.

3. **Database Import**:

   - Import the provided RavenDB database dump into your RavenDB instance. This file contains pre-configured data for testing.

4. **Start the Application**:
   - Run the server (`npm start` in the `server` directory).
   - Run the client (`npm start` in the `client` directory).

### Usage

Upon launching, navigate to different views using the navbar. Each view's purpose and functionality are intuitive and aligned with the assignment's requirements.

Remigiusz Terek
remigiusz.remigiusz.terek@gmail.com
