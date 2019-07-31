import http from 'http';
import express from 'express';
import path from 'path';
import router from './routes';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.js';

const app = express();
const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
}));

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/', router);

// error handler
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// start server
const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
