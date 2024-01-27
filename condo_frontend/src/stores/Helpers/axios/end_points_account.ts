import { $instance, $instanceForm } from './instances'

export default {
    userRegister(data: any) {
        return $instance.post(`account/signup`, JSON.stringify(data))
    },

    userLogin(data: any) {
        return $instance.post(`account/login`, JSON.stringify(data))
    },

    userLogout() {
        return $instance.post(`account/logout`)
    },

    userProfile() {
        return $instance.get(`/account/profile`)
    },

    userUpdateProfile(data: any) {
        return $instance.put(`account/profile`, JSON.stringify(data))
    },

    userProfilePicture(form: FormData, id?: any) {
        const str: string = id ? `/account/profile/picture/${id}` : `/account/profile/picture`
        return $instanceForm.post(`${str}`, form)
    },

}