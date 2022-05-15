const getNumberOfLikes = (bis, startDate, endDate) => {
    let counter = 0;
    bis.forEach(bi => {
        const {createdAt} = bi;
        const biDate = new Date(createdAt).getTime();
        if(startDate <= biDate && endDate >= biDate){
            counter++;
        }
    })
    return counter;
}

const getMaleFemaleRatio = (usersData) =>{
    let ratio = {male: 0, female:0};
    usersData.forEach(user => {
        const {data: {preferences: gender}} = user;
        if(gender === 'male') 
            ratio.male++;
        else 
            ratio.female++;
    })
    return ratio
}

module.exports = {
    getNumberOfLikes,
    getMaleFemaleRatio,
}