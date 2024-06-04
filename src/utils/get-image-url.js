import { BASE } from "../components/cosnt";

const getImageURL = (photo) => {
    return `${BASE}upload/${photo?._id}.${photo?.name.split('.')[1]}`
}

export default getImageURL;