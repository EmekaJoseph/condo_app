import { $instance, $instanceUnderground } from '../instances'

export default {
    recents() {
        return $instance.get(`deceased/recents`)
    },

    search(str: string) {
        return $instance.get(`deceased/search/${str}`)
    },

    details(id: any) {
        return $instance.get(`deceased/details/${id}`)
    },

    condolences(id: any) {
        return $instanceUnderground.get(`condolences/${id}`)
    },
}