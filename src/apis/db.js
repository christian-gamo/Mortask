import Sequelize from "sequelize";

const sequelize = new Sequelize("creaturesofthenight", "Dauphine", "123456", {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

export default sequelize;
