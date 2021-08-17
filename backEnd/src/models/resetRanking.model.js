module.exports = (sequelize, DataTypes) => {
    const resetRanking = sequelize.define("reset_Ranking", {
        reset_type : {
            type: DataTypes.STRING,
        },
        reset_datetime: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })
    return resetRanking;
}