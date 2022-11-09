

module.exports=(sequelize,DataTypes)=>{
    const Restaurants=sequelize.define(
        'Restaurants',
        {
            first_name:{
                type:DataTypes.STRING,
                allowNull:false
            },
            last_name:{
                type:DataTypes.STRING
            },
            designation:{
                type:DataTypes.STRING
            },
            Password:{
                type:DataTypes.STRING
            },
        }
    );
    Restaurants.associate=models=>{
        Restaurants.hasMany(models.Menus,{onDelete:"cascade"});
       
    }
    Restaurants.associate=models=>{
        Restaurants.belongsTo(models.Utilisateurs,{onDelete:"cascade"})
    }
    return Restaurants;
}

