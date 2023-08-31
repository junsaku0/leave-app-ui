# Leave Application

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

## Local Host Server

Run `ng serve --proxy-config proxy.conf.json` for local hosting. Navigate to `http://localhost:4200/`. 

## Pages

This application features different pages for admin, managers, and employees having a unified landing page to navigate across pages.

### Landing Page

The landing page allows you to select the specific user page. With functionalities that allow you to filter by role and filter by name.
In general, all pages besides the landing page can navigate to other pages using a dropdown of the list of users and to gp back to the landing page.

### Admin Page

The admin page has access to several functionalities such as:
-> Viewing all Leaves in table or calendar view
-> View manager leaves and approve/reject them accordingly.
-> View employees and managers with the functionality to set the total leaves and to reset the respective used leave of each user.
-> Create employees and set their roles and manager if the user is an employee.

### Manager Page

The manager page has access to several functionalities such as:
-> View their personal leave applications with the ability to cancel their application.
-> Apply for a leave.
-> View their employees leave and approve or reject them accordingly.

### Employee Page

The emploee page has access to several functionalities such as:
-> View their personal leave applications with the ability to cancel their application.
-> Apply for a leave.

