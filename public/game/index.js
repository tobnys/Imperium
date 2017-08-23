(function () {
    let empire;
    let currentView = "overview";

    const entities = {
        "workers": {
            cost: 100,
            revenue: 10
        },
        "industryBuilding": {
            cost: 500,
            revenue: 25
        },
        "company": {
            cost: 2000,
            revenue: 100
        }
    }

    // GET CALL TO API IN ORDER TO RETRIEVE INFORMATION ABOUT THE 3 BASE EMPIRES
    $.ajax({
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        url: `http://localhost:8080/api/empire/`
    }).then(function(e){
        console.log(`Updating empire stats...`)
        // UPDATING EMPIRE 1
        $("#e-name-1").text(e[0].name);
        $("#e-stats-1").text(`Level: ${e[0].level} | Score: ${e[0].score} | Money: $${e[0].money}`)
        // UPDATING EMPIRE 2
        $("#e-name-2").text(e[1].name);
        $("#e-stats-2").text(`Level: ${e[1].level} | Score: ${e[1].score} | Money: $${e[1].money}`)
        // UPDATING EMPIRE 3
        $("#e-name-3").text(e[2].name);
        $("#e-stats-3").text(`Level: ${e[2].level} | Score: ${e[2].score} | Money: $${e[2].money}`)
    });


    // DISABLE NAVBAR BUTTONS ON INITIAL LOAD
    $(".gameNav a").css("pointer-events", "none")

    // TOGGLE STAT LIST ON INITIAL LOAD
    $(".stat-list").animate({
        opacity: 0,
    }, 1, function(){
        console.log("Stat list faded out");
    });

    // TOGGLE OVERVIEW ON INITIAL LOAD
    $(".overview").fadeToggle(0, function(){
        console.log("Overview faded out");
    });

    // TOGGLE ECONOMICS VIEW ON INITIAL LOAD
    $(".v-economics").fadeToggle(0);

    // UPDATE STATS
    function updateCurrentStats() {
        // ECONOMICS VIEW
        $("#e-name").text(`${empire.name}`);
        $("#e-score").text(`${empire.score}`);
        $("#e-level").text(`${empire.level}`);
        $("#e-money").text(`$${empire.money}`);
        // OVERVIEW VIEW
        $("#o-name").text(`${empire.name}`);
        $("#o-score").text(`${empire.score}`);
        $("#o-level").text(`${empire.level}`);
        $("#o-money").text(`$${empire.money}`);
        // CRATE VIEW
        $("#c-name").text(`${empire.name}`);
        $("#c-score").text(`${empire.score}`);
        $("#c-level").text(`${empire.level}`);
        $("#c-money").text(`$${empire.money}`);
    };
    
    // TICK FUNCTION FOR STAT UPDATES
    function statUpdateTick() {
        updateCurrentStats();
    }
    
    function saveStatsToServer() {
        console.log("trying to save to server");
        $.ajax({
            type: "PUT",
            dataType: "json",
            data: JSON.stringify(empire)    ,
            contentType: "application/json",
            url: `http://localhost:8080/api/empire/${empire.id}`,
            success: function(success) {
                console.log(JSON.stringify(empire));
            },
            error: function(error) {
                console.log("Error saving to server.");
                console.log(error);
            }
        });
    };    
    // CHECK WHICH EMPIRE IS CHOSEN
    $(".js-e-btn-1").click(function(){initiateGame(1);});
    $(".js-e-btn-2").click(function(){initiateGame(2);});
    $(".js-e-btn-3").click(function(){initiateGame(3);});

    // INITIATE GAME, RUN FUNCTIONS NEEDED FOR GAME
    function initiateGame(id) {
        $.ajax({
            type: "GET",
            dataType: "json",
            contentType: "application/json",
            url: `http://localhost:8080/api/empire/${id}`
        }).then(function(e){
            console.log(`Empire ID ${id} selected.`)
            empire = e;
            empire.id = id;
            console.log(empire);
            appendHTML(e);

            // SET INTERVALS FOR FUNCTIONS REGARDING STATS TO RUN
            setInterval(statUpdateTick, 100);
            setInterval(saveStatsToServer, 10000);

            // MONEY GENERATION
            setInterval(workerMoneyGeneration, 1000);
            setInterval(industryMoneyGeneration, 1000);
            setInterval(companyMoneyGeneration, 1000);

            // ENABLE CLICKING OF NAVIGATION TABS
            $(".gameNav a").css("pointer-events", "auto");
        });
    };

    function appendHTML(e) {
        // FADE IN TOP STATS
        $(".stat-list").animate({
            opacity: 1,
        }, 1000, function(){
            console.log("Stat list faded in");
        });

        // ADD CONTENT TO TOP STATS
        $("#name").text(e.name);
        console.log(e.name);
        $("#score").text(e.score);
        $("#level").text(e.level);
        $("#money").text(`$${e.money}`);
        
        // FADE OUT PRE-OVERVIEW CLASS
        $(".pre-overview").fadeToggle(800, function(){
            console.log("Pre-overview faded out.")

            // FADE IN MAIN OVERVIEW CLASS
            $(".overview").fadeToggle(800, function(){
                console.log("Overview faded in.")
            });
        });
    };

    $(`#o-economics`).click(function(){
        if(currentView === "economics"){
            console.log("Already on same view");
        }
        else {
            $(`.v-${currentView}`).fadeToggle(500, function(){
                if(currentView === "overview"){
                    $(".v-economics").fadeToggle(500);
                    currentView = "economics";

                    // UPDATE STATS ON ECONOMICS PAGE FOR COSTS AND AMOUNTS
                    // WORKER
                    let workerValue;
                    if(empire.workers === 0) {
                        workerValue = COST_DATA.workers;
                    }
                    else {
                        workerValue = COST_DATA.workers*empire.workers;
                    }

                    $("#worker-cost").text(`Cost: $${workerValue}`);
                    $("#js-worker-amount").text(empire.workers);

                    // INDUSTRY
                    let industryValue;
                    if(empire.industryBuildings === 0) {
                        industryValue = COST_DATA.industryBuildings;
                    }
                    else {
                        industryValue = COST_DATA.industryBuildings*empire.industryBuildings;
                    }


                    $("#industry-cost").text(`Cost: $${industryValue}`);
                    $("#js-industry-amount").text(empire.industryBuildings);

                    // COMPANY
                    let companyValue;
                    if(empire.companies === 0) {
                        companyValue = COST_DATA.companies;
                    }
                    else {
                        companyValue = COST_DATA.companies*empire.companies;
                    }

                    $("#company-cost").text(`Cost: $${companyValue}`);
                    $("#js-company-amount").text(empire.companies);
                }
                if(currentView === "crates") {
                    $(".v-crates").fadeToggle(500);
                    $(".v-overview").fadeToggle(500);
                }
            });
        }
    });
    
    $(`#e-economics`).click(function(){
        if(currentView === "economics"){
            console.log("Already on same view");
        }
        else {
            $(`.v-${currentView}`).fadeToggle(500, function(){
                if(currentView === "overview"){
                    $(".v-economics").fadeToggle(500);
                    currentView = "economics";
                    $("#e-name").text(empire.name);
                    $("#e-score").text(empire.score);
                    $("#e-level").text(empire.level);
                    $("#e-money").text(`$${empire.money}`);

                    // UPDATE STATS ON ECONOMICS PAGE FOR COSTS AND AMOUNTS
                    // WORKER
                    let workerValue;
                    if(empire.workers === 0) {
                        workerValue = COST_DATA.workers;
                    }
                    else {
                        workerValue = COST_DATA.workers*empire.workers;
                    }

                    $("#worker-cost").text(`Cost: $${workerValue}`);
                    $("#js-worker-amount").text(empire.workers);

                    // INDUSTRY
                    let industryValue;
                    if(empire.industryBuildings === 0) {
                        industryValue = COST_DATA.industryBuildings;
                    }
                    else {
                        industryValue = COST_DATA.industryBuildings*empire.industryBuildings;
                    }

                    $("#industry-cost").text(`Cost: $${industryValue}`);
                    $("#js-industry-amount").text(empire.industryBuildings);

                    // COMPANY
                    let companyValue;
                    if(empire.companies === 0) {
                        companyValue = COST_DATA.companies;
                    }
                    else {
                        companyValue = COST_DATA.companies*empire.companies;
                    }

                    $("#company-cost").text(`Cost: $${companyValue}`);
                    $("#js-company-amount").text(empire.companies);
                }
                if(currentView === "crates") {
                    $(".v-crates").fadeToggle(500);
                    $(".v-overview").fadeToggle(500);
                }
            });
        }
    });

    $(`#o-overview`).click(function(){
        if(currentView === "overview"){
            console.log("Already on same view");
        }
        else {
            $(`.v-${currentView}`).fadeToggle(500, function(){
                if(currentView === "economics"){
                    $(".v-overview").fadeToggle(500);
                    currentView = "overview";
                }
                if(currentView === "crates") {
                    $(".v-crates").fadeToggle(500);
                    $(".v-economics").fadeToggle(500);
                }
            });
        }                       
    });

    $(`#e-overview`).click(function(){
        if(currentView === "overview"){
            console.log("Already on same view");
        }
        else {
            $(`.v-${currentView}`).fadeToggle(500, function(){
                if(currentView === "economics"){
                    $(".v-overview").fadeToggle(500);
                    currentView = "overview";
                }
                if(currentView === "crates") {
                    $(".v-crates").fadeToggle(500);
                    $(".v-economics").fadeToggle(500);
                }
            });
        }                       
    });

    //////////////////////////////////////////////////////////////
    ////////////// ECONOMICS SECTION ////////////////////////////
    //////////////////////////////////////////////////////////////

    const COST_DATA = {
        "workers": 100,
        "industryBuildings": 500,
        "companies": 2000
    }

    const REVENUE_DATA = {
        "workers": 5,
        "industryBuildings": 20,
        "companies": 50
    }

    // INITIATE WORKER ON BUTTON CLICK
    $(".js-buy-worker").click(function(){
        var newCost = COST_DATA.workers*empire.workers;
        if(empire.money >= newCost) {
            initiateWorker();
            $("#js-worker-amount").text(empire.workers);
        }
        // CREATE VISUAL ERROR MESSAGE HERE // MODAL?
        else console.log("Not enough money..");
    });

    // INITIATE WORKER ON BUTTON CLICK
    $(".js-buy-industry").click(function(){
        var newCost = COST_DATA.industryBuildings*empire.industryBuildings;
        if(empire.money >= newCost) {
            initiateIndustry();
            $("#js-industry-amount").text(empire.industryBuildings);
        }
        // CREATE VISUAL ERROR MESSAGE HERE // MODAL?
        else console.log("Not enough money..");
    });

    // INITIATE WORKER ON BUTTON CLICK
    $(".js-buy-company").click(function(){
        var newCost = COST_DATA.companies*empire.companies;
        if(empire.money >= newCost) {
            initiateCompany();
            $("#js-company-amount").text(empire.companies);
        }
        // CREATE VISUAL ERROR MESSAGE HERE // MODAL?
        else console.log("Not enough money..");
    });

    // INITIATE A WORKER 
    function initiateWorker() {
        var newCost;
        if(empire.workers === 0) {
            $("#worker-cost").text(`Cost: $${COST_DATA.workers}`);
            empire.money = empire.money-100;
            empire.workers = empire.workers+1;
            newCost = COST_DATA.workers*empire.workers;
        }
        else {
            empire.workers = empire.workers+1;
            newCost = COST_DATA.workers*empire.workers;
            empire.money = empire.money-newCost;
            $("#worker-cost").text(`Cost: $${newCost}`);
        } 
    }
    function workerMoneyGeneration(){
        empire.money = empire.money+empire.workers*REVENUE_DATA.workers;
    }

    // INITIATE AN INDUSTRY
    function initiateIndustry() {
        var newCost;
        if(empire.industryBuildings === 0) {
            $("#industry-cost").text(`Cost: $${COST_DATA.industryBuildings}`);
            empire.money = empire.money-100;
            empire.industryBuildings = empire.industryBuildings+1;
            newCost = COST_DATA.industryBuildings*empire.industryBuildings;
        }
        else {
            empire.industryBuildings = empire.industryBuildings+1;
            newCost = COST_DATA.industryBuildings*empire.industryBuildings;
            empire.money = empire.money-newCost;
            $("#industry-cost").text(`Cost: $${newCost}`);
        } 
    }
    function industryMoneyGeneration(){
        empire.money = empire.money+empire.industryBuildings*REVENUE_DATA.industryBuildings;
    }

    // INITIATE A COMPANY
    function initiateCompany() {
        var newCost;
        if(empire.companies === 0) {
            $("#company-cost").text(`Cost: $${COST_DATA.companies}`);
            empire.money = empire.money-100;
            empire.companies = empire.companies+1;
            newCost = COST_DATA.workers*empire.companies;
        }
        else {
            empire.companies = empire.companies+1;
            newCost = COST_DATA.companies*empire.companies;
            empire.money = empire.money-newCost;
            $("#company-cost").text(`Cost: $${newCost}`);
        } 
    }
    function companyMoneyGeneration(){
        empire.money = empire.money+empire.companies*REVENUE_DATA.companies;
    }

})();