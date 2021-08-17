module.exports = (sequelize, DataTypes) => {
    const category = sequelize.define("category_games", {
        category_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        categoty_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        category_img: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category_serverTotal: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        category_serverActive: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    })
    return category;
}