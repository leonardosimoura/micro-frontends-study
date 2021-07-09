import { Subject, tap } from 'rxjs';

const service = {
    receive: new Subject(),
    send: new Subject(),
}

service.receive.subscribe(data => {
    console.log("HOST - Send", data);
});

service.send.subscribe(data => {
    console.log("HOST - Receive", data);
});

export const serviceComunication = service;