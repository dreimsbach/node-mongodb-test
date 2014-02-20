

function RecordDAO() {
	var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/test');

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback () {
    console.log("connection esatblished")
  });


	this.recordSchema = mongoose.Schema({
	  artist: String,
	  album: String,
	  label: String,
	  year: Number
	});

	this.RecordEntry = mongoose.model('RecordEntry', this.recordSchema);
}

RecordDAO.prototype.save = function(data) {
	var newEntry = new this.RecordEntry(data);
	newEntry.save(function(err, newEntry) {
		// nichts
	});;
	return newEntry;
};


RecordDAO.prototype.find = function(data, callback) {
	this.RecordEntry.findOne(data, function(err, newEntry) {
		callback(newEntry);
	});
};

// export the class
module.exports = RecordDAO;