const { DataTypes } = require('sequelize');
const sequelize = require('./config/db.js');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  verification_status:{
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  verification_token:{
    type: DataTypes.STRING,
    allowNull: true
  },
  verification_expiry:{
    type: DataTypes.DATE,
    allowNull: true
  }
},
{
    timestamps: true,
    createdAt:'account_created',
    updatedAt: 'account_updated',
});

module.exports = User;