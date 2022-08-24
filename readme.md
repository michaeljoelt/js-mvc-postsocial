1. Create db with mongodb (atlast for Cloud)
2. run npm init to create package.json
3. install dependencies:
npm i express mongoose connect-mongo express-session express-handlebars dotenv method-override moment morgan passport passport-google-oaut20
 
    express - web framework to create routes
    mongoose - to work with db, create models
    connect-mongo - allows us to store sessions in db, so when restarting server we dont get logged out
    express-session - sessions and cookies
    express-handebars - template engine (can use pug or ejs instead)
    dotenv - for config, to put environment variables in
    method-override - allows put and delete requests from our templates (by default you can only make get and post requests)
    moment - formats dates
    morgan - for log in
    passport - for authentication
    passport-google-oauth20 - for authentication through google specifically
 
install dev dependencies:
npm i -D nodemon cross-env
 
    nodemon - restarts server after saving changes
    cross-env - want global/environment variable for node environment and its different depending on if your on windows, mac, etc. so using this to help be cross compatible

-------------

Current step: "Story Model"