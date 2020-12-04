const { DataTypes, Deferrable } = require('sequelize');
const { sequelize } = require('../db/db-connection');
const Authors = require('./author');

const Reminders = sequelize.define(
	'Reminders',
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		author_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Authors,
				key: 'id',
				deferrable: Deferrable.INITIALLY_IMMEDIATE,
			},
		},
		activity_name: {
			type: DataTypes.STRING(32),
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		date: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
		is_expired: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	},
	{
		freezeTableName: true,
	}
);

module.exports = Reminders;
