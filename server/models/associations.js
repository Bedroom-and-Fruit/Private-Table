var Booking = require('./bookings.js');
var Image = require('./images.js');
var Venue = require('./venue.js');
var Room = require('./rooms.js');
var Course = require('./courses.js');
var Menu = require('./menus.js');
var MenuItem = require('./menuItems.js');
var db = require('../config/dbConfig.js');

//relationship between user and project
User.hasMany(Project, {foreignKey: 'user_id'});
Project.belongsTo(User, {foreignKey: 'user_id'});

//relationship between project and contribution
Project.hasMany(Contribution, {foreignKey: 'project'});
Contribution.belongsTo(Project, {foreignKey: 'project'});

//relationship between user and contribution
User.hasMany(Contribution, {foreignKey: 'contributor'});
Contribution.belongsTo(User, {foreignKey: 'contributor'});

//relationship between user and contribution comments
User.hasMany(ContributionComment, {foreignKey: 'commenter'});
ContributionComment.belongsTo(User, {foreignKey: 'commenter'});

//relationship between contribution and contribution comments
Contribution.hasMany(ContributionComment, {foreignKey: 'contributionCommented'});
ContributionComment.belongsTo(Contribution, {foreignKey: 'contributionCommented'});

//relationship between project comments and users
User.hasMany(ProjectComment, {foreignKey: 'commenter'});
ProjectComment.belongsTo(User, {foreignKey: 'commenter'});

//relationship between project and project comments
Project.hasMany(ProjectComment, {foreignKey: 'projectCommented'});
ProjectComment.belongsTo(Project, {foreignKey: 'projectCommented'});

//relationship between contribution and contributionupvote
Contribution.hasMany(ContributionUpvote, {foreignKey: 'contributionupvoted'});
ContributionUpvote.belongsTo(Contribution, {foreignKey: 'contributioupvoted'});

//relationship between user and contribution upvote
User.hasMany(ContributionUpvote, {foreignKey: 'upvoter'});
ContributionUpvote.belongsTo(User, {foreignKey: 'upvoter'});

//relationship between project and projectupvote
Project.hasMany(ProjectUpvote, {foreignKey: 'projectupvoted'});
ProjectUpvote.belongsTo(Project, {foreignKey: 'projectupvoted'});

//relationship between projectupvote and user
User.hasMany(ProjectUpvote, {foreignKey: 'upvoter'});
ProjectUpvote.belongsTo(User, {foreignKey: 'upvoter'});


db.sync();
