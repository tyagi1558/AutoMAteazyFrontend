# Automateazy Task

## Overview

This project implements a Leads Management System using Angular. The system interacts with APIs from a provided Postman collection, featuring key functionalities such as:

## Features

- **Login**: Allows users to log in using their credentials.
  Includes form validation for email and password.
  Displays error messages for incorrect credentials..
- **Displaying All Leads**: Displays a list of all leads post-login.
Information includes Lead ID, Name, Phone, Email, Priority, Type, and Owner.
Pagination is implemented for easy navigation through leads.
- **Managing Favorite and Untouched Leads**: Allows users to mark and display their favorite leads, Lists leads that haven't been interacted with yet.
- **Searching for Leads**: A search bar that allows users to find specific leads using the provided API.
- **Adding New Leads**: A form to add new leads, with validation.
Dynamic dropdowns for source and college lists populated from API.
## Technologies Used

- **Angular**
- **PrimeNg**
- **Design**
- **API Integration**
- **Responsive**

## How to Run the Project

- **Prerequisites**
- **Node.js (v12 or higher)**
- **Angular CLI**

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/tyagi1558/AutoMAteazyFrontend.git
   

2. **Install dependencies:**:
   ```bash
   npm install

3. **Start the server:**

   ```bash
   ng serve

The server will start on http://localhost:4200 by default.
