$(document).ready(function () {
	$("#content").on("click", "h4", function ()  {
		$(this).siblings().slideToggle(200);
	});
	
	$("#nation").change(function () {
		$("#content").fadeOut(200).delay(200).empty();
		
		var nationSelect = $(this).val();
		getNationStats(nationSelect);
		
		$("#content").fadeIn(600);
	});
	
});

var showTeamStats = function (nationStats) {
	
	// team stats
	var team = $(".templates .template-team").clone();
	
	team.find(".team-nation").text(nationStats[0].name);
	team.find(".team-logo").attr("src", nationStats[0].logo);
	team.find(".team-group-stat").text(nationStats[0].group);
	team.find(".team-position-stat").text(nationStats[0].groupRank);
	team.find(".team-table-played").text(nationStats[0].matchesPlayed);
	team.find(".team-table-won").text(nationStats[0].wins);
	team.find(".team-table-loss").text(nationStats[0].losses);
	team.find(".team-table-draw").text(nationStats[0].draws);
	team.find(".team-table-for").text(nationStats[0].goalsFor);
	team.find(".team-table-against").text(nationStats[0].goalsAgainst);
	team.find(".team-table-diff").text(nationStats[0].goalsDiff);
	team.find(".team-table-pts").text(nationStats[0].groupPoints);
	
	return team;
};

var showPlayerStats = function (nationStats, stat) {
	var playerReturn = _.max(nationStats[0].players, function (p) {
		return p[stat];
	});
	
	var playerStat = playerReturn[stat];
	if (playerStat > 0) {
		var player = $(".templates .template-player").clone();
		
		if (stat === "goals") {
			player.find(".player-stat-type").text("Goal");
		} else if (stat === "ownGoals") {
			player.find(".player-stat-type").text("Own Goal");
		} else if (stat === "penaltyGoals") {
			player.find(".player-stat-type").text("Penalty");
		} else if (stat === "assists") {
			player.find(".player-stat-type").text("Assist");
		} else if (stat === "yellowCards") {
			player.find(".player-stat-type").text("Yellow");
		} else if (stat === "redCards") {
			player.find(".player-stat-type").text("Red");
		}

		player.find(".player-nickname").text(playerReturn.nickname);
		player.find(".player-stat").text(playerStat);
		player.find(".player-logo").attr("src", playerReturn.image);
		player.find(".player-firstname").text(playerReturn.firstName);
		player.find(".player-surname").text(playerReturn.lastName);
		player.find(".player-age").text(playerReturn.age);
		player.find(".player-position").text(playerReturn.position);
	} else {
		player = "";
	}
	return player;
};

var showError = function(error){
	var errorElem = $('.templates .error').clone();
	var errorText = '<p>' + error + '</p>';
	errorElem.append(errorText);
};

var getNationStats = function (nation) {
	var request = {
		name: nation,
		includes: "player",
		apikey: "170011db9d26715cd7b8646d0c9721e4"
	};

	var nationStats = $.ajax({
		url: "http://worldcup.kimonolabs.com/api/teams",
		data: request,
		dataType: "json",
		type: "GET",
		})
	.done(function(nationStats){
		$('#content').append(showTeamStats(nationStats));
		$('#content').append(showPlayerStats(nationStats, "goals"));
		$('#content').append(showPlayerStats(nationStats, "ownGoals"));
		$('#content').append(showPlayerStats(nationStats, "penaltyGoals"));
		$('#content').append(showPlayerStats(nationStats, "assists"));
		$('#content').append(showPlayerStats(nationStats, "yellowCards"));
		$('#content').append(showPlayerStats(nationStats, "redCards"));
	})
	.fail(function(jqXHR, error, errorThrown){
		$('#content').append(showError(error));
	});
	
	
};