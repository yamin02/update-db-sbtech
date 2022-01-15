module.exports.dateformat = (daysNum) => {
    const now = new Date().toLocaleDateString("en-US").split('/');
    var startday = new Date()
    startday.setDate(startday.getDate() - daysNum);
    var then = startday.toLocaleDateString("en-US").split('/')
    return {
        today : `${now[2]}-${now[0]>=10? now[0]:`0${now[0]}`}-${(now[1]>=10)? now[1]: `0${now[1]}`}` ,
        startday : `${then[2]}-${then[0]>=10?then[0]:`0${then[0]}`}-${(then[1]>=10)? then[1]: `0${then[1]}`}` 
    }
}


