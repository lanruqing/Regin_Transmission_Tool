import {TransmissionClient} from './transmission.js';

export function getAll(){
    return new Promise((resolve, reject)=>{
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
                    "size": Math.floor(torrent.totalSize/1024/1024/1024)
                   }
                });
                resolve(files);
            }
        });
    })
}
export function addUrl(url,downloadDir){
    return new Promise((resolve, reject)=>{
        TransmissionClient.addUrl(url,{"download-dir":downloadDir},function(err, result){
            if(err){
                console.log(err);
                reject(err)
            } else {
                // console.log(result)
                resolve(result);
            }
        });
    })
}

export function stop(id){
    return new Promise((resolve, reject) => {
        TransmissionClient.stop(id, function(err, result){
            if(err){
                reject(err);
            }
            resolve(result); //{ result: 'success' }
        });        
    })
}
export function start(id){
    return new Promise((resolve, reject) => {
        TransmissionClient.start(id, function(err, result){
            if(err){
                reject(err);
            }
            resolve(result); //{ result: 'success' }
        });        
    })
}