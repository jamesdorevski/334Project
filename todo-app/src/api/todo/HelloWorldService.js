import Axios from "axios";

class HelloWorldService {
    executeHelloWorldService(){
        return Axios.get('http://localhost:8080/hello-world');
    }

    executeHelloWorldBeanService(){
        return Axios.get('http://localhost:8080/hello-world-bean');
    }

    executeHelloWorldPathVariableService(name){
        return Axios.get(`http://localhost:8080/hello-world/path-variable/${name}`); //TICK

    }
}

export default new HelloWorldService()