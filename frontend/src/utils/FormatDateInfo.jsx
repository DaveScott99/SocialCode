import moment from "moment/moment";

const dateFormat = (datePost) => {
    const postDate = moment(datePost);

    const now = moment();

    const diff = moment.duration(now.diff(postDate))

    const days = diff.days();
    const hours = diff.hours();

    if (days > 0) {
        return days + " d";
    }
    else if (days === 0) {
        return hours + " h";
    }
    
}

export {dateFormat};