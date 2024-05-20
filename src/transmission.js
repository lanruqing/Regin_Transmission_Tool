import  Transmission from 'transmission'
export const TransmissionClient = new Transmission({
    host: '192.168.50.109',
    port:49092,
    username: "qnap",
    password: 'qnap',
  });

  function getTransmissionStats(){
	TransmissionClient.sessionStats(function(err, result){
		if(err){
			console.log(err);
		} else {
			console.log(result);
		}
	});
}

// async function main() {
//   const res = await TransmissionClient.getAllData();
//   console.log(res);
// }

// getTransmissionStats()