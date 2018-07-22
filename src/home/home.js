'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
	$locationProvider.hashPrefix('');
        $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'homeController'
         });
}])

.controller('homeController', ['$scope','$window',function($scope,$window) {
	
    $scope.byClient = ""; //To change the heading based on selected option
    $scope.invalidForm = "";//message returned when user submits invalid form
    $scope.displayLog = []; //stores the values displayed in the canvas
    
    // JSON containing datas to be displayed in the graph
    $scope.timesheetLog =[
        {
            name: "Jason Smith",
            timeSheetStart: "23/7/2018",
            timeSheetEnd: "07/8/2018",
            host: "Shark Tank",
            agency: "Supernova",
            hoursSubmitted: 40,
            hoursnotSubmitted: {
                total: 30,
                stillOnTime: 10,
                overDue: 20
            }
        },
         {
            name: "Robert Langdon",
            timeSheetStart: "23/7/2018",
            timeSheetEnd: "7/8/2018",
            host: "Oxford",
            agency: "Supernova",
            hoursSubmitted: 50,
            hoursnotSubmitted: {
                total: 20,
                stillOnTime: 15,
                overDue: 5
            }
        }, 

        {
            name: "Captain Clark",
            timeSheetStart: "23/7/2018",
            timeSheetEnd: "7/8/2018",
            host: "Skyjet",
            agency: "Supernova",
            hoursSubmitted: 56,
            hoursnotSubmitted: {
                total: 24,
                stillOnTime: 14,
                overDue: 10
            }
        }, 
           
         {
            name: "Wayne Rooney",
            timeSheetStart: "23/7/2018",
            timeSheetEnd: "7/8/2018",
            host: "Shark Tank",
            agency: "Supernova",
            hoursSubmitted: 30,
            hoursnotSubmitted: {
                total: 24,
                stillOnTime: 2,
                overDue: 22
            }
        }
    ];

        $scope.drawCanvas = function(){
            var canvas1 = document.getElementById("canvas1").getContext('2d');
            var canvas2 = document.getElementById("canvas2").getContext('2d');
        
// plugin for Chart to display label in the center of the chart
// Borrowed from StackOverflow
 //    https://stackoverflow.com/questions/43925652/multipe-doughnut-charts-on-one-page-with-text-in-center-using-chart-js
       
            Chart.pluginService.register({
            beforeDraw: function (chart) {
            var width = chart.chart.width,
                height = chart.chart.height,
                ctx = chart.chart.ctx;
            ctx.restore();

            // var fontSize = (height / 114).toFixed(2);
            ctx.font = 1 + "em sans-serif";
            ctx.textBaseline = "middle";
            var text = chart.config.options.elements.center.text,
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 1.5;
            ctx.fillText(text, textX, textY);
            ctx.save();
                }
            });

            //Destroy the existing instances of any previous charts 
            if($scope.myChart1!=null){$scope.myChart1.destroy(); console.log('chart1');}
            if($scope.myChart2!=null){$scope.myChart2.destroy(); console.log('chart2');}


            // First chart with two datasets for Submitted Timesheets
             $scope.myChart1 = new Chart(canvas1, {
                    type: 'doughnut',
                    data: {
                        labels: ["Submitted", "Not yet submitted","Still on time", "OverDue"],
                        datasets: [{
                            data: [$scope.displayLog[0].hoursSubmitted,$scope.displayLog[0].hoursnotSubmitted.total,0,0],
                            backgroundColor: [ "#41bd3d" ,"#c1c1c3","#145bf5", "#f71302"],
                            borderWidth: 0,
                            label: 'Submitted',
                            // labels: ["Submitted", "Not yet submitted", 'Still on time', 'OverDue']
                            },

                            {
                            data: [$scope.displayLog[0].hoursSubmitted,0,$scope.displayLog[0].hoursnotSubmitted.stillOnTime,$scope.displayLog[0].hoursnotSubmitted.overDue],
                            backgroundColor: ["#41bd3d" ,"#c1c1c3","#145bf5", "#f71302"],
                            borderWidth: 0,
                            label: 'Invoice Set',
                            // labels: [ "Submitted", "Not yet submitted","Still on time", "OverDue"]
                            }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: true,
                        cutoutPercentage: 40,
                        elements: {
                            center: {
                                //Gives sum of hours for all clients
                                text: (parseInt(($scope.displayLog[0].hoursSubmitted * 100)/ 
                                        ($scope.displayLog[0].hoursSubmitted + $scope.displayLog[0].hoursnotSubmitted.total)) + '%')
                            }

                        },
                        layout: {
                            padding: {
                                left: 0, right: 0, bottom: 0, top: 0
                            }

                        },
                        legend: {
                            position: 'top',
                            labels: {
                            fontSize: 11,
                            boxWidth: 10
                            }
                        },
                        
                        title: {
                            display: true,
                            text: 'Submitted timesheets',
                            fontSize: 14,
                            fontColor: '#6c6a6c'
                        },

                     }

                });
                 $scope.myChart2 = new Chart(canvas2, {
                    type: 'doughnut',
                    data: {
                        datasets: [{
                            data: [$scope.displayLog[0].hoursSubmitted,$scope.displayLog[0].hoursnotSubmitted.total],
                            backgroundColor: [ "#41bd3d" ,"#c1c1c3"],
                            borderWidth: [0,0,0,0]
                        }],
                        labels: ["Submitted", "Not yet submitted"]
                    },
                    options: {
                          responsive: true,
                          cutoutPercentage: 45,
                          maintainAspectRatio: true,
                           elements: {
                                center: {
                                    text: (parseInt(($scope.displayLog[0].hoursnotSubmitted.total * 100)/ 
                                        ($scope.displayLog[0].hoursSubmitted + $scope.displayLog[0].hoursnotSubmitted.total)) + '%')
                                }

                            },
                            layout: {
                                padding: {
                                    left: 0, right: 0, bottom: 0, top: 0
                                }
                            },
                            legend: {
                                position: 'top',
                                labels: {
                                    fontSize: 11,
                                    boxWidth: 10
                                    }
                            },
                            title: {
                                display: true,
                                text: 'Timesheets ready to invoice',
                                fontSize: 14,
                                fontColor: '#6c6a6c'
                            }
                    }
                });
            }

    //Email Client
        $scope.mailClient = function(){
        $window.open("mailto:client@gmail.com",'_self');
    }

    //Empty the input field after form is submitted
    $scope.emptyInputField = function(){
        $scope.inputName = "";
        $scope.startTime = "";
        $scope.endTime = "";
        $scope.host = "";
        $scope.agency = "";
        $scope.submittedHours = "";
        $scope.notSubmittedHours = "";
        $scope.onTime = "";
        $scope.overDue = "";
    }

   
    var getContent = document.getElementById('Content');
    var getDisplayChart = document.getElementById('doughnutChart');
    var getSubmitOption = document.getElementById('submitOption');

// Get values of displayLog for Total Clients
// Also call this function when allClients option is selected
    $scope.totalClients = function(){
        let totalSubmittedHours = 0, totalUnSubmittedHours = 0, totalOverDue = 0, totalOnTime =0;
        for(let eachClient of $scope.timesheetLog){
            totalSubmittedHours += eachClient.hoursSubmitted;
            totalUnSubmittedHours += eachClient.hoursnotSubmitted.total;
            totalOverDue += eachClient.hoursnotSubmitted.overDue;
            totalOnTime += eachClient.hoursnotSubmitted.stillOnTime;

        }
        $scope.displayLog = [];
        $scope.displayLog.push({
                hoursSubmitted: totalSubmittedHours,
                hoursnotSubmitted: {
                total: totalUnSubmittedHours,
                stillOnTime: totalOverDue,
                overDue: totalOnTime
                }
        });
        $scope.drawCanvas();
    }; $scope.totalClients();

    // Display form when the add timesheet button is clicked
    $scope.showForm = function(){
        $scope.invalidForm = "";
        $scope.emptyInputField();
        if(getContent.style.display == 'none'){
            getContent.style.display = 'block';
            getContent.style.overflow = "scroll";
            getDisplayChart.style.display = 'none';
            getSubmitOption.style.display = 'none';
            getContent.scrollTop = 0;
            document.getElementById('addTimesheet').innerHTML = "Hide Form";
            
        }
        else if(getContent.style.display == 'block'){
            getContent.style.display = 'none';
            getDisplayChart.style.display = 'block';
            getSubmitOption.style.display = 'inline-block';
            document.getElementById('addTimesheet').innerHTML = "Add TimeSheet";
        }
        else{
            getContent.style.display = 'block';
            getContent.style.overflow = "scroll";
            getDisplayChart.style.display = 'none';
            getSubmitOption.style.display = 'none';
            document.getElementById('addTimesheet').innerHTML = "Hide Form";

        }
    };

    //Execute remove client function
    $scope.removeClient= function(i){
        //remove elements in i index in the array
        $scope.timesheetLog.splice(i,1);   
    };


    // Get dd/mm/yyyy format from the UTC date
    $scope.changeDate = function(enteredDate){
        return( enteredDate.getDate()+ '/' + (enteredDate.getMonth() + 1) + '/' +
         enteredDate.getFullYear());
    }


    //Execute edit client function
    $scope.editClient = function(i){
        // assign the input values of respective client and open form
        console.log($scope.timesheetLog[i].timeSheetEnd);
        $scope.showForm();
        $scope.inputName = $scope.timesheetLog[i].name;
        $scope.host = $scope.timesheetLog[i].host;
        $scope.agency = $scope.timesheetLog[i].agency;
        $scope.submittedHours = $scope.timesheetLog[i].hoursSubmitted;
        $scope.notSubmittedHours = $scope.timesheetLog[i].hoursnotSubmitted.total;
        $scope.onTime = $scope.timesheetLog[i].hoursnotSubmitted.stillOnTime;
        $scope.overDue = $scope.timesheetLog[i].hoursnotSubmitted.overDue;
        
    };

    $scope.clientSelected = function(){
        $scope.displayLog = [];
        let i = 0; 
        
        while(i<$scope.timesheetLog.length){
            if($scope.timesheetLog[i].name == $scope.selectedClient.name){
                break;
            }
            i++;
        };
       
        let temp = ($scope.timesheetLog.slice(i,i+1));
        $scope.displayLog = [...temp];
        $scope.drawCanvas();
    }


//Hide the client's name select option when client is not selected
	$scope.hideOptionalSelect = function(){
        $scope.byClient = "";
		if($scope.mainSelectOption != 'Client'){
		document.getElementById('optionSelect').style.visibility = 'hidden';
        $scope.byClient = "";
        $scope.totalClients();
        }
        
		else{
			$scope.byClient = "by Client ";
			document.getElementById('optionSelect').style.visibility = 'visible';
		};
	}

    
    // Process when the form is submitted

    $scope.formSubmitted = function(){

        // First check if all the fields are filled

        if(!$scope.inputName || !$scope.startTime || !$scope.endTime ||
            !$scope.host || !$scope.submittedHours  || !$scope.notSubmittedHours ||
            !$scope.onTime  || !$scope.overDue  || !$scope.agency)
            {
                $scope.invalidForm = "Please fill all the fields before submitting";
                // Scroll back to the top
                 document.getElementById('Content').scrollTop = 0;
            }

        // Check all the input hours are >= 0 and match properly
        else if($scope.submittedHours<0 || $scope.notSubmittedHours<0 || $scope.onTime <0
                || $scope.overDue <0 || ($scope.notSubmittedHours !=  $scope.onTime + $scope.overDue))
                {
                    $scope.invalidForm = "Please double check the input hours";
                    // Scroll back to the top
                     document.getElementById('Content').scrollTop = 0;
                }

        //Check if the client is already in the table, just update or add new client 
        else{
            // checking if the client is already in the system
            let i = 0;
            let userFound = false;
            while(i<$scope.timesheetLog.length)
            {
                if($scope.inputName.toLowerCase() == $scope.timesheetLog[i].name.toLowerCase()){
                    userFound = true;
                    break;
                }
                i++;
            }

            if(userFound){
                // i will be the index of array with user's old data, so update it
                
                $scope.timesheetLog[i]= {
                    name: $scope.inputName,
                    timeSheetStart: $scope.changeDate($scope.startTime),
                    timeSheetEnd: $scope.changeDate($scope.endTime),
                    host: $scope.host,
                    agency: $scope.agency,
                    hoursSubmitted: $scope.submittedHours,
                    hoursnotSubmitted: {
                        total: $scope.notSubmittedHours,
                        stillOnTime: $scope.onTime,
                        overDue: $scope.overDue

                    }
                };
            }

            // New Client
            else{ 
                 $scope.timesheetLog.push({
                    name: $scope.inputName,
                    timeSheetStart: $scope.changeDate($scope.startTime),
                    timeSheetEnd: $scope.changeDate($scope.endTime),
                    host: $scope.host,
                    agency: $scope.agency,
                    hoursSubmitted: $scope.submittedHours,
                    hoursnotSubmitted: {
                        total: $scope.notSubmittedHours,
                        stillOnTime: $scope.onTime,
                        overDue: $scope.overDue

                    }
                });
            }

            $scope.invalidForm = "";
            $scope.showForm(); //hide the form and show screen with graphs
            $scope.emptyInputField(); //empty all the assigned values in inputs
    }
}   
       
}]);