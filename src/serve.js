import makeWebpackConfig from './makeWebpackConfig';
import url from 'url';
import fs from 'fs';
import webpack from 'webpack';
import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';

export default function serve(opts) {
  var config = makeWebpackConfig(opts);
  var compiler = webpack({...config});

  var handler = (err, stats) => {
    if (err) console.error(err);
    else console.error('Build success');
  };

  var app = express();
  app.use(url.parse(config.output.publicPath).path, webpackDevMiddleware(compiler));
  app.use('assets', express.static('assets'));
  app.get('*', (req, res) => {
    fs.readFile('index.html', 'utf-8', (err, data) => {
      if (err) {
        console.error('Could not read index.html');
        res.send(`<script>alert('Could not find index.html file in project root')</script>`);
        return;
      }

      data = data.replace(/%ASSET_URL%/g, config.output.publicPath);
      res.send(data);
    });
  });
  app.listen(opts.port);
  console.error('Webpack serving on port ' + opts.port);
}

