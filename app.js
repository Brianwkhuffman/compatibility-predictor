const data = require('./data.js');
let input = data.getData();

const team = input.team;
const applicants = input.applicants;
let result = {
    scoredApplicants: []
};

function assignScore(applicantsArray) {
    const maxAttribute = 10;

    //adds an array with spicy levels of all team members
    const teamSpicyLevel = [(team[0].attributes.spicyFoodTolerance), (team[1].attributes.spicyFoodTolerance), (team[2].attributes.spicyFoodTolerance)]

    applicantsArray.forEach((person) => {
        let { intelligence, strength, endurance, spicyFoodTolerance } = person.attributes;

        let xFactor = spicyFoodTolerance;

        //sets weight of each attribute
        intelligence = (intelligence / maxAttribute) * .4;
        strength = (strength / maxAttribute) * .1;
        endurance = (endurance / maxAttribute) * .3;
        spicyFoodTolerance = (spicyFoodTolerance / maxAttribute) * .2;

        //rounds each attribute to 2nd decimal place
        let intScore = Math.round(intelligence * 100) / 100;
        let strScore = Math.round(strength * 100) / 100;
        let endScore = Math.round(endurance * 100) / 100;
        let spicyScore = Math.round(spicyFoodTolerance * 100) / 100;

        let finalScore;

        //last chance to tip the scale for a little boost
        if (xFactor >= Math.min(...teamSpicyLevel) && xFactor <= Math.max(...teamSpicyLevel)) {
            //will round first decimal place up if applicant spicyFoodTolerance is between lowest and highest of team members spicyFoodTolerance
            finalScore = (intScore + strScore + endScore + spicyScore).toFixed(1);
            finalScore = Number(finalScore)
        } else {
            //round down if not, sorry dude
            finalScore = Math.floor((intScore + strScore + endScore + spicyScore) * 10) / 10;
        }

        let finishedApplicant = { name: person.name, score: finalScore };
        result.scoredApplicants.push(finishedApplicant);
    })

    let resultJSON = JSON.stringify(result)
    return resultJSON;
}

console.log(assignScore(applicants));