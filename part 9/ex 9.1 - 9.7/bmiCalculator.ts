interface bmiValues {
    height: number,
    weight: number
}

const bmiparseArguements = (args: Array<string>):bmiValues => {
    if (args.length<2) throw new Error("missing an input!");

    if (args.slice(2).every(n=>!isNaN(Number(n)))){
        return {
          height:Number(args[2]),
          weight:Number(args[3])
        };
    }
    else{
        throw new Error('Provided values are not numbers!');
    }
};

const bmiCalculator = (height: number, weight: number)=> {
    const  bmi = weight/((height/100)^2);
    
    if ( bmi <18.4) {
        return 'Not Normal (under weight)';
    }
    else if (bmi <24.9) {
        return 'Normal (Healthy weight)';
    }

    return 'Not Normal (over weight)';
};

try{
    const {height, weight} = bmiparseArguements(process.argv);
    const result = bmiCalculator(height,weight);
    console.log(result);
}  catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }


export default bmiCalculator;