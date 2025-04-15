import fastify from "fastify";
import { request } from "http";
import { json } from "stream/consumers";

const server = fastify({logger:true});

const teams = [
    {id: 1, name:"REDBULL", sede:"Áustria"},
    {id: 2, name:"MERCEDES", sede:"Brackley"},
    {id: 3, name:"McLaren", sede:"Woking, Surrey, Reino Unido"},
    {id: 4, name:"Ferrari", sede:"Italia"},
]

const drivers = [
    {id: 1, name:"Hamilton", team:"Mercedes"},
    {id: 2, name:"Max", team:"REDBULL"},
    {id: 3, name:"Piastri", team:"McLaren"},
    {id: 4, name:"LecClerc", team:"Ferrari"},
]

server.get("/teams", async(request, Response) => {
    Response.type("application/json").code(200);
    return{teams};
});

server.get("/drivers", async(request, Response) => {
    Response.type("application/json").code(200);
    return{drivers};

});

interface DriversParams{
    id:string
}

server.get<{Params: DriversParams}>("/drivers/:id", async(request, Response)=> {
    const id = parseInt(request.params.id);
    const driver = drivers.find( d => d.id === id);

    if(!driver) {
        Response.type("application/json").code(404);
        return { message: "Driver not found"};
    }else {
        Response.type("application/json").code(200);
        return {driver};
    }
})

server.listen({port: 3333}, ()=> {
    console.log("Server Init");
})