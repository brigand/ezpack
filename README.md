
First install ezpack:

```sh
npm install --global ezpack
```

Then install the local dependencies

```sh
ezpack install
```

For web use create an index.html file:

```html
<!DOCTYPE html>
<html>
  <body>
    <script src="%ASSET_URL%/bundle.js"></script>
  </body>
</html>
```

And run a single build:

```sh
ezpack run web ./src/index.js
```

Or run the server

```sh
ezpack serve web ./scr/index.js 8080
```

Some more example commands:


```sh
ezpack run web ./src/index.js
ezpack run web ./src/index.js --watch
ezpack run web ./src/index.js --production
ezpack run node ./src/index.js
ezpack run node ./src/index.js --watch

ezpack serve web ./src/index.js 8080
ezpack serve web ./src/index.js 8080 --public-url=http://localhost:8080/foo
```

