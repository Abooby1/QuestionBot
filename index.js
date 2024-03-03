import JSONdb from 'simple-json-db'
import Client from 'lyon'
import AWS from "aws-sdk"
setInterval(function() {
	console.log('gi')
}, 5000)

const s3 = new AWS.S3()

var sendQuestion = false;

const questions = (new JSONdb('./questions.json')).storage
let QuestionFile = await s3.getObject({
		Bucket: "cyclic-tame-cyan-sockeye-toga-us-east-1",
		Key: "questions.json",
}).promise()
//let questions = JSON.parse(QuestionFile)

const client = await new Client({
	userid: '63824e52d62f9d79c6459b40',
	token: process.env['token']
})

await s3.putObject({
		Body: JSON.stringify(questions),
		Bucket: "cyclic-tame-cyan-sockeye-toga-us-east-1",
		Key: "questions.json",
}).promise()

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