module.exports = (sequelize, DataTypes) => {
    const servers = sequelize.define("servers", {
        server_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        server_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        server_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'user_id'
            }
        },
        server_detail: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category_id: {
            type: DataTypes.INTEGER(3),
            allowNull: false,
            references: {
                model: 'category_games',
                key: 'category_id'
            }
        },
        server_vip: {
            type: DataTypes.INTEGER(1),
            defaultValue: 0,
            allowNull: false
        },
        server_img: {
            type: DataTypes.STRING,
        },
        website: {
            type: DataTypes.STRING,
        }, 
        facebook: {
            type: DataTypes.STRING,
        },
        facebook_group: {
            type: DataTypes.STRING,
        },
        score_vote: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

    })
    return servers;
}