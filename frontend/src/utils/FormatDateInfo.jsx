import moment from "moment/moment";

const dateFormat = (datePost) => {

    const now = moment();

    const postDate = moment(datePost).format();

    const diff = moment.duration(now.diff(postDate))

    const days = diff.days();
    const hours = diff.hours();
    const minute = diff.minutes();

    // return days + "d " + hours + "h " + minute + "m ";

    if (days > 0) {
        return days + " d";
    }
    else if (minute <= 59 && hours <= 0) {
        return minute + " min"
    }
    else{
        return hours + " h";
    }
}

export {dateFormat};