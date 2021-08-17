module.exports = (sequelize, DataTypes) => {
    const comments = sequelize.define("votes", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
        },
        server_id: {
            type: DataTypes.INTEGER,
        },
        score_votes: {
            type: DataTypes.INTEGER,
        },
        createdAt: {
            type: DataTypes.DateTime,
        }

    })
    return comments;
}