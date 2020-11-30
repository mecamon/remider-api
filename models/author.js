const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db-connection');

exports.Authors = sequelize.define(
	'Authors',
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		firstName: {
			type: DataTypes.STRING(32),
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING(32),
		},
	},
	{
		freezeTableName: true,
	}
);

(async function () {
	await Authors.sync({ alter: true });
	console.log('Author model created!');
})();
