module.exports = (sequelize, DataTypes) => {
    const comments = sequelize.define("Comments", {
        comment_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        comment_server: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'servers',
                key: 'server_id'
            }
        },
        comment_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'user_id'
            }
        },
        comment_content: {
            type: DataTypes.STRING,
            allowNull: false
        }

    })
    return comments;
}