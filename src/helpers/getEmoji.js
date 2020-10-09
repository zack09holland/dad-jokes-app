// Helper function to create emoji classnames
//
//  - Depending on the rating of the joke we will dictate what kind of emoji best
//    represents the quality of the joke

function getEmoji(rating) {
    if (rating >= 15) {
        return "em em-rolling_on_the_floor_laughing";
    }
    else if(rating >= 12)    {
        return "em em-laughing";
    }
    else if(rating >= 9)    {
        return "em em-smiley";
    }
    else if(rating >= 6)    {
        return "em em-slightly_smiling_face";
    }
    else if(rating >= 3)    {
        return "em em-neutral_face";
    }
    else if(rating >= 0)    {
        return "em em-confused";
    }
    else{
        return "em em-angry";
    }
}

export default getEmoji;
