# Add Social logins to your application with Auth0 with a single command

This schematic adds all that you need to get started with Auth0 authentication. It adds the required packages and service to integrate Auth0 authentication to your angular application.

### Pre-requisites

Sign up for an account with Auth0. Set up your social login keys and save CLIENT_ID and CLIENT_DOMAIN. This will be required by the schematic.

### Usage

```bash
ng add @deora_vipul/auth0-schematic
``` 
A login button will start appearing at the bottom of the screen. Clicking on opens up the Auth0 authentication page.

### Inputs

Key           |  Type         |   Desciption                                             |   Required
------------- | ------------- | ------------------------------------------------------   | -------------
redirectPath  | string        | Path to be redirected to after successful authentication | Yes
clientDomain  | string        | Client Domain as obtained from Auth0 registration        | Yes
clientId      | string        | Client ID as obtained from Auth0 registration            | Yes
project       | string        | Name of the project in case using a workspace             | No

### References

Visit the docs https://auth0.com/docs/quickstart/spa/angular2 for detailed explanation.

