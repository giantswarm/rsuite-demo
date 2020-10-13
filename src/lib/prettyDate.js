const prettyDate = function(time) {
    var date = new Date((time || "").replace(/-/g, "/").replace(/[TZ]/g, " ")),
        diff = (((new Date()).getTime() - date.getTime()) / 1000),
        day_diff = Math.floor(diff / 86400);

    if (isNaN(day_diff) || day_diff < 0) return;

    if (diff < 60) return "just now";
    if (diff < 120) return "1 minute ago";
    if (diff < 3600) return Math.floor(diff / 60) + " minutes ago";
    if (diff < 7200) return "1 hour ago";
    if (diff < 86400) return Math.floor(diff / 3600) + " hours ago";

    if (day_diff === 1) return "Yesterday";
    if (day_diff < 7) return day_diff + " days ago";
    if (day_diff < 31) return Math.ceil(day_diff / 7) + " weeks ago";
    
    let months_diff = day_diff / 30;
    if (months_diff === 12) return "1 year ago"
    if (months_diff < 24) return Math.ceil(months_diff) + " months ago";

    let year_diff = day_diff / 365;
    return Math.round(year_diff) + " years ago";
}

export default prettyDate;
