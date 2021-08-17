module.exports = (sequelize, DataTypes) => {
    const comments = sequelize.define("votes", {
        vote_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        vote_user: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'user_id'
            }
        },
        vote_server: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'servers',
                key: 'server_id'
            }
        },
        vote_score : {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        id_game : {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ip_address : {
            type: DataTypes.STRING,
        }

    })
    return comments;
}