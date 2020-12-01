const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db-connection');

const Authors = sequelize.define(
	'Authors',
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		firstname: {
			type: DataTypes.STRING(32),
			allowNull: false,
		},
		lastname: {
			type: DataTypes.STRING(32),
		},
	},
	{
		freezeTableName: true,
	}
);

module.exports = Authors;
