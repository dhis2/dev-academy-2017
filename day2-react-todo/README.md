# ADDING REDUX

Check out the branch for `redux-todo` to see how redux
can be added to this application.

`git checkout redux-todo`
`npm install`
`npm start`

# SCRIPTS

`npm install`       #--- installs the deps
`npm start`         #--- serves the app at http://localhost:3000
`npm run build`     #--- builds the app to `build/`

# APP STRUCTURE

```
my-app/
  README.md
  node_modules/
  package.json
  public/           #--- only files in this dir can be used from index.html
    index.html
    favicon.ico
  src/              #--- put all your css and js in here
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
```

# MUST HAVE THESE FILES!!

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

# TO USE D2-UI

You have to downgrade react to 15:

Inside `package.json` you have to change:

```
  "dependencies": {
    "react": "^16.0.0",
    "react-dom": "^16.0.0",
  },
```

to something like:


```
  "dependencies": {
    "react": "^15.0.0",
    "react-dom": "^15.0.0",
  },
```
