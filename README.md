# Codexist Case Study FE Client App
 The FE Vue.js client app for the fullstack project for Codexist Case Study (FE written with Vue.js (JS) and deployed on Render)  

# Recommended Tools
- Node.js (18.x or latest)
 - npm is also advised to handle required packages
- Vue (3.x or latest)
- VS Code (latest)

# SETUP
1. Using the main branch clone the repository to a path of your choice (preferably creating a new folder under a drive and cloning the repository under that fresh folder)
2. Using VS Code open up the folder
3. Make sure all node packages have been downloaded by opening a terminal running the command below at the project root folder:
  - npm install
5. Run "npm run serve" will allow you to run the client app on port 8071 on your localhost (the port can be changed inside the "vue.config.js" file)
6. Make sure you see a message similar to below:  
![codexist-case-study-fe-run-console](https://github.com/user-attachments/assets/510fa55a-4049-4660-b488-9e9fdbd6856f)
The FE server should now be running on port 8071 on your localhost  

# IMPORTANT NOTICE
There are some environment variables required to be able to run the project properly. Should you need these please get in touch with me and ask for these environment variables. These variables should be put inside a ".env" file on the project root folder.

# Project Dependencies
All the dependencies are listed inside the package.json file. The following list also shows these dependencies:

- "@googlemaps/js-api-loader": "^1.16.6",
- "@popperjs/core": "^2.11.8",
- "axios": "^1.7.2",
- "bootstrap": "^5.3.3",
- "bootstrap-vue-next": "^0.24.2",
- "core-js": "^3.8.3",
- "google-maps-js-api-loader": "^4.0.3",
- "vue": "^3.2.13",
- "vue-router": "^4.4.0"

# Environment Variables
The Vue.js app uses the following variables under the ".env" file.
- VUE_APP_BASE_URL=/
- VUE_APP_GOOGLE_MAPS_API_KEY=******PLEASE ASK FOR THE API KEY**********
- VUE_APP_SPRING_SERVER_BASE_URL=http://localhost:8070/
- VUE_APP_HOME_LATITUDE=40.999475649442175
- VUE_APP_HOME_LONGITUDE=29.071924563270844

The variables above should be added to the ".env" file without the "*" (dot) in the beginning, the rest of the lines should remain the same.

# Deployment
This web app is deployed and is accessible online at [Codexist Case Study FE](https://codexist-case-study-fe.onrender.com). The FE was deployed on Render. 
