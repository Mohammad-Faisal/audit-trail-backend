import ErrorCodes from "./ErrorCodes";

export default class ErrorMessages {

    static getMessage(errorCode : number){
        switch (errorCode){
            case ErrorCodes.INVALID_USER_INFO : return "Community Not Found"
            default : return "Some Error Occurred";
        }
    }

}
