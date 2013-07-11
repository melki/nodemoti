
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'home' });
};
exports.data = function(req, res){
  res.render('data', { title: 'data' });
};
exports.graphs = function(req, res){
  res.render('graphs', { title: 'graphs' });
};

