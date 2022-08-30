interface exerciseValues {
    target: number,
    days: number[]
}

const exerciseparseArguements = (args: Array<string>): exerciseValues => {
    if (args.length<4) throw new Error ("Not enough arguements, exercise more!");
    if (args.slice(2).every(n=> !isNaN(Number(n)))){
        const target = Number(args[2]);
        const days = args.slice(3).map(n=>(Number(n)));
        return {target,days};
    }
    else {
        throw new Error('Provided values were not numbers!');
    }
};


interface ExerciseArray {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    averagehours: number
  }





  
const exerciseCalculator = ( days: Array<number>, target: number): ExerciseArray  => {

    const periodLength = days.length;
    const trainingDays = days.filter((day)=> day !== 0).length;
    const totalhours = days.reduce((start,curr)=>{
        return start+curr;
    }
        ,0);

    const averagehours = totalhours/7    ;

    let ratingDescription;
    let rating ;
    let success;
    if (averagehours<target){
        ratingDescription = "failed, try harder next week!";
        rating = 1;
        success = false;
        
    }
    else if (averagehours === target){
        ratingDescription = "You have just reached your target! Be sure to push on through!";
        rating = 2;
        success = true;
    }
    ratingDescription = "good job, be sure to keep it up";
    rating =3 ;
    success = true;


    const result = {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        averagehours
    };

    return result;

};

try {
    const {target, days} = exerciseparseArguements(process.argv);

    const result = exerciseCalculator(days, target);
    console.log(result);

} catch (error: unknown) {
    let errorMessage = 'Something bad happened :<';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      console.log(errorMessage);
}

export default exerciseCalculator;