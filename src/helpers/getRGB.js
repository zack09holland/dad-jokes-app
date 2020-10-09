// Helper function to create rgb values based of the rating for the current vote
//
//  - We want to dynamically create colors that are representative of the rating
//       i.e. bright green for high upvoted jokes and red for bad jokes to help
//       visualize the quality of a joke
//  - It uses rgb(200,200,0) and subtracts from the red hue if the votes
//    are positive, or subtracts from the green hue if the votes are negative

function getRGB(rating) {
	if (rating > 0) {
		return `${200 - rating * 20}, 200,0`;
	} else {
		return `200,${200 - rating * -20},0`;
	}
}

export default getRGB;
