import makeWebpackConfig from './makeWebpackConfig';
import webpack from 'webpack';

export default function run(opts) {
  var config = makeWebpackConfig(opts);
  var compiler = webpack({...config});

  var handler = (err, stats) => {
    if (err) console.error(err);
    else console.error('Build success');
  };

  compiler.run(handler);

  if (opts.watch) {
    compiler.watch({}, handler);
  }
}

