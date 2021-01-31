import ErrorCodes from "./ErrorCodes";

export default class ErrorMessages {

    static getMessage(errorCode : number){
        switch (errorCode){
            case ErrorCodes.USER_NOT_FOUND : return "User Info Not Found"
            case ErrorCodes.SITE_NOT_FOUND : return "Site Info Not Found"
            default : return "Some Error Occurred";
        }
    }

}
