import { $instance, $instanceForm } from './instances'

export default {
    userRegister(data: any) {
        return $instance.post(`account/register`, JSON.stringify(data))
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

    userUploadDeceased(form: FormData, id?: any) {
        const str: string = id ? `/admin/deceased/${id}` : `/admin/deceased`
        return $instanceForm.post(`${str}`, form)
    },

    userDeleteDeceased(id: any) {
        return $instance.delete(`admin/deceased/deleteRecord/${id}`)
    },

    userUploads(searchString = '', page = 1) {
        return $instance.get(`/admin/deceased/uploads?searchString=${searchString}&page=${page}`)
    },

    userAdmins(searchString = '', page = 1) {
        return $instance.get(`/admins/list?searchString=${searchString}&page=${page}`)
    },

    userDeleteAdmin(id: any) {
        return $instance.delete(`/admins/delete/${id}`)
    },

}