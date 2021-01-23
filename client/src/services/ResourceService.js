import ApiClient from './ApiClient'

export const __GetResources = async (accountId) => {
    try {
        const res = await ApiClient.get(`/resources/view/${accountId}`)       
        return res.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const __CreateResource = async (formData) => {
    console.log('__CreateResource formData:', formData)
    try {
        const res = await ApiClient.post(`/resources`, formData)
        return res.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const __DeleteResource = async (id) => {
    try {
        const res = await ApiClient.delete(`/resources/${id}`)
        return res.data
    } catch (error) {
        console.log(error)
        throw error
    }
}