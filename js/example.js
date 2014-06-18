$(document).ready( function() {
	$('.unanswered-getter').submit( function(event){
		// zero out results if previous search has run
		//$('.results').html('');
		$('.results').empty();
		// get the value of the tags the user submitted
		var tags = $(this).find("input[name='tags']").val();
		getUnanswered(tags);
	});
	
	$('.inspiration-getter').submit( function(event){
		// zero out results if previous search has run
		//$('.results').html('');
		$('.results').empty();
		// get the value of the tags the user submitted
		var tag = $(this).find("input[name='answerers']").val();
		getTopAnswerers(tag);
	});
});

// this function takes the question object returned by StackOverflow 
// and creates new result to be appended to DOM
var showQuestion = function(question) {
	
	// clone our result template code
	var result = $('.templates .question').clone();
	
	// Set the question properties in result
	var questionElem = result.find('.question-text a');
	questionElem.attr('href', question.link);
	questionElem.text(question.title);

	// set the date asked property in result
	var asked = result.find('.asked-date');
	var date = new Date(1000*question.creation_date);
	asked.text(date.toString());

	// set the #views for question property in result
	var viewed = result.find('.viewed');
	viewed.text(question.view_count);

	// set some properties related to asker
	var asker = result.find('.asker');
	asker.html('<p>Name: <a target="_blank" href=http://stackoverflow.com/users/' + question.owner.user_id + ' >' +
													question.owner.display_name +
												'</a>' +
							'</p>' +
 							'<p>Reputation: ' + question.owner.reputation + '</p>'
	);

	return result;
};

var showTopAnswerers = function(answerer) {
	
	// clone our result template code
	var result = $('.templates .answerers').clone();
	
	// Set the photo src
	var answererPhoto = result.find('.answerers-photo img');
	answererPhoto.attr('src', answerer.user.profile_image);
	answererPhoto.attr('alt', answerer.user.display_name);
	
	// Set name + link
	var answererName = result.find('.answerer-name a');
	answererName.attr('href', answerer.user.link);
	answererName.text(answerer.user.display_name);
	
	// Set score
	var answererScore = result.find('.answerers-score');
	answererScore.text(answerer.score);

	return result;
};


// this function takes the results object from StackOverflow
// and creates info about search results to be appended to DOM
var showSearchResults = function(query, resultNum) {
	var results = resultNum + ' results for <strong>' + query + '</strong>';
	return results;
};

// takes error string and turns it into displayable DOM element
var showError = function(error){
	var errorElem = $('.templates .error').clone();
	var errorText = '<p>' + error + '</p>';
	errorElem.append(errorText);
};

// takes a string of semi-colon separated tags to be searched
// for on StackOverflow
var getUnanswered = function(tags) {
	
	// the parameters we need to pass in our request to StackOverflow's API
	var request = {
		tagged: tags,
		site: 'stackoverflow',
		order: 'desc',
		sort: 'creation'
	};
	
	var result = $.ajax({
		url: "http://api.stackexchange.com/2.2/questions/unanswered",
		data: request,
		dataType: "jsonp",
		type: "GET",
		})
	.done(function(result){
		var searchResults = showSearchResults(request.tagged, result.items.length);

		$('.search-results').html(searchResults);

		$.each(result.items, function(i, item) {
			var question = showQuestion(item);
			$('.results').append(question);
		});
	})
	.fail(function(jqXHR, error, errorThrown){
		var errorElem = showError(error);
		$('.search-results').append(errorElem);
	});
};

var getTopAnswerers = function(tag) {
	
	// the parameters we need to pass in our request to StackOverflow's API
	var request = {
		tag: tag,
		site: 'stackoverflow',
	};
	
	var result = $.ajax({
		url: "http://api.stackexchange.com/2.2/tags/" + tag + "/top-answerers/all_time",
		data: request,
		dataType: "jsonp",
		type: "GET",
		})
	.done(function(result){
		//var searchResults = showSearchResults(request.tag, result.items.length);
		//$('.search-results').html(searchResults);

		$.each(result.items, function(i, item) {
			var answerer = showTopAnswerers(item);
			$('.results').append(answerer);
		});
	})
	.fail(function(jqXHR, error, errorThrown){
		var errorElem = showError(error);
		$('.search-results').append(errorElem);
	});
};

var nationStats = [
	  {
		"name": "England",
		"logo": "http://cache.images.globalsportsmedia.com/soccer/teams/150x150/774.png",
		"website": "http://www.thefa.com",
		"foundedYear": 1863,
		"address": "PO Box 1966\nSW1P 9EQ\nLondon",
		"homeStadium": "Wembley Stadium",
		"stadiumCapacity": 90000,
		"group": "D",
		"groupRank": 3,
		"groupPoints": 0,
		"matchesPlayed": 1,
		"wins": 0,
		"losses": 1,
		"draws": 0,
		"goalsFor": 1,
		"goalsAgainst": 2,
		"goalsDiff": "-1",
		"players": [
		  {
			"createdAt": "2014-06-13T18:47:30.871Z",
			"updatedAt": "2014-06-14T18:35:07.978Z",
			"firstName": "Ben",
			"lastName": "Foster",
			"nickname": "B. Foster",
			"nationality": "England",
			"age": 31,
			"birthDate": "1983-04-03T00:00:00.000Z",
			"birthCountry": "England",
			"birthCity": "Leamington Spa",
			"position": "Goalkeeper",
			"foot": "Right",
			"image": "http://cache.images.globalsportsmedia.com/soccer/players/150x150/2528.png",
			"heightCm": 190,
			"weightKg": 79,
			"clubUrl": "http://us.soccerway.com/teams/england/west-bromwich-albion-football-club/678/",
			"url": "http://us.soccerway.com/players/ben-foster/2528/",
			"goals": 0,
			"ownGoals": 0,
			"penaltyGoals": 0,
			"assists": 0,
			"yellowCards": 0,
			"redCards": 0,
			"clubId": null,
			"teamId": "2EFCFEB2-EBF8-4628-B659-B00C49D93811",
			"id": "2D81B75E-2C3D-4807-9546-038B2DCB1639",
			"type": "Player"
		  },
		  {
			"createdAt": "2014-06-13T18:47:30.872Z",
			"updatedAt": "2014-06-14T18:35:07.981Z",
			"firstName": "Phil",
			"lastName": "Jones",
			"nickname": "P. Jones",
			"nationality": "England",
			"age": 22,
			"birthDate": "1992-02-21T00:00:00.000Z",
			"birthCountry": "England",
			"birthCity": "Preston",
			"position": "Defender",
			"foot": "Right",
			"image": "http://cache.images.globalsportsmedia.com/soccer/players/150x150/97299.png",
			"heightCm": 180,
			"weightKg": 70,
			"clubUrl": "http://us.soccerway.com/teams/england/manchester-united-fc/662/",
			"url": "http://us.soccerway.com/players/phil-jones/97299/",
			"goals": 0,
			"ownGoals": 0,
			"penaltyGoals": 0,
			"assists": 0,
			"yellowCards": 0,
			"redCards": 0,
			"clubId": "7D34FC43-AD14-454C-A815-DD8B833C0CF5",
			"teamId": "2EFCFEB2-EBF8-4628-B659-B00C49D93811",
			"id": "C5DFC679-35A6-456B-A66D-D5B712139C4C",
			"type": "Player"
		  },
		  {
			"createdAt": "2014-06-13T18:47:30.872Z",
			"updatedAt": "2014-06-14T18:35:07.981Z",
			"firstName": "Joe",
			"lastName": "Hart",
			"nickname": "J. Hart",
			"nationality": "England",
			"age": 27,
			"birthDate": "1987-04-19T00:00:00.000Z",
			"birthCountry": "England",
			"birthCity": "Shrewsbury",
			"position": "Goalkeeper",
			"foot": "Right",
			"image": "http://cache.images.globalsportsmedia.com/soccer/players/150x150/2842.png",
			"heightCm": 194,
			"weightKg": 83,
			"clubUrl": "http://us.soccerway.com/teams/england/manchester-city-football-club/676/",
			"url": "http://us.soccerway.com/players/joe-hart/2842/",
			"goals": 0,
			"ownGoals": 0,
			"penaltyGoals": 0,
			"assists": 0,
			"yellowCards": 0,
			"redCards": 0,
			"clubId": "E2951B6F-60EA-4ACE-BC4F-1967FEFB82EE",
			"teamId": "2EFCFEB2-EBF8-4628-B659-B00C49D93811",
			"id": "DA1E057B-9F06-493D-B323-56E8E3A2CFED",
			"type": "Player"
		  },
		  {
			"createdAt": "2014-06-13T18:47:30.872Z",
			"updatedAt": "2014-06-14T18:35:07.982Z",
			"firstName": "Chris",
			"lastName": "Smalling",
			"nickname": "C. Smalling",
			"nationality": "England",
			"age": 24,
			"birthDate": "1989-11-22T00:00:00.000Z",
			"birthCountry": "England",
			"birthCity": "Greenwich",
			"position": "Defender",
			"foot": "Right",
			"image": "http://cache.images.globalsportsmedia.com/soccer/players/150x150/79474.png",
			"heightCm": 192,
			"weightKg": 81,
			"clubUrl": "http://us.soccerway.com/teams/england/manchester-united-fc/662/",
			"url": "http://us.soccerway.com/players/chris-smalling/79474/",
			"goals": 0,
			"ownGoals": 0,
			"penaltyGoals": 0,
			"assists": 0,
			"yellowCards": 0,
			"redCards": 0,
			"clubId": "7D34FC43-AD14-454C-A815-DD8B833C0CF5",
			"teamId": "2EFCFEB2-EBF8-4628-B659-B00C49D93811",
			"id": "60D2B450-C3D5-4569-9083-3A39649C362A",
			"type": "Player"
		  },
		  {
			"createdAt": "2014-06-13T18:47:30.872Z",
			"updatedAt": "2014-06-14T18:35:07.982Z",
			"firstName": "Gary",
			"lastName": "Cahill",
			"nickname": "G. Cahill",
			"nationality": "England",
			"age": 28,
			"birthDate": "1985-12-19T00:00:00.000Z",
			"birthCountry": "England",
			"birthCity": "Sheffield",
			"position": "Defender",
			"foot": "Right",
			"image": "http://cache.images.globalsportsmedia.com/soccer/players/150x150/2797.png",
			"heightCm": 188,
			"weightKg": 71,
			"clubUrl": "http://us.soccerway.com/teams/england/chelsea-football-club/661/",
			"url": "http://us.soccerway.com/players/gary-cahill/2797/",
			"goals": 0,
			"ownGoals": 0,
			"penaltyGoals": 0,
			"assists": 0,
			"yellowCards": 0,
			"redCards": 0,
			"clubId": "89D41A76-F98F-46E2-8EC7-4223F8C02E91",
			"teamId": "2EFCFEB2-EBF8-4628-B659-B00C49D93811",
			"id": "FE5DD054-9870-4101-B1CF-92BCF369C6E4",
			"type": "Player"
		  },
		  {
			"createdAt": "2014-06-13T18:47:30.873Z",
			"updatedAt": "2014-06-14T18:35:07.983Z",
			"firstName": "Jordan",
			"lastName": "Henderson",
			"nickname": "J. Henderson",
			"nationality": "England",
			"age": 23,
			"birthDate": "1990-06-17T00:00:00.000Z",
			"birthCountry": "England",
			"birthCity": "Sunderland",
			"position": "Midfielder",
			"foot": "Right",
			"image": "http://cache.images.globalsportsmedia.com/soccer/players/150x150/48010.png",
			"heightCm": 182,
			"weightKg": 67,
			"clubUrl": "http://us.soccerway.com/teams/england/liverpool-fc/663/",
			"url": "http://us.soccerway.com/players/jordan-henderson/48010/",
			"goals": 0,
			"ownGoals": 0,
			"penaltyGoals": 0,
			"assists": 0,
			"yellowCards": 0,
			"redCards": 0,
			"clubId": "D52B59C5-E543-4847-9597-B3A16621A27B",
			"teamId": "2EFCFEB2-EBF8-4628-B659-B00C49D93811",
			"id": "8DA6BD87-9893-4F41-99A2-844F2C8397F0",
			"type": "Player"
		  },
		  {
			"createdAt": "2014-06-13T18:47:30.874Z",
			"updatedAt": "2014-06-14T18:35:07.984Z",
			"firstName": "James",
			"lastName": "Milner",
			"nickname": "J. Milner",
			"nationality": "England",
			"age": 28,
			"birthDate": "1986-01-04T00:00:00.000Z",
			"birthCountry": "England",
			"birthCity": "Wortley",
			"position": "Midfielder",
			"foot": "Right",
			"image": "http://cache.images.globalsportsmedia.com/soccer/players/150x150/2899.png",
			"heightCm": 176,
			"weightKg": 70,
			"clubUrl": "http://us.soccerway.com/teams/england/manchester-city-football-club/676/",
			"url": "http://us.soccerway.com/players/james-milner/2899/",
			"goals": 0,
			"ownGoals": 0,
			"penaltyGoals": 0,
			"assists": 0,
			"yellowCards": 0,
			"redCards": 0,
			"clubId": "E2951B6F-60EA-4ACE-BC4F-1967FEFB82EE",
			"teamId": "2EFCFEB2-EBF8-4628-B659-B00C49D93811",
			"id": "799C46FD-044F-4397-9F72-9C432F2DC259",
			"type": "Player"
		  },
		  {
			"createdAt": "2014-06-13T18:47:30.875Z",
			"updatedAt": "2014-06-14T18:35:07.986Z",
			"firstName": "Alex",
			"lastName": "Oxlade-Chamberlain",
			"nickname": "A. Oxlade-Chamberlain",
			"nationality": "England",
			"age": 20,
			"birthDate": "1993-08-15T00:00:00.000Z",
			"birthCountry": "England",
			"birthCity": "Portsmouth",
			"position": "Attacker",
			"foot": "Both",
			"image": "http://cache.images.globalsportsmedia.com/soccer/players/150x150/120695.png",
			"heightCm": 180,
			"weightKg": 69,
			"clubUrl": "http://us.soccerway.com/teams/england/arsenal-fc/660/",
			"url": "http://us.soccerway.com/players/alex-oxlade-chamberlain/120695/",
			"goals": 0,
			"ownGoals": 0,
			"penaltyGoals": 0,
			"assists": 0,
			"yellowCards": 0,
			"redCards": 0,
			"clubId": "73353CC3-4A6C-453E-B5F6-3CBAAF0AE266",
			"teamId": "2EFCFEB2-EBF8-4628-B659-B00C49D93811",
			"id": "3D64A020-BA23-41C9-8E9B-256A038550E1",
			"type": "Player"
		  },
		  {
			"createdAt": "2014-06-13T18:47:30.876Z",
			"updatedAt": "2014-06-14T18:35:07.988Z",
			"firstName": "Phil",
			"lastName": "Jagielka",
			"nickname": "P. Jagielka",
			"nationality": "England",
			"age": 31,
			"birthDate": "1982-08-17T00:00:00.000Z",
			"birthCountry": "England",
			"birthCity": "Sale",
			"position": "Defender",
			"foot": "Right",
			"image": "http://cache.images.globalsportsmedia.com/soccer/players/150x150/2600.png",
			"heightCm": 180,
			"weightKg": 87,
			"clubUrl": "http://us.soccerway.com/teams/england/everton-football-club/674/",
			"url": "http://us.soccerway.com/players/phil-jagielka/2600/",
			"goals": 0,
			"ownGoals": 0,
			"penaltyGoals": 0,
			"assists": 0,
			"yellowCards": 0,
			"redCards": 0,
			"clubId": "AAFAE560-1524-435D-A9B7-BF59F051F3CB",
			"teamId": "2EFCFEB2-EBF8-4628-B659-B00C49D93811",
			"id": "8097418E-20B3-4C77-B742-31A94BCBDF57",
			"type": "Player"
		  },
		  {
			"createdAt": "2014-06-13T18:47:30.877Z",
			"updatedAt": "2014-06-14T18:35:07.989Z",
			"firstName": "Frank",
			"lastName": "Lampard",
			"nickname": "F. Lampard",
			"nationality": "England",
			"age": 35,
			"birthDate": "1978-06-20T00:00:00.000Z",
			"birthCountry": "England",
			"birthCity": "Romford",
			"position": "Midfielder",
			"foot": "Both",
			"image": "http://cache.images.globalsportsmedia.com/soccer/players/150x150/189.png",
			"heightCm": 184,
			"weightKg": 88,
			"clubUrl": "http://us.soccerway.com/teams/england/chelsea-football-club/661/",
			"url": "http://us.soccerway.com/players/frank-lampard/189/",
			"goals": 0,
			"ownGoals": 0,
			"penaltyGoals": 0,
			"assists": 0,
			"yellowCards": 0,
			"redCards": 0,
			"clubId": "89D41A76-F98F-46E2-8EC7-4223F8C02E91",
			"teamId": "2EFCFEB2-EBF8-4628-B659-B00C49D93811",
			"id": "FE0D9046-D6B1-4C32-AE39-28594ECFFC62",
			"type": "Player"
		  },
		  {
			"createdAt": "2014-06-13T18:47:30.878Z",
			"updatedAt": "2014-06-14T18:35:07.990Z",
			"firstName": "Fraser",
			"lastName": "Forster",
			"nickname": "F. Forster",
			"nationality": "England",
			"age": 26,
			"birthDate": "1988-03-17T00:00:00.000Z",
			"birthCountry": "England",
			"birthCity": "Hexham",
			"position": "Goalkeeper",
			"foot": null,
			"image": "http://cache.images.globalsportsmedia.com/soccer/players/150x150/5259.png",
			"heightCm": 201,
			"weightKg": null,
			"clubUrl": "http://us.soccerway.com/teams/scotland/celtic-fc/1898/",
			"url": "http://us.soccerway.com/players/fraser-forster/5259/",
			"goals": 0,
			"ownGoals": 0,
			"penaltyGoals": 0,
			"assists": 0,
			"yellowCards": 0,
			"redCards": 0,
			"clubId": "024C5AEE-5494-4CF9-937D-6905AA194028",
			"teamId": "2EFCFEB2-EBF8-4628-B659-B00C49D93811",
			"id": "4FF91146-EFB4-4AA4-8361-D7E59EEABE4C",
			"type": "Player"
		  },
		  {
			"createdAt": "2014-06-13T18:47:30.879Z",
			"updatedAt": "2014-06-14T18:35:07.991Z",
			"firstName": "Jack",
			"lastName": "Wilshere",
			"nickname": "J. Wilshere",
			"nationality": "England",
			"age": 22,
			"birthDate": "1992-01-01T00:00:00.000Z",
			"birthCountry": "England",
			"birthCity": "Stevenage",
			"position": "Midfielder",
			"foot": "Left",
			"image": "http://cache.images.globalsportsmedia.com/soccer/players/150x150/61075.png",
			"heightCm": 170,
			"weightKg": 60,
			"clubUrl": "http://us.soccerway.com/teams/england/arsenal-fc/660/",
			"url": "http://us.soccerway.com/players/jack-wilshere/61075/",
			"goals": 0,
			"ownGoals": 0,
			"penaltyGoals": 0,
			"assists": 0,
			"yellowCards": 0,
			"redCards": 0,
			"clubId": "73353CC3-4A6C-453E-B5F6-3CBAAF0AE266",
			"teamId": "2EFCFEB2-EBF8-4628-B659-B00C49D93811",
			"id": "F1C71E75-B513-4C3D-9DB9-A407C87B42BB",
			"type": "Player"
		  },
		  {
			"createdAt": "2014-06-13T18:47:30.879Z",
			"updatedAt": "2014-06-14T18:35:07.991Z",
			"firstName": "Leighton",
			"lastName": "Baines",
			"nickname": "L. Baines",
			"nationality": "England",
			"age": 29,
			"birthDate": "1984-12-11T00:00:00.000Z",
			"birthCountry": "England",
			"birthCity": "Kirkby",
			"position": "Defender",
			"foot": "Left",
			"image": "http://cache.images.globalsportsmedia.com/soccer/players/150x150/2672.png",
			"heightCm": 170,
			"weightKg": 70,
			"clubUrl": "http://us.soccerway.com/teams/england/everton-football-club/674/",
			"url": "http://us.soccerway.com/players/leighton-baines/2672/",
			"goals": 0,
			"ownGoals": 0,
			"penaltyGoals": 0,
			"assists": 0,
			"yellowCards": 0,
			"redCards": 0,
			"clubId": "AAFAE560-1524-435D-A9B7-BF59F051F3CB",
			"teamId": "2EFCFEB2-EBF8-4628-B659-B00C49D93811",
			"id": "F73CE558-012C-473E-9371-631BBFEC3E63",
			"type": "Player"
		  },
		  {
			"createdAt": "2014-06-13T18:47:30.880Z",
			"updatedAt": "2014-06-14T18:35:07.992Z",
			"firstName": "Rickie",
			"lastName": "Lambert",
			"nickname": "R. Lambert",
			"nationality": "England",
			"age": 32,
			"birthDate": "1982-02-16T00:00:00.000Z",
			"birthCountry": "England",
			"birthCity": "Liverpool",
			"position": "Attacker",
			"foot": "Right",
			"image": "http://cache.images.globalsportsmedia.com/soccer/players/150x150/50849.png",
			"heightCm": 188,
			"weightKg": 76,
			"clubUrl": "http://us.soccerway.com/teams/england/southampton-fc/670/",
			"url": "http://us.soccerway.com/players/rickie-lambert/50849/",
			"goals": 0,
			"ownGoals": 0,
			"penaltyGoals": 0,
			"assists": 0,
			"yellowCards": 0,
			"redCards": 0,
			"clubId": "704E2ED9-85F9-4075-B819-24DF8EF78803",
			"teamId": "2EFCFEB2-EBF8-4628-B659-B00C49D93811",
			"id": "60B170B6-12E1-4BE0-A50D-5F91521CC271",
			"type": "Player"
		  },
		  {
			"createdAt": "2014-06-13T18:47:30.877Z",
			"updatedAt": "2014-06-15T02:14:59.109Z",
			"firstName": "Wayne",
			"lastName": "Rooney",
			"nickname": "W. Rooney",
			"nationality": "England",
			"age": 28,
			"birthDate": "1985-10-24T00:00:00.000Z",
			"birthCountry": "England",
			"birthCity": "Liverpool",
			"position": "Attacker",
			"foot": "Right",
			"image": "http://cache.images.globalsportsmedia.com/soccer/players/150x150/193.png",
			"heightCm": 176,
			"weightKg": 78,
			"clubUrl": "http://us.soccerway.com/teams/england/manchester-united-fc/662/",
			"url": "http://us.soccerway.com/players/wayne-rooney/193/",
			"goals": 0,
			"ownGoals": 0,
			"penaltyGoals": 0,
			"assists": 1,
			"yellowCards": 0,
			"redCards": 0,
			"clubId": "7D34FC43-AD14-454C-A815-DD8B833C0CF5",
			"teamId": "2EFCFEB2-EBF8-4628-B659-B00C49D93811",
			"id": "1051AFD7-0678-4ED2-90EE-7DD0A86D73FA",
			"type": "Player"
		  },
		  {
			"createdAt": "2014-06-13T18:47:30.882Z",
			"updatedAt": "2014-06-14T18:35:07.995Z",
			"firstName": "Adam",
			"lastName": "Lallana",
			"nickname": "A. Lallana",
			"nationality": "England",
			"age": 26,
			"birthDate": "1988-05-10T00:00:00.000Z",
			"birthCountry": "England",
			"birthCity": "St. Albans",
			"position": "Midfielder",
			"foot": "Right",
			"image": "http://cache.images.globalsportsmedia.com/soccer/players/150x150/15497.png",
			"heightCm": 173,
			"weightKg": 72,
			"clubUrl": "http://us.soccerway.com/teams/england/southampton-fc/670/",
			"url": "http://us.soccerway.com/players/adam-lallana/15497/",
			"goals": 0,
			"ownGoals": 0,
			"penaltyGoals": 0,
			"assists": 0,
			"yellowCards": 0,
			"redCards": 0,
			"clubId": "704E2ED9-85F9-4075-B819-24DF8EF78803",
			"teamId": "2EFCFEB2-EBF8-4628-B659-B00C49D93811",
			"id": "4DB460B3-A471-49F7-84A5-5B5BC5202079",
			"type": "Player"
		  },
		  {
			"createdAt": "2014-06-13T18:47:30.882Z",
			"updatedAt": "2014-06-14T18:35:07.995Z",
			"firstName": "Luke",
			"lastName": "Shaw",
			"nickname": "L. Shaw",
			"nationality": "England",
			"age": 18,
			"birthDate": "1995-07-12T00:00:00.000Z",
			"birthCountry": "England",
			"birthCity": "Kingston upon Thames",
			"position": "Defender",
			"foot": null,
			"image": "http://cache.images.globalsportsmedia.com/soccer/players/150x150/209805.png",
			"heightCm": 185,
			"weightKg": null,
			"clubUrl": "http://us.soccerway.com/teams/england/southampton-fc/670/",
			"url": "http://us.soccerway.com/players/luke-shaw/209805/",
			"goals": 0,
			"ownGoals": 0,
			"penaltyGoals": 0,
			"assists": 0,
			"yellowCards": 0,
			"redCards": 0,
			"clubId": "704E2ED9-85F9-4075-B819-24DF8EF78803",
			"teamId": "2EFCFEB2-EBF8-4628-B659-B00C49D93811",
			"id": "C811CF5B-31BA-44A3-A47F-95DA4A2EFB48",
			"type": "Player"
		  },
		  {
			"createdAt": "2014-06-13T18:47:30.883Z",
			"updatedAt": "2014-06-14T18:35:07.997Z",
			"firstName": "Raheem Shaquille",
			"lastName": "Sterling",
			"nickname": "R. Sterling",
			"nationality": "England",
			"age": 19,
			"birthDate": "1994-12-08T00:00:00.000Z",
			"birthCountry": "Jamaica",
			"birthCity": "Kingston",
			"position": "Midfielder",
			"foot": null,
			"image": "http://cache.images.globalsportsmedia.com/soccer/players/150x150/160414.png",
			"heightCm": 170,
			"weightKg": null,
			"clubUrl": "http://us.soccerway.com/teams/england/liverpool-fc/663/",
			"url": "http://us.soccerway.com/players/raheem-sterling/160414/",
			"goals": 0,
			"ownGoals": 0,
			"penaltyGoals": 0,
			"assists": 0,
			"yellowCards": 1,
			"redCards": 0,
			"clubId": "D52B59C5-E543-4847-9597-B3A16621A27B",
			"teamId": "2EFCFEB2-EBF8-4628-B659-B00C49D93811",
			"id": "3634671F-7EDB-4193-BB38-B5B4EE783D81",
			"type": "Player"
		  },
		  {
			"createdAt": "2014-06-13T18:47:30.885Z",
			"updatedAt": "2014-06-14T18:35:07.999Z",
			"firstName": "Daniel Nii",
			"lastName": "Tackie Mensah Welbeck",
			"nickname": "D. Welbeck",
			"nationality": "England",
			"age": 23,
			"birthDate": "1990-11-26T00:00:00.000Z",
			"birthCountry": "England",
			"birthCity": "Manchester",
			"position": "Attacker",
			"foot": "Right",
			"image": "http://cache.images.globalsportsmedia.com/soccer/players/150x150/53886.png",
			"heightCm": 185,
			"weightKg": 73,
			"clubUrl": "http://us.soccerway.com/teams/england/manchester-united-fc/662/",
			"url": "http://us.soccerway.com/players/danny-welbeck/53886/",
			"goals": 0,
			"ownGoals": 0,
			"penaltyGoals": 0,
			"assists": 0,
			"yellowCards": 0,
			"redCards": 1,
			"clubId": "7D34FC43-AD14-454C-A815-DD8B833C0CF5",
			"teamId": "2EFCFEB2-EBF8-4628-B659-B00C49D93811",
			"id": "1DEF66FF-20C5-4195-B98B-C126517AF617",
			"type": "Player"
		  },
		  {
			"createdAt": "2014-06-13T18:47:30.873Z",
			"updatedAt": "2014-06-14T18:35:08.324Z",
			"firstName": "Steven",
			"lastName": "Gerrard",
			"nickname": "S. Gerrard",
			"nationality": "England",
			"age": 34,
			"birthDate": "1980-05-30T00:00:00.000Z",
			"birthCountry": "England",
			"birthCity": "Whiston",
			"position": "Midfielder",
			"foot": "Right",
			"image": "http://cache.images.globalsportsmedia.com/soccer/players/150x150/186.png",
			"heightCm": 183,
			"weightKg": 83,
			"clubUrl": "http://us.soccerway.com/teams/england/liverpool-fc/663/",
			"url": "http://us.soccerway.com/players/steven-gerrard/186/",
			"goals": 0,
			"ownGoals": 0,
			"penaltyGoals": 0,
			"assists": 0,
			"yellowCards": 0,
			"redCards": 0,
			"clubId": "D52B59C5-E543-4847-9597-B3A16621A27B",
			"teamId": "2EFCFEB2-EBF8-4628-B659-B00C49D93811",
			"id": "1D903EE1-A0F3-4E23-A2BF-85F55EAD6BBE",
			"type": "Player"
		  },
		  {
			"createdAt": "2014-06-13T18:47:30.875Z",
			"updatedAt": "2014-06-14T18:35:08.324Z",
			"firstName": "Glen",
			"lastName": "Johnson",
			"nickname": "G. Johnson",
			"nationality": "England",
			"age": 29,
			"birthDate": "1984-08-23T00:00:00.000Z",
			"birthCountry": "England",
			"birthCity": "Greenwich",
			"position": "Defender",
			"foot": "Right",
			"image": "http://cache.images.globalsportsmedia.com/soccer/players/150x150/2641.png",
			"heightCm": 182,
			"weightKg": 70,
			"clubUrl": "http://us.soccerway.com/teams/england/liverpool-fc/663/",
			"url": "http://us.soccerway.com/players/glen-johnson/2641/",
			"goals": 0,
			"ownGoals": 0,
			"penaltyGoals": 0,
			"assists": 0,
			"yellowCards": 0,
			"redCards": 0,
			"clubId": "D52B59C5-E543-4847-9597-B3A16621A27B",
			"teamId": "2EFCFEB2-EBF8-4628-B659-B00C49D93811",
			"id": "93897C25-754D-49C0-B9A8-65E0F638A5B9",
			"type": "Player"
		  },
		  {
			"createdAt": "2014-06-13T18:47:30.881Z",
			"updatedAt": "2014-06-14T18:35:08.325Z",
			"firstName": "Ross",
			"lastName": "Barkley",
			"nickname": "R. Barkley",
			"nationality": "England",
			"age": 20,
			"birthDate": "1993-12-05T00:00:00.000Z",
			"birthCountry": "England",
			"birthCity": "Liverpool",
			"position": "Midfielder",
			"foot": null,
			"image": "http://cache.images.globalsportsmedia.com/soccer/players/150x150/154068.png",
			"heightCm": 189,
			"weightKg": null,
			"clubUrl": "http://us.soccerway.com/teams/england/everton-football-club/674/",
			"url": "http://us.soccerway.com/players/ross-barkley/154068/",
			"goals": 0,
			"ownGoals": 0,
			"penaltyGoals": 0,
			"assists": 0,
			"yellowCards": 0,
			"redCards": 0,
			"clubId": "AAFAE560-1524-435D-A9B7-BF59F051F3CB",
			"teamId": "2EFCFEB2-EBF8-4628-B659-B00C49D93811",
			"id": "F1BC117A-39E6-4CCF-BF76-9F888B6C4EC2",
			"type": "Player"
		  },
		  {
			"createdAt": "2014-06-13T18:47:30.880Z",
			"updatedAt": "2014-06-15T02:14:59.113Z",
			"firstName": "Daniel",
			"lastName": "Sturridge",
			"nickname": "D. Sturridge",
			"nationality": "England",
			"age": 24,
			"birthDate": "1989-09-01T00:00:00.000Z",
			"birthCountry": "England",
			"birthCity": "Birmingham",
			"position": "Attacker",
			"foot": "Left",
			"image": "http://cache.images.globalsportsmedia.com/soccer/players/150x150/5206.png",
			"heightCm": 188,
			"weightKg": 76,
			"clubUrl": "http://us.soccerway.com/teams/england/liverpool-fc/663/",
			"url": "http://us.soccerway.com/players/daniel-sturridge/5206/",
			"goals": 1,
			"ownGoals": 0,
			"penaltyGoals": 0,
			"assists": 0,
			"yellowCards": 0,
			"redCards": 0,
			"clubId": "D52B59C5-E543-4847-9597-B3A16621A27B",
			"teamId": "2EFCFEB2-EBF8-4628-B659-B00C49D93811",
			"id": "26E64614-92F6-4AF9-A4D3-1721FA967A3D",
			"type": "Player"
		  }
		],
		"id": "2EFCFEB2-EBF8-4628-B659-B00C49D93811",
		"type": "Team"
	  }
	]

