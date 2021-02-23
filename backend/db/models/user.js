const bcrypt = require('bcryptjs');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: [3, 256]
      },
      isNotEmail(value) {
        if (Validator.isEmail(value)) {
          throw new Error('Cannot be an email.');
        }
      },
    },
    lastName: {
      
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      len: [3, 256]
    }
    },
    email: {
      type: DataTypes.STRING(256),
      allowNull: false,
      isEmail: true
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      max: 60,
      validate: {
        len: [60, 60]
      }
    },
    comedian: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    upVote: {
      type: DataTypes.INTEGER
    },
    location:{
      type: DataTypes.STRING(255)
    },
    userPhoto:{
      type: DataTypes.STRING,
      allowNull: true
    },
    description:{
      type: DataTypes.TEXT
    },
  }, {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
      },
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] },
      },
      loginUser: {
        attributes: {},
      },
    },
  });
  User.associate = function(models) {
    // associations can be defined here
  };

  User.prototype.toSafeObject = function() { // remember, this cannot be an arrow function
    const { id, firstName, lastName, email, comedian, location, description, userId } = this; // context will be the User instance
    return { id, firstName, lastName, email, comedian, location };
  };
  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
   };
  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
   };
  
   User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };
  User.signup = async function ({ firstName, lastName, email, password, comedian, location }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      firstName,
      lastName,
      email,
      comedian,
      hashedPassword,
      location
    });
    return await User.scope('currentUser').findByPk(user.id);
  };
  
  return User;
};

