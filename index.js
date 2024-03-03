import JSONdb from 'simple-json-db'
import Client from 'lyon'

var sendQuestion = true;

const questions = (new JSONdb('./questions.json')).storage

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