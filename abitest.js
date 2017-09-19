function title() {
  return( process.stdout.write(`\n 
    ┌────────────────────────────┐
    │                            │
    │       #    ######  ###     │
    │      # #   #     #  #      │
    │     #   #  #     #  #      │
    │    #     # ######   #      │
    │    ####### #     #  #      │
    │    #     # #     #  #      │
    │    #     # ######  ###     │
    │                            │
    └────────────────────────────┘
     \n
     > Hi guys, this small piece of software will list 
     all mondays that are the end of month in a years range \n\n `));
};

function continue_attempt(){
    return(process.stdout.write(`\n\n Wanna try another pair of years?. Ctrl+C to exit()  \n\n`));    
}

var questions = [
    "Enter start year: ",
    "Enter end year: "
];

var answers = [];
var response = [];

function start(i){
  title();
  ask(0);
}

function ask(i){
  process.stdout.write(`\n ${questions[i]}`);
  process.stdout.write("> ");
}

process.stdin.on('data', function(data){ 
  answers.push(data.toString().trim());
  if( answers.length < questions.length){
      ask(answers.length);
  }else{
      check_answers();
  }
});

function check_answers(){
    if((answers[0] === "") && (answers[1] === "")){
        process.stdout.write(`\n You do not provide any answer to the questions. \n 
Please try again \n`);
        answers = [];
        ask(0);
    }else if((answers[0] !== "") && (answers[1] === "")){
        process.stdout.write(`\n You do not provide an end Date. \n 
We´re gonna calculate only the ${answers[0]} year \n`);
        init(answers[0], 0);
    }else if((answers[0] === "") && (answers[1] !== "")){
        process.stdout.write(`\n You do not provide a start Date. \n 
We´re gonna calculate only the ${answers[1]} year \n`);
        init(0, answers[1]);
    }else if((answers[0] !== "") && (answers[1] !== "")){
        if(answers[0] === answers[1]){
            process.stdout.write(`\n You enter the same years, please enter two different years  
or just one to calculate, let´s start over \n`);
            answers = [];
            ask(0);
        }else{
            init(answers[0], answers[1]);
        }
    }; 
}

function init(startYear, endYear){

    if(startYear == 0){
        startYear = parseInt(endYear) ;
    }
    if(endYear == 0){
        endYear = parseInt(startYear) ;
    }

    diff(startYear, endYear);
}

function diff(startYear, endYear){
    
    if( endYear < startYear ){
        process.stdout.write(`\n\n You enter a greater end date than startDate and we 
need to be sure on what are you doing. Let´s start over  \n`);
        answers = [];
        ask(0);
    }else{
        process_dates(startYear, endYear);
    }
}

function process_dates(startYear, endYear){
    startYearInt = parseInt(startYear);
    endYearInt = parseInt(endYear);
    month = 0;
    
    for(i = startYearInt; i <= endYearInt; i++){
        for(j = 1; j <= 12; j++){
            var d = new Date(i, month + j, 0);
            if(d.getDay() == 1){
                var dateString = (d.getMonth()+1) + "/" +  d.getDate() + "/" + d.getFullYear();
                response.push(dateString);
            }
        }
    }

    render();
};

function render(){
   
    bigString = response.join();
    parsedString  = bigString.replace(/[, ]+/g, " ").trim();
    process.stdout.write(`\n ${parsedString} \n`);
    keep_process_alive();
}

function keep_process_alive(){
    answers = [];
    response = [];
    continue_attempt();
    ask(0);
}
start(0);
