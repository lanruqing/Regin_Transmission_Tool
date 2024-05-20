import Koa from 'koa'
import route from 'koa-route'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'

import{getAll,addUrl,stop,start} from './downloadMethods.js'

const app = new Koa();
app.use(bodyParser());
app.use(cors());

const main = ctx => {
  ctx.response.body = 'Hello World';
};

async function getAllData (ctx) {
    let res = await getAll();
    ctx.response.body = res;
  
}
async function addByUrl (ctx) {
    let {url, dir} = ctx.request.body;
    let res = await addUrl(url, dir);
    console.log(`added ${res.name} @ ${dir}`)
    ctx.response.body = res;
}
async function stopDownload (ctx) {
    let {id} = ctx.request.body;
    console.log(`${id}`)
    let res = await stop(id);
    ctx.response.body = res;
}
async function startDownload (ctx) {
    let {id} = ctx.request.body;
    console.log(`${id}`)
    let res = await start(id);
    ctx.response.body = res;
}
app.use(route.get('/', getAllData));
app.use(route.get('/getAll', getAllData))
app.use(route.post('/addByUrl', addByUrl))
app.use(route.post('/stop', stopDownload))
app.use(route.post('/start', startDownload))
app.listen(3333);
console.log("START")