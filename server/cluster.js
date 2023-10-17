const cluster = require('cluster')

function startWork() {
    const worker = cluster.fork()
    console.log(`Cluster ${worker.id} started`);
}

if (cluster.isMaster) {
    require('os').cpus().forEach(startWork)
    cluster.on('disconnect', worker => console.log(`Cluster ${worker.id} disconnect`))
    cluster.on('exit', (worker, code ,signal)=> {
        console.log(`Cluster ${worker.id} ended with ${code} ${signal}`);
        startWork()
    })
}else {
    const port = process.env.port || 3000;
    require('./hs')(port);
}