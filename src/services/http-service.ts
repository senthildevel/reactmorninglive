import apiClient, { CanceledError } from "../services/api-client";

export interface Entity {
    id: number;
    name: string;
  }

//T - User / Product / Category 

class HttpService{

    endpoint:string;

    constructor(apiEndpoint:string){
        this.endpoint = apiEndpoint;
    }

    getList<T>(){
        const controller = new AbortController();
        const apiresponse = apiClient
        .get<T[]>(this.endpoint, {
          signal: controller.signal,
        }) // promise

        // return the 2 values - response, controller

        return {apiresponse, cancel: () => controller.abort()}
    }

    addItem<T>(entity:T){
       return apiClient
      .post(this.endpoint, entity)
    }

    delItem<T extends Entity>(entity:T){

        return apiClient.delete(this.endpoint+"/" + entity.id);
    }

    updateItem<T extends Entity>(entity:T){
        return  apiClient.patch(this.endpoint+"/" + entity.id, entity)
    }
}


//export default new HttpService("/users");

const create = (endpoint:string) => new HttpService(endpoint)
export default create;
export {CanceledError}

