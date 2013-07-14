
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

exports.particles = function(req, res){
  res.render('particles', { title: 'particles' });
};

exports.d3js = function(req, res){
  res.render('d3js', { title: 'd3js' });
};

