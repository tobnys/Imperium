(function () {
    let chosenEmpire;
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
            chosenEmpire = id;
            appendHTML(e);
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

})();