import { $instance, $instanceForm } from '../instances'

export default {
    userRegister(data: any) {
        return $instance.post(`user/signup`, JSON.stringify(data))
    },

    userLogin(data: any) {
        return $instance.post(`user/login`, JSON.stringify(data))
    },

    userProfile() {
        return $instance.get(`/user/profile`)
    },

    userUpdateProfile(data: any) {
        return $instance.put(`user/profile`, JSON.stringify(data))
    },

    userProfilePicture(form: FormData, id?: any) {
        const str: string = id ? `/user/profile/picture/${id}` : `/user/profile/picture`
        return $instanceForm.post(`${str}`, form)
    },

}