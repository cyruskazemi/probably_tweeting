PROBABLYTWEETING = {
	get_twitter_data: function(){
		var twitter_handle = $('#search_handle').val().substring(1,this.length); // remove @
		$.ajax({
			url: "http://api.twitter.com/1/users/lookup.json",
			type: 'GET',
			dataType: 'jsonp',
			data: {
				screen_name: twitter_handle,
				include_rts: false,
				count: 1,
				include_entities: true
			},
			success: function(twitter_data, textStatus, xhr){
				console.log(twitter_data[0]);
				PROBABLYTWEETING.load_success(twitter_data[0]);
			},
			error: function(xhr, textStatus, error){
				// Show error message
				console.log(xhr.status);
				console.log(error);
			}
		});
	},
	load_success: function(twitter_user){		
			// Check tweet time against current time
			var MAX_TIME_DIFFERENCE = 10;
			var time_of_last_tweet = new Date(twitter_user["status"]["created_at"]);
			var time_now = Date.now();
			var time_difference_in_mins = Math.floor((time_now - time_of_last_tweet) / (60 * 1000));
			var is_tweeting = (time_difference_in_mins < MAX_TIME_DIFFERENCE) ? " is probably tweeting! :)" : " is probably not tweeting :(";
			var context_class = (time_difference_in_mins < MAX_TIME_DIFFERENCE) ? "success" : "error";
			
			// Populate look up area
			var result_string = '<div class="result ' + context_class + '"><p class="lead"><img src="' + 
													twitter_user["profile_image_url_https"] + '"> ' + 
													twitter_user["name"] + is_tweeting + '</p><span class="tweet_text"><em>"' + twitter_user["status"]["text"] + '"</em> ' +
													time_difference_in_mins + ' min ago</span></div>';
			$(result_string).hide().prependTo('#results').fadeIn('slow');
	}
}

$(document).ready(function(){
	$('#submit').click(function(){
		PROBABLYTWEETING.get_twitter_data();
		return false;
	});
});

/*
// User
[
	{
		"default_profile":false,
		"id":15521567,
		"location":null,
		"profile_use_background_image":true,
		"followers_count":84,
		"contributors_enabled":false,
		"profile_text_color":"333333",
		"time_zone":"Pacific Time (US & Canada)",
		"id_str":"15521567",
		"listed_count":3,
		"utc_offset":-28800,
		"geo_enabled":false,
		"name":"cyruskazemi",
		"lang":"en",
		"profile_sidebar_border_color":"C0DEED",
		"profile_image_url_https":"https:\/\/twimg0-a.akamaihd.net\/profile_images\/3011989914\/c958a4a1f27cfacd891bbad200d9a282_normal.jpeg",
		"protected":false,
		"follow_request_sent":false,
		"profile_background_tile":true,
		"profile_image_url":"http:\/\/a0.twimg.com\/profile_images\/3011989914\/c958a4a1f27cfacd891bbad200d9a282_normal.jpeg",
		"profile_sidebar_fill_color":"DDEEF6",
		"default_profile_image":false,
		"profile_background_image_url_https":"https:\/\/twimg0-a.akamaihd.net\/profile_background_images\/83258403\/rolls_roos.png",
		"created_at":"Mon Jul 21 22:11:28 +0000 2008",
		"statuses_count":199,
		"following":false,
		"favourites_count":3,
		"profile_background_color":"C0DEED",
		"verified":false,
		"is_translator":false,
		"url":"http:\/\/cyruskazemi.com",
		"friends_count":143,
		"status":{
			"id_str":"309492488643686400",
			"geo":null,
			"place":null,
			"coordinates":null,
			"retweet_count":1,
			"in_reply_to_user_id":827618468,
			"retweeted":false,
			"in_reply_to_screen_name":"ConveyUX",
			"in_reply_to_status_id_str":null,
			"in_reply_to_status_id":null,
			"text":"@ConveyUX was fantastic! Hello to all the new people I met and thank you @BlinkUX for putting on a great conference!",
			"in_reply_to_user_id_str":"827618468",
			"contributors":null,
			"truncated":false,
			"source":"web",
			"created_at":"Thu Mar 07 02:35:34 +0000 2013",
			"favorited":false,
			"id":309492488643686400
		},
		"profile_background_image_url":"http:\/\/a0.twimg.com\/profile_background_images\/83258403\/rolls_roos.png",
		"screen_name":"cyruskazemi",
		"description":"Expert Sea-Doo rider during summer weekends. Internet stuff all other times.",
		"notifications":false,
		"profile_link_color":"0084B4"
	}
]
*/