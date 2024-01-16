import publicEndpoints from "./end_points_public"
import userEndPoints from "./end_points_account"

export default {
    ...publicEndpoints,
    ...userEndPoints,
}