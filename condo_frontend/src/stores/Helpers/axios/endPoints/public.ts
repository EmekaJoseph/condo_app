import { $instance, $instanceUnderground } from '../instances'

export default {
    recents() {
        return $instance.get(`deceased/recents`)
    },

    search(str: string) {
        return $instanceUnderground.get(`deceased/search/${str}`)
    },

    details(id: any) {
        return $instance.get(`deceased/details/${id}`)
    },

    condolences(id: any) {
        return $instanceUnderground.get(`condolences/${id}`)
    },

    postCondolence(obj: any) {
        return $instance.post(`condolence`, JSON.stringify(obj))
    },
}