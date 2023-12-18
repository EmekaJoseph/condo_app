import publicEndpoints from "./endPoints/public"
import userEndPoints from "./endPoints/user"

export default {
    ...publicEndpoints,
    ...userEndPoints,
}