import {UserInterface, UserLoginInterface} from "../entities/User";
import {ApiDeliveryResponse} from "../../data/sources/remote/models/ResponseApiDelivery";


export interface AuthRepository {
    register: (user: UserInterface) => Promise<ApiDeliveryResponse>;
    login: (user: UserLoginInterface) => Promise<ApiDeliveryResponse>;

}