import Koa from 'koa'
import route from 'koa-route'

import {TransmissionClient} from './transmission.js';

const app = new Koa();

const main = ctx => {
  ctx.response.body = 'Hello World';
};

const getAll = ctx =>{
    ctx.response.body = 'getAll';
}

async function getAllData (ctx) {
//   const res = await TransmissionClient.getAllData();
//   console.table(res)
    
    let res = await new Promise((resolve,reject)=>{
        TransmissionClient.get(function(err, result){
            if(err){
                console.log(err);
                reject(err)
            } else {
                const files = result.torrents.map(torrent => {
                   return {
                    "id": torrent.id,
                    "name": torrent.name,
                    "dir":torrent.downloadDir,
                    "finishDate":torrent.doneDate,
                    "percentDone":torrent.percentDone,
                    "status": torrent.status,
                    "size": torrent.totalSize
                   }
                });
                resolve(files)
            }
        });
    })
    // console.log(res)
    ctx.response.body = res;
  
}
app.use(route.get('/', main));
app.use(route.get('/getAll', getAllData))
app.listen(3000);