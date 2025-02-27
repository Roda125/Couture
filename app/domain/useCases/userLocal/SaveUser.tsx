import {UserLocalRepositoryImpl} from "../../../data/repositories/UserLocalRepository";
import {UserLogin} from "../../entities/User";


const {save} = new UserLocalRepositoryImpl();

export const SaveUserUseCase = async (user: UserLogin) => {
    // El return no hace falta, pero ahora lo usaremos para hacer debug
    return await save(user)
}
