import JSONdb from 'simple-json-db'
import Client from 'lyon'
setInterval(function() {
	console.log('gi')
}, 5000)

const s3 = new AWS.S3()

var sendQuestion = false;

const questions = [
	{
			"title": "Which type of cuisine do you prefer for dinner?",
			"options": [
					"Italian",
					"Mexican",
					"Chinese",
					"Indian"
			]
	},
	{
			"title": "Which season is your favorite?",
			"options": [
					"Spring",
					"Summer",
					"Fall",
					"Winter"
			]
	},
	{
			"title": "Which genre of music do you enjoy the most?",
			"options": [
					"Classical",
					"Pop",
					"Rock",
					"Hip-hop/Rap"
			]
	},
	{
			"title": "Which movie genre do you prefer watching?",
			"options": [
					"Comedy",
					"Thriller",
					"Romance",
					"Sci-Fi"
			]
	},
	{
			"title": "Which type of vacation destination do you prefer?",
			"options": [
					"Beach resort",
					"Mountain retreat",
					"Urban exploration",
					"Cultural immersion trip"
			]
	},
	{
			"title": "Which type of pet would you prefer to have?",
			"options": [
					"Dog",
					"Cat",
					"Bird",
					"Fish"
			]
	},
	{
			"title": "Which type of exercise do you prefer?",
			"options": [
					"Running",
					"Yoga",
					"Weightlifting",
					"Swimming"
			]
	},
	{
			"title": "Which mode of transportation do you prefer for long-distance travel?",
			"options": [
					"Car",
					"Train",
					"Airplane",
					"Bus"
			]
	},
	{
			"title": "Which type of book do you prefer reading?",
			"options": [
					"Fiction",
					"Non-fiction",
					"Mystery/Thriller",
					"Fantasy"
			]
	},
	{
			"title": "Which type of dessert do you prefer?",
			"options": [
					"Cake",
					"Cookie",
					"Pie",
					"Ice cream"
			]
	},
	{
			"title": "How do you feel about the current state of environmental conservation efforts in your community?",
			"options": [
					"Very satisfied",
					"Somewhat satisfied",
					"Neutral",
					"Dissatisfied"
			]
	},
	{
			"title": "What is your opinion on the effectiveness of remote work arrangements?",
			"options": [
					"Very effective",
					"Somewhat effective",
					"Neutral",
					"Ineffective"
			]
	},
	{
			"title": "How do you perceive the quality of healthcare services in your area?",
			"options": [
					"Excellent",
					"Good",
					"Fair",
					"Poor"
			]
	},
	{
			"title": "What type of outdoor activity do you enjoy the most?",
			"options": [
					"Hiking",
					"Cycling",
					"Kayaking",
					"Rock climbing"
			]
	},
	{
			"title": "Which type of art form do you appreciate the most?",
			"options": [
					"Painting",
					"Sculpture",
					"Photography",
					"Street art"
			]
	},
	{
			"title": "How do you feel about renewable energy sources?",
			"options": [
					"Supportive",
					"Neutral",
					"Skeptical",
					"Opposed"
			]
	},
	{
			"title": "Which type of movie do you enjoy watching on a lazy Sunday?",
			"options": [
					"Drama",
					"Documentary",
					"Action",
					"Animation"
			]
	},
	{
			"title": "What is your preferred mode of relaxation?",
			"options": [
					"Reading",
					"Meditation",
					"Listening to music",
					"Yoga"
			]
	},
	{
			"title": "What style of architecture do you find most appealing?",
			"options": [
					"Modern",
					"Victorian",
					"Art Deco",
					"Minimalist"
			]
	},
	{
			"title": "Which type of social event do you enjoy attending?",
			"options": [
					"Music concerts",
					"Art exhibitions",
					"Food festivals",
					"Sporting events"
			]
	},
	{
			"title": "How likely are you to try a new cuisine when dining out?",
			"options": [
					"Very likely",
					"Likely",
					"Unlikely",
					"Very unlikely"
			]
	},
	{
			"title": "Rank your preference for the following music genres",
			"options": [
					"Jazz",
					"Blues",
					"Electronic",
					"R&B/Soul"
			]
	},
	{
			"title": "Which type of adventure activity would you try?",
			"options": [
					"Skydiving",
					"Bungee jumping",
					"Paragliding",
					"Scuba diving"
			]
	},
	{
			"title": "Which programming language do you prefer?",
			"options": [
					"Python",
					"JavaScript",
					"Java",
					"C++"
			]
	},
	{
			"title": "What type of food do you enjoy for breakfast?",
			"options": [
					"Pancakes",
					"Eggs and bacon",
					"Yogurt and granola",
					"Smoothie"
			]
	},
	{
			"title": "Which type of weather do you prefer?",
			"options": [
					"Sunny",
					"Rainy",
					"Snowy",
					"Windy"
			]
	},
	{
			"title": "What language do you prefer to use when coding?",
			"options": [
					"English",
					"Spanish",
					"French",
					"Chinese"
			]
	},
	{
			"title": "What is your preferred method of communication?",
			"options": [
					"Phone call",
					"Text message",
					"Email",
					"Face-to-face conversation"
			]
	},
	{
			"title": "Which browser do you prefer using?",
			"options": [
					"Google Chrome",
					"Mozilla Firefox",
					"Safari",
					"Microsoft Edge"
			]
	},
	{
			"title": "How likely are you to try a new cuisine when dining out?",
			"options": [
					"Very likely",
					"Likely",
					"Unlikely",
					"Very unlikely"
			]
	},
	{
			"title": "Which type of social event do you enjoy attending?",
			"options": [
					"Music concerts",
					"Art exhibitions",
					"Food festivals",
					"Sporting events"
			]
	},
	{
			"title": "What style of architecture do you find most appealing?",
			"options": [
					"Modern",
					"Victorian",
					"Art Deco",
					"Minimalist"
			]
	},
	{
			"title": "What is your preferred method of relaxation?",
			"options": [
					"Reading",
					"Meditation",
					"Listening to music",
					"Yoga"
			]
	},
	{
			"title": "Which type of outdoor activity do you enjoy the most?",
			"options": [
					"Hiking",
					"Cycling",
					"Kayaking",
					"Rock climbing"
			]
	},
	{
			"title": "Which type of art form do you enjoy creating?",
			"options": [
					"Drawing",
					"Painting",
					"Sculpting",
					"Photography"
			]
	},
	{
			"title": "How do you prefer to spend your leisure time?",
			"options": [
					"Exploring nature",
					"Socializing with friends",
					"Engaging in hobbies",
					"Relaxing at home"
			]
	},
	{
			"title": "Which type of cuisine have you never tried but would like to?",
			"options": [
					"Japanese",
					"Thai",
					"Korean",
					"Mediterranean"
			]
	},
	{
			"title": "Which type of movie do you prefer watching with friends?",
			"options": [
					"Comedy",
					"Horror",
					"Action",
					"Adventure"
			]
	},
	{
			"title": "What is your preferred method of transportation for short distances?",
			"options": [
					"Walking",
					"Cycling",
					"Scooter",
					"Public Transit"
			]
	},
	{
			"title": "Which type of movie do you prefer watching with friends?",
			"options": [
					"Comedy",
					"Horror",
					"Action",
					"Adventure"
			]
	}
]

const client = await new Client({
	userid: '63824e52d62f9d79c6459b40',
	token: process.env['token']
})

if(sendQuestion) {
	let question = questions[Math.floor(Math.random() * questions.length)]
	questions.splice(questions.indexOf(question), 1);
	(new JSONdb('./questions.json')).set(questions)

	var con = true;
	question.options.forEach(option => {
		if(option.length > 25) {
			con = false;
		}
	})

	if(con) {
		client.post(question.title, {
			poll: {
				title: "",
				options: question.options
			}
		})
	}
}